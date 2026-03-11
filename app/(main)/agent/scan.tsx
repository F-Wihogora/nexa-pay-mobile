import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Maximize, Wifi, Cpu, ShieldCheck, CheckCircle, ChevronRight } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence 
} from 'react-native-reanimated';
import { AgentTopbar } from '../../../components/AgentTopbar';
import { AgentBottomNav } from '../../../components/AgentBottomNav';

export default function AgentScanScreen() {
  const router = useRouter();
  const primaryNavy = "#002B5B";
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{id: string, name: string, balance: number} | null>(null);

  // Animation values
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0);

  useEffect(() => {
    if (isScanning) {
      pulseScale.value = withRepeat(
        withTiming(1.5, { duration: 1000 }),
        -1,
        false
      );
      pulseOpacity.value = withRepeat(
        withSequence(
          withTiming(0.4, { duration: 500 }),
          withTiming(0, { duration: 500 })
        ),
        -1,
        false
      );
    } else {
      pulseScale.value = 1;
      pulseOpacity.value = 0;
    }
  }, [isScanning]);

  const animatedPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const handleStartScan = () => {
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate successful scan after 2.5 seconds
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        id: '70:77:88:99',
        name: 'Alex Nexa',
        balance: 1250.00
      });
    }, 2500);
  };

  const NexaCard = () => (
    <View className="px-4 mt-2">
      <View 
        style={{ height: 210, backgroundColor: 'white', borderRadius: 24, padding: 30 }} 
        className="shadow-2xl shadow-blue-900/10 border border-slate-100 relative overflow-hidden"
      >
        <View style={{ backgroundColor: primaryNavy, width: 200, height: 200, borderRadius: 100, position: 'absolute', top: -100, right: -100, opacity: 0.03 }} />
        <View className="flex-row justify-between items-start mb-6">
          <View style={{ backgroundColor: '#FFD700', width: 50, height: 38, borderRadius: 8, opacity: 0.9, position: 'relative', overflow: 'hidden' }}>
             <View className="absolute inset-0 border border-black/10 opacity-20" />
             <View className="absolute top-1/2 w-full h-[1px] bg-black/10" />
             <View className="absolute left-1/2 h-full w-[1px] bg-black/10" />
          </View>
          <Wifi size={24} color={primaryNavy} opacity={0.2} />
        </View>
        <Text style={{ color: primaryNavy }} className="text-2xl font-black tracking-[4px] mb-8 opacity-80">
          **** **** **** ****
        </Text>
        <View className="flex-row justify-between items-end mt-auto">
          <View>
            <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] mb-2">CARD UID</Text>
            <View className="flex-row items-center">
              <Cpu size={14} color={primaryNavy} className="mr-2" opacity={0.5} />
              <Text style={{ color: primaryNavy }} className="text-lg font-black tracking-tighter">70:77:88:99</Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] mb-2">WALLET BALANCE</Text>
            <Text style={{ color: primaryNavy }} className="text-2xl font-black">$1,250.00</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AgentTopbar name="Alex Nexa" role="Nexa Pro Agent" primaryNavy={primaryNavy} />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <NexaCard />
        
        <View className="px-6 mt-10">
          {/* Currency Selection Section */}
          <View className="mb-8">
            <Text style={{ color: primaryNavy }} className="text-xl font-black mb-4">Currency</Text>
            <View className="flex-row space-x-3">
              <Pressable className="bg-emerald-600 px-6 py-3 rounded-2xl">
                <Text className="text-white font-bold text-sm">NGN</Text>
              </Pressable>
              <Pressable className="bg-slate-100 px-6 py-3 rounded-2xl border border-slate-200">
                <Text className="text-slate-600 font-bold text-sm">USD</Text>
              </Pressable>
              <Pressable className="bg-slate-100 px-6 py-3 rounded-2xl border border-slate-200">
                <Text className="text-slate-600 font-bold text-sm">EUR</Text>
              </Pressable>
            </View>
          </View>

          {/* Nexa Reader Section */}
          <View className="mb-8">
            <Text style={{ color: primaryNavy }} className="text-xl font-black mb-6">Nexa Reader</Text>
            
            <View className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <View className="flex-row justify-between items-start mb-6">
                <View className="flex-1">
                  {/* Card Scanning Animation Area */}
                  <View className="items-center justify-center py-8">
                    <Pressable 
                      onPress={handleStartScan}
                      disabled={isScanning}
                      className="items-center justify-center"
                    >
                      {/* Pulse effect */}
                      <Animated.View 
                        style={[
                          { position: 'absolute', width: 160, height: 100, borderRadius: 16, backgroundColor: primaryNavy },
                          animatedPulseStyle
                        ]} 
                      />
                      
                      {/* Card Visual */}
                      <View 
                        style={{ 
                          backgroundColor: isScanning ? primaryNavy : 'white',
                          width: 140,
                          height: 88,
                          borderRadius: 12,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.1,
                          shadowRadius: 8,
                          elevation: 4
                        }}
                        className={`items-center justify-center border-2 ${isScanning ? 'border-blue-400' : 'border-slate-200'} relative`}
                      >
                        {/* Card chip */}
                        <View 
                          style={{ 
                            backgroundColor: isScanning ? '#FFD700' : '#E5E7EB',
                            width: 24,
                            height: 18,
                            borderRadius: 4,
                            position: 'absolute',
                            top: 12,
                            left: 12
                          }}
                        />
                        
                        {/* Card lines */}
                        <View className="absolute bottom-3 left-3 right-3">
                          <View className={`h-1 rounded-full mb-1 ${isScanning ? 'bg-white/30' : 'bg-slate-300'}`} />
                          <View className={`h-1 rounded-full w-3/4 ${isScanning ? 'bg-white/20' : 'bg-slate-200'}`} />
                        </View>
                        
                        {/* Scanning indicator */}
                        {isScanning && (
                          <View className="absolute inset-0 items-center justify-center">
                            <View className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          </View>
                        )}
                      </View>
                    </Pressable>
                    
                    <Text className={`font-bold text-sm mt-4 ${isScanning ? 'text-blue-600' : 'text-slate-500'}`}>
                      {isScanning ? 'Scanning the card...' : 'Tap to scan card'}
                    </Text>
                    
                    {isScanning && (
                      <Text className="text-blue-500 text-xs mt-1 animate-pulse">
                        Hold card steady
                      </Text>
                    )}
                  </View>
                </View>
                
                {/* Copy QR Code Button (styled as scan card button) */}
                <Pressable className="bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
                  <Text className="text-slate-600 font-medium text-sm">Scan card</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Scan Result Card */}
          {scanResult && (
            <View className="mt-8 bg-white border border-slate-100 rounded-3xl p-6 shadow-2xl shadow-blue-900/10">
               <View className="flex-row items-center mb-6">
                  <View className="bg-green-100 p-2 rounded-xl mr-4">
                     <CheckCircle size={24} color="#16a34a" />
                  </View>
                  <View>
                     <Text className="text-green-600 font-black text-xs uppercase tracking-widest">Connection Secured</Text>
                     <Text style={{ color: primaryNavy }} className="text-lg font-black">NexCard Detected</Text>
                  </View>
               </View>

               <View className="bg-slate-50 p-5 rounded-2xl mb-6">
                  <View className="flex-row justify-between mb-2">
                     <Text className="text-slate-400 font-bold text-[10px] uppercase">Owner</Text>
                     <Text style={{ color: primaryNavy }} className="font-black text-sm">{scanResult.name}</Text>
                  </View>
                  <View className="flex-row justify-between">
                     <Text className="text-slate-400 font-bold text-[10px] uppercase">UID</Text>
                     <Text style={{ color: primaryNavy }} className="font-mono text-sm">{scanResult.id}</Text>
                  </View>
               </View>

               <Pressable 
                 onPress={() => router.push('/agent/topup')}
                 style={{ backgroundColor: primaryNavy }}
                 className="h-14 rounded-2xl flex-row items-center justify-center active:bg-blue-900"
               >
                  <Text className="text-white font-black text-sm uppercase tracking-widest mr-2">Open Wallet</Text>
                  <ChevronRight size={18} color="white" />
               </Pressable>
            </View>
          )}

          {!scanResult && !isScanning && (
            <View className="mt-8 bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50 flex-row items-start">
               <View className="bg-blue-600/10 p-2 rounded-xl mr-4">
                  <ShieldCheck size={20} color={primaryNavy} />
               </View>
               <View className="flex-1">
                  <Text style={{ color: primaryNavy }} className="font-bold text-sm">Nexa Security</Text>
                  <Text className="text-slate-500 text-xs mt-1 leading-4">Hold your RFID card close to the back of the device for high-speed synchronization.</Text>
               </View>
            </View>
          )}
        </View>
        <View className="h-40" />
      </ScrollView>

      <AgentBottomNav primaryNavy={primaryNavy} />
    </SafeAreaView>
  );
}
