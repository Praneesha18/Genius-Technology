import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore"
import { sendShipmentUpdateNotification } from "@/actions/notifications"

// Shiprocket does not typically use a shared secret for webhook verification
// in the same way as payment gateways. Instead, they often rely on IP whitelisting
// or a unique webhook URL. For simplicity, we'll proceed without a secret here,
// but in a production environment, you should implement robust security measures
// like IP whitelisting or a custom token if Shiprocket provides one.

export async function POST(req: Request) {
  try {
    const data = await req.json()
    console.log("Received Shiprocket webhook:", JSON.stringify(data, null, 2))

    const {
      event, // e.g., "ORDER_STATUS_UPDATE"
      payload,
    } = data

    if (!event || !payload) {
      return NextResponse.json({ error: "Missing event or payload in webhook data" }, { status: 400 })
    }

    if (event === "ORDER_STATUS_UPDATE") {
      const {
        order_id: shiprocketOrderId, // Shiprocket's internal order ID
        awb_code, // AWB number
        current_status, // e.g., "SHIPPED", "DELIVERED", "OUT FOR DELIVERY"
        current_status_code, // Numeric status code
        order_id: internalOrderId, // This is often the `receipt` or `order_id` you sent to Shiprocket
        // ... other payload fields like `etd`, `pickup_date`, `delivered_date`
      } = payload

      if (!internalOrderId) {
        console.warn("Shiprocket Webhook: Missing internal order_id in payload for status update.")
        return NextResponse.json({ error: "Missing internal order ID" }, { status: 400 })
      }

      // Find the corresponding order in Firestore using the internalOrderId
      // Assuming your Firestore order's `id` matches the `order_id` sent to Shiprocket
      const orderRef = doc(db, "orders", internalOrderId)
      const orderSnap = await getDocs(query(collection(db, "orders"), where("id", "==", internalOrderId)))

      if (orderSnap.empty) {
        console.warn("Shiprocket Webhook: Order not found in Firestore for internal ID:", internalOrderId)
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
      }

      const orderDoc = orderSnap.docs[0]
      const currentOrderData = orderDoc.data()

      let newOrderStatus: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" = currentOrderData.status

      // Map Shiprocket statuses to your internal order statuses
      switch (current_status) {
        case "SHIPPED":
        case "IN TRANSIT":
        case "OUT FOR DELIVERY":
          newOrderStatus = "shipped"
          break
        case "DELIVERED":
          newOrderStatus = "delivered"
          break
        case "CANCELLED":
        case "RTO INITIATED": // Return to Origin
          newOrderStatus = "cancelled"
          break
        // Add more mappings as needed
        default:
          console.log(`Shiprocket Webhook: Unhandled status '${current_status}' for order ${internalOrderId}`)
          break
      }

      // Update the order status in Firestore
      await updateDoc(orderRef, {
        status: newOrderStatus,
        trackingId: awb_code || currentOrderData.trackingId, // Update AWB if it changes or is new
        shiprocketStatus: current_status, // Store the exact Shiprocket status
        updatedAt: new Date(),
        // You might want to store more details from the payload here
        shiprocketWebhookData: payload, // Store the full payload for debugging
      })

      if (newOrderStatus === "shipped" || newOrderStatus === "delivered" || newOrderStatus === "out for delivery") {
        await sendShipmentUpdateNotification(orderDoc.id, newOrderStatus, awb_code)
      }

      console.log(`Shiprocket Webhook: Order ${internalOrderId} status updated to ${newOrderStatus}.`)
      return NextResponse.json({ success: true, message: "Webhook processed successfully" }, { status: 200 })
    } else {
      console.log(`Shiprocket Webhook: Unhandled event type: ${event}`)
      return NextResponse.json({ message: `Unhandled event type: ${event}` }, { status: 200 })
    }
  } catch (error) {
    console.error("Error processing Shiprocket webhook:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
