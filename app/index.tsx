import { View, Text, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Logo } from '../components/Logo';
import { ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const primaryNavy = "#002B5B";

  return (
    <View className="flex-1 bg-white items-center justify-between py-24 px-8">
      {/* Decorative background elements */}
      <View 
        style={{ backgroundColor: primaryNavy }} 
        className="absolute top-[-50] right-[-50] w-64 h-64 rounded-full opacity-5" 
      />
      
      <View className="items-center justify-center flex-1">
        <Logo size={width * 0.4} />
      </View>

      <View className="w-full space-y-6">
        <View className="mb-8">
          <Text style={{ color: primaryNavy }} className="text-3xl font-black text-center leading-tight">
            Seamless Digital{'\n'}Payments.
          </Text>
          <Text className="text-slate-500 text-center mt-3 text-base font-medium px-4">
            The smartest way to manage your RFID wallet and track transactions globally.
          </Text>
        </View>

        {/* Slanted "Pay Now" Style Button for Login */}
        <Pressable 
          onPress={() => router.push('/login')}
          style={{ backgroundColor: primaryNavy, transform: [{ skewX: '-10deg' }] }}
          className="h-16 rounded-xl items-center justify-center shadow-2xl shadow-blue-900/40 active:opacity-90 overflow-hidden"
        >
          <View style={{ transform: [{ skewX: '10deg' }] }} className="flex-row items-center">
            <Text className="text-white text-xl font-bold tracking-tight mr-2">Get Started</Text>
            <ArrowRight size={20} color="white" />
          </View>
        </Pressable>
        
        {/* Outline Button for signup */}
        <Pressable 
          onPress={() => router.push('/signup')}
          className="h-16 rounded-2xl items-center justify-center mt-2 border-2 border-slate-100 active:bg-slate-50"
        >
          <Text style={{ color: primaryNavy }} className="text-lg font-bold">New to Nexa? Create Account</Text>
        </Pressable>
        
        <Text className="text-slate-400 text-center text-xs mt-10 px-6 leading-5">
          By continuing, you agree to our <Text className="underline">Terms</Text> and <Text className="underline">Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}
