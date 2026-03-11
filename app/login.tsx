import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Logo } from '../components/Logo';
import { Mail, Lock, ChevronLeft, ArrowRight } from 'lucide-react-native';
import { useState } from 'react';

export default function LoginScreen() {
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
          <View className="px-8 pt-16 pb-10">
            {/* Back Button */}
            <Pressable 
              onPress={() => router.back()}
              className="w-12 h-12 rounded-2xl bg-white/10 items-center justify-center mb-8 active:bg-white/20"
            >
              <ChevronLeft size={24} color="white" />
            </Pressable>

            {/* Header section with Logo */}
            <View className="mb-10 items-center">
              <Logo size={60} showText={false} inverted={true} />
              <Text className="text-white text-4xl font-black mt-6 tracking-tighter">Sign In</Text>
              <Text className="text-white/60 text-lg mt-1 font-medium">Access your portal</Text>
            </View>

            {/* Form Section */}
            <View className="space-y-6">
              <View>
                <Text className="text-white/40 text-[10px] font-black mb-3 ml-1 uppercase tracking-[2px]">Email Address</Text>
                <View className="flex-row items-center bg-white rounded-3xl px-6 h-16 shadow-lg shadow-black/20">
                  <Mail size={20} color={primaryNavy} opacity={0.4} className="mr-3" />
                  <TextInput 
                    placeholder="name@example.com"
                    placeholderTextColor="#94a3b8"
                    className="flex-1 text-slate-900 text-lg font-bold h-full"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View className="mt-4">
                <Text className="text-white/40 text-[10px] font-black mb-3 ml-1 uppercase tracking-[2px]">Password</Text>
                <View className="flex-row items-center bg-white rounded-3xl px-6 h-16 shadow-lg shadow-black/20">
                  <Lock size={20} color={primaryNavy} opacity={0.4} className="mr-3" />
                  <TextInput 
                    placeholder="••••••••"
                    placeholderTextColor="#94a3b8"
                    className="flex-1 text-slate-900 text-lg font-bold h-full"
                    secureTextEntry
                  />
                </View>
                <Pressable className="mt-4 self-end">
                  <Text className="text-white/60 text-sm font-bold">Forgot Password?</Text>
                </Pressable>
              </View>

              {/* Portal Selection */}
              <View className="mt-4">
                <Text className="text-white/40 text-[10px] font-black mb-3 ml-1 uppercase tracking-[2px]">Select Portal</Text>
                <View className="flex-row space-x-4">
                  <Pressable 
                    onPress={() => setRole('agent')}
                    className={`flex-1 h-14 rounded-2xl border-2 items-center justify-center flex-row ${role === 'agent' ? 'border-white bg-white/10' : 'bg-transparent border-white/10'}`}
                  >
                    <Text className={`text-white ${role === 'agent' ? 'font-black' : 'font-bold opacity-40'}`}>Agent</Text>
                  </Pressable>
                  <Pressable 
                    onPress={() => setRole('salesperson')}
                    className={`flex-1 h-14 rounded-2xl border-2 items-center justify-center flex-row ${role === 'salesperson' ? 'border-white bg-white/10' : 'bg-transparent border-white/10'} ml-4`}
                  >
                    <Text className={`text-white ${role === 'salesperson' ? 'font-black' : 'font-bold opacity-40'}`}>Sales Pro</Text>
                  </Pressable>
                </View>
              </View>

              {/* Main Login Button (White) */}
              <Pressable 
                onPress={() => {
                  if (role === 'agent') {
                    router.replace('/(main)/agent/scan');
                  } else {
                    router.replace('/(main)/salesperson/dashboard');
                  }
                }} 
                className="bg-white h-16 rounded-full items-center justify-center flex-row shadow-2xl shadow-black/30 active:bg-slate-50 mt-10"
              >
                <Text style={{ color: primaryNavy }} className="text-xl font-bold mr-2">Login</Text>
                <ArrowRight size={20} color={primaryNavy} />
              </Pressable>

              <View className="flex-row justify-center items-center mt-10 mb-10">
                <Text className="text-white/40 text-base font-medium">New around here? </Text>
                <Pressable onPress={() => router.push('/signup')}>
                  <Text className="text-white text-base font-bold underline">Create account</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
