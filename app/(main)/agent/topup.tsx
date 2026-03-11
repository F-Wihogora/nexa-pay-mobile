import { View, Text, ScrollView, Pressable, TextInput, Platform, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Wallet, 
  CheckCircle2, 
  ArrowRight,
  DollarSign
} from 'lucide-react-native';
import { useState } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  withDelay,
  Easing 
} from 'react-native-reanimated';
import { AgentTopbar } from '../../../components/AgentTopbar';
import { AgentBottomNav } from '../../../components/AgentBottomNav';

export default function AgentTopupScreen() {
  const router = useRouter();
  const primaryNavy = "#002B5B";
  const [amount, setAmount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [balance, setBalance] = useState(1250.00);

  // Animation values
  const walletProgress = useSharedValue(0);
  const moneyProgress = useSharedValue(0);
  const successOpacity = useSharedValue(0);
  const moneyPulse = useSharedValue(1);

  const handleTopUp = () => {
    if (!amount) return;
    
    // Start animation sequence
    setIsSuccess(true);
    walletProgress.value = withTiming(1, { duration: 1500, easing: Easing.bezier(0.4, 0, 0.2, 1) });
    moneyProgress.value = withSequence(
      withTiming(1, { duration: 800 }),
      withDelay(200, withTiming(0, { duration: 500 }))
    );
    moneyPulse.value = withRepeatPulse();
    successOpacity.value = withDelay(1200, withTiming(1, { duration: 500 }));

    // Simulate balance update
    const loadAmount = parseFloat(amount);
    setTimeout(() => {
      setBalance(prev => prev + loadAmount);
    }, 1300);

    // Navigate back to transactions after success
    setTimeout(() => {
      setIsSuccess(false);
      setAmount('');
      router.replace('/(main)/agent/transactions');
    }, 3500);
  };

  function withRepeatPulse() {
    return withSequence(
       withTiming(1.2, { duration: 300 }),
       withTiming(1, { duration: 300 })
    );
  }

  const walletFillStyle = useAnimatedStyle(() => ({
    height: `${walletProgress.value * 100}%`,
    backgroundColor: '#4ade80',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.6,
  }));

  const moneyStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: (1 - moneyProgress.value) * -120 },
      { scale: moneyPulse.value * moneyProgress.value }
    ],
    opacity: moneyProgress.value,
  }));

  const successContentStyle = useAnimatedStyle(() => ({
    opacity: successOpacity.value,
    transform: [{ scale: 0.8 + (successOpacity.value * 0.2) }]
  }));

  if (isSuccess) {
    return (
      <View className="flex-1 bg-white items-center justify-center px-10">
        <View className="items-center">
          {/* animated-wallet-container */}
          <View className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-slate-100 items-center justify-center relative mb-8 bg-slate-50">
             <Animated.View style={walletFillStyle} className="rounded-t-3xl" />
             <Wallet size={64} color={primaryNavy} />
             <Animated.View style={moneyStyle} className="absolute">
                <View className="bg-white/90 p-3 rounded-full shadow-lg">
                  <DollarSign size={32} color="#16a34a" strokeWidth={3} />
                </View>
             </Animated.View>
          </View>

          <Animated.View style={successContentStyle} className="items-center">
            <View className="bg-green-500 w-16 h-16 rounded-full items-center justify-center mb-6 shadow-xl shadow-green-500/30">
               <CheckCircle2 size={40} color="white" />
            </View>
            <Text style={{ color: primaryNavy }} className="text-3xl font-black mt-2 text-center tracking-tighter">Load Success!</Text>
            <Text className="text-slate-400 font-bold text-lg mt-2">New Balance: ${balance.toFixed(2)}</Text>
          </Animated.View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AgentTopbar name="Alex Nexa" role="Nexa Pro Agent" primaryNavy={primaryNavy} />
      
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center mt-6 mb-8">
          <Text style={{ color: primaryNavy }} className="text-3xl font-black tracking-tighter">Top-Up Wallet</Text>
        </View>

        {/* card-details-card */}
        <View className="bg-slate-900 rounded-3xl p-8 mb-8 shadow-2xl shadow-blue-900/40 relative overflow-hidden">
           {/* Decorative chips */}
           <View style={{ position: 'absolute', top: -10, right: -10, width: 60, height: 60, borderRadius: 30, backgroundColor: 'white', opacity: 0.05 }} />
           <View style={{ position: 'absolute', bottom: -20, left: 40, width: 100, height: 100, borderRadius: 50, backgroundColor: 'white', opacity: 0.03 }} />

           <View className="flex-row justify-between mb-8 pb-4 border-b border-white/5">
              <View>
                <Text className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Nex Card UID</Text>
                <Text className="text-white font-black text-lg tracking-widest">70:77:88:99</Text>
              </View>
              <View style={{ backgroundColor: '#FFD700', width: 40, height: 30, borderRadius: 6, opacity: 0.8 }} />
           </View>

           <View className="flex-row justify-between items-end">
              <View>
                <Text className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Owner: Alex Nexa</Text>
                <View className="bg-blue-500 px-2 py-[2px] rounded-md self-start">
                   <Text className="text-white text-[8px] font-black uppercase">Active</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Current Balance</Text>
                <Text className="text-white text-3xl font-black leading-none">${balance.toFixed(2)}</Text>
              </View>
           </View>
        </View>

        {/* amount-input-section */}
        <View className="mb-10">
          <Text className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4 ml-1">Enter Credit Amount</Text>
          <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-3xl px-8 h-24 shadow-inner relative">
             <View className="mr-4">
                <DollarSign size={40} color={primaryNavy} strokeWidth={3} />
             </View>
             <TextInput 
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="numeric"
                className="flex-1 text-4xl font-black h-full"
                style={{ color: primaryNavy, letterSpacing: -1 }}
                autoFocus
             />
          </View>
        </View>

        {/* confirm-button */}
        <Pressable 
          onPress={handleTopUp}
          style={{ backgroundColor: primaryNavy, borderRadius: 24 }}
          className="h-18 items-center justify-center flex-row shadow-2xl shadow-blue-900/30 overflow-hidden mb-12 py-5"
        >
          <View className="flex-row items-center">
            <Text className="text-white font-black text-xl mr-2 uppercase tracking-widest">Load Money</Text>
            <ArrowRight size={24} color="white" />
          </View>
        </Pressable>
        <View className="h-40" />
      </ScrollView>

      <AgentBottomNav primaryNavy={primaryNavy} />
    </SafeAreaView>
  );
}
