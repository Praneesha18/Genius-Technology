"use server"

import { db, adminAuth } from "@/lib/firebase-admin"
import { FieldValue } from "firebase-admin/firestore"
import { cookies } from "next/headers"
import type { Question, Answer } from "@/types"

// Helper to get current user from session
async function getCurrentUserFromSession() {
  const sessionCookie = cookies().get("session")?.value
  if (!sessionCookie) {
    return null
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
    const userDoc = await db.collection("users").doc(decodedClaims.uid).get()
    if (userDoc.exists) {
      return { id: userDoc.id, ...userDoc.data() } as { id: string; firstName: string; lastName: string; role: string }
    }
    return null
  } catch (error) {
    console.error("Error verifying session cookie or fetching user:", error)
    return null
  }
}

export async function submitQuestion(productId: string, formData: FormData) {
  const user = await getCurrentUserFromSession()

  if (!user) {
    return { success: false, message: "You must be logged in to ask a question." }
  }

  const questionText = formData.get("question") as string

  if (!questionText || questionText.trim() === "") {
    return { success: false, message: "Question cannot be empty." }
  }

  try {
    const newQuestion: Omit<Question, "id" | "answers"> = {
      productId,
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      question: questionText.trim(),
      createdAt: FieldValue.serverTimestamp() as any, // Firestore handles timestamp
    }

    await db.collection("products").doc(productId).collection("questions").add(newQuestion)

    return { success: true, message: "Your question has been submitted successfully!" }
  } catch (error) {
    console.error("Error submitting question:", error)
    return { success: false, message: "Failed to submit question. Please try again." }
  }
}

export async function submitAnswer(productId: string, questionId: string, formData: FormData) {
  const user = await getCurrentUserFromSession()

  if (!user) {
    return { success: false, message: "You must be logged in to answer a question." }
  }

  const answerText = formData.get("answer") as string

  if (!answerText || answerText.trim() === "") {
    return { success: false, message: "Answer cannot be empty." }
  }

  try {
    const newAnswer: Omit<Answer, "id"> = {
      questionId,
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      answer: answerText.trim(),
      createdAt: FieldValue.serverTimestamp() as any, // Firestore handles timestamp
      isOfficial: user.role === "admin", // Mark as official if answered by admin
    }

    await db
      .collection("products")
      .doc(productId)
      .collection("questions")
      .doc(questionId)
      .collection("answers")
      .add(newAnswer)

    return { success: true, message: "Your answer has been submitted successfully!" }
  } catch (error) {
    console.error("Error submitting answer:", error)
    return { success: false, message: "Failed to submit answer. Please try again." }
  }
}
