import { View, Text, Pressable, Platform, Image } from 'react-native';
import { Bell } from 'lucide-react-native';

interface AgentTopbarProps {
  name: string;
  role: string;
  primaryNavy: string;
  showWelcome?: boolean;
}

export const AgentTopbar = ({ name, role, primaryNavy, showWelcome = true }: AgentTopbarProps) => (
  <View style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }} className="px-6 pb-6 bg-white">
    {/* Top row with logo and profile */}
    <View className="flex-row justify-between items-center mb-4">
      {/* Rounded Logo */}
      <View className="bg-white rounded-full p-2 shadow-lg shadow-blue-900/10 border border-slate-100">
        <Image 
          source={require('../assets/nexa.png')}
          style={{ 
            width: 40, 
            height: 40,
            resizeMode: 'contain'
          }}
        />
      </View>
      
      {/* Right side - Profile and Notification */}
      <View className="flex-row items-center">
        <View className="relative shadow-lg shadow-blue-900/10 mr-3">
          <View 
            style={{ backgroundColor: primaryNavy, width: 48, height: 48, borderRadius: 24 }} 
            className="items-center justify-center"
          >
            <Text style={{ 
              color: 'white',
              fontFamily: 'Poppins_900Black'
            }} className="text-xl">{name.split(' ').map(n => n[0]).join('')}</Text>
          </View>
          <View className="absolute bottom-[-1] right-[-1] bg-white rounded-full p-[2px] border border-white">
             <View className="bg-green-500 w-3 h-3 rounded-full" />
          </View>
        </View>
        
        <Pressable style={{ backgroundColor: primaryNavy }} className="w-11 h-11 rounded-full items-center justify-center shadow-lg shadow-blue-900/20">
          <Bell size={20} color="white" />
        </Pressable>
      </View>
    </View>
    
    {/* Welcome message - conditionally rendered */}
    {showWelcome && (
      <View>
        <Text style={{ 
          color: primaryNavy,
          fontFamily: 'Poppins_800ExtraBold'
        }} className="text-3xl tracking-tight">Welcome back, {name}!</Text>
        <Text style={{ 
          color: '#94a3b8',
          fontFamily: 'Poppins_600SemiBold'
        }} className="text-sm uppercase tracking-widest mt-1">{role}</Text>
      </View>
    )}
  </View>
);
