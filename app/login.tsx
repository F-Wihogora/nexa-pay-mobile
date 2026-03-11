import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Logo } from '../components/Logo';
import { Mail, Lock, ChevronLeft, ArrowRight } from 'lucide-react-native';

import { useState } from 'react';

export default function LoginScreen() {
  const router = useRouter();
  const [role, setRole] = useState<'agent' | 'salesperson'>('agent');
  const primaryNavy = "#002B5B";

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="p-8 pt-16">
          <Pressable 
            onPress={() => router.back()}
            className="w-12 h-12 rounded-2xl bg-slate-50 items-center justify-center mb-10 active:bg-slate-100"
          >
            <ChevronLeft size={24} color={primaryNavy} />
          </Pressable>

          <View className="mb-12">
            <Logo size={60} showText={false} />
            <Text style={{ color: primaryNavy }} className="text-4xl font-black mt-6 tracking-tighter">Login</Text>
            <Text className="text-slate-500 text-lg mt-1 font-medium">Continue your journey</Text>
          </View>

          <View className="space-y-6">
            <View>
              <Text className="text-slate-400 text-sm font-bold mb-3 ml-1 uppercase tracking-widest">Email Address</Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-2xl px-5 h-16">
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
              <View className="flex-row justify-between mb-3 px-1">
                <Text className="text-slate-400 text-sm font-bold uppercase tracking-widest">Password</Text>
              </View>
              <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-2xl px-5 h-16">
                <Lock size={20} color={primaryNavy} opacity={0.4} className="mr-3" />
                <TextInput 
                  placeholder="••••••••"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 text-slate-900 text-lg font-bold h-full"
                  secureTextEntry
                />
              </View>
              <Pressable className="mt-3 self-end">
                <Text style={{ color: primaryNavy }} className="text-sm font-bold opacity-60">Forgot Password?</Text>
              </Pressable>
            </View>

            <View className="mt-4">
              <Text className="text-slate-400 text-sm font-bold mb-3 ml-1 uppercase tracking-widest">Select Portal</Text>
              <View className="flex-row space-x-4">
                <Pressable 
                  onPress={() => setRole('agent')}
                  className={`flex-1 h-14 rounded-2xl border-2 items-center justify-center flex-row ${role === 'agent' ? 'border-blue-900 bg-blue-50' : 'bg-slate-50 border-slate-100'}`}
                >
                  <Text style={{ color: primaryNavy }} className={role === 'agent' ? 'font-black' : 'font-bold opacity-40'}>Agent</Text>
                </Pressable>
                <Pressable 
                  onPress={() => setRole('salesperson')}
                  className={`flex-1 h-14 rounded-2xl border-2 items-center justify-center flex-row ${role === 'salesperson' ? 'border-blue-900 bg-blue-50' : 'bg-slate-50 border-slate-100'} ml-4`}
                >
                  <Text style={{ color: primaryNavy }} className={role === 'salesperson' ? 'font-black' : 'font-bold opacity-40'}>Sales Pro</Text>
                </Pressable>
              </View>
            </View>

            <Pressable 
              onPress={() => {
                if (role === 'agent') {
                  router.replace('/(main)/agent/scan');
                } else {
                  router.replace('/(main)/salesperson/dashboard');
                }
              }} 
              style={{ backgroundColor: primaryNavy, transform: [{ skewX: '-10deg' }] }}
              className="h-16 rounded-xl items-center justify-center flex-row shadow-2xl shadow-blue-900/20 active:opacity-90 mt-10 overflow-hidden"
            >
              <View style={{ transform: [{ skewX: '10deg' }] }} className="flex-row items-center">
                <Text className="text-white text-xl font-bold mr-2">Sign In</Text>
                <ArrowRight size={20} color="white" />
              </View>
            </Pressable>

            <View className="flex-row justify-center items-center mt-10">
              <Text className="text-slate-400 text-base font-medium">No account yet? </Text>
              <Pressable onPress={() => router.push('/signup')}>
                <Text style={{ color: primaryNavy }} className="text-base font-bold underline">Create one</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
