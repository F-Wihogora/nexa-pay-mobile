import { View, Text, Pressable, Dimensions, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Logo } from '../components/Logo';
import { ArrowRight, UserCheck } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const primaryNavy = "#002B5B";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-between py-20 px-8">
        {/* Decorative background elements */}
        <View 
          style={{ backgroundColor: primaryNavy }} 
          className="absolute top-[-50] right-[-50] w-64 h-64 rounded-full opacity-5" 
        />
        
        <View className="items-center justify-center flex-1">
          <Logo size={width * 0.55} />
        </View>

        <View className="w-full space-y-5">
          {/* Main Action: Get Started */}
          <Pressable 
            onPress={() => router.push('/login')}
            style={{ backgroundColor: primaryNavy, borderRadius: 16 }}
            className="h-20 items-center justify-center shadow-2xl shadow-blue-900/40 active:opacity-90 overflow-hidden"
          >
            <View className="flex-row items-center">
              <Text className="text-white text-2xl font-black tracking-tighter mr-3 uppercase">Get Started</Text>
              <ArrowRight size={24} color="white" />
            </View>
          </Pressable>
          
          {/* Secondary Action: Staff login */}
          <Pressable 
            onPress={() => router.push('/login')}
            className="h-20 rounded-2xl items-center justify-center border-2 border-slate-100 active:bg-slate-50 mt-4 flex-row"
          >
            <UserCheck size={20} color={primaryNavy} className="mr-2" />
            <Text style={{ color: primaryNavy }} className="text-xl font-black tracking-tight uppercase">Staff Portal</Text>
          </Pressable>
          
          <View className="h-10" />
        </View>
      </View>
    </SafeAreaView>
  );
}
