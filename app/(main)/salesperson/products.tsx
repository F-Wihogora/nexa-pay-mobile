import { View, Text, ScrollView, Pressable, SafeAreaView, TextInput, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Plus, Minus, Search, ShoppingCart, ArrowRight, Filter, Grid, List, Heart } from 'lucide-react-native';
import { SalespersonBottomNav } from '../../../components/SalespersonBottomNav';

export default function SalespersonProducts() {
  const router = useRouter();
  const primaryNavy = "#002B5B";
  const accentBlue = "#3b82f6";
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCart, setShowCart] = useState(false);

  const categories = ['All', 'T-Shirts', 'Pants', 'Dresses', 'Jackets', 'Accessories'];

  const products = [
    { 
      id: '1', 
      name: 'Classic Cotton T-Shirt', 
      price: 29.99, 
      originalPrice: 39.99,
      desc: 'Premium cotton blend, comfortable fit',
      category: 'T-Shirts',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      discount: 25,
      rating: 4.8,
      inStock: true
    },
    { 
      id: '2', 
      name: 'Slim Fit Jeans', 
      price: 79.99, 
      originalPrice: 99.99,
      desc: 'Stretch denim, modern cut',
      category: 'Pants',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
      discount: 20,
      rating: 4.6,
      inStock: true
    },
    { 
      id: '3', 
      name: 'Summer Floral Dress', 
      price: 89.99, 
      originalPrice: 129.99,
      desc: 'Lightweight fabric, elegant design',
      category: 'Dresses',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
      discount: 31,
      rating: 4.9,
      inStock: true
    },
    { 
      id: '4', 
      name: 'Leather Jacket', 
      price: 199.99, 
      originalPrice: 299.99,
      desc: 'Genuine leather, classic style',
      category: 'Jackets',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
      discount: 33,
      rating: 4.7,
      inStock: true
    },
    { 
      id: '5', 
      name: 'Casual Sneakers', 
      price: 69.99, 
      originalPrice: 89.99,
      desc: 'Comfortable walking shoes',
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      discount: 22,
      rating: 4.5,
      inStock: true
    },
    { 
      id: '6', 
      name: 'Designer Handbag', 
      price: 149.99, 
      originalPrice: 199.99,
      desc: 'Premium materials, spacious',
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      discount: 25,
      rating: 4.8,
      inStock: false
    },
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const updateQuantity = (id: string, delta: number) => {
    const newQuantity = Math.max(0, (quantities[id] || 0) + delta);
    setQuantities(prev => ({
      ...prev,
      [id]: newQuantity
    }));
    
    // Show cart when items are added
    if (newQuantity > 0 && !showCart) {
      setShowCart(true);
    }
  };

  const totalAmount = products.reduce((acc, p) => acc + (p.price * (quantities[p.id] || 0)), 0);
  const selectedCount = Object.values(quantities).reduce((acc, q) => acc + q, 0);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCheckout = () => {
    router.push('/(main)/salesperson/pay');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-12 pb-4 bg-white">
        <View className="flex-row justify-between items-center mb-4">
          <Pressable onPress={() => router.back()}>
            <Text className="text-2xl">←</Text>
          </Pressable>
          <Text style={{ 
            color: primaryNavy,
            fontFamily: 'Poppins_800ExtraBold'
          }} className="text-xl">Products</Text>
          <View className="flex-row">
            <Pressable 
              onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="mr-3"
            >
              {viewMode === 'grid' ? <List size={24} color={primaryNavy} /> : <Grid size={24} color={primaryNavy} />}
            </Pressable>
            <Heart size={24} color={primaryNavy} />
          </View>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center mb-4">
          <View className="flex-1 flex-row items-center bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl mr-3">
            <Search size={20} color="#94a3b8" />
            <TextInput 
              placeholder="Search products..." 
              className="ml-3 flex-1 text-slate-600 text-base"
              placeholderTextColor="#94a3b8"
              style={{ fontFamily: 'Poppins_500Medium' }}
            />
          </View>
          <Pressable 
            style={{ backgroundColor: accentBlue }}
            className="w-14 h-14 rounded-2xl items-center justify-center shadow-lg"
          >
            <Filter size={22} color="white" />
          </Pressable>
        </View>

        {/* Category Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {categories.map((category, index) => (
            <Pressable 
              key={index}
              onPress={() => handleCategoryFilter(category)}
              style={{ 
                backgroundColor: selectedCategory === category ? primaryNavy : 'transparent',
                marginRight: 16
              }}
              className="px-6 py-3 rounded-2xl border border-slate-200 shadow-sm"
            >
              <Text style={{ 
                color: selectedCategory === category ? 'white' : '#64748b',
                fontFamily: 'Poppins_600SemiBold'
              }} className="text-base">{category}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {viewMode === 'grid' ? (
          <View className="flex-row flex-wrap justify-between">
            {filteredProducts.map(product => (
              <View key={product.id} className="w-[48%] mb-4">
                <View className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm">
                  <View className="relative mb-3">
                    <View className="w-full h-40 rounded-2xl overflow-hidden">
                      <Image 
                        source={{ uri: product.image }}
                        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                      />
                    </View>
                    {product.discount > 0 && (
                      <View className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded-full">
                        <Text style={{ 
                          color: 'white',
                          fontFamily: 'Poppins_700Bold'
                        }} className="text-xs">-{product.discount}%</Text>
                      </View>
                    )}
                    <Pressable className="absolute top-2 left-2 w-8 h-8 bg-white/80 rounded-full items-center justify-center">
                      <Heart size={16} color="#64748b" />
                    </Pressable>
                    {!product.inStock && (
                      <View className="absolute inset-0 bg-black/50 rounded-2xl items-center justify-center">
                        <Text style={{ 
                          color: 'white',
                          fontFamily: 'Poppins_700Bold'
                        }} className="text-sm">Out of Stock</Text>
                      </View>
                    )}
                  </View>
                  
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_700Bold'
                  }} className="text-sm mb-1" numberOfLines={2}>{product.name}</Text>
                  
                  <Text style={{ 
                    color: '#64748b',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-xs mb-2" numberOfLines={1}>{product.desc}</Text>
                  
                  <View className="flex-row items-center justify-between mb-3">
                    <View>
                      <Text style={{ 
                        color: accentBlue,
                        fontFamily: 'Poppins_800ExtraBold'
                      }} className="text-lg">${product.price}</Text>
                      {product.originalPrice && (
                        <Text style={{ 
                          color: '#94a3b8',
                          fontFamily: 'Poppins_500Medium'
                        }} className="text-xs line-through">${product.originalPrice}</Text>
                      )}
                    </View>
                    <View className="flex-row items-center">
                      <Text className="text-yellow-500 mr-1">★</Text>
                      <Text style={{ 
                        color: '#64748b',
                        fontFamily: 'Poppins_500Medium'
                      }} className="text-xs">{product.rating}</Text>
                    </View>
                  </View>

                  {product.inStock && (
                    <View className="flex-row items-center justify-between bg-slate-50 p-3 rounded-2xl">
                      <Pressable 
                        onPress={() => updateQuantity(product.id, -1)} 
                        className="w-10 h-10 items-center justify-center bg-white rounded-full border border-slate-200 shadow-sm"
                      >
                        <Minus size={16} color={primaryNavy} />
                      </Pressable>
                      <Text style={{ 
                        color: primaryNavy,
                        fontFamily: 'Poppins_700Bold'
                      }} className="text-base">{quantities[product.id] || 0}</Text>
                      <Pressable 
                        onPress={() => updateQuantity(product.id, 1)} 
                        className="w-10 h-10 items-center justify-center bg-white rounded-full border border-slate-200 shadow-sm"
                      >
                        <Plus size={16} color={primaryNavy} />
                      </Pressable>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="space-y-4">
            {filteredProducts.map(product => (
              <View key={product.id} className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm">
                <View className="flex-row">
                  <View className="w-20 h-20 rounded-2xl overflow-hidden mr-4">
                    <Image 
                      source={{ uri: product.image }}
                      style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                    />
                  </View>
                  <View className="flex-1">
                    <Text style={{ 
                      color: primaryNavy,
                      fontFamily: 'Poppins_700Bold'
                    }} className="text-base mb-1">{product.name}</Text>
                    <Text style={{ 
                      color: '#64748b',
                      fontFamily: 'Poppins_500Medium'
                    }} className="text-sm mb-2">{product.desc}</Text>
                    <View className="flex-row items-center justify-between">
                      <Text style={{ 
                        color: accentBlue,
                        fontFamily: 'Poppins_800ExtraBold'
                      }} className="text-lg">${product.price}</Text>
                      {product.inStock && (
                        <View className="flex-row items-center">
                          <Pressable 
                            onPress={() => updateQuantity(product.id, -1)} 
                            className="w-10 h-10 items-center justify-center bg-slate-50 rounded-full"
                          >
                            <Minus size={16} color={primaryNavy} />
                          </Pressable>
                          <Text style={{ 
                            color: primaryNavy,
                            fontFamily: 'Poppins_700Bold'
                          }} className="mx-4 text-base">{quantities[product.id] || 0}</Text>
                          <Pressable 
                            onPress={() => updateQuantity(product.id, 1)} 
                            className="w-10 h-10 items-center justify-center bg-slate-50 rounded-full"
                          >
                            <Plus size={16} color={primaryNavy} />
                          </Pressable>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
        <View className="h-40" />
      </ScrollView>

      {/* Sliding Cart Section */}
      {showCart && selectedCount > 0 && (
        <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl border-t border-slate-200" style={{ height: '50%' }}>
          <View className="p-6">
            {/* Handle */}
            <View className="w-12 h-1 bg-slate-300 rounded-full self-center mb-6" />
            
            {/* Cart Header */}
            <View className="flex-row justify-between items-center mb-6">
              <Text style={{ 
                color: primaryNavy,
                fontFamily: 'Poppins_800ExtraBold'
              }} className="text-2xl">Shopping Cart</Text>
              <Pressable onPress={() => setShowCart(false)}>
                <Text style={{ 
                  color: '#64748b',
                  fontFamily: 'Poppins_600SemiBold'
                }} className="text-sm">Close</Text>
              </Pressable>
            </View>

            {/* Cart Items */}
            <ScrollView className="flex-1 mb-6" showsVerticalScrollIndicator={false}>
              {products.filter(p => quantities[p.id] > 0).map(product => (
                <View key={product.id} className="flex-row items-center bg-slate-50 p-4 rounded-2xl mb-3">
                  <View className="w-16 h-16 rounded-2xl overflow-hidden mr-4">
                    <Image 
                      source={{ uri: product.image }}
                      style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                    />
                  </View>
                  <View className="flex-1">
                    <Text style={{ 
                      color: primaryNavy,
                      fontFamily: 'Poppins_700Bold'
                    }} className="text-base mb-1">{product.name}</Text>
                    <Text style={{ 
                      color: accentBlue,
                      fontFamily: 'Poppins_800ExtraBold'
                    }} className="text-lg">${product.price}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Pressable 
                      onPress={() => updateQuantity(product.id, -1)} 
                      className="w-10 h-10 items-center justify-center bg-white rounded-full border border-slate-200"
                    >
                      <Minus size={16} color={primaryNavy} />
                    </Pressable>
                    <Text style={{ 
                      color: primaryNavy,
                      fontFamily: 'Poppins_700Bold'
                    }} className="mx-4 text-base">{quantities[product.id]}</Text>
                    <Pressable 
                      onPress={() => updateQuantity(product.id, 1)} 
                      className="w-10 h-10 items-center justify-center bg-white rounded-full border border-slate-200"
                    >
                      <Plus size={16} color={primaryNavy} />
                    </Pressable>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Cart Summary */}
            <View className="bg-slate-50 p-4 rounded-2xl mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text style={{ 
                  color: '#64748b',
                  fontFamily: 'Poppins_600SemiBold'
                }} className="text-base">Items ({selectedCount})</Text>
                <Text style={{ 
                  color: primaryNavy,
                  fontFamily: 'Poppins_700Bold'
                }} className="text-base">${totalAmount.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between items-center mb-2">
                <Text style={{ 
                  color: '#64748b',
                  fontFamily: 'Poppins_600SemiBold'
                }} className="text-base">Tax</Text>
                <Text style={{ 
                  color: primaryNavy,
                  fontFamily: 'Poppins_700Bold'
                }} className="text-base">${(totalAmount * 0.1).toFixed(2)}</Text>
              </View>
              <View className="h-px bg-slate-300 my-2" />
              <View className="flex-row justify-between items-center">
                <Text style={{ 
                  color: primaryNavy,
                  fontFamily: 'Poppins_800ExtraBold'
                }} className="text-xl">Total</Text>
                <Text style={{ 
                  color: primaryNavy,
                  fontFamily: 'Poppins_800ExtraBold'
                }} className="text-xl">${(totalAmount * 1.1).toFixed(2)}</Text>
              </View>
            </View>

            {/* Checkout Button */}
            <Pressable 
              onPress={handleCheckout}
              style={{ backgroundColor: primaryNavy }}
              className="h-16 flex-row items-center justify-center rounded-2xl shadow-lg"
            >
              <ShoppingCart size={22} color="white" className="mr-3" />
              <Text style={{ 
                color: 'white',
                fontFamily: 'Poppins_700Bold'
              }} className="text-lg">Proceed to Checkout</Text>
            </Pressable>
          </View>
        </View>
      )}

      <SalespersonBottomNav primaryNavy={primaryNavy} />
    </SafeAreaView>
  );
}
