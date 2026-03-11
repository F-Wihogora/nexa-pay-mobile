import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Logo } from '../components/Logo';
import { Mail, Lock, User, ChevronLeft, ArrowRight, Wallet, Briefcase } from 'lucide-react-native';
import { useState } from 'react';

export default function SignupScreen() {
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

          <View className="mb-8">
            <Logo size={50} showText={false} />
            <Text style={{ color: primaryNavy }} className="text-4xl font-black mt-6 tracking-tighter">Sign Up</Text>
            <Text className="text-slate-500 text-lg mt-1 font-medium">Create your digital wallet</Text>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-slate-400 text-sm font-bold mb-3 ml-1 uppercase tracking-widest">Full Name</Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-2xl px-5 h-14">
                <User size={18} color={primaryNavy} opacity={0.4} className="mr-3" />
                <TextInput 
                  placeholder="John Doe"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 text-slate-900 text-base font-bold h-full"
                />
              </View>
            </View>

            <View className="mt-4">
              <Text className="text-slate-400 text-sm font-bold mb-3 ml-1 uppercase tracking-widest">Email Address</Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-2xl px-5 h-14">
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
              <Text className="text-slate-400 text-sm font-bold mb-3 ml-1 uppercase tracking-widest">Password</Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-2xl px-5 h-14">
                <Lock size={18} color={primaryNavy} opacity={0.4} className="mr-3" />
                <TextInput 
                  placeholder="••••••••"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 text-slate-900 text-base font-bold h-full"
                  secureTextEntry
                />
              </View>
            </View>

            <View className="mt-6">
              <Text className="text-slate-400 text-sm font-bold mb-3 ml-1 uppercase tracking-widest">Account Type</Text>
              <View className="flex-row space-x-4">
                <Pressable 
                  onPress={() => setRole('agent')}
                  className={`flex-1 h-14 rounded-2xl border-2 items-center justify-center flex-row ${role === 'agent' ? 'border-blue-900 bg-blue-50' : 'bg-slate-50 border-slate-100'}`}
                >
                  <Wallet size={16} color={primaryNavy} className="mr-2" opacity={role === 'agent' ? 1 : 0.4} />
                  <Text style={{ color: primaryNavy }} className={role === 'agent' ? 'font-black' : 'font-bold opacity-40'}>Agent</Text>
                </Pressable>
                <Pressable 
                  onPress={() => setRole('salesperson')}
                  className={`flex-1 h-14 rounded-2xl border-2 items-center justify-center flex-row ${role === 'salesperson' ? 'border-blue-900 bg-blue-50' : 'bg-slate-50 border-slate-100'} ml-4`}
                >
                  <Briefcase size={16} color={primaryNavy} className="mr-2" opacity={role === 'salesperson' ? 1 : 0.4} />
                  <Text style={{ color: primaryNavy }} className={role === 'salesperson' ? 'font-black' : 'font-bold opacity-40'}>Sales</Text>
                </Pressable>
              </View>
            </View>

            <Pressable 
              onPress={() => router.replace('/(main)/dashboard')} 
              style={{ backgroundColor: primaryNavy, transform: [{ skewX: '-10deg' }] }}
              className="h-16 rounded-xl items-center justify-center flex-row shadow-2xl shadow-blue-900/20 active:opacity-90 mt-10 overflow-hidden"
            >
              <View style={{ transform: [{ skewX: '10deg' }] }} className="flex-row items-center">
                <Text className="text-white text-xl font-bold mr-2">Create Account</Text>
                <ArrowRight size={20} color="white" />
              </View>
            </Pressable>

            <View className="flex-row justify-center items-center mt-6 mb-10">
              <Text className="text-slate-400 text-base font-medium">Already have an account? </Text>
              <Pressable onPress={() => router.push('/login')}>
                <Text style={{ color: primaryNavy }} className="text-base font-bold underline">Sign In</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
