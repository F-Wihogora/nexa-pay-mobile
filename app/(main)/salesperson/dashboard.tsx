import { View, Text, ScrollView, SafeAreaView, Pressable, TextInput, Platform, Image } from 'react-native';
import { ShoppingBag, Zap, History, LayoutGrid, Bell, Search, MoreVertical, Layers, PieChart, BarChart3, Target, MapPin, Filter, Clock, Shirt, Package, Gem, Briefcase, ChevronDown } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SalespersonBottomNav } from '../../../components/SalespersonBottomNav';

export default function SalespersonDashboard() {
  const router = useRouter();
  const primaryNavy = "#002B5B";
  const accentBlue = "#3b82f6";
  const [selectedFilter, setSelectedFilter] = useState('Newest');
  const [selectedLocation, setSelectedLocation] = useState('New York, USA');

  const locations = ['New York, USA', 'Los Angeles, USA', 'Chicago, USA', 'Miami, USA'];

  const categories = [
    { name: 'T-Shirt', icon: Shirt, color: primaryNavy },
    { name: 'Pants', icon: Package, color: primaryNavy },
    { name: 'Dress', icon: Gem, color: primaryNavy },
    { name: 'Jacket', icon: Briefcase, color: primaryNavy },
  ];

  const filters = ['All', 'Newest', 'Popular', 'Men', 'Women'];

  const flashSaleProducts = [
    {
      id: 1,
      name: 'Summer Collection Dress',
      price: '$89.99',
      originalPrice: '$149.99',
      discount: '40%',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=face',
      category: 'Women'
    },
    {
      id: 2,
      name: 'Casual Men\'s Shirt',
      price: '$45.99',
      originalPrice: '$79.99',
      discount: '42%',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      category: 'Men'
    },
  ];

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  const handleCategoryPress = (categoryName: string) => {
    router.push({
      pathname: '/(main)/salesperson/products',
      params: { category: categoryName }
    });
  };

  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
    // Filter products based on selection
  };

  const handleProductPress = (productId: number) => {
    router.push({
      pathname: '/(main)/salesperson/products',
      params: { productId: productId.toString() }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with Location */}
      <View style={{ paddingTop: Platform.OS === 'android' ? 40 : 10 }} className="px-6 pb-4 bg-white">
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <Text style={{ 
              color: '#64748b',
              fontFamily: 'Poppins_500Medium'
            }} className="text-sm mr-2">Location</Text>
          </View>
          <View className="relative">
            <View 
              style={{ backgroundColor: primaryNavy, width: 40, height: 40, borderRadius: 20 }} 
              className="items-center justify-center"
            >
              <Text style={{ 
                color: 'white',
                fontFamily: 'Poppins_900Black'
              }} className="text-sm">SN</Text>
            </View>
          </View>
        </View>
        
        <View className="flex-row items-center mb-4">
          <Pressable 
            onPress={() => {
              // Show location picker
            }}
            className="flex-row items-center"
          >
            <MapPin size={18} color={accentBlue} />
            <Text style={{ 
              color: primaryNavy,
              fontFamily: 'Poppins_700Bold'
            }} className="text-lg ml-2">{selectedLocation}</Text>
            <ChevronDown size={18} color={primaryNavy} className="ml-1" />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center">
          <View className="flex-1 flex-row items-center bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl mr-3">
            <Search size={20} color="#94a3b8" />
            <TextInput 
              placeholder="Search" 
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
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Promotional Banner */}
        <View className="px-6 mb-8">
          <Pressable 
            style={{ backgroundColor: '#EBF4FF' }}
            className="rounded-3xl p-8 flex-row items-center justify-between overflow-hidden relative shadow-sm border border-blue-100"
          >
            <View className="flex-1 pr-4">
              <Text style={{ 
                color: primaryNavy,
                fontFamily: 'Poppins_800ExtraBold'
              }} className="text-2xl mb-2">New Collection</Text>
              <Text style={{ 
                color: '#64748b',
                fontFamily: 'Poppins_500Medium'
              }} className="text-sm mb-4 leading-5">Discount 50% for{'\n'}the first transaction</Text>
              <Pressable 
                style={{ backgroundColor: primaryNavy }}
                className="px-8 py-4 rounded-2xl self-start shadow-lg"
              >
                <Text style={{ 
                  color: 'white',
                  fontFamily: 'Poppins_600SemiBold'
                }} className="text-sm">Shop Now</Text>
              </Pressable>
            </View>
            <View className="w-36 h-36 rounded-2xl overflow-hidden shadow-lg">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=300&fit=crop' }}
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              />
            </View>
          </Pressable>
        </View>

        {/* Categories */}
        <View className="px-6 mb-8">
          <View className="flex-row justify-between items-center mb-6">
            <Text style={{ 
              color: primaryNavy,
              fontFamily: 'Poppins_800ExtraBold'
            }} className="text-xl">Category</Text>
            <Pressable onPress={() => router.push('/(main)/salesperson/products')}>
              <Text style={{ 
                color: accentBlue,
                fontFamily: 'Poppins_600SemiBold'
              }} className="text-sm">See All</Text>
            </Pressable>
          </View>
          
          <View className="flex-row justify-between">
            {categories.map((category, index) => (
              <Pressable 
                key={index}
                onPress={() => handleCategoryPress(category.name)}
                className="items-center"
              >
                <View 
                  style={{ backgroundColor: `${accentBlue}15` }}
                  className="w-20 h-20 rounded-3xl items-center justify-center mb-3 shadow-sm border border-blue-100"
                >
                  <category.icon size={32} color={category.color} />
                </View>
                <Text style={{ 
                  color: '#64748b',
                  fontFamily: 'Poppins_600SemiBold'
                }} className="text-sm">{category.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Flash Sale */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text style={{ 
              color: primaryNavy,
              fontFamily: 'Poppins_800ExtraBold'
            }} className="text-xl">Flash Sale</Text>
            <View className="flex-row items-center">
              <Text style={{ 
                color: '#64748b',
                fontFamily: 'Poppins_500Medium'
              }} className="text-sm mr-2">Closing in :</Text>
              <View className="flex-row items-center">
                <View style={{ backgroundColor: primaryNavy }} className="px-3 py-2 rounded-lg">
                  <Text style={{ 
                    color: 'white',
                    fontFamily: 'Poppins_700Bold'
                  }} className="text-sm">02</Text>
                </View>
                <Text className="mx-2 text-sm font-bold">:</Text>
                <View style={{ backgroundColor: primaryNavy }} className="px-3 py-2 rounded-lg">
                  <Text style={{ 
                    color: 'white',
                    fontFamily: 'Poppins_700Bold'
                  }} className="text-sm">12</Text>
                </View>
                <Text className="mx-2 text-sm font-bold">:</Text>
                <View style={{ backgroundColor: primaryNavy }} className="px-3 py-2 rounded-lg">
                  <Text style={{ 
                    color: 'white',
                    fontFamily: 'Poppins_700Bold'
                  }} className="text-sm">56</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Filter Tabs */}
          <View className="flex-row mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filters.map((filter, index) => (
                <Pressable 
                  key={index}
                  onPress={() => handleFilterPress(filter)}
                  style={{ 
                    backgroundColor: selectedFilter === filter ? primaryNavy : 'transparent',
                    marginRight: 16
                  }}
                  className="px-6 py-3 rounded-2xl border border-slate-200 shadow-sm"
                >
                  <Text style={{ 
                    color: selectedFilter === filter ? 'white' : '#64748b',
                    fontFamily: 'Poppins_600SemiBold'
                  }} className="text-base">{filter}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Flash Sale Products */}
          <View className="flex-row justify-between">
            {flashSaleProducts.map((product) => (
              <Pressable 
                key={product.id}
                onPress={() => handleProductPress(product.id)}
                className="w-[48%] bg-white rounded-3xl p-5 border border-slate-100 shadow-sm"
              >
                <View className="w-full h-48 rounded-2xl overflow-hidden mb-4 relative">
                  <Image 
                    source={{ uri: product.image }}
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                  />
                  <View className="absolute top-3 right-3 bg-red-500 px-3 py-1 rounded-full">
                    <Text style={{ 
                      color: 'white',
                      fontFamily: 'Poppins_700Bold'
                    }} className="text-xs">-{product.discount}</Text>
                  </View>
                </View>
                <Text style={{ 
                  color: primaryNavy,
                  fontFamily: 'Poppins_700Bold'
                }} className="text-base mb-2" numberOfLines={2}>{product.name}</Text>
                <View className="flex-row items-center">
                  <Text style={{ 
                    color: accentBlue,
                    fontFamily: 'Poppins_800ExtraBold'
                  }} className="text-xl mr-2">{product.price}</Text>
                  <Text style={{ 
                    color: '#94a3b8',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-sm line-through">{product.originalPrice}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        
        <View className="h-40" />
      </ScrollView>

      <SalespersonBottomNav primaryNavy={primaryNavy} />
    </SafeAreaView>
  );
}
