import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { User, ShieldCheck, History, ChevronRight, LogOut } from 'lucide-react-native';
import { AgentTopbar } from '../../../components/AgentTopbar';
import { AgentBottomNav } from '../../../components/AgentBottomNav';

export default function AgentSettingsScreen() {
  const router = useRouter();
  const primaryNavy = "#002B5B";

  const settingsItems = [
    { icon: User, label: 'Account Profile', sub: 'ID: Agent_07_Nexa' },
    { icon: ShieldCheck, label: 'Security Protocols', sub: 'Biometrics & Password' },
    { icon: History, label: 'Legal & Info', sub: 'v1.0.4 Nexa Pro' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AgentTopbar name="Alex Nexa" role="Nexa Pro Agent" primaryNavy={primaryNavy} />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 mt-6">
          <Text style={{ color: primaryNavy }} className="text-2xl font-black mb-10 tracking-tighter">Portal Settings</Text>
          <View className="space-y-4">
            {settingsItems.map((item, idx) => (
              <Pressable key={idx} className="flex-row items-center justify-between bg-slate-50 border border-slate-100 p-6 rounded-3xl mb-4 shadow-sm shadow-blue-900/5 active:bg-slate-100">
                <View className="flex-row items-center">
                  <View className="bg-white w-12 h-12 rounded-2xl items-center justify-center mr-4 border border-slate-100">
                     <item.icon size={20} color={primaryNavy} opacity={0.6} />
                  </View>
                  <View>
                     <Text style={{ color: primaryNavy }} className="font-black text-base">{item.label}</Text>
                     <Text className="text-slate-400 text-xs font-medium">{item.sub}</Text>
                  </View>
                </View>
                <ChevronRight size={18} color="#94a3b8" />
              </Pressable>
            ))}
            <Pressable 
              onPress={() => router.replace('/login')}
              className="flex-row items-center justify-center bg-red-50 border border-red-100 p-6 rounded-3xl mt-10 shadow-sm shadow-red-200/50 active:bg-red-100"
            >
              <LogOut size={20} color="#ef4444" />
              <Text className="ml-3 text-red-500 font-black text-base uppercase tracking-widest">Execute Logout</Text>
            </Pressable>
          </View>
        </View>
        <View className="h-40" />
      </ScrollView>

      <AgentBottomNav primaryNavy={primaryNavy} />
    </SafeAreaView>
  );
}
