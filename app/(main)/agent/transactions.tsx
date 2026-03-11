import { View, Text, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { History, Filter, CheckCircle, XCircle } from 'lucide-react-native';
import { AgentTopbar } from '../../../components/AgentTopbar';
import { AgentBottomNav } from '../../../components/AgentBottomNav';

export default function AgentTransactionsScreen() {
  const primaryNavy = "#002B5B";

  const transactions = [
    { id: '1', name: 'Alex Nexa', uid: '70:77:88:99', amt: '+$50.00', date: 'Oct 24, 09:41 AM', status: 'SUCCESS' },
    { id: '2', name: 'John Peterson', uid: 'EEFF-1122', amt: '+$100.00', date: 'Oct 23, 08:20 AM', status: 'SUCCESS' },
    { id: '3', name: 'Sarah Miller', uid: '4455-6677', amt: '+$20.00', date: 'Oct 23, 02:15 PM', status: 'FAILED' },
    { id: '4', name: 'David Wilson', uid: '9900-3321', amt: '+$150.00', date: 'Oct 22, 11:30 AM', status: 'SUCCESS' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AgentTopbar name="Alex Nexa" role="Nexa Pro Agent" primaryNavy={primaryNavy} />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 mt-6">
          <View className="flex-row justify-between items-end mb-8">
             <View>
                <Text style={{ color: primaryNavy }} className="text-3xl font-black tracking-tighter">Transaction History</Text>
                <Text className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2">Activity Stream</Text>
             </View>
             <Pressable className="bg-slate-50 w-10 h-10 rounded-xl items-center justify-center border border-slate-100 shadow-sm">
                <Filter size={18} color={primaryNavy} />
             </Pressable>
          </View>

          {transactions.map((item) => (
            <View key={item.id} className="bg-white border border-slate-100 p-4 rounded-3xl mb-3 shadow-sm shadow-blue-900/5">
              <View className="flex-row justify-between items-center">
                 <View className="flex-row items-center flex-1">
                    <View className={`w-10 h-10 rounded-2xl items-center justify-center mr-4 ${item.status === 'SUCCESS' ? 'bg-green-50' : 'bg-red-50'}`}>
                       {item.status === 'SUCCESS' ? <CheckCircle size={20} color="#10b981" /> : <XCircle size={20} color="#ef4444" />}
                    </View>
                    <View>
                       <Text style={{ color: primaryNavy }} className="font-black text-base leading-tight">{item.name}</Text>
                       <Text className="text-slate-400 text-[10px] font-mono mt-0.5">{item.uid} • {item.date}</Text>
                    </View>
                 </View>
                 <View className="items-end">
                    <Text style={{ color: item.status === 'SUCCESS' ? '#10b981' : primaryNavy }} className="text-lg font-black">{item.amt}</Text>
                    <Text style={{ color: item.status === 'SUCCESS' ? '#10b981' : '#ef4444' }} className="text-[8px] font-black uppercase tracking-widest mt-0.5">{item.status}</Text>
                 </View>
              </View>
            </View>
          ))}
        </View>
        <View className="h-40" />
      </ScrollView>

      <AgentBottomNav primaryNavy={primaryNavy} />
    </SafeAreaView>
  );
}
