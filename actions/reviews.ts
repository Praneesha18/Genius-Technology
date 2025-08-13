"use server"

import { db } from "@/lib/firebase"
import { doc, collection, runTransaction, serverTimestamp } from "firebase/firestore"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { initFirebaseAdmin } from "@/lib/firebase-admin"
import type { Review, Product } from "@/types"

initFirebaseAdmin()

export async function submitProductReview(
  productId: string,
  rating: number,
  reviewText: string,
  images: string[] = [],
) {
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get("__session")?.value

  if (!sessionCookie) {
    redirect("/login")
  }

  try {
    const decodedClaims = await getAuth().verifySessionCookie(sessionCookie, true)
    const userId = decodedClaims.uid

    const userDoc = await getFirestore().collection("users").doc(userId).get()
    if (!userDoc.exists) {
      throw new Error("User not found.")
    }
    const userData = userDoc.data()
    const userName =
      userData?.firstName && userData?.lastName
        ? `${userData.firstName} ${userData.lastName}`
        : userData?.email || "Anonymous User"

    // Check if the user has purchased this product to mark as verified
    // This is a simplified check. A more robust check would involve querying orders.
    const hasPurchased = true // For demonstration, assume true. Implement actual check here.

    const newReview: Omit<Review, "id"> = {
      productId,
      userId,
      userName,
      rating,
      review: reviewText,
      images,
      verifiedPurchase: hasPurchased,
      createdAt: new Date(), // Firestore will convert this to Timestamp
    }

    await runTransaction(db, async (transaction) => {
      const productRef = doc(db, "products", productId)
      const productDoc = await transaction.get(productRef)

      if (!productDoc.exists()) {
        throw new Error("Product does not exist!")
      }

      const productData = productDoc.data() as Product
      const currentRating = productData.rating || 0
      const currentReviews = productData.reviews || 0

      // Add the new review to the subcollection
      const reviewCollectionRef = collection(productRef, "reviews")
      transaction.set(doc(reviewCollectionRef), {
        ...newReview,
        createdAt: serverTimestamp(), // Use server timestamp for consistency
      })

      // Calculate new average rating
      const newTotalRating = currentRating * currentReviews + rating
      const newReviewsCount = currentReviews + 1
      const newAverageRating = newTotalRating / newReviewsCount

      // Update product document with new average rating and review count
      transaction.update(productRef, {
        rating: newAverageRating,
        reviews: newReviewsCount,
        updatedAt: serverTimestamp(),
      })
    })

    return { success: true, message: "Review submitted successfully!" }
  } catch (error) {
    console.error("Error submitting review:", error)
    return { success: false, message: "Failed to submit review. Please try again." }
  }
}
