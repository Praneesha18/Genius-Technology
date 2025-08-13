import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore"
import { db } from "./firebase"
import type { Product, Category, Brand, User, Order } from "@/types"

// Products Collection
export const productsCollection = collection(db, "products")

export const getProducts = async () => {
  const snapshot = await getDocs(productsCollection)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Product[]
}

export const getFeaturedProducts = async () => {
  const q = query(productsCollection, where("featured", "==", true), limit(8))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Product[]
}

export const getProductsByCategory = async (categorySlug: string) => {
  const q = query(productsCollection, where("category", "==", categorySlug))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Product[]
}

export const getProductsByBrand = async (brandSlug: string) => {
  const q = query(productsCollection, where("brand", "==", brandSlug))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Product[]
}

export const getProduct = async (id: string) => {
  const docRef = doc(db, "products", id)
  const snapshot = await getDoc(docRef)
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Product
  }
  return null
}

export const addProduct = async (product: Omit<Product, "id">) => {
  return await addDoc(productsCollection, product)
}

export const updateProduct = async (id: string, product: Partial<Product>) => {
  const docRef = doc(db, "products", id)
  return await updateDoc(docRef, product)
}

export const deleteProduct = async (id: string) => {
  const docRef = doc(db, "products", id)
  return await deleteDoc(docRef)
}

// Categories Collection
export const categoriesCollection = collection(db, "categories")

export const getCategories = async () => {
  const snapshot = await getDocs(categoriesCollection)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Category[]
}

export const getFeaturedCategories = async () => {
  const q = query(categoriesCollection, where("featured", "==", true))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Category[]
}

export const getCategory = async (slug: string) => {
  const q = query(categoriesCollection, where("slug", "==", slug))
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    const doc = snapshot.docs[0]
    return { id: doc.id, ...doc.data() } as Category
  }
  return null
}

// Brands Collection
export const brandsCollection = collection(db, "brands")

export const getBrands = async () => {
  const snapshot = await getDocs(brandsCollection)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Brand[]
}

export const getFeaturedBrands = async () => {
  const q = query(brandsCollection, where("featured", "==", true))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Brand[]
}

export const getBrand = async (slug: string) => {
  const q = query(brandsCollection, where("slug", "==", slug))
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    const doc = snapshot.docs[0]
    return { id: doc.id, ...doc.data() } as Brand
  }
  return null
}

// Users Collection
export const usersCollection = collection(db, "users")

export const getUser = async (id: string) => {
  const docRef = doc(db, "users", id)
  const snapshot = await getDoc(docRef)
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as User
  }
  return null
}

export const updateUser = async (id: string, user: Partial<User>) => {
  const docRef = doc(db, "users", id)
  return await updateDoc(docRef, user)
}

// Orders Collection
export const ordersCollection = collection(db, "orders")

export const getUserOrders = async (userId: string) => {
  const q = query(ordersCollection, where("userId", "==", userId), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Order[]
}

export const getOrder = async (id: string) => {
  const docRef = doc(db, "orders", id)
  const snapshot = await getDoc(docRef)
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Order
  }
  return null
}

export const addOrder = async (order: Omit<Order, "id">) => {
  return await addDoc(ordersCollection, order)
}

export const updateOrder = async (id: string, order: Partial<Order>) => {
  const docRef = doc(db, "orders", id)
  return await updateDoc(docRef, order)
}
