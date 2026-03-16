import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, User, Mail, Shield, Calendar, MapPin, Phone, Edit3, Settings, LogOut } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { StorageService } from '../../../services/storage';
import { User as UserType, apiService } from '../../../services/api';

export default function ProfileScreen() {
  const router = useRouter();
  const primaryNavy = "#002B5B";
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [userStats, setUserStats] = useState({
    totalTransactions: 0,
    totalVolume: 0,
    successRate: 0,
    isLoading: true
  });

  // Load current user data and stats
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await StorageService.getUser();
        setCurrentUser(user);
        
        // Set API token for authenticated requests
        const token = await StorageService.getToken();
        if (token) {
          apiService.setToken(token);
          await loadUserStats();
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };
    loadUserData();
  }, []);

  const loadUserStats = async () => {
    try {
      setUserStats(prev => ({ ...prev, isLoading: true }));
      
      const transactionsResponse = await apiService.getUserTransactions(1000);
      
      if (transactionsResponse.success) {
        const transactions = transactionsResponse.transactions || [];
        const totalTransactions = transactions.length;
        const totalVolume = transactions.reduce((sum: number, tx: any) => sum + (tx.amount || 0), 0);
        const successfulTransactions = transactions.filter((tx: any) => tx.status === 'SUCCESS').length;
        const successRate = totalTransactions > 0 ? Math.round((successfulTransactions / totalTransactions) * 100) : 0;
        
        setUserStats({
          totalTransactions,
          totalVolume: totalVolume / 100,
          successRate,
          isLoading: false
        });
      }
    } catch (error) {
      console.error('Failed to load user stats:', error);
      setUserStats(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
        <Pressable 
          onPress={() => router.back()}
          className="w-10 h-10 rounded-xl bg-slate-50 items-center justify-center"
        >
          <ArrowLeft size={20} color={primaryNavy} />
        </Pressable>
        
        <Text style={{ 
          color: primaryNavy,
          fontFamily: 'Poppins_700Bold'
        }} className="text-lg">Profile</Text>
        
        <Pressable 
          onPress={() => router.push('/(main)/agent/edit-profile')}
          className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center"
        >
          <Edit3 size={18} color={primaryNavy} />
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-6">
          {/* Profile Header */}
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100">
            <View className="items-center">
              {/* Profile Image */}
              <View className="relative mb-4">
                <View className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  <View 
                    style={{ backgroundColor: primaryNavy, width: 96, height: 96, borderRadius: 48 }} 
                    className="items-center justify-center"
                  >
                    <Text style={{ 
                      color: 'white',
                      fontFamily: 'Poppins_900Black'
                    }} className="text-3xl">{currentUser?.username ? currentUser.username.split(' ').map(n => n[0]).join('').toUpperCase() : 'A'}</Text>
                  </View>
                </View>
                <View className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-3 border-white shadow-md" />
              </View>
              
              {/* Profile Info */}
              <Text style={{ 
                color: primaryNavy,
                fontFamily: 'Poppins_800ExtraBold'
              }} className="text-2xl mb-1">{currentUser?.username || 'Agent'}</Text>
              <Text style={{ 
                color: '#64748b',
                fontFamily: 'Poppins_600SemiBold'
              }} className="text-sm mb-1">{currentUser?.role === 'admin' ? 'Nexa Agent' : 'Nexa Salesman'}</Text>
              <Text style={{ 
                color: '#94a3b8',
                fontFamily: 'Poppins_500Medium'
              }} className="text-xs mb-6">{currentUser?.email || 'Not available'}</Text>
              
              {/* Action Buttons */}
              <View className="flex-row space-x-3">
                <Pressable 
                  onPress={() => router.push('/(main)/agent/edit-profile')}
                  style={{ backgroundColor: primaryNavy }}
                  className="px-6 py-3 rounded-xl shadow-sm flex-row items-center"
                >
                  <Edit3 size={16} color="white" className="mr-2" />
                  <Text style={{ 
                    color: 'white',
                    fontFamily: 'Poppins_600SemiBold'
                  }} className="text-sm">Edit Profile</Text>
                </Pressable>
                
                <Pressable 
                  onPress={() => router.push('/(main)/agent/settings')}
                  className="px-6 py-3 rounded-xl bg-slate-100 border border-slate-200 flex-row items-center"
                >
                  <Settings size={16} color={primaryNavy} className="mr-2" />
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_600SemiBold'
                  }} className="text-sm">Settings</Text>
                </Pressable>
              </View>
            </View>
          </View>
          {/* Stats Cards */}
          <View className="flex-row justify-between mb-6 space-x-3">
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <View className="items-center">
                <Text style={{ 
                  color: primaryNavy,
                  fontFamily: 'Poppins_800ExtraBold'
                }} className="text-2xl mb-1">
                  {userStats.isLoading ? '...' : userStats.totalTransactions.toLocaleString()}
                </Text>
                <Text style={{ 
                  color: '#64748b',
                  fontFamily: 'Poppins_500Medium'
                }} className="text-xs text-center">Total{'\n'}Transactions</Text>
              </View>
            </View>
            
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <View className="items-center">
                <Text style={{ 
                  color: primaryNavy,
                  fontFamily: 'Poppins_800ExtraBold'
                }} className="text-2xl mb-1">
                  {userStats.isLoading ? '...' : 
                   userStats.totalVolume >= 1000 
                     ? `$${(userStats.totalVolume / 1000).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}K`
                     : `$${userStats.totalVolume.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
                  }
                </Text>
                <Text style={{ 
                  color: '#64748b',
                  fontFamily: 'Poppins_500Medium'
                }} className="text-xs text-center">Total{'\n'}Volume</Text>
              </View>
            </View>
            
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <View className="items-center">
                <Text style={{ 
                  color: primaryNavy,
                  fontFamily: 'Poppins_800ExtraBold'
                }} className="text-2xl mb-1">
                  {userStats.isLoading ? '...' : `${userStats.successRate}%`}
                </Text>
                <Text style={{ 
                  color: '#64748b',
                  fontFamily: 'Poppins_500Medium'
                }} className="text-xs text-center">Success{'\n'}Rate</Text>
              </View>
            </View>
          </View>

          {/* Profile Details */}
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100">
            <Text style={{ 
              color: primaryNavy,
              fontFamily: 'Poppins_800ExtraBold'
            }} className="text-lg mb-4">Profile Details</Text>
            
            <View className="space-y-4">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center mr-4">
                  <User size={18} color="#3b82f6" />
                </View>
                <View className="flex-1">
                  <Text style={{ 
                    color: '#64748b',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-xs mb-1">Full Name</Text>
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_600SemiBold'
                  }} className="text-base">{currentUser?.username || 'Not available'}</Text>
                </View>
              </View>
              
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-xl bg-green-50 items-center justify-center mr-4">
                  <Mail size={18} color="#10b981" />
                </View>
                <View className="flex-1">
                  <Text style={{ 
                    color: '#64748b',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-xs mb-1">Email Address</Text>
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_600SemiBold'
                  }} className="text-base">{currentUser?.email || 'Not available'}</Text>
                </View>
              </View>
              
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-xl bg-purple-50 items-center justify-center mr-4">
                  <Shield size={18} color="#8b5cf6" />
                </View>
                <View className="flex-1">
                  <Text style={{ 
                    color: '#64748b',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-xs mb-1">Role</Text>
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_600SemiBold'
                  }} className="text-base">{currentUser?.role === 'admin' ? 'Nexa Agent' : 'Nexa Salesman'}</Text>
                </View>
              </View>
              
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-xl bg-orange-50 items-center justify-center mr-4">
                  <Calendar size={18} color="#f59e0b" />
                </View>
                <View className="flex-1">
                  <Text style={{ 
                    color: '#64748b',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-xs mb-1">Member Since</Text>
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_600SemiBold'
                  }} className="text-base">March 2024</Text>
                </View>
              </View>
            </View>
          </View>
          {/* Quick Actions */}
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100">
            <Text style={{ 
              color: primaryNavy,
              fontFamily: 'Poppins_800ExtraBold'
            }} className="text-lg mb-4">Quick Actions</Text>
            
            <View className="space-y-3">
              <Pressable 
                onPress={() => router.push('/(main)/agent/transactions')}
                className="flex-row items-center justify-between p-4 bg-slate-50 rounded-xl"
              >
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-lg bg-blue-100 items-center justify-center mr-3">
                    <Text className="text-sm">📊</Text>
                  </View>
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_600SemiBold'
                  }} className="text-base">View Transactions</Text>
                </View>
                <Text style={{ 
                  color: '#64748b',
                  fontFamily: 'Poppins_500Medium'
                }} className="text-sm">→</Text>
              </Pressable>
              
              <Pressable 
                onPress={() => router.push('/(main)/agent/notifications')}
                className="flex-row items-center justify-between p-4 bg-slate-50 rounded-xl"
              >
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-lg bg-yellow-100 items-center justify-center mr-3">
                    <Text className="text-sm">🔔</Text>
                  </View>
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_600SemiBold'
                  }} className="text-base">Notifications</Text>
                </View>
                <Text style={{ 
                  color: '#64748b',
                  fontFamily: 'Poppins_500Medium'
                }} className="text-sm">→</Text>
              </Pressable>
              
              <Pressable 
                onPress={() => router.push('/(main)/agent/help-center')}
                className="flex-row items-center justify-between p-4 bg-slate-50 rounded-xl"
              >
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-lg bg-green-100 items-center justify-center mr-3">
                    <Text className="text-sm">❓</Text>
                  </View>
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_600SemiBold'
                  }} className="text-base">Help Center</Text>
                </View>
                <Text style={{ 
                  color: '#64748b',
                  fontFamily: 'Poppins_500Medium'
                }} className="text-sm">→</Text>
              </Pressable>
            </View>
          </View>

          {/* Sign Out */}
          <Pressable 
            onPress={() => {
              Alert.alert(
                "Sign Out",
                "Are you sure you want to sign out?",
                [
                  { text: "Cancel", style: "cancel" },
                  { 
                    text: "Sign Out", 
                    style: "destructive",
                    onPress: async () => {
                      try {
                        apiService.logout();
                        await StorageService.clearAuthData();
                        router.replace('/login');
                      } catch (error) {
                        console.error('Logout error:', error);
                        Alert.alert('Error', 'Failed to sign out. Please try again.');
                      }
                    }
                  }
                ]
              );
            }}
            className="flex-row items-center justify-center bg-white border-2 border-red-200 p-4 rounded-2xl shadow-sm"
          >
            <LogOut size={20} color="#dc2626" className="mr-3" />
            <Text style={{ 
              color: '#dc2626',
              fontFamily: 'Poppins_700Bold'
            }} className="text-base">Sign Out</Text>
          </Pressable>
        </View>
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}