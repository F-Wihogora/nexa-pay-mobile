import { View, Text, ScrollView, SafeAreaView, Pressable, Image } from 'react-native';
import { History, Filter, CheckCircle, XCircle, TrendingUp, Calendar, Clock, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react-native';
import { useState } from 'react';
import { AgentTopbar } from '../../../components/AgentTopbar';
import { AgentBottomNav } from '../../../components/AgentBottomNav';

export default function AgentTransactionsScreen() {
  const primaryNavy = "#002B5B";
  const [activeFilter, setActiveFilter] = useState<'all' | 'success' | 'failed'>('all');

  const allTransactions = [
    { id: '1', name: 'Alex Nexa', uid: '70:77:88:99', amt: '+$50.00', date: 'Oct 24, 09:41 AM', status: 'SUCCESS', type: 'topup', time: '09:41 AM' },
    { id: '2', name: 'John Peterson', uid: 'EEFF-1122', amt: '+$100.00', date: 'Oct 23, 08:20 AM', status: 'SUCCESS', type: 'topup', time: '08:20 AM' },
    { id: '3', name: 'Sarah Miller', uid: '4455-6677', amt: '+$20.00', date: 'Oct 23, 02:15 PM', status: 'FAILED', type: 'payment', time: '02:15 PM' },
    { id: '4', name: 'David Wilson', uid: '9900-3321', amt: '+$150.00', date: 'Oct 22, 11:30 AM', status: 'SUCCESS', type: 'topup', time: '11:30 AM' },
    { id: '5', name: 'Emma Johnson', uid: '1234-5678', amt: '+$75.00', date: 'Oct 21, 03:45 PM', status: 'FAILED', type: 'payment', time: '03:45 PM' },
  ];

  const filteredTransactions = allTransactions.filter(transaction => {
    if (activeFilter === 'success') return transaction.status === 'SUCCESS';
    if (activeFilter === 'failed') return transaction.status === 'FAILED';
    return true; // 'all' filter
  });

  const todayTotal = allTransactions
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

          {/* Enhanced Stats Summary Card */}
          <View className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 relative overflow-hidden" style={{ backgroundColor: primaryNavy, height: 200 }}>
            {/* Background decorative elements */}
            <View style={{ 
              position: 'absolute', 
              top: -40, 
              right: -40, 
              width: 160, 
              height: 160, 
              borderRadius: 80, 
              backgroundColor: 'rgba(255,255,255,0.1)' 
            }} />
            <View style={{ 
              position: 'absolute', 
              bottom: -30, 
              left: -30, 
              width: 120, 
              height: 120, 
              borderRadius: 60, 
              backgroundColor: 'rgba(255,255,255,0.05)' 
            }} />
            
            {/* Card image/illustration */}
            <View style={{ 
              position: 'absolute', 
              top: 20, 
              right: 20, 
              width: 80, 
              height: 80, 
              borderRadius: 40, 
              backgroundColor: 'rgba(255,255,255,0.15)',
            }} className="items-center justify-center">
              <View style={{ 
                width: 60, 
                height: 60, 
                borderRadius: 30, 
                backgroundColor: 'rgba(255,255,255,0.2)',
              }} className="items-center justify-center">
                <Image 
                  source={require('../../../assets/nexa.png')}
                  style={{ 
                    width: 40, 
                    height: 40,
                    resizeMode: 'contain',
                    tintColor: 'white',
                    opacity: 0.8
                  }}
                />
              </View>
            </View>
            
            <View className="flex-1 justify-between">
              <View>
                <Text style={{ 
                  color: 'rgba(255,255,255,0.8)',
                  fontFamily: 'Poppins_600SemiBold'
                }} className="text-sm uppercase tracking-wider">Today's Total Volume</Text>
                <Text style={{ 
                  color: 'white',
                  fontFamily: 'Poppins_900Black'
                }} className="text-4xl mt-3">${todayTotal.toFixed(2)}</Text>
              </View>
              
              <View className="flex-row justify-between items-end">
                <View className="flex-row items-center">
                  <TrendingUp size={18} color="#10b981" />
                  <Text style={{ 
                    color: '#10b981',
                    fontFamily: 'Poppins_600SemiBold'
                  }} className="text-base ml-2">+12.5% from yesterday</Text>
                </View>
                <View className="bg-white/20 p-2 rounded-xl">
                  <History size={20} color="white" />
                </View>
              </View>
            </View>
          </View>

          {/* Functional Filter Tabs */}
          <View className="flex-row mb-6">
            <Pressable 
              onPress={() => setActiveFilter('all')}
              className={`px-6 py-3 rounded-xl mr-3 border ${
                activeFilter === 'all' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-100 border-transparent'
              }`}
            >
              <Text style={{ 
                color: activeFilter === 'all' ? primaryNavy : '#64748b',
                fontFamily: 'Poppins_600SemiBold'
              }} className="text-sm">All ({allTransactions.length})</Text>
            </Pressable>
            <Pressable 
              onPress={() => setActiveFilter('success')}
              className={`px-6 py-3 rounded-xl mr-3 border ${
                activeFilter === 'success' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-100 border-transparent'
              }`}
            >
              <Text style={{ 
                color: activeFilter === 'success' ? primaryNavy : '#64748b',
                fontFamily: 'Poppins_600SemiBold'
              }} className="text-sm">Success ({allTransactions.filter(t => t.status === 'SUCCESS').length})</Text>
            </Pressable>
            <Pressable 
              onPress={() => setActiveFilter('failed')}
              className={`px-6 py-3 rounded-xl border ${
                activeFilter === 'failed' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-100 border-transparent'
              }`}
            >
              <Text style={{ 
                color: activeFilter === 'failed' ? primaryNavy : '#64748b',
                fontFamily: 'Poppins_600SemiBold'
              }} className="text-sm">Failed ({allTransactions.filter(t => t.status === 'FAILED').length})</Text>
            </Pressable>
          </View>

          {/* Enhanced Transaction Cards */}
          {filteredTransactions.map((item, index) => (
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
