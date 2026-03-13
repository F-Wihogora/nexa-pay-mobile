import { View, Text, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { History, Filter, ShoppingBag, CheckCircle2 } from 'lucide-react-native';
import { AgentTopbar } from '../../../components/AgentTopbar';
import { SalespersonBottomNav } from '../../../components/SalespersonBottomNav';

export default function SalespersonHistory() {
  const primaryNavy = "#002B5B";

  const transactions = [
    { id: '1', item: 'NexPass Monthly', uid: '70:77:88:99', amt: '$45.00', date: 'Today, 10:24 AM', status: 'PAID' },
    { id: '2', item: 'Backup Card', uid: 'EEFF-1122', amt: '$12.50', date: 'Today, 09:15 AM', status: 'PAID' },
    { id: '3', item: 'Service Fee', uid: '4455-6677', amt: '$5.99', date: 'Yesterday', status: 'PAID' },
    { id: '4', item: 'Premium Tag', uid: '9900-3321', amt: '$8.00', date: 'Yesterday', status: 'PAID' },
    { id: '5', item: 'Wallet Credit', uid: '1122-3344', amt: '$25.00', date: '2 days ago', status: 'PAID' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AgentTopbar name="Sarah Sales" role="Nexa Salesman" primaryNavy={primaryNavy} />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 mt-6">
          <View className="flex-row justify-between items-end mb-8">
             <View>
                <Text style={{ color: primaryNavy }} className="text-3xl font-black tracking-tighter">Sales History</Text>
                <Text className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2">Personal Transaction Ledger</Text>
             </View>
             <Pressable className="bg-slate-50 w-10 h-10 rounded-xl items-center justify-center border border-slate-100 shadow-sm">
                <Filter size={18} color={primaryNavy} />
             </Pressable>
          </View>

          {transactions.map((item) => (
            <View key={item.id} className="bg-white border border-slate-100 p-5 rounded-3xl mb-4 shadow-sm shadow-blue-900/5">
              <View className="flex-row items-center justify-between mb-4">
                 <View className="flex-row items-center">
                    <View className="bg-green-50 px-2 py-1 rounded-lg flex-row items-center">
                       <CheckCircle2 size={12} color="#10b981" />
                       <Text className="text-[#10b981] text-[8px] font-black uppercase tracking-widest ml-1">{item.status}</Text>
                    </View>
                 </View>
                 <Text className="text-slate-400 text-[10px] font-bold">{item.date}</Text>
              </View>
              
              <View className="flex-row justify-between items-center">
                 <View className="flex-row items-center flex-1">
                    <View style={{ backgroundColor: primaryNavy }} className="w-12 h-12 rounded-2xl items-center justify-center mr-4">
                       <ShoppingBag size={20} color="white" />
                    </View>
                    <View>
                       <Text style={{ color: primaryNavy }} className="font-black text-base">{item.item}</Text>
                       <Text className="text-slate-400 text-[10px] font-mono mt-0.5">{item.uid}</Text>
                    </View>
                 </View>
                 <Text style={{ color: primaryNavy }} className="text-xl font-black">{item.amt}</Text>
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
