import { View, Text, ScrollView, Pressable, SafeAreaView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { User, ShieldCheck, History, ChevronRight, LogOut, Bell } from 'lucide-react-native';
import { useState } from 'react';
import { AgentTopbar } from '../../../components/AgentTopbar';
import { SalespersonBottomNav } from '../../../components/SalespersonBottomNav';

export default function SalespersonSettings() {
  const router = useRouter();
  const primaryNavy = "#002B5B";
  const [notifications, setNotifications] = useState(true);

  const settingsItems = [
    { icon: User, label: 'Account Profile', sub: 'ID: Sales_Pro_Sarah' },
    { icon: ShieldCheck, label: 'Security Protocols', sub: 'Biometrics & Password' },
    { icon: History, label: 'Legal & Info', sub: 'v1.0.4 Nexa Pro' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AgentTopbar name="Sarah Sales" role="Nexa Sales Pro" primaryNavy={primaryNavy} />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 mt-6">
          <Text style={{ color: primaryNavy }} className="text-2xl font-black mb-10 tracking-tighter">Portal Settings</Text>
          
          <View className="space-y-4">
            {/* Notification Toggle */}
            <View className="flex-row items-center justify-between bg-slate-50 border border-slate-100 p-6 rounded-3xl mb-4">
              <View className="flex-row items-center">
                <View className="bg-white w-12 h-12 rounded-2xl items-center justify-center mr-4 border border-slate-100">
                  <Bell size={20} color={primaryNavy} opacity={0.6} />
                </View>
                <View>
                  <Text style={{ color: primaryNavy }} className="font-black text-base">Push Notifications</Text>
                  <Text className="text-slate-400 text-xs font-medium">Alerts on sales success</Text>
                </View>
              </View>
              <Switch 
                value={notifications} 
                onValueChange={setNotifications}
                trackColor={{ false: '#e2e8f0', true: primaryNavy }}
                thumbColor="#ffffff"
              />
            </View>

            {settingsItems.map((item, idx) => (
              <Pressable key={idx} className="flex-row items-center justify-between bg-slate-50 border border-slate-100 p-6 rounded-3xl mb-4 shadow-sm active:bg-slate-100">
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

      <SalespersonBottomNav primaryNavy={primaryNavy} />
    </SafeAreaView>
  );
}
