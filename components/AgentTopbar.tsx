import { View, Text, Pressable, Platform } from 'react-native';
import { Bell } from 'lucide-react-native';

interface AgentTopbarProps {
  name: string;
  role: string;
  primaryNavy: string;
}

export const AgentTopbar = ({ name, role, primaryNavy }: AgentTopbarProps) => (
  <View style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }} className="px-6 pb-6 flex-row justify-between items-center bg-white">
    <View className="flex-row items-center">
      <View className="relative shadow-lg shadow-blue-900/10">
        <View 
          style={{ backgroundColor: primaryNavy, width: 48, height: 48, borderRadius: 18 }} 
          className="items-center justify-center"
        >
          <Text className="text-white font-black text-xl">{name.split(' ').map(n => n[0]).join('')}</Text>
        </View>
        <View className="absolute bottom-[-1] right-[-1] bg-white rounded-full p-[2px] border border-white">
           <View className="bg-green-500 w-3 h-3 rounded-full" />
        </View>
      </View>
      <View className="ml-4">
        <Text style={{ color: primaryNavy }} className="text-lg font-black tracking-tighter">{name}</Text>
        <View className="flex-row items-center">
          <Text className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{role}</Text>
        </View>
      </View>
    </View>
    
    <View className="flex-row items-center">
      <Pressable style={{ backgroundColor: primaryNavy }} className="w-11 h-11 rounded-2xl items-center justify-center shadow-lg shadow-blue-900/20">
        <Bell size={20} color="white" />
      </Pressable>
    </View>
  </View>
);
