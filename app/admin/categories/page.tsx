"use client"

import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/auth-utils" // Import the new utility
import { useState, useEffect } from "react"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash } from "lucide-react"
import type { Category } from "@/types"

export default async function AdminCategoriesPage() {
  const userIsAdmin = await isAdmin()
  if (!userIsAdmin) {
    redirect("/login")
  }
  return <AdminCategoriesClient />
}

function AdminCategoriesClient() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)
  const [categoryName, setCategoryName] = useState("")

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const categoriesCollection = collection(db, "categories")
      const categoriesSnapshot = await getDocs(query(categoriesCollection, orderBy("name")))
      const categoriesData = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[]
      setCategories(categoriesData)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const handleAddCategory = async () => {
    try {
      await addDoc(collection(db, "categories"), {
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
        createdAt: new Date(),
      })
      setIsModalOpen(false)
      setCategoryName("")
      fetchCategories()
    } catch (error) {
      console.error("Error adding category:", error)
    }
  }

  const handleUpdateCategory = async () => {
    if (!currentCategory?.id) return
    try {
      const categoryRef = doc(db, "categories", currentCategory.id)
      await updateDoc(categoryRef, {
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
      })
      setIsModalOpen(false)
      setCategoryName("")
      fetchCategories()
    } catch (error) {
      console.error("Error updating category:", error)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteDoc(doc(db, "categories", id))
        fetchCategories()
      } catch (error) {
        console.error("Error deleting category:", error)
      }
    }
  }

  const openEditModal = (category: Category) => {
    setCurrentCategory(category)
    setCategoryName(category.name)
    setIsModalOpen(true)
  }

  const openAddModal = () => {
    setCurrentCategory(null)
    setCategoryName("")
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
            <Button onClick={openAddModal}>
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                        No categories found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.slug}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => openEditModal(category)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{currentCategory ? "Edit Category" : "Add Category"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoryName" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="categoryName"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={currentCategory ? handleUpdateCategory : handleAddCategory}>
                  {currentCategory ? "Save Changes" : "Add Category"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}
