import { View, Pressable } from 'react-native';
import { Maximize, PlusCircle, History, Settings } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';

export const AgentBottomNav = ({ primaryNavy }: { primaryNavy: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { id: 'scan', icon: Maximize, path: '/(main)/agent/scan' },
    { id: 'topup', icon: PlusCircle, path: '/(main)/agent/topup' },
    { id: 'transactions', icon: History, path: '/(main)/agent/transactions' },
    { id: 'settings', icon: Settings, path: '/(main)/agent/settings' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <View className="absolute bottom-10 left-8 right-8 h-20 bg-white/95 rounded-3xl border border-slate-100 flex-row items-center justify-around px-4 shadow-2xl shadow-blue-900/10 backdrop-blur-xl">
      {tabs.map((tab) => (
        <Pressable 
          key={tab.id}
          onPress={() => router.replace(tab.path as any)}
          className={`w-12 h-12 rounded-full items-center justify-center ${isActive(tab.path) ? '' : 'opacity-20'}`}
          style={isActive(tab.path) ? { backgroundColor: primaryNavy } : {}}
        >
          <tab.icon size={24} color={isActive(tab.path) ? "white" : primaryNavy} />
        </Pressable>
      ))}
    </View>
  );
};
