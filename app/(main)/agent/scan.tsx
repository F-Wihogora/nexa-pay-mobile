import { View, Text, ScrollView, Pressable, TextInput, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Maximize, Search, Wifi, Cpu, ShieldCheck } from 'lucide-react-native';
import { AgentTopbar } from '../../../components/AgentTopbar';
import { AgentBottomNav } from '../../../components/AgentBottomNav';

export default function AgentScanScreen() {
  const primaryNavy = "#002B5B";

  const NexaCard = () => (
    <View className="px-4 mt-2">
      <View 
        style={{ height: 210, backgroundColor: 'white', borderRadius: 24, padding: 30 }} 
        className="shadow-2xl shadow-blue-900/10 border border-slate-100 relative overflow-hidden"
      >
        <View style={{ backgroundColor: primaryNavy, width: 200, height: 200, borderRadius: 100, position: 'absolute', top: -100, right: -100, opacity: 0.03 }} />
        <View className="flex-row justify-between items-start mb-6">
          <View style={{ backgroundColor: '#FFD700', width: 50, height: 38, borderRadius: 8, opacity: 0.9, position: 'relative', overflow: 'hidden' }}>
             <View className="absolute inset-0 border border-black/10 opacity-20" />
             <View className="absolute top-1/2 w-full h-[1px] bg-black/10" />
             <View className="absolute left-1/2 h-full w-[1px] bg-black/10" />
          </View>
          <Wifi size={24} color={primaryNavy} opacity={0.2} />
        </View>
        <Text style={{ color: primaryNavy }} className="text-2xl font-black tracking-[4px] mb-8 opacity-80">
          **** **** **** ****
        </Text>
        <View className="flex-row justify-between items-end mt-auto">
          <View>
            <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] mb-2">CARD UID</Text>
            <View className="flex-row items-center">
              <Cpu size={14} color={primaryNavy} className="mr-2" opacity={0.5} />
              <Text style={{ color: primaryNavy }} className="text-lg font-black tracking-tighter">70:77:88:99</Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] mb-2">WALLET BALANCE</Text>
            <Text style={{ color: primaryNavy }} className="text-2xl font-black">$1,250.00</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AgentTopbar name="Alex Nexa" role="Nexa Pro Agent" primaryNavy={primaryNavy} />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <NexaCard />
        
        <View className="px-6 mt-10">
          <View className="flex-row justify-between items-center mb-6">
             <View>
                <Text style={{ color: primaryNavy }} className="text-2xl font-black tracking-tighter">Nexa Reader</Text>
                <Text className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Ready for connection</Text>
             </View>
             <View className="bg-green-50 px-3 py-1 rounded-full border border-green-100 flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                <Text className="text-green-700 text-[10px] font-bold">ACTIVE</Text>
             </View>
          </View>
          
          <View className="flex-row space-x-4">
            <Pressable className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 items-center justify-center active:bg-slate-100 h-40">
              <View style={{ backgroundColor: primaryNavy }} className="w-14 h-14 rounded-2xl items-center justify-center mb-4 shadow-lg shadow-blue-900/20">
                <Maximize size={24} color="white" />
              </View>
              <Text style={{ color: primaryNavy }} className="font-black text-sm text-center">Tap to Scan</Text>
            </Pressable>

            <Pressable className="flex-1 bg-white border-2 border-slate-100 rounded-3xl p-6 items-center justify-center active:bg-slate-50 h-40">
               <View className="w-14 h-14 rounded-2xl bg-slate-100 items-center justify-center mb-4">
                <Search size={24} color={primaryNavy} opacity={0.6} />
              </View>
              <Text className="text-slate-500 font-bold text-sm text-center">Manual Entry</Text>
            </Pressable>
          </View>

          <View className="mt-8 bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50 flex-row items-start">
             <View className="bg-blue-600/10 p-2 rounded-xl mr-4">
                <ShieldCheck size={20} color={primaryNavy} />
             </View>
             <View className="flex-1">
                <Text style={{ color: primaryNavy }} className="font-bold text-sm">Nexa Security</Text>
                <Text className="text-slate-500 text-xs mt-1 leading-4">Keep your device close to the card. Avoid scanning multiple cards at once for accuracy.</Text>
             </View>
          </View>
        </View>
        <View className="h-40" />
      </ScrollView>

      <AgentBottomNav primaryNavy={primaryNavy} />
    </SafeAreaView>
  );
}
