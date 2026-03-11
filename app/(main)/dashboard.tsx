import { View, Text, ScrollView, Pressable, SafeAreaView, Dimensions, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Logo } from '../../components/Logo';
import { 
  Bell,
  History, 
  Settings,
  PlusCircle,
  Maximize,
  Search,
  ArrowRight,
  User,
  LogOut,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Wifi,
  MoreVertical
} from 'lucide-react-native';
import { useState, useEffect } from 'react';
import Svg, { Rect, Defs, LinearGradient, Stop, Circle, Path } from 'react-native-svg';
import Animated, { useAnimatedStyle, withRepeat, withTiming, withSequence, useSharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const router = useRouter();
  const primaryNavy = "#002B5B";
  const lightBlue = "#004C99";
  const [activeTab, setActiveTab] = useState<'scan' | 'topup' | 'history' | 'settings'>('scan');
  
  // Animation for the scanner pulse
  const pulseValue = useSharedValue(1);
  
  useEffect(() => {
    pulseValue.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseValue.value }],
    opacity: 0.3 / pulseValue.value
  }));

  const NexaCard = () => (
    <View className="px-6 mt-4">
      <View style={{ height: 210, width: '100%', borderRadius: 32, overflow: 'hidden' }} className="shadow-2xl shadow-blue-900/50">
        <Svg height="100%" width="100%" viewBox="0 0 350 200">
          <Defs>
            <LinearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#001F3F" />
              <Stop offset="50%" stopColor="#004080" />
              <Stop offset="100%" stopColor="#002B5B" />
            </LinearGradient>
          </Defs>
          
          {/* Card Background */}
          <Rect width="100%" height="100%" fill="url(#cardGrad)" />
          
          {/* Subtle Abstract Wave Patterns */}
          <Path
            d="M0 150 Q175 100 350 150 V200 H0 Z"
            fill="white"
            fillOpacity="0.05"
          />
          <Path
            d="M0 100 Q175 50 350 100 V200 H0 Z"
            fill="white"
            fillOpacity="0.03"
          />
        </Svg>
        
        {/* Card Overlay Content */}
        <View className="absolute inset-0 p-8 justify-between">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-white/60 text-[10px] font-black uppercase tracking-widest">Nexa Wallet Token</Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-white text-2xl font-black">RFID Card</Text>
                <Wifi size={16} color="white" className="ml-2" opacity={0.6} />
              </View>
            </View>
            <View className="bg-white/20 p-2 rounded-xl">
              <Logo size={24} showText={false} />
            </View>
          </View>
          
          <View>
            <Text className="text-white text-xl font-bold tracking-[4px] mb-4">5737 4277 4925 2858</Text>
            <View className="flex-row justify-between items-end">
              <View>
                <Text className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Agent Holder</Text>
                <Text className="text-white font-bold tracking-tight">ALEX N. SMITHERS</Text>
              </View>
              <View className="items-end">
                <Text className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Expires</Text>
                <Text className="text-white font-bold tracking-tight">05/26</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Stylized Chip */}
        <View className="absolute top-[45%] left-8 w-10 h-8 bg-yellow-400/80 rounded-md border border-yellow-200/50" />
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'scan':
        return (
          <View className="px-6 flex-1">
            <NexaCard />
            
            <View className="mt-12 items-center flex-1">
              <Text style={{ color: primaryNavy }} className="text-xl font-black mb-2 uppercase tracking-tight">Safe Scanning</Text>
              <Text className="text-slate-400 text-center text-sm font-medium mb-12 px-8">Bring the RFID card to the back of your device to initiate top-up.</Text>
              
              {/* Better Scan Feature Design: Radar Scanner */}
              <View className="relative items-center justify-center">
                <Animated.View 
                  style={[{ width: 180, height: 180, borderRadius: 90, backgroundColor: primaryNavy }, animatedPulseStyle]} 
                  className="absolute"
                />
                <View 
                  style={{ backgroundColor: primaryNavy, width: 140, height: 140, borderRadius: 70 }} 
                  className="items-center justify-center shadow-2xl shadow-blue-900/50"
                >
                  <Maximize size={48} color="white" />
                </View>
                
                {/* Orbital dots */}
                <View className="absolute w-[220px] h-[220px] rounded-full border border-slate-100 border-dashed items-center justify-center" />
              </View>
              
              <Pressable 
                onPress={() => setActiveTab('topup')}
                className="mt-16 bg-slate-50 border border-slate-100 flex-row items-center px-10 py-4 rounded-3xl active:bg-slate-100"
              >
                <Search size={18} color={primaryNavy} className="mr-3" />
                <Text style={{ color: primaryNavy }} className="font-bold">Manual Card Entry</Text>
              </Pressable>
            </View>
          </View>
        );
      case 'topup':
        return (
          <View className="px-6 mt-6">
            <Text style={{ color: primaryNavy }} className="text-2xl font-black mb-6">Top-Up Wallet</Text>
            <View className="bg-slate-50 border border-slate-100 rounded-[32px] p-8">
              <View className="flex-row items-center border-b-2 border-slate-200 pb-4">
                <Text style={{ color: primaryNavy }} className="text-5xl font-black mr-2">$</Text>
                <TextInput 
                  placeholder="0.00" 
                  keyboardType="numeric" 
                  className="text-5xl font-black flex-1" 
                  style={{ color: primaryNavy }}
                  autoFocus
                />
              </View>
              <View className="flex-row flex-wrap justify-between mt-8">
                {['10', '20', '50', '100'].map(amt => (
                  <Pressable key={amt} className="w-[22%] bg-white border border-slate-100 h-12 rounded-xl items-center justify-center mb-4">
                    <Text style={{ color: primaryNavy }} className="font-bold">${amt}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <Pressable 
               style={{ backgroundColor: primaryNavy, transform: [{ skewX: '-10deg' }] }}
               className="mt-10 h-16 rounded-xl items-center justify-center shadow-xl shadow-blue-900/30 overflow-hidden"
            >
              <View style={{ transform: [{ skewX: '10deg' }] }} className="flex-row items-center">
                <Text className="text-white font-black text-xl mr-2">Confirm Deposit</Text>
                <ShieldCheck size={24} color="white" />
              </View>
            </Pressable>
          </View>
        );
      case 'history':
        return (
          <View className="px-6 mt-6">
            <Text style={{ color: primaryNavy }} className="text-2xl font-black mb-8">Transactions</Text>
            {[
              { id: '1', name: 'Card Top-Up', uid: 'AABB-CCDD', amt: '+$50.00', date: '9:41 AM' },
              { id: '2', name: 'Card Top-Up', uid: 'EEFF-1122', amt: '+$100.00', date: 'Yesterday' },
              { id: '3', name: 'Card Top-Up', uid: '4455-6677', amt: '+$20.00', date: 'Yesterday' },
            ].map((item) => (
              <View key={item.id} className="flex-row items-center justify-between mb-4 bg-slate-50 p-5 rounded-3xl">
                <View className="flex-row items-center">
                  <View style={{ backgroundColor: primaryNavy }} className="w-12 h-12 rounded-2xl items-center justify-center opacity-10">
                    <History size={20} color={primaryNavy} />
                  </View>
                  <View className="ml-4">
                    <Text style={{ color: primaryNavy }} className="font-black text-base">{item.uid}</Text>
                    <Text className="text-slate-500 text-xs font-bold uppercase tracking-tighter">{item.date}</Text>
                  </View>
                </View>
                <Text className="text-green-600 font-bold text-base">{item.amt}</Text>
              </View>
            ))}
          </View>
        );
      case 'settings':
        return (
          <View className="px-6 mt-6">
            <Text style={{ color: primaryNavy }} className="text-2xl font-black mb-8">Agent Config</Text>
            <View className="space-y-4">
              {[
                { icon: User, label: 'Profile Management' },
                { icon: ShieldCheck, label: 'Security & Privacy' },
                { icon: Settings, label: 'App Settings' },
              ].map((item, idx) => (
                <Pressable key={idx} className="flex-row items-center justify-between bg-slate-50 border border-slate-100 p-5 rounded-2xl mb-3">
                  <View className="flex-row items-center">
                    <item.icon size={20} color={primaryNavy} opacity={0.6} />
                    <Text style={{ color: primaryNavy }} className="ml-4 font-bold text-base">{item.label}</Text>
                  </View>
                  <ChevronRight size={18} color="#94a3b8" />
                </Pressable>
              ))}
              <Pressable 
                onPress={() => router.replace('/login')}
                className="flex-row items-center justify-center bg-red-50 border border-red-100 p-5 rounded-2xl mt-8"
              >
                <LogOut size={20} color="#ef4444" />
                <Text className="ml-3 text-red-500 font-bold text-lg">Sign Out</Text>
              </Pressable>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Redesigned TOP BAR */}
      <View className="px-6 py-4 flex-row justify-between items-center border-b border-slate-50">
        <View className="flex-row items-center">
          <View className="relative">
            <View 
              style={{ backgroundColor: primaryNavy, width: 44, height: 44, borderRadius: 16 }} 
              className="items-center justify-center"
            >
              <Text className="text-white font-black text-lg">AN</Text>
            </View>
            <View className="absolute bottom-[-2] right-[-2] bg-white rounded-full p-[2px] border border-slate-100">
               <View className="bg-green-500 w-3 h-3 rounded-full" />
            </View>
          </View>
          <View className="ml-3">
            <Text style={{ color: primaryNavy }} className="text-base font-black tracking-tight">Alex Nexa</Text>
            <View className="flex-row items-center">
              <Text className="text-slate-400 text-[10px] font-black uppercase tracking-widest mr-1">Role:</Text>
              <Text style={{ color: primaryNavy }} className="text-[10px] font-black uppercase tracking-widest opacity-60">Verified Agent</Text>
            </View>
          </View>
        </View>
        
        <View className="flex-row items-center space-x-3">
          <Pressable className="w-10 h-10 rounded-2xl bg-slate-50 items-center justify-center border border-slate-100">
            <Bell size={20} color={primaryNavy} />
          </Pressable>
          <Pressable className="w-10 h-10 rounded-2xl bg-slate-50 items-center justify-center border border-slate-100 ml-2">
            <MoreVertical size={20} color={primaryNavy} />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {renderContent()}
        <View className="h-32" />
      </ScrollView>

      {/* CUSTOM FLOATING BOTTOM BAR */}
      <View className="absolute bottom-8 left-6 right-6 h-20 bg-white/95 rounded-[28px] border border-slate-100 flex-row items-center justify-around px-4 shadow-2xl shadow-blue-900/10 backdrop-blur-md">
         {[
           { id: 'scan', icon: Maximize },
           { id: 'topup', icon: PlusCircle },
           { id: 'history', icon: History },
           { id: 'settings', icon: Settings },
         ].map((tab) => (
           <Pressable 
             key={tab.id}
             onPress={() => setActiveTab(tab.id as any)}
             className={`w-12 h-12 rounded-2xl items-center justify-center ${activeTab === tab.id ? '' : 'opacity-20'}`}
             style={activeTab === tab.id ? { backgroundColor: primaryNavy } : {}}
           >
             <tab.icon size={24} color={activeTab === tab.id ? "white" : primaryNavy} />
           </Pressable>
         ))}
      </View>
    </SafeAreaView>
  );
}
