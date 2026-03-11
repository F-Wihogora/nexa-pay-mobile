import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Maximize, Wifi, CheckCircle2, XCircle, ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence,
  withDelay,
  Easing
} from 'react-native-reanimated';
import { AgentTopbar } from '../../../components/AgentTopbar';
import { SalespersonBottomNav } from '../../../components/SalespersonBottomNav';

export default function SalespersonPay() {
  const router = useRouter();
  const primaryNavy = "#002B5B";
  const [isScanning, setIsScanning] = useState(false);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');

  // Animation values
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0);
  const successScale = useSharedValue(0);

  useEffect(() => {
    if (status === 'scanning') {
      pulseScale.value = withRepeat(withTiming(1.6, { duration: 1000 }), -1, false);
      pulseOpacity.value = withRepeat(
        withSequence(withTiming(0.4, { duration: 500 }), withTiming(0, { duration: 500 })),
        -1,
        false
      );
    } else {
      pulseScale.value = 1;
      pulseOpacity.value = 0;
    }
  }, [status]);

  const animatedPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const handleStartPay = () => {
    setStatus('scanning');
    
    // Simulate successful payment after 3 seconds
    setTimeout(() => {
      setStatus('success');
      successScale.value = withTiming(1, { duration: 500, easing: Easing.back(1.5) });
      
      // Auto redirect back to dashboard after 4 seconds of success
      setTimeout(() => {
        router.replace('/salesperson/dashboard');
      }, 4000);
    }, 3000);
  };

  const animatedSuccessStyle = useAnimatedStyle(() => ({
    transform: [{ scale: successScale.value }],
    opacity: successScale.value,
  }));

  if (status === 'success') {
    return (
      <View className="flex-1 bg-white items-center justify-center px-10">
        <Animated.View style={animatedSuccessStyle} className="items-center">
          <View className="bg-green-500 w-24 h-24 rounded-full items-center justify-center mb-8 shadow-2xl shadow-green-500/40">
            <CheckCircle2 size={48} color="white" />
          </View>
          <Text style={{ color: primaryNavy }} className="text-4xl font-black text-center tracking-tighter">Paid Success!</Text>
          <Text className="text-slate-400 font-bold text-center text-lg mt-3 leading-6">Receipt sent to user's wallet. Transfer completed.</Text>
          
          <Pressable 
            onPress={() => router.replace('/salesperson/dashboard')}
            className="mt-12 h-14 w-full bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center"
          >
            <Text style={{ color: primaryNavy }} className="font-black text-sm uppercase tracking-widest">Back to Dashboard</Text>
          </Pressable>
        </Animated.View>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AgentTopbar name="Sarah Sales" role="Nexa Sales Pro" primaryNavy={primaryNavy} />
      
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="mt-4 mb-10">
           <Text style={{ color: primaryNavy }} className="text-3xl font-black tracking-tighter mb-2">Tap Card to Pay</Text>
           <Text className="text-slate-400 font-bold text-xs uppercase tracking-widest leading-4">NFC Payment Processing Unit</Text>
        </View>

        {/* Selected Items Summary */}
        <View className="bg-slate-900 rounded-3xl p-8 mb-10 shadow-2xl shadow-blue-900/40 relative overflow-hidden">
           <View style={{ position: 'absolute', top: -10, right: -10, width: 80, height: 80, borderRadius: 40, backgroundColor: 'white', opacity: 0.05 }} />
           
           <View className="flex-row items-center mb-8 pb-4 border-b border-white/5">
              <View className="bg-white/10 p-3 rounded-2xl mr-4">
                 <ShoppingCart size={24} color="white" />
              </View>
              <View>
                 <Text className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Items Summary</Text>
                 <Text className="text-white font-black text-lg tracking-tight">3 Items Selected</Text>
              </View>
           </View>

           <View className="flex-row justify-between items-end">
              <View>
                 <Text className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Total Payable</Text>
                 <Text className="text-white text-4xl font-black">$60.99</Text>
              </View>
              <View className="bg-blue-500 px-3 py-1 rounded-lg">
                 <Text className="text-white text-[10px] font-black uppercase">Ready</Text>
              </View>
           </View>
        </View>

        {/* Central Tap Area */}
        <View className="items-center justify-center pt-4 mb-20">
           <Pressable 
             onPress={handleStartPay}
             disabled={status !== 'idle'}
             className="items-center justify-center"
           >
              <Animated.View 
                style={[
                  { position: 'absolute', width: 160, height: 160, borderRadius: 80, backgroundColor: primaryNavy },
                  animatedPulseStyle
                ]} 
              />
              
              <View 
                style={{ backgroundColor: status === 'scanning' ? primaryNavy : 'white' }}
                className={`w-40 h-40 rounded-[40px] items-center justify-center border-2 ${status === 'scanning' ? 'border-primaryNavy shadow-2xl shadow-blue-900/40' : 'border-slate-100 shadow-xl shadow-blue-900/5'}`}
              >
                 <Wifi size={48} color={status === 'scanning' ? 'white' : primaryNavy} />
                 <Text className={`font-black text-[10px] mt-3 uppercase tracking-widest text-center px-4 ${status === 'scanning' ? 'text-white' : 'text-slate-400'}`}>
                    {status === 'scanning' ? 'Processing...' : 'Tap to sync'}
                 </Text>
              </View>
           </Pressable>
        </View>

        <Pressable 
           onPress={() => router.back()}
           className="h-16 rounded-2xl items-center justify-center flex-row active:bg-slate-50 mb-40"
        >
          <ArrowLeft size={18} color={primaryNavy} />
          <Text style={{ color: primaryNavy }} className="ml-2 font-black text-sm uppercase tracking-widest">Cancel Transaction</Text>
        </Pressable>
      </ScrollView>

      <SalespersonBottomNav primaryNavy={primaryNavy} />
    </SafeAreaView>
  );
}
