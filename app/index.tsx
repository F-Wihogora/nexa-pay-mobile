import { View, Text, Pressable, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Logo } from '../components/Logo';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const primaryNavy = "#002B5B";

  return (
    <View style={{ backgroundColor: primaryNavy }} className="flex-1">
      <StatusBar barStyle="light-content" />
      
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-between py-16 px-10">
          
          {/* Logo Section */}
          <View className="items-center justify-center flex-1 mt-10">
            <Logo size={width * 0.4} inverted={true} />
          </View>

          {/* Buttons Section */}
          <View className="w-full space-y-4 mb-16">
            <Pressable 
              onPress={() => router.push('/signup')}
              className="bg-white h-16 rounded-2xl items-center justify-center shadow-xl shadow-black/20 active:bg-slate-50"
            >
              <Text style={{ color: primaryNavy, fontFamily: 'Poppins_700Bold' }} className="text-lg">Register</Text>
            </Pressable>
            
            <Pressable 
              onPress={() => router.push('/login')}
              className="bg-white h-16 rounded-2xl items-center justify-center shadow-xl shadow-black/20 active:bg-slate-50 mt-4"
            >
              <Text style={{ color: primaryNavy, fontFamily: 'Poppins_700Bold' }} className="text-lg">Login</Text>
            </Pressable>
          </View>

          {/* Footer */}
          <View className="items-center">
            <Text style={{ 
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'Poppins_500Medium'
            }} className="text-xs tracking-widest">Nexa Pay v1.0</Text>
          </View>

        </View>
      </SafeAreaView>
    </View>
  );
}
