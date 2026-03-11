import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Logo } from '../components/Logo';
import { Mail, Lock, User, ChevronLeft, ArrowRight, Wallet, Briefcase } from 'lucide-react-native';
import { useState } from 'react';

export default function SignupScreen() {
  const router = useRouter();
  const [role, setRole] = useState<'agent' | 'salesperson'>('agent');
  const primaryNavy = "#002B5B";

  return (
    <View style={{ backgroundColor: primaryNavy }} className="flex-1">
      <StatusBar barStyle="light-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View className="px-8 pt-16 pb-10 justify-center flex-1">
            {/* Back Button */}
            <Pressable 
              onPress={() => router.back()}
              className="w-12 h-12 rounded-2xl bg-white/10 items-center justify-center mb-8 active:bg-white/20"
            >
              <ChevronLeft size={24} color="white" />
            </Pressable>

            {/* Header section */}
            <View className="mb-10 items-center">
              <Logo size={60} showText={false} inverted={true} />
              <Text className="text-white text-4xl font-black mt-6 tracking-tighter">Sign Up</Text>
              <Text className="text-white/60 text-lg mt-1 font-medium">Create your portal</Text>
            </View>

            {/* Form Section */}
            <View className="space-y-4">
              <View>
                <Text className="text-white/40 text-[10px] font-black mb-3 ml-1 uppercase tracking-[2px]">Full Name</Text>
                <View className="flex-row items-center bg-white rounded-2xl px-6 h-20 shadow-lg shadow-black/20">
                  <User size={18} color={primaryNavy} opacity={0.4} className="mr-3" />
                  <TextInput 
                    placeholder="John Doe"
                    placeholderTextColor="#94a3b8"
                    className="flex-1 text-slate-900 text-base font-bold h-full"
                  />
                </View>
              </View>

              <View className="mt-4">
                <Text className="text-white/40 text-[10px] font-black mb-3 ml-1 uppercase tracking-[2px]">Email Address</Text>
                <View className="flex-row items-center bg-white rounded-2xl px-6 h-20 shadow-lg shadow-black/20">
                  <Mail size={18} color={primaryNavy} opacity={0.4} className="mr-3" />
                  <TextInput 
                    placeholder="name@example.com"
                    placeholderTextColor="#94a3b8"
                    className="flex-1 text-slate-900 text-base font-bold h-full"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View className="mt-4">
                <Text className="text-white/40 text-[10px] font-black mb-3 ml-1 uppercase tracking-[2px]">Password</Text>
                <View className="flex-row items-center bg-white rounded-2xl px-6 h-20 shadow-lg shadow-black/20">
                  <Lock size={18} color={primaryNavy} opacity={0.4} className="mr-3" />
                  <TextInput 
                    placeholder="••••••••"
                    placeholderTextColor="#94a3b8"
                    className="flex-1 text-slate-900 text-base font-bold h-full"
                    secureTextEntry
                  />
                </View>
              </View>

              {/* Account Type Selection */}
              <View className="mt-6">
                <Text className="text-white/40 text-[10px] font-black mb-3 ml-1 uppercase tracking-[2px]">Account Type</Text>
                <View className="flex-row space-x-4">
                  <Pressable 
                    onPress={() => setRole('agent')}
                    className={`flex-1 h-16 rounded-xl border-2 items-center justify-center flex-row ${role === 'agent' ? 'border-white bg-white/10' : 'bg-transparent border-white/10'}`}
                  >
                    <Wallet size={16} color="white" className="mr-2" opacity={role === 'agent' ? 1 : 0.4} />
                    <Text className={`text-white ${role === 'agent' ? 'font-black' : 'font-bold opacity-40'}`}>Agent</Text>
                  </Pressable>
                  <Pressable 
                    onPress={() => setRole('salesperson')}
                    className={`flex-1 h-16 rounded-xl border-2 items-center justify-center flex-row ${role === 'salesperson' ? 'border-white bg-white/10' : 'bg-transparent border-white/10'} ml-4`}
                  >
                    <Briefcase size={16} color="white" className="mr-2" opacity={role === 'salesperson' ? 1 : 0.4} />
                    <Text className={`text-white ${role === 'salesperson' ? 'font-black' : 'font-bold opacity-40'}`}>Sales</Text>
                  </Pressable>
                </View>
              </View>

              {/* Main Action Button */}
              <Pressable 
                onPress={() => {
                  if (role === 'agent') {
                    router.replace('/(main)/agent/scan');
                  } else {
                    router.replace('/(main)/salesperson/dashboard');
                  }
                }} 
                className="bg-white h-20 rounded-2xl items-center justify-center shadow-2xl shadow-black/30 active:bg-slate-50 mt-10"
              >
                <Text style={{ 
                  color: primaryNavy,
                  fontFamily: 'Poppins_800ExtraBold'
                }} className="text-xl uppercase tracking-widest">Create Account</Text>
              </Pressable>

              <View className="flex-row justify-center items-center mt-8 mb-10">
                <Text className="text-white/40 text-base font-medium">Already have an account? </Text>
                <Pressable onPress={() => router.push('/login')}>
                  <Text className="text-white text-base font-bold underline">Sign In</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
