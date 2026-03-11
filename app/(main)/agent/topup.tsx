import { View, Text, ScrollView, Pressable, TextInput, Platform, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Wallet, 
  CheckCircle2, 
  ArrowRight,
  DollarSign,
  ShieldCheck
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
        {/* Header Section */}
        <View className="flex-row items-center justify-between mt-6 mb-8">
          <View>
            <Text style={{ 
              color: primaryNavy,
              fontFamily: 'Poppins_900Black'
            }} className="text-3xl tracking-tighter">Top-Up Wallet</Text>
            <Text style={{ 
              color: '#64748b',
              fontFamily: 'Poppins_500Medium'
            }} className="text-base mt-1">Add funds to your Nexa card</Text>
          </View>
          <View className="bg-blue-50 p-3 rounded-xl">
            <View className="w-8 h-8 bg-blue-600 rounded-lg items-center justify-center">
              <Text style={{ 
                color: 'white',
                fontFamily: 'Poppins_700Bold'
              }} className="text-xs">$</Text>
            </View>
          </View>
        </View>

        {/* card-details-card */}
        <View 
          style={{ height: 280, backgroundColor: primaryNavy, borderRadius: 16, padding: 30 }} 
          className="shadow-2xl shadow-blue-900/20 border border-blue-100 relative overflow-hidden mb-8"
        >
          <View style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: 200, height: 200, borderRadius: 100, position: 'absolute', top: -100, right: -100 }} />
          <View className="flex-row justify-between items-start mb-6">
            <View style={{ backgroundColor: '#FFD700', width: 50, height: 38, borderRadius: 8, opacity: 0.9, position: 'relative', overflow: 'hidden' }}>
               <View className="absolute inset-0 border border-black/10 opacity-20" />
               <View className="absolute top-1/2 w-full h-[1px] bg-black/10" />
               <View className="absolute left-1/2 h-full w-[1px] bg-black/10" />
            </View>
            <View className="bg-white/20 p-1 rounded-md">
              <Text style={{ 
                color: 'white',
                fontFamily: 'Poppins_600SemiBold'
              }} className="text-xs">VISA</Text>
            </View>
          </View>
          <Text style={{ 
            color: 'white',
            fontFamily: 'Poppins_900Black'
          }} className="text-2xl tracking-[4px] mb-8 opacity-80">
            **** **** **** ****
          </Text>
          <View className="flex-row justify-between items-end mt-auto">
            <View>
              <Text style={{ 
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'Poppins_800ExtraBold'
              }} className="text-[10px] uppercase tracking-[2px] mb-2">CARD UID</Text>
              <View className="flex-row items-center">
                <Text style={{ 
                  color: 'white',
                  fontFamily: 'Poppins_900Black'
                }} className="text-lg tracking-tighter">70:77:88:99</Text>
              </View>
            </View>
            <View className="items-end">
              <Text style={{ 
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'Poppins_800ExtraBold'
              }} className="text-[10px] uppercase tracking-[2px] mb-2">WALLET BALANCE</Text>
              <Text style={{ 
                color: 'white',
                fontFamily: 'Poppins_900Black'
              }} className="text-2xl">${balance.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Enhanced Amount Input Section */}
        <View className="mb-10">
          <Text style={{ 
            color: '#64748b',
            fontFamily: 'Poppins_800ExtraBold'
          }} className="text-sm uppercase tracking-widest mb-6 ml-1">Enter Credit Amount</Text>
          
          {/* Amount Input Card */}
          <View className="bg-white border border-slate-100 rounded-2xl p-6 shadow-lg shadow-blue-900/5 mb-6 relative overflow-hidden">
            {/* Decorative background element */}
            <View style={{ 
              position: 'absolute', 
              top: -20, 
              right: -20, 
              width: 80, 
              height: 80, 
              borderRadius: 40, 
              backgroundColor: '#10b981', 
              opacity: 0.05 
            }} />
            
            <View className="flex-row items-center">
              <View className="bg-green-50 p-3 rounded-xl mr-4 border border-green-100">
                <View className="flex-row items-center">
                  <Text style={{ 
                    color: '#10b981',
                    fontFamily: 'Poppins_900Black'
                  }} className="text-2xl">$</Text>
                </View>
              </View>
              <View className="flex-1">
                <TextInput 
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  keyboardType="numeric"
                  style={{ 
                    color: primaryNavy, 
                    fontFamily: 'Poppins_900Black',
                    fontSize: 32,
                    letterSpacing: -1
                  }}
                  className="h-12"
                  autoFocus
                />
                <Text style={{ 
                  color: '#94a3b8',
                  fontFamily: 'Poppins_500Medium'
                }} className="text-xs mt-1">Amount to add to wallet</Text>
              </View>
            </View>
          </View>

          {/* Quick Amount Buttons */}
          <View>
            <Text style={{ 
              color: '#94a3b8',
              fontFamily: 'Poppins_600SemiBold'
            }} className="text-xs uppercase tracking-wider mb-3 ml-1">Quick Select</Text>
            <View className="flex-row justify-between">
              {[10, 25, 50, 100].map((quickAmount) => (
                <Pressable 
                  key={quickAmount}
                  onPress={() => setAmount(quickAmount.toString())}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 mx-1 items-center active:bg-slate-100"
                >
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_700Bold'
                  }} className="text-base">${quickAmount}</Text>
                  <Text style={{ 
                    color: '#94a3b8',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-xs mt-1">USD</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Transaction Info Card */}
        <View className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mb-8">
          <View className="flex-row items-start">
            <View className="bg-blue-100 p-2 rounded-xl mr-4">
              <ShieldCheck size={20} color={primaryNavy} />
            </View>
            <View className="flex-1">
              <Text style={{ 
                color: primaryNavy,
                fontFamily: 'Poppins_700Bold'
              }} className="text-base mb-2">Secure Transaction</Text>
              <Text style={{ 
                color: '#64748b',
                fontFamily: 'Poppins_500Medium'
              }} className="text-sm leading-5">Your transaction is protected with bank-level encryption. Funds will be available instantly after confirmation.</Text>
            </View>
          </View>
        </View>

        {/* confirm-button */}
        <View className="items-center mb-12">
          <Pressable 
            onPress={handleTopUp}
            style={{ backgroundColor: primaryNavy, borderRadius: 16, width: '80%' }}
            className="h-20 items-center justify-center flex-row shadow-2xl shadow-blue-900/30 overflow-hidden"
          >
            <Text style={{ 
              color: 'white',
              fontFamily: 'Poppins_800ExtraBold'
            }} className="text-xl uppercase tracking-widest">Top up</Text>
          </Pressable>
        </View>
        <View className="h-40" />
      </ScrollView>

      <AgentBottomNav primaryNavy={primaryNavy} />
    </SafeAreaView>
  );
}
