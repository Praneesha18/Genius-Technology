import { NextResponse } from "next/server"
import Razorpay from "razorpay"

// Initialize Razorpay with your key ID and key secret
// These should be stored as environment variables for security
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "YOUR_RAZORPAY_KEY_ID", // Replace with your actual Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET || "YOUR_RAZORPAY_KEY_SECRET", // Replace with your actual Razorpay Key Secret
})

export async function POST(req: Request) {
  try {
    const { amount, currency, receipt } = await req.json()

    if (!amount || !currency) {
      return NextResponse.json({ error: "Amount and currency are required" }, { status: 400 })
    }

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1, // Auto capture payment
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      receipt: order.receipt,
    })
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error)
    return NextResponse.json({ error: error.message || "Failed to create Razorpay order" }, { status: 500 })
  }
}
