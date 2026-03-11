import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Maximize, Wifi, Cpu, ShieldCheck, CheckCircle, ChevronRight, TrendingUp, Users, Zap, Clock, BarChart3, Activity, DollarSign, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';
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
  const [selectedCurrency, setSelectedCurrency] = useState<'NGN' | 'USD' | 'EUR'>('NGN');
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
        style={{ height: 280, backgroundColor: primaryNavy, borderRadius: 16, padding: 30 }} 
        className="shadow-2xl shadow-blue-900/20 border border-blue-100 relative overflow-hidden"
      >
        <View style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: 200, height: 200, borderRadius: 100, position: 'absolute', top: -100, right: -100 }} />
        <View className="flex-row justify-between items-start mb-6">
          <View style={{ backgroundColor: '#FFD700', width: 50, height: 38, borderRadius: 8, opacity: 0.9, position: 'relative', overflow: 'hidden' }}>
             <View className="absolute inset-0 border border-black/10 opacity-20" />
             <View className="absolute top-1/2 w-full h-[1px] bg-black/10" />
             <View className="absolute left-1/2 h-full w-[1px] bg-black/10" />
          </View>
          <Wifi size={24} color="white" opacity={0.6} />
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
              <Cpu size={14} color="white" className="mr-2" opacity={0.7} />
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
            }} className="text-2xl">$1,250.00</Text>
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
          {/* Quick Actions */}
          <View className="mb-8">
            <Text style={{ color: primaryNavy, fontFamily: 'Poppins_800ExtraBold' }} className="text-xl mb-4">Quick Actions</Text>
            
            <View className="flex-row justify-between">
              <Pressable 
                onPress={() => router.push('/agent/topup')}
                className="flex-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 mr-2 shadow-lg"
                style={{ backgroundColor: primaryNavy }}
              >
                <View className="bg-white/20 p-2 rounded-xl mb-3 self-start">
                  <Zap size={20} color="white" />
                </View>
                <Text style={{ color: 'white', fontFamily: 'Poppins_700Bold' }} className="text-sm">Top-up</Text>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'Poppins_500Medium' }} className="text-xs">Add funds</Text>
              </Pressable>

              <Pressable 
                onPress={() => router.push('/agent/transactions')}
                className="flex-1 bg-white rounded-2xl p-4 mx-1 border border-slate-100 shadow-sm"
              >
                <View className="bg-slate-50 p-2 rounded-xl mb-3 self-start">
                  <BarChart3 size={20} color={primaryNavy} />
                </View>
                <Text style={{ color: primaryNavy, fontFamily: 'Poppins_700Bold' }} className="text-sm">History</Text>
                <Text style={{ color: '#64748b', fontFamily: 'Poppins_500Medium' }} className="text-xs">View all</Text>
              </Pressable>

              <Pressable 
                onPress={() => router.push('/agent/settings')}
                className="flex-1 bg-white rounded-2xl p-4 ml-2 border border-slate-100 shadow-sm"
              >
                <View className="bg-slate-50 p-2 rounded-xl mb-3 self-start">
                  <Users size={20} color={primaryNavy} />
                </View>
                <Text style={{ color: primaryNavy, fontFamily: 'Poppins_700Bold' }} className="text-sm">Settings</Text>
                <Text style={{ color: '#64748b', fontFamily: 'Poppins_500Medium' }} className="text-xs">Configure</Text>
              </Pressable>
            </View>
          </View>

          {/* Currency Selection Section */}
          <View className="mb-8">
            <Text style={{ color: primaryNavy, fontFamily: 'Poppins_800ExtraBold' }} className="text-2xl mb-6">Currency</Text>
            <View className="flex-row justify-between">
              <Pressable 
                onPress={() => setSelectedCurrency('NGN')}
                style={{ backgroundColor: selectedCurrency === 'NGN' ? primaryNavy : '#f1f5f9' }}
                className={`flex-1 mx-2 px-10 py-5 rounded-2xl shadow-lg ${selectedCurrency === 'NGN' ? '' : 'border border-slate-200'}`}
              >
                <Text style={{ 
                  color: selectedCurrency === 'NGN' ? 'white' : '#64748b',
                  fontFamily: 'Poppins_700Bold'
                }} className="text-lg text-center">NGN</Text>
              </Pressable>
              <Pressable 
                onPress={() => setSelectedCurrency('USD')}
                style={{ backgroundColor: selectedCurrency === 'USD' ? primaryNavy : '#f1f5f9' }}
                className={`flex-1 mx-2 px-10 py-5 rounded-2xl shadow-lg ${selectedCurrency === 'USD' ? '' : 'border border-slate-200'}`}
              >
                <Text style={{ 
                  color: selectedCurrency === 'USD' ? 'white' : '#64748b',
                  fontFamily: 'Poppins_700Bold'
                }} className="text-lg text-center">USD</Text>
              </Pressable>
              <Pressable 
                onPress={() => setSelectedCurrency('EUR')}
                style={{ backgroundColor: selectedCurrency === 'EUR' ? primaryNavy : '#f1f5f9' }}
                className={`flex-1 mx-2 px-10 py-5 rounded-2xl shadow-lg ${selectedCurrency === 'EUR' ? '' : 'border border-slate-200'}`}
              >
                <Text style={{ 
                  color: selectedCurrency === 'EUR' ? 'white' : '#64748b',
                  fontFamily: 'Poppins_700Bold'
                }} className="text-lg text-center">EUR</Text>
              </Pressable>
            </View>
          </View>

          {/* Nexa Reader Section */}
          <View className="mb-8">
            <Text style={{ color: primaryNavy, fontFamily: 'Poppins_800ExtraBold' }} className="text-2xl mb-6">Nexa Reader</Text>
            
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
                          { position: 'absolute', width: 200, height: 125, borderRadius: 16, backgroundColor: primaryNavy },
                          animatedPulseStyle
                        ]} 
                      />
                      
                      {/* Card Visual - Blue Design */}
                      <View 
                        style={{ 
                          backgroundColor: isScanning ? '#1e40af' : primaryNavy,
                          width: 180,
                          height: 110,
                          borderRadius: 12,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 6 },
                          shadowOpacity: 0.15,
                          shadowRadius: 12,
                          elevation: 8
                        }}
                        className="items-center justify-center relative overflow-hidden"
                      >
                        {/* Background gradient circles */}
                        <View 
                          style={{ 
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            width: 120,
                            height: 120,
                            borderRadius: 60,
                            position: 'absolute',
                            top: -30,
                            right: -20
                          }}
                        />
                        <View 
                          style={{ 
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            position: 'absolute',
                            bottom: -20,
                            left: -10
                          }}
                        />
                        
                        {/* Card chip */}
                        <View 
                          style={{ 
                            backgroundColor: '#FFD700',
                            width: 28,
                            height: 22,
                            borderRadius: 4,
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 3
                          }}
                        >
                          {/* Chip details */}
                          <View className="absolute inset-1 border border-yellow-600/20 rounded-sm" />
                        </View>
                        
                        {/* VISA logo area */}
                        <View className="absolute top-4 right-4">
                          <Text className="text-white font-bold text-xs opacity-80">VISA</Text>
                        </View>
                        
                        {/* Card number */}
                        <View className="absolute bottom-8 left-4">
                          <Text className="text-white font-mono text-sm tracking-wider">
                            7048 •••• •••• 0349
                          </Text>
                        </View>
                        
                        {/* Cardholder name */}
                        <View className="absolute bottom-3 left-4">
                          <Text className="text-white/80 text-xs font-medium uppercase tracking-wide">
                            GERTRUDE AMELL KENT
                          </Text>
                        </View>
                        
                        {/* Expiry */}
                        <View className="absolute bottom-3 right-4">
                          <Text className="text-white/60 text-xs">12/28</Text>
                        </View>
                        
                        {/* Scanning indicator */}
                        {isScanning && (
                          <View className="absolute inset-0 items-center justify-center">
                            <View className="w-3 h-3 bg-white rounded-full animate-pulse" />
                          </View>
                        )}
                      </View>
                    </Pressable>
                    
                    <Text style={{ 
                      color: isScanning ? '#2563eb' : '#64748b',
                      fontFamily: 'Poppins_700Bold'
                    }} className="text-lg mt-6">
                      {isScanning ? 'Scanning the card...' : 'Tap to scan card'}
                    </Text>
                    
                    {isScanning && (
                      <Text style={{ 
                        color: '#3b82f6',
                        fontFamily: 'Poppins_500Medium'
                      }} className="text-sm mt-2 animate-pulse">
                        Hold card steady
                      </Text>
                    )}
                  </View>
                </View>
                
                {/* Copy QR Code Button (styled as scan card button) */}
                <Pressable className="bg-slate-100 px-6 py-3 rounded-xl border border-slate-200 shadow-sm">
                  <Text style={{ 
                    color: '#64748b',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-base">Scan card</Text>
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
            <View className="mt-8 bg-blue-50/50 p-8 rounded-2xl border border-blue-100/50 flex-row items-start">
               <View className="bg-blue-600/10 p-3 rounded-xl mr-6">
                  <ShieldCheck size={28} color={primaryNavy} />
               </View>
               <View className="flex-1">
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_800ExtraBold'
                  }} className="text-lg mb-2">Nexa Security</Text>
                  <Text style={{ 
                    color: '#64748b',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-base leading-6">Hold your RFID card close to the back of the device for high-speed synchronization.</Text>
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
