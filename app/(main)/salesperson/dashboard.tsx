import { View, Text, ScrollView, SafeAreaView, Pressable, TextInput, Platform } from 'react-native';
import { ShoppingBag, Zap, History, LayoutGrid, Bell, Search, MoreVertical, Layers, PieChart, BarChart3, Target } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SalespersonBottomNav } from '../../../components/SalespersonBottomNav';

export default function SalespersonDashboard() {
  const router = useRouter();
  const primaryNavy = "#002B5B";
  const accentBlue = "#3b82f6";
  const lightBlue = "#f1f5f9";

  const metrics = [
    { 
      date: 'March 11, 2026', 
      title: 'Total Revenue', 
      category: 'Target: $5,000', 
      progress: 0.75, 
      icon: PieChart, 
      dark: true 
    },
    { 
      date: 'March 11, 2026', 
      title: 'Sales Count', 
      category: 'Target: 50', 
      progress: 0.45, 
      icon: BarChart3, 
      dark: false 
    },
    { 
      date: 'March 11, 2026', 
      title: 'Top Product', 
      category: 'Nexa Pro Card', 
      progress: 0.90, 
      icon: Target, 
      dark: false 
    },
    { 
      date: 'March 11, 2026', 
      title: 'Avg. Rating', 
      category: 'Goal: 4.8', 
      progress: 0.60, 
      icon: Layers, 
      dark: false 
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50/50">
      {/* Custom Header */}
      <View style={{ paddingTop: Platform.OS === 'android' ? 40 : 10 }} className="px-6 pb-4 flex-row justify-between items-center bg-white">
        <Pressable className="w-10 h-10 items-center justify-center">
          <LayoutGrid size={24} color={primaryNavy} />
        </Pressable>
        <Text style={{ color: primaryNavy }} className="text-lg font-bold">Home</Text>
        <Pressable className="w-10 h-10 items-center justify-center">
          <View className="relative">
            <Bell size={24} color={primaryNavy} />
            <View className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </View>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View className="mt-8 mb-6">
          <Text style={{ color: primaryNavy }} className="text-3xl font-bold">Hi Sarah!</Text>
          <Text className="text-slate-400 text-lg">Good Morning</Text>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white border border-slate-100 px-6 py-4 rounded-full mb-8 shadow-sm shadow-slate-200/50">
          <Search size={20} color="#94a3b8" />
          <TextInput 
            placeholder="Search products or sales..." 
            className="ml-3 flex-1 text-slate-600 text-base"
            placeholderTextColor="#94a3b8"
          />
        </View>

        {/* Welcome Banner */}
        <View style={{ borderColor: primaryNavy + '20' }} className="border rounded-3xl p-6 mb-8 flex-row items-center justify-between overflow-hidden">
          <View className="flex-1 pr-4">
            <Text style={{ color: primaryNavy }} className="text-xl font-bold mb-1">Welcome!</Text>
            <Text className="text-slate-500 text-sm leading-5">Track your daily sales and performance metrics here.</Text>
          </View>
          <View className="bg-slate-50 w-28 h-20 rounded-xl items-center justify-center">
             <Target size={40} color={primaryNavy} opacity={0.2} />
          </View>
        </View>

        {/* Section Title */}
        <View className="flex-row justify-between items-center mb-6">
          <Text style={{ color: primaryNavy }} className="text-xl font-bold">Today's Performance</Text>
          <Pressable>
            <Text className="text-slate-400 font-medium">view all</Text>
          </Pressable>
        </View>

        {/* Metrics Grid */}
        <View className="flex-row flex-wrap justify-between">
          {metrics.map((item, index) => (
            <View key={index} className="w-[48%] mb-4">
              <View 
                style={{ backgroundColor: item.dark ? primaryNavy : '#f8fafc' }} 
                className={`p-4 h-44 rounded-3xl justify-between ${!item.dark && 'border border-slate-100'}`}
              >
                <View className="flex-row justify-between items-start">
                  <Text className={`text-[10px] font-medium ${item.dark ? 'text-blue-200' : 'text-slate-400'}`}>{item.date}</Text>
                  <Pressable>
                    <MoreVertical size={16} color={item.dark ? 'white' : '#94a3b8'} />
                  </Pressable>
                </View>

                <View>
                  <View 
                    style={{ backgroundColor: item.dark ? 'rgba(255,255,255,0.1)' : '#EFF6FF' }} 
                    className="w-10 h-10 rounded-xl items-center justify-center mb-3"
                  >
                    <item.icon size={20} color={item.dark ? 'white' : accentBlue} />
                  </View>
                  <Text className={`text-sm font-bold ${item.dark ? 'text-white' : 'text-slate-800'}`}>{item.title}</Text>
                  <Text className={`text-[10px] ${item.dark ? 'text-blue-100/60' : 'text-slate-400'}`}>{item.category}</Text>
                </View>

                <View>
                  <Text className={`text-[10px] font-medium mb-1 ${item.dark ? 'text-blue-100/60' : 'text-slate-400'}`}>Progress</Text>
                  <View className="flex-row items-center">
                    <View className={`h-1 flex-1 rounded-full ${item.dark ? 'bg-blue-900/40' : 'bg-slate-200'} mr-2 overflow-hidden`}>
                      <View 
                        style={{ width: `${item.progress * 100}%`, backgroundColor: item.dark ? 'white' : accentBlue }} 
                        className="h-full rounded-full" 
                      />
                    </View>
                    <Text className={`text-[10px] font-bold ${item.dark ? 'text-white' : 'text-slate-800'}`}>{Math.round(item.progress * 100)}%</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
        
        <View className="h-40" />
      </ScrollView>

      <SalespersonBottomNav primaryNavy={primaryNavy} />
    </SafeAreaView>
  );
}
