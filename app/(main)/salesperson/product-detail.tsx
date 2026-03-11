import { View, Text, ScrollView, SafeAreaView, Pressable, Image } from 'react-native';
import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MoreHorizontal, Heart, Plus, Minus } from 'lucide-react-native';
import { SalespersonBottomNav } from '../../../components/SalespersonBottomNav';

export default function ProductDetail() {
  const router = useRouter();
  const { productId } = useLocalSearchParams();
  const primaryNavy = "#002B5B";
  const accentBlue = "#3b82f6";
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  // Get product data based on productId from dashboard
  const getProductData = (id: string) => {
    const products = {
      '1': {
        name: 'Summer Collection Dress',
        price: 89.99,
        originalPrice: 149.99,
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=face',
        category: 'Women\'s Dress',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
      },
      '2': {
        name: 'Casual Men\'s Shirt',
        price: 45.99,
        originalPrice: 79.99,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        category: 'Men\'s Shirt',
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      }
    };
    return products[id as keyof typeof products] || products['1'];
  };

  const product = getProductData(productId as string);

  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop'
  ];

  const updateQuantity = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    router.push('/(main)/salesperson/pay');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-4 pb-2">
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <ArrowLeft size={24} color={primaryNavy} />
        </Pressable>
        <Text style={{ 
          color: primaryNavy,
          fontFamily: 'Poppins_700Bold'
        }} className="text-lg">Details Products</Text>
        <Pressable className="w-10 h-10 items-center justify-center">
          <MoreHorizontal size={24} color={primaryNavy} />
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Main Product Image */}
        <View className="px-6 mb-6">
          <View className="bg-slate-50 rounded-3xl p-8 items-center justify-center" style={{ height: 320 }}>
            <Image 
              source={{ uri: product.image }}
              style={{ width: 280, height: 240, resizeMode: 'contain' }}
            />
          </View>
        </View>

        {/* Product Image Thumbnails */}
        <View className="px-6 mb-8">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {productImages.map((image, index) => (
              <Pressable 
                key={index}
                className={`w-16 h-16 rounded-2xl overflow-hidden mr-3 ${index === 0 ? 'border-2 border-yellow-400' : 'border border-slate-200'}`}
              >
                <Image 
                  source={{ uri: image }}
                  style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Product Info */}
        <View className="px-6 mb-8">
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-1">
              <Text style={{ 
                color: primaryNavy,
                fontFamily: 'Poppins_800ExtraBold'
              }} className="text-2xl mb-1">{product.name}</Text>
              <Text style={{ 
                color: '#64748b',
                fontFamily: 'Poppins_500Medium'
              }} className="text-base">{product.category}</Text>
            </View>
            <Pressable className="w-10 h-10 items-center justify-center">
              <Heart size={24} color="#ef4444" />
            </Pressable>
          </View>

          {/* Price */}
          <View className="flex-row items-center mb-6">
            <Text style={{ 
              color: primaryNavy,
              fontFamily: 'Poppins_800ExtraBold'
            }} className="text-3xl mr-3">${product.price}</Text>
            <Text style={{ 
              color: '#94a3b8',
              fontFamily: 'Poppins_600SemiBold'
            }} className="text-lg line-through">${product.originalPrice}</Text>
          </View>

          {/* Size Selection */}
          <View className="mb-8">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {product.sizes.map((size, index) => (
                <Pressable 
                  key={index}
                  onPress={() => setSelectedSize(size)}
                  style={{ 
                    backgroundColor: selectedSize === size ? primaryNavy : 'transparent',
                    marginRight: 12
                  }}
                  className="w-12 h-12 rounded-full border border-slate-300 items-center justify-center"
                >
                  <Text style={{ 
                    color: selectedSize === size ? 'white' : '#64748b',
                    fontFamily: 'Poppins_600SemiBold'
                  }} className="text-base">{size}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Description */}
          <View className="mb-8">
            <Text style={{ 
              color: '#64748b',
              fontFamily: 'Poppins_500Medium'
            }} className="text-base leading-6 mb-2">
              Perfect for the office or casual outings. This Nike Blazer Mid '77 features premium materials and classic styling that never goes out of fashion.
            </Text>
            <Pressable>
              <Text style={{ 
                color: accentBlue,
                fontFamily: 'Poppins_600SemiBold'
              }} className="text-base">Read more</Text>
            </Pressable>
          </View>

          {/* Reviews */}
          <View className="flex-row items-center mb-8">
            <View className="flex-row mr-4">
              {[1,2,3,4,5].map((star) => (
                <View key={star} className="w-8 h-8 rounded-full bg-slate-200 mr-2" />
              ))}
            </View>
            <Text style={{ 
              color: '#64748b',
              fontFamily: 'Poppins_500Medium'
            }} className="text-sm">+5,000+ people favorite this</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="px-6 py-4 bg-white border-t border-slate-100" style={{ paddingBottom: 120 }}>
        <View className="flex-row items-center justify-between mb-4">
          {/* Quantity Selector */}
          <View className="flex-row items-center">
            <Pressable 
              onPress={() => updateQuantity(-1)}
              className="w-14 h-14 rounded-full border border-slate-300 items-center justify-center mr-4"
            >
              <Minus size={22} color={primaryNavy} />
            </Pressable>
            <View className="w-16 h-16 rounded-full bg-slate-900 items-center justify-center">
              <Text style={{ 
                color: 'white',
                fontFamily: 'Poppins_700Bold'
              }} className="text-2xl">{quantity}</Text>
            </View>
            <Pressable 
              onPress={() => updateQuantity(1)}
              className="w-14 h-14 rounded-full border border-slate-300 items-center justify-center ml-4"
            >
              <Plus size={22} color={primaryNavy} />
            </Pressable>
          </View>

          {/* Add to Cart Button */}
          <Pressable 
            onPress={handleAddToCart}
            style={{ backgroundColor: accentBlue }}
            className="flex-1 ml-6 h-18 items-center justify-center rounded-2xl shadow-lg"
          >
            <Text style={{ 
              color: 'white',
              fontFamily: 'Poppins_700Bold'
            }} className="text-xl">Add to cart</Text>
          </Pressable>
        </View>
      </View>

      <SalespersonBottomNav primaryNavy={primaryNavy} />
    </SafeAreaView>
  );
}