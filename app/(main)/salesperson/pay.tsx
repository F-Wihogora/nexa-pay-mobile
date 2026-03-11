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
      
      // Auto redirect to success page after 3 seconds
      setTimeout(() => {
        router.push('/(main)/salesperson/success');
      }, 3000);
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
        <View className="rounded-3xl p-8 mb-10 shadow-2xl shadow-slate-900/40 relative overflow-hidden" 
              style={{ backgroundColor: '#1e293b' }}>
           {/* Background decorative elements with gradients */}
           <View style={{ 
             position: 'absolute', 
             top: -20, 
             right: -20, 
             width: 100, 
             height: 100, 
             borderRadius: 50, 
             backgroundColor: 'rgba(59, 130, 246, 0.2)'
           }} />
           <View style={{ 
             position: 'absolute', 
             top: -10, 
             right: -30, 
             width: 80, 
             height: 80, 
             borderRadius: 40, 
             backgroundColor: 'rgba(147, 51, 234, 0.1)'
           }} />
           <View style={{ 
             position: 'absolute', 
             bottom: -10, 
             left: -10, 
             width: 60, 
             height: 60, 
             borderRadius: 30, 
             backgroundColor: 'rgba(255, 255, 255, 0.1)'
           }} />
           <View style={{ 
             position: 'absolute', 
             bottom: -20, 
             left: -20, 
             width: 40, 
             height: 40, 
             borderRadius: 20, 
             backgroundColor: 'rgba(255, 255, 255, 0.05)'
           }} />
           
           {/* Card Header */}
           <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center">
                 <View className="p-3 rounded-2xl mr-4" 
                       style={{ backgroundColor: 'rgba(59, 130, 246, 0.3)' }}>
                    <View style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      borderRadius: 16, 
                      backgroundColor: 'rgba(147, 51, 234, 0.2)' 
                    }} />
                    <ShoppingCart size={24} color="#60a5fa" />
                 </View>
                 <View>
                    <Text className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Transaction Summary</Text>
                    <Text className="text-white font-black text-xl tracking-tight">3 Items Selected</Text>
                 </View>
              </View>
              <View className="px-4 py-2 rounded-full border border-green-500/30" 
                    style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}>
                 <View style={{ 
                   position: 'absolute', 
                   inset: 0, 
                   borderRadius: 20, 
                   backgroundColor: 'rgba(16, 185, 129, 0.1)' 
                 }} />
                 <Text className="text-green-400 text-xs font-black uppercase tracking-wide">Ready to Pay</Text>
              </View>
           </View>

           {/* Items Preview */}
           <View className="rounded-2xl p-4 mb-6 border border-white/10" 
                 style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
              <View style={{ 
                position: 'absolute', 
                inset: 0, 
                borderRadius: 16, 
                backgroundColor: 'rgba(255, 255, 255, 0.03)' 
              }} />
              <View className="flex-row justify-between items-center mb-2">
                 <Text className="text-white/80 text-sm font-semibold">Summer Collection Dress</Text>
                 <Text className="text-white font-bold">$89.99</Text>
              </View>
              <View className="flex-row justify-between items-center mb-2">
                 <Text className="text-white/80 text-sm font-semibold">Casual Men's Shirt</Text>
                 <Text className="text-white font-bold">$45.99</Text>
              </View>
              <View className="flex-row justify-between items-center">
                 <Text className="text-white/80 text-sm font-semibold">Classic Cotton T-Shirt</Text>
                 <Text className="text-white font-bold">$29.99</Text>
              </View>
           </View>

           {/* Total Amount */}
           <View className="flex-row justify-between items-end">
              <View>
                 <Text className="text-white/60 text-xs font-black uppercase tracking-widest mb-2">Total Amount</Text>
                 <Text className="text-white text-4xl font-black tracking-tight">$165.97</Text>
                 <Text className="text-blue-400 text-sm font-semibold mt-1">Including tax & fees</Text>
              </View>
              <View className="items-end">
                 <View className="w-12 h-12 rounded-2xl items-center justify-center mb-2" 
                       style={{ backgroundColor: '#3b82f6' }}>
                    <View style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      borderRadius: 16, 
                      backgroundColor: '#1d4ed8' 
                    }} />
                    <Text className="text-white text-lg font-black">💳</Text>
                 </View>
                 <Text className="text-white/60 text-xs font-semibold">RFID Ready</Text>
              </View>
           </View>
        </View>

        {/* RFID Payment Interface */}
        <View className="items-center justify-center pt-4 mb-20">
           <Text style={{ color: primaryNavy }} className="text-2xl font-black mb-2 text-center">Tap Your Card</Text>
           <Text className="text-slate-500 text-base font-medium mb-8 text-center">Hold your RFID card near the device</Text>
           
           <Pressable 
             onPress={handleStartPay}
             disabled={status !== 'idle'}
             className="items-center justify-center relative"
           >
              {/* Outer ripple effects */}
              <Animated.View 
                style={[
                  { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: primaryNavy, opacity: 0.1 },
                  animatedPulseStyle
                ]} 
              />
              <Animated.View 
                style={[
                  { position: 'absolute', width: 160, height: 160, borderRadius: 80, backgroundColor: primaryNavy, opacity: 0.2 },
                  animatedPulseStyle
                ]} 
              />
              
              {/* Main card scanning area */}
              <View 
                style={{ 
                  width: 180,
                  height: 120,
                  borderRadius: 20,
                  shadowColor: status === 'scanning' ? primaryNavy : '#000',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: status === 'scanning' ? 0.3 : 0.1,
                  shadowRadius: 16,
                  elevation: 12,
                  backgroundColor: status === 'scanning' ? primaryNavy : '#ffffff'
                }}
                className="items-center justify-center border-2 border-slate-100 relative overflow-hidden"
              >
                 {/* Card background pattern with layered colors */}
                 <View style={{ 
                   position: 'absolute', 
                   top: -20, 
                   right: -20, 
                   width: 80, 
                   height: 80, 
                   borderRadius: 40, 
                   backgroundColor: status === 'scanning' ? 'rgba(255,255,255,0.15)' : 'rgba(59, 130, 246, 0.15)'
                 }} />
                 <View style={{ 
                   position: 'absolute', 
                   top: -10, 
                   right: -30, 
                   width: 60, 
                   height: 60, 
                   borderRadius: 30, 
                   backgroundColor: status === 'scanning' ? 'rgba(255,255,255,0.05)' : 'rgba(147, 51, 234, 0.05)'
                 }} />
                 
                 {/* RFID waves animation */}
                 {status === 'scanning' ? (
                   <View className="items-center">
                      <View className="flex-row items-center mb-2">
                         <View className="w-2 h-2 bg-white rounded-full mr-1" />
                         <View className="w-2 h-2 bg-white rounded-full mr-1" />
                         <View className="w-2 h-2 bg-white rounded-full" />
                      </View>
                      <Text className="text-white font-bold text-sm">Scanning...</Text>
                      <Text className="text-white/80 text-xs mt-1">Keep card steady</Text>
                   </View>
                 ) : (
                   <View className="items-center">
                      <View className="w-16 h-16 rounded-2xl items-center justify-center mb-3" 
                            style={{ backgroundColor: '#dbeafe' }}>
                         <View style={{ 
                           position: 'absolute', 
                           inset: 0, 
                           borderRadius: 16, 
                           backgroundColor: '#bfdbfe' 
                         }} />
                         <Wifi size={32} color={primaryNavy} />
                      </View>
                      <Text style={{ color: primaryNavy }} className="font-bold text-base">Tap Here</Text>
                      <Text className="text-slate-500 text-xs mt-1">RFID Enabled</Text>
                   </View>
                 )}
              </View>
           </Pressable>
           
           {/* Status indicators */}
           <View className="flex-row items-center mt-8">
              <View className="flex-row items-center mr-6">
                 <View className={`w-3 h-3 rounded-full mr-2 ${status === 'scanning' ? 'bg-blue-500' : 'bg-slate-300'}`} />
                 <Text className="text-slate-600 text-sm font-medium">NFC Active</Text>
              </View>
              <View className="flex-row items-center">
                 <View className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                 <Text className="text-slate-600 text-sm font-medium">Secure Connection</Text>
              </View>
           </View>
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
