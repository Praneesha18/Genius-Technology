import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { Product } from "@/types"
import type { Metadata } from "next"
import ProductClientPage from "./ProductClientPage"

interface ProductPageProps {
  params: {
    id: string
  }
}

// Dynamic metadata generation
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const productId = params.id
  const productRef = doc(db, "products", productId)
  const productSnap = await getDoc(productRef)

  if (!productSnap.exists()) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    }
  }

  const product = { id: productSnap.id, ...productSnap.data() } as Product

  return {
    title: product.name,
    description: product.description.substring(0, 160) + "...", // Truncate for meta description
    keywords: [product.name, product.category, product.brand, "electronics", "buy online"],
    openGraph: {
      title: product.name + " | Genius Technology",
      description: product.description.substring(0, 160) + "...",
      url: `https://your-ecommerce-domain.com/product/${product.id}`, // Replace with your actual domain
      images: product.images && product.images.length > 0 ? [{ url: product.images[0] }] : [],
      type: "product",
      // Add product specific Open Graph tags if needed (e.g., product:price:amount)
    },
    twitter: {
      card: "summary_large_image",
      title: product.name + " | Genius Technology",
      description: product.description.substring(0, 160) + "...",
      images: product.images && product.images.length > 0 ? [product.images[0]] : [],
    },
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductClientPage params={params} />
}
