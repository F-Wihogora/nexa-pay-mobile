import { View, Text, ScrollView, Pressable, SafeAreaView, TextInput } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Plus, Minus, Search, ShoppingCart, ArrowRight } from 'lucide-react-native';
import { AgentTopbar } from '../../../components/AgentTopbar';
import { SalespersonBottomNav } from '../../../components/SalespersonBottomNav';

export default function SalespersonProducts() {
  const router = useRouter();
  const primaryNavy = "#002B5B";
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const products = [
    { id: '1', name: 'NexPass Monthly', price: 45.00, desc: 'Unlimited digital transit pass' },
    { id: '2', name: 'Nexa Wallet Credit', price: 10.00, desc: 'Reloadable store credit' },
    { id: '3', name: 'Pro Service Fee', price: 5.99, desc: 'One-time registration fee' },
    { id: '4', name: 'Backup Card', price: 12.50, desc: 'RFID duplicate backup' },
    { id: '5', name: 'Premium Tag', price: 8.00, desc: 'Wearable RFID tag accessory' },
  ];

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  const totalAmount = products.reduce((acc, p) => acc + (p.price * (quantities[p.id] || 0)), 0);
  const selectedCount = Object.values(quantities).reduce((acc, q) => acc + q, 0);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AgentTopbar name="Sarah Sales" role="Nexa Sales Pro" primaryNavy={primaryNavy} />
      
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="mt-4 mb-8">
           <Text style={{ color: primaryNavy }} className="text-3xl font-black tracking-tighter mb-2">Select Items</Text>
           <Text className="text-slate-400 font-bold text-xs uppercase tracking-widest leading-4">Browse and select products for the current sale.</Text>
        </View>

        <View className="bg-slate-50 border border-slate-100 rounded-2xl flex-row items-center px-4 h-12 mb-6">
           <Search size={18} color={primaryNavy} opacity={0.4} />
           <TextInput placeholder="Search products..." className="flex-1 ml-3 font-bold" />
        </View>

        <View className="space-y-4">
           {products.map(p => (
             <View key={p.id} className={`bg-white border rounded-3xl p-5 shadow-sm shadow-blue-900/5 ${quantities[p.id] > 0 ? 'border-primaryNavy' : 'border-slate-100'}`}>
                <View className="flex-row justify-between items-start mb-4">
                   <View className="flex-1 mr-4">
                      <Text style={{ color: primaryNavy }} className="font-black text-lg">{p.name}</Text>
                      <Text className="text-slate-400 text-xs mt-1 font-medium">{p.desc}</Text>
                   </View>
                   <Text style={{ color: primaryNavy }} className="text-xl font-black">${p.price.toFixed(2)}</Text>
                </View>

                <View className="flex-row justify-between items-center bg-slate-50 p-3 rounded-2xl">
                   <Text className="text-slate-400 text-[10px] font-black uppercase tracking-widest pl-2">Quantity</Text>
                   <View className="flex-row items-center bg-white border border-slate-100 rounded-xl px-2 py-1">
                      <Pressable onPress={() => updateQuantity(p.id, -1)} className="w-8 h-8 items-center justify-center bg-slate-50 rounded-lg">
                        <Minus size={16} color={primaryNavy} />
                      </Pressable>
                      <Text style={{ color: primaryNavy }} className="mx-4 font-black text-base">{quantities[p.id] || 0}</Text>
                      <Pressable onPress={() => updateQuantity(p.id, 1)} className="w-8 h-8 items-center justify-center bg-slate-50 rounded-lg">
                        <Plus size={16} color={primaryNavy} />
                      </Pressable>
                   </View>
                </View>
             </View>
           ))}
        </View>
        <View className="h-60" />
      </ScrollView>

      {/* Floating Checkout Bar */}
      {selectedCount > 0 && (
         <View className="absolute bottom-32 left-6 right-6">
            <Pressable 
              onPress={() => router.replace('/salesperson/pay')}
              style={{ backgroundColor: primaryNavy, borderRadius: 24 }}
              className="h-20 flex-row items-center px-8 shadow-2xl shadow-blue-900/30"
            >
               <View className="bg-white/20 p-3 rounded-2xl mr-4">
                  <ShoppingCart size={24} color="white" />
               </View>
               <View className="flex-1">
                  <Text className="text-white/60 text-[10px] font-black uppercase tracking-widest">Total Amount</Text>
                  <Text className="text-white text-2xl font-black leading-none">${totalAmount.toFixed(2)}</Text>
               </View>
               <View className="bg-white p-3 rounded-full">
                  <ArrowRight size={20} color={primaryNavy} />
               </View>
            </Pressable>
         </View>
      )}

      <SalespersonBottomNav primaryNavy={primaryNavy} />
    </SafeAreaView>
  );
}
