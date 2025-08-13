import "server-only" // Ensures this module is only used on the server

import { cookies } from "next/headers"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { adminApp } from "@/lib/firebase-admin" // Your Firebase Admin SDK initialization
import type { User } from "@/types"

const authAdmin = getAuth(adminApp)
const dbAdmin = getFirestore(adminApp)

export async function verifySessionCookie(sessionCookie: string) {
  try {
    const decodedClaims = await authAdmin.verifySessionCookie(sessionCookie, true) // Check for revocation
    return decodedClaims
  } catch (error) {
    console.error("Error verifying session cookie:", error)
    return null
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const sessionCookie = cookies().get("session")?.value

  if (!sessionCookie) {
    return null
  }

  const decodedClaims = await verifySessionCookie(sessionCookie)

  if (!decodedClaims) {
    return null
  }

  try {
    const userDoc = await dbAdmin.collection("users").doc(decodedClaims.uid).get()
    if (userDoc.exists) {
      return { id: userDoc.id, ...userDoc.data() } as User
    }
  } catch (error) {
    console.error("Error fetching user data from Firestore:", error)
  }

  return null
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === "admin"
}
