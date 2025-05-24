"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import UserProfile from "@/components/auth/user-profile"
import { OrderProvider, useOrder } from "@/contexts/order-context"
import { CartItemList } from "@/components/order/cart-item-list"
import { OrderSummary } from "@/components/order/order-summary"
import { OrderActions } from "@/components/order/order-actions"
import {
  Search,
  Menu,
  Coffee,
  Wine,
  UtensilsCrossed,
  Cookie,
  IceCream,
  Loader2,
} from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image_url?: string
  category: string
  stock?: number
}

const categories = [
  { id: "coffee", name: "Coffee", icon: Coffee, active: true },
  { id: "beverages", name: "Beverages", icon: Wine, active: false },
  { id: "food", name: "Food", icon: UtensilsCrossed, active: false },
  { id: "snacks", name: "Snacks", icon: Cookie, active: false },
  { id: "desserts", name: "Desserts", icon: IceCream, active: false },
]

function PosContent() {
  const [activeCategory, setActiveCategory] = useState("coffee")
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useOrder()

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/products?category=${activeCategory}`)
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [activeCategory])

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-emerald-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-emerald-600">
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2">
              <Coffee className="h-8 w-8" />
              <span className="text-xl font-bold">Coffee Shop</span>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search items here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <UserProfile />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <Button variant="outline" className="text-emerald-600 border-emerald-600">
              + ADD NEW ITEM
            </Button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-5 gap-4 mb-6 min-h-[400px]">
            {isLoading ? (
              <div className="col-span-5 flex justify-center items-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                <span className="ml-2 text-gray-600">Loading products...</span>
              </div>
            ) : error ? (
              <div className="col-span-5 text-center text-red-500">
                <p>{error}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline" 
                  className="mt-4"
                >
                  Try Again
                </Button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-5 text-center text-gray-500">
                <p>No products found. Try a different search or category.</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => addToCart(product)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="mb-3">
                      <img
                        src={product.image_url || "/placeholder.svg?height=120&width=120"}
                        alt={product.name}
                        className="w-full h-24 object-cover rounded-lg mx-auto"
                      />
                    </div>
                    <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-emerald-600 font-bold">${product.price.toFixed(2)}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Category Navigation */}
          <div className="grid grid-cols-5 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={`h-20 flex-col gap-2 ${
                    activeCategory === category.id
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="text-sm">{category.name}</span>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Checkout Panel */}
        <div className="w-80 bg-white border-l border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-6">Checkout</h2>

          <div className="mb-6">
            <CartItemList />
          </div>

          <Separator className="my-6" />

          {/* Order Summary */}
          <div className="mb-6">
            <OrderSummary />
          </div>

          {/* Action Buttons */}
          <OrderActions />
        </div>
      </div>
    </div>
  )
}

export default function CoffeeShopPOS() {
  return (
    <OrderProvider>
      <PosContent />
    </OrderProvider>
  )
}
