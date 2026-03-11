import { View, Text, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { History, Filter, CheckCircle, XCircle, TrendingUp, Calendar, Clock, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react-native';
import { AgentTopbar } from '../../../components/AgentTopbar';
import { AgentBottomNav } from '../../../components/AgentBottomNav';

export default function AgentTransactionsScreen() {
  const primaryNavy = "#002B5B";

  const transactions = [
    { id: '1', name: 'Alex Nexa', uid: '70:77:88:99', amt: '+$50.00', date: 'Oct 24, 09:41 AM', status: 'SUCCESS', type: 'topup', time: '09:41 AM' },
    { id: '2', name: 'John Peterson', uid: 'EEFF-1122', amt: '+$100.00', date: 'Oct 23, 08:20 AM', status: 'SUCCESS', type: 'topup', time: '08:20 AM' },
    { id: '3', name: 'Sarah Miller', uid: '4455-6677', amt: '+$20.00', date: 'Oct 23, 02:15 PM', status: 'FAILED', type: 'payment', time: '02:15 PM' },
    { id: '4', name: 'David Wilson', uid: '9900-3321', amt: '+$150.00', date: 'Oct 22, 11:30 AM', status: 'SUCCESS', type: 'topup', time: '11:30 AM' },
  ];

  const todayTotal = transactions
    .filter(t => t.date.includes('Oct 24'))
    .reduce((sum, t) => sum + parseFloat(t.amt.replace(/[+$]/g, '')), 0);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <AgentTopbar name="Alex Nexa" role="Nexa Pro Agent" primaryNavy={primaryNavy} />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 mt-6">
          {/* Enhanced Header */}
          <View className="flex-row justify-between items-center mb-8">
             <View className="flex-1">
                <Text style={{ 
                  color: primaryNavy,
                  fontFamily: 'Poppins_900Black'
                }} className="text-3xl tracking-tighter">Transaction History</Text>
                <Text style={{ 
                  color: '#64748b',
                  fontFamily: 'Poppins_500Medium'
                }} className="text-base mt-1">Track all your payment activities</Text>
             </View>
             <View className="flex-row space-x-3">
               <Pressable className="bg-white w-12 h-12 rounded-xl items-center justify-center border border-slate-200 shadow-sm">
                  <Search size={20} color={primaryNavy} />
               </Pressable>
               <Pressable className="bg-white w-12 h-12 rounded-xl items-center justify-center border border-slate-200 shadow-sm">
                  <Filter size={20} color={primaryNavy} />
               </Pressable>
             </View>
          </View>

          {/* Stats Summary Card */}
          <View className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 mb-8 relative overflow-hidden" style={{ backgroundColor: primaryNavy }}>
            <View style={{ 
              position: 'absolute', 
              top: -30, 
              right: -30, 
              width: 120, 
              height: 120, 
              borderRadius: 60, 
              backgroundColor: 'rgba(255,255,255,0.1)' 
            }} />
            <View style={{ 
              position: 'absolute', 
              bottom: -20, 
              left: -20, 
              width: 80, 
              height: 80, 
              borderRadius: 40, 
              backgroundColor: 'rgba(255,255,255,0.05)' 
            }} />
            
            <View className="flex-row justify-between items-start">
              <View>
                <Text style={{ 
                  color: 'rgba(255,255,255,0.8)',
                  fontFamily: 'Poppins_600SemiBold'
                }} className="text-sm uppercase tracking-wider">Today's Total</Text>
                <Text style={{ 
                  color: 'white',
                  fontFamily: 'Poppins_900Black'
                }} className="text-3xl mt-2">${todayTotal.toFixed(2)}</Text>
                <View className="flex-row items-center mt-2">
                  <TrendingUp size={16} color="#10b981" />
                  <Text style={{ 
                    color: '#10b981',
                    fontFamily: 'Poppins_600SemiBold'
                  }} className="text-sm ml-1">+12.5%</Text>
                </View>
              </View>
              <View className="bg-white/20 p-3 rounded-xl">
                <History size={24} color="white" />
              </View>
            </View>
          </View>

          {/* Filter Tabs */}
          <View className="flex-row mb-6">
            <Pressable className="bg-white px-4 py-2 rounded-xl mr-3 border border-slate-200">
              <Text style={{ 
                color: primaryNavy,
                fontFamily: 'Poppins_600SemiBold'
              }} className="text-sm">All</Text>
            </Pressable>
            <Pressable className="bg-slate-100 px-4 py-2 rounded-xl mr-3">
              <Text style={{ 
                color: '#64748b',
                fontFamily: 'Poppins_600SemiBold'
              }} className="text-sm">Success</Text>
            </Pressable>
            <Pressable className="bg-slate-100 px-4 py-2 rounded-xl">
              <Text style={{ 
                color: '#64748b',
                fontFamily: 'Poppins_600SemiBold'
              }} className="text-sm">Failed</Text>
            </Pressable>
          </View>

          {/* Enhanced Transaction Cards */}
          {transactions.map((item, index) => (
            <View key={item.id} className="bg-white border border-slate-100 p-6 rounded-2xl mb-4 shadow-sm shadow-blue-900/5 relative overflow-hidden">
              {/* Decorative element */}
              <View style={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                width: 60, 
                height: 60, 
                borderRadius: 30, 
                backgroundColor: item.status === 'SUCCESS' ? '#10b981' : '#ef4444', 
                opacity: 0.05 
              }} />
              
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center flex-1">
                  <View className={`w-14 h-14 rounded-2xl items-center justify-center mr-4 ${
                    item.status === 'SUCCESS' ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
                  }`}>
                    {item.type === 'topup' ? 
                      <ArrowUpRight size={24} color={item.status === 'SUCCESS' ? '#10b981' : '#ef4444'} /> : 
                      <ArrowDownRight size={24} color={item.status === 'SUCCESS' ? '#10b981' : '#ef4444'} />
                    }
                  </View>
                  <View className="flex-1">
                    <Text style={{ 
                      color: primaryNavy,
                      fontFamily: 'Poppins_800ExtraBold'
                    }} className="text-lg leading-tight">{item.name}</Text>
                    <Text style={{ 
                      color: '#94a3b8',
                      fontFamily: 'Poppins_500Medium'
                    }} className="text-sm mt-1">{item.uid}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text style={{ 
                    color: item.status === 'SUCCESS' ? '#10b981' : '#ef4444',
                    fontFamily: 'Poppins_900Black'
                  }} className="text-xl">{item.amt}</Text>
                  <View className={`px-2 py-1 rounded-md mt-2 ${
                    item.status === 'SUCCESS' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <Text style={{ 
                      color: item.status === 'SUCCESS' ? '#10b981' : '#ef4444',
                      fontFamily: 'Poppins_700Bold'
                    }} className="text-xs uppercase tracking-wider">{item.status}</Text>
                  </View>
                </View>
              </View>
              
              <View className="flex-row items-center justify-between pt-4 border-t border-slate-50">
                <View className="flex-row items-center">
                  <Calendar size={14} color="#94a3b8" />
                  <Text style={{ 
                    color: '#94a3b8',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-xs ml-2">{item.date.split(',')[0]}</Text>
                </View>
                <View className="flex-row items-center">
                  <Clock size={14} color="#94a3b8" />
                  <Text style={{ 
                    color: '#94a3b8',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-xs ml-2">{item.time}</Text>
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
