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

import { ErrorBoundary } from "@/components/error-boundary"
import { ProductImage } from "@/components/ui/product-image"

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
      {/* Header - Mobile First */}
      <header className="bg-emerald-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-emerald-600 lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2">
              <Coffee className="h-6 w-6 lg:h-8 lg:w-8" />
              <span className="text-lg lg:text-xl font-bold">Coffee Shop</span>
            </div>
          </div>

          {/* Search - Hidden on mobile, shown on larger screens */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4 lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search items here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <UserProfile />
          </div>
        </div>
        
        {/* Mobile Search - Shown only on mobile */}
        <div className="sm:hidden mt-3">
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
      </header>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 order-2 lg:order-1">
          <div className="mb-4 lg:mb-6">
            <Button variant="outline" className="text-emerald-600 border-emerald-600 w-full sm:w-auto">
              + ADD NEW ITEM
            </Button>
          </div>

          {/* Product Grid - Mobile First */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4 mb-4 lg:mb-6">
            {isLoading ? (
              <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 flex justify-center items-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                <span className="ml-2 text-gray-600">Loading products...</span>
              </div>
            ) : error ? (
              <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 text-center text-red-500">
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
              <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 text-center text-gray-500">
                <p>No products found. Try a different search or category.</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                  onClick={() => addToCart(product)}
                >
                  <CardContent className="p-0 h-full flex flex-col">
                    {/* Image Section - Much larger images */}
                    <div className="relative w-full h-48 sm:h-52 lg:h-56 overflow-hidden">
                      <ProductImage
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full"
                      />
                    </div>
                    
                    {/* Content Section - No spacing between name and price */}
                    <div className="p-3 lg:p-4">
                      <h3 className="font-medium text-sm lg:text-base line-clamp-2 leading-tight text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-emerald-600 font-bold text-base lg:text-lg">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Category Navigation - Mobile First */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 lg:gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={`h-16 lg:h-20 flex-col gap-1 lg:gap-2 text-xs lg:text-sm ${
                    activeCategory === category.id
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <IconComponent className="h-5 w-5 lg:h-6 lg:w-6" />
                  <span className="leading-tight">{category.name}</span>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Checkout Panel - Mobile First */}
        <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-4 lg:p-6 order-1 lg:order-2 max-h-[50vh] lg:max-h-none overflow-y-auto">
          <h2 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6">Checkout</h2>

          <ErrorBoundary context="Cart Items">
            <div className="mb-4 lg:mb-6">
              <CartItemList />
            </div>
          </ErrorBoundary>

          <Separator className="my-4 lg:my-6" />

          <ErrorBoundary context="Order Summary">
            <div className="mb-4 lg:mb-6">
              <OrderSummary />
            </div>
          </ErrorBoundary>

          {/* Action Buttons */}
          <ErrorBoundary context="Order Actions">
            <OrderActions />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default function CoffeeShopPOS() {
  return (
    <OrderProvider>
      <ErrorBoundary context="POS System">
        <PosContent />
      </ErrorBoundary>
    </OrderProvider>
  )
}
