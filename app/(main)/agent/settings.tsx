import { View, Text, ScrollView, Pressable, SafeAreaView, Image, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Bell, Shield, Globe, Moon, Smartphone, LogOut, ChevronRight, Settings as SettingsIcon, MoreHorizontal } from 'lucide-react-native';
import { useState } from 'react';
import { AgentBottomNav } from '../../../components/AgentBottomNav';
import { AgentTopbar } from '../../../components/AgentTopbar';
import { apiService } from '../../../services/api';
import { StorageService } from '../../../services/storage';

const AgentSettingsScreen = () => {
  const router = useRouter();
  const primaryNavy = "#002B5B";
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleEditProfile = () => {
    Alert.alert(
      "Edit Profile",
      "Profile editing functionality will be available soon.",
      [{ text: "OK" }]
    );
  };

  const handleLanguageSettings = () => {
    Alert.alert(
      "Language & Region",
      "Choose your preferred language and region settings.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "English (US)", onPress: () => {} },
        { text: "Spanish", onPress: () => {} },
        { text: "French", onPress: () => {} }
      ]
    );
  };

  const handleAppPreferences = () => {
    Alert.alert(
      "App Preferences",
      "Configure default actions and behaviors.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Configure", onPress: () => {} }
      ]
    );
  };

  const handleHelpCenter = () => {
    Alert.alert(
      "Help Center",
      "Access FAQs, guides, and tutorials.",
      [{ text: "OK" }]
    );
  };

  const handleContactSupport = () => {
    Alert.alert(
      "Contact Support",
      "Get help from our support team.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Email Support", onPress: () => {} },
        { text: "Live Chat", onPress: () => {} }
      ]
    );
  };

  const handleAboutNexa = () => {
    Alert.alert(
      "About Nexa",
      "Nexa Pro Agent v2.1.0\n\nA secure RFID payment solution for modern businesses.\n\n© 2024 Nexa Technologies",
      [
        { text: "Terms of Service", onPress: () => {} },
        { text: "Privacy Policy", onPress: () => {} },
        { text: "OK" }
      ]
    );
  };

  const handleMoreOptions = () => {
    Alert.alert(
      "More Options",
      "Additional settings and options.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Export Data", onPress: () => {} },
        { text: "Reset Settings", onPress: () => {}, style: "destructive" }
      ]
    );
  };

  const handleNotificationToggle = (value: boolean) => {
    setNotifications(value);
    Alert.alert(
      "Notifications",
      value ? "Push notifications enabled" : "Push notifications disabled",
      [{ text: "OK" }]
    );
  };

  const handleBiometricsToggle = (value: boolean) => {
    setBiometrics(value);
    Alert.alert(
      "Security & Privacy",
      value ? "Biometric authentication enabled" : "Biometric authentication disabled",
      [{ text: "OK" }]
    );
  };

  const handleDarkModeToggle = (value: boolean) => {
    setDarkMode(value);
    Alert.alert(
      "Dark Mode",
      value ? "Dark mode enabled" : "Light mode enabled",
      [{ text: "OK" }]
    );
  };

  const settingsItems = [
    { 
      icon: Bell, 
      label: 'Notifications', 
      sub: 'Push notifications, alerts & reminders',
      hasSwitch: true,
      value: notifications,
      onToggle: handleNotificationToggle,
      color: '#3b82f6'
    },
    { 
      icon: Shield, 
      label: 'Security & Privacy', 
      sub: 'Biometrics, PIN & data protection',
      hasSwitch: true,
      value: biometrics,
      onToggle: handleBiometricsToggle,
      color: '#10b981'
    },
    { 
      icon: Globe, 
      label: 'Language & Region', 
      sub: 'English (US), Currency & time zone',
      hasSwitch: false,
      onPress: handleLanguageSettings,
      color: '#8b5cf6'
    },
    { 
      icon: Moon, 
      label: 'Dark Mode', 
      sub: 'Switch between light and dark theme',
      hasSwitch: true,
      value: darkMode,
      onToggle: handleDarkModeToggle,
      color: '#6366f1'
    },
    { 
      icon: Smartphone, 
      label: 'App Preferences', 
      sub: 'Default actions, sounds & behaviors',
      hasSwitch: false,
      onPress: handleAppPreferences,
      color: '#f59e0b'
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <AgentTopbar name="Alex Nexa" role="Nexa Pro Agent" primaryNavy={primaryNavy} showWelcome={false} />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6">
          {/* Settings Header */}
          <View className="flex-row justify-between items-center mb-8">
            <Text style={{ 
              color: primaryNavy,
              fontFamily: 'Poppins_900Black'
            }} className="text-3xl">Settings</Text>
            <Pressable 
              onPress={handleMoreOptions}
              className="w-10 h-10 rounded-xl bg-white items-center justify-center shadow-sm border border-slate-100"
            >
              <MoreHorizontal size={20} color={primaryNavy} />
            </Pressable>
          </View>
          {/* Profile Section */}
          <View className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-slate-100">
            <View className="items-center">
              {/* Profile Image */}
              <View className="relative mb-4">
                <View className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  <View 
                    style={{ backgroundColor: primaryNavy, width: 80, height: 80, borderRadius: 40 }} 
                    className="items-center justify-center"
                  >
                    <Text style={{ 
                      color: 'white',
                      fontFamily: 'Poppins_900Black'
                    }} className="text-2xl">AN</Text>
                  </View>
                </View>
                <View className="absolute bottom-1 right-1 w-7 h-7 bg-green-500 rounded-full border-3 border-white shadow-md" />
                <Pressable className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full border border-slate-200 items-center justify-center shadow-sm">
                  <Text className="text-xs">📷</Text>
                </Pressable>
              </View>
              
              {/* Profile Info */}
              <Text style={{ 
                color: primaryNavy,
                fontFamily: 'Poppins_800ExtraBold'
              }} className="text-2xl mb-1">Alex Nexa</Text>
              <Text style={{ 
                color: '#64748b',
                fontFamily: 'Poppins_600SemiBold'
              }} className="text-sm mb-1">Nexa Pro Agent</Text>
              <Text style={{ 
                color: '#94a3b8',
                fontFamily: 'Poppins_500Medium'
              }} className="text-xs mb-6">ID: NXA-2024-7048</Text>
              
              {/* Stats Row */}
              <View className="flex-row justify-between w-full mb-6">
                <View className="items-center flex-1">
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_800ExtraBold'
                  }} className="text-xl">247</Text>
                  <Text style={{ 
                    color: '#64748b',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-xs">Transactions</Text>
                </View>
                <View className="w-px h-8 bg-slate-200" />
                <View className="items-center flex-1">
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_800ExtraBold'
                  }} className="text-xl">$12.5K</Text>
                  <Text style={{ 
                    color: '#64748b',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-xs">Total Volume</Text>
                </View>
                <View className="w-px h-8 bg-slate-200" />
                <View className="items-center flex-1">
                  <Text style={{ 
                    color: primaryNavy,
                    fontFamily: 'Poppins_800ExtraBold'
                  }} className="text-xl">98%</Text>
                  <Text style={{ 
                    color: '#64748b',
                    fontFamily: 'Poppins_500Medium'
                  }} className="text-xs">Success Rate</Text>
                </View>
              </View>
              
              {/* Edit Profile Button */}
              <Pressable 
                onPress={handleEditProfile}
                style={{ backgroundColor: primaryNavy }}
                className="px-8 py-3 rounded-xl shadow-sm active:bg-blue-900"
              >
                <Text style={{ 
                  color: 'white',
                  fontFamily: 'Poppins_600SemiBold'
                }} className="text-sm">Edit Profile</Text>
              </Pressable>
            </View>
          </View>

          {/* Settings List */}
          <View className="space-y-3">
            {settingsItems.map((item, idx) => (
              <Pressable 
                key={idx} 
                onPress={item.hasSwitch ? undefined : item.onPress}
                className="flex-row items-center justify-between bg-white border border-slate-100 p-5 rounded-2xl shadow-sm active:bg-slate-50"
              >
                <View className="flex-row items-center flex-1">
                  <View 
                    style={{ backgroundColor: `${item.color}15` }}
                    className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                  >
                     <item.icon size={22} color={item.color} />
                  </View>
                  <View className="flex-1">
                     <Text style={{ 
                       color: primaryNavy,
                       fontFamily: 'Poppins_700Bold'
                     }} className="text-base mb-1">{item.label}</Text>
                     <Text style={{ 
                       color: '#94a3b8',
                       fontFamily: 'Poppins_500Medium'
                     }} className="text-xs leading-4">{item.sub}</Text>
                  </View>
                </View>
                {item.hasSwitch ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{ false: '#f1f5f9', true: item.color }}
                    thumbColor={item.value ? '#ffffff' : '#94a3b8'}
                    style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                  />
                ) : (
                  <ChevronRight size={20} color="#94a3b8" />
                )}
              </Pressable>
            ))}
          </View>

          {/* Support Section */}
          <View className="mt-8">
            <Text style={{ 
              color: primaryNavy,
              fontFamily: 'Poppins_800ExtraBold'
            }} className="text-lg mb-4">Support & Help</Text>
            
            <View className="space-y-3">
              <Pressable 
                onPress={handleHelpCenter}
                className="flex-row items-center justify-between bg-white border border-slate-100 p-5 rounded-2xl shadow-sm active:bg-slate-50"
              >
                <View className="flex-row items-center flex-1">
                  <View className="bg-blue-50 w-12 h-12 rounded-xl items-center justify-center mr-4">
                    <Text className="text-2xl">❓</Text>
                  </View>
                  <View className="flex-1">
                    <Text style={{ 
                      color: primaryNavy,
                      fontFamily: 'Poppins_700Bold'
                    }} className="text-base mb-1">Help Center</Text>
                    <Text style={{ 
                      color: '#94a3b8',
                      fontFamily: 'Poppins_500Medium'
                    }} className="text-xs">FAQs, guides & tutorials</Text>
                  </View>
                </View>
                <ChevronRight size={20} color="#94a3b8" />
              </Pressable>

              <Pressable 
                onPress={handleContactSupport}
                className="flex-row items-center justify-between bg-white border border-slate-100 p-5 rounded-2xl shadow-sm active:bg-slate-50"
              >
                <View className="flex-row items-center flex-1">
                  <View className="bg-green-50 w-12 h-12 rounded-xl items-center justify-center mr-4">
                    <Text className="text-2xl">💬</Text>
                  </View>
                  <View className="flex-1">
                    <Text style={{ 
                      color: primaryNavy,
                      fontFamily: 'Poppins_700Bold'
                    }} className="text-base mb-1">Contact Support</Text>
                    <Text style={{ 
                      color: '#94a3b8',
                      fontFamily: 'Poppins_500Medium'
                    }} className="text-xs">Get help from our team</Text>
                  </View>
                </View>
                <ChevronRight size={20} color="#94a3b8" />
              </Pressable>

              <Pressable 
                onPress={handleAboutNexa}
                className="flex-row items-center justify-between bg-white border border-slate-100 p-5 rounded-2xl shadow-sm active:bg-slate-50"
              >
                <View className="flex-row items-center flex-1">
                  <View className="bg-purple-50 w-12 h-12 rounded-xl items-center justify-center mr-4">
                    <Text className="text-2xl">ℹ️</Text>
                  </View>
                  <View className="flex-1">
                    <Text style={{ 
                      color: primaryNavy,
                      fontFamily: 'Poppins_700Bold'
                    }} className="text-base mb-1">About Nexa</Text>
                    <Text style={{ 
                      color: '#94a3b8',
                      fontFamily: 'Poppins_500Medium'
                    }} className="text-xs">Version 2.1.0 • Terms & Privacy</Text>
                  </View>
                </View>
                <ChevronRight size={20} color="#94a3b8" />
              </Pressable>
            </View>
          </View>

          {/* Logout Button */}
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
                        // Clear API token
                        apiService.logout();
                        
                        // Clear storage
                        await StorageService.clearAuthData();
                        
                        // Navigate to login
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
            className="flex-row items-center justify-center bg-white border-2 border-red-200 p-6 rounded-2xl mt-8 shadow-sm active:bg-red-50"
            style={{ 
              height: 80,
              borderColor: '#fecaca'
            }}
          >
            <View className="bg-red-100 p-3 rounded-xl mr-4">
              <LogOut size={24} color="#dc2626" />
            </View>
            <View className="flex-1">
              <Text style={{ 
                color: '#dc2626',
                fontFamily: 'Poppins_800ExtraBold'
              }} className="text-lg">Sign Out</Text>
              <Text style={{ 
                color: '#ef4444',
                fontFamily: 'Poppins_500Medium'
              }} className="text-sm">End your current session</Text>
            </View>
            <ChevronRight size={20} color="#dc2626" />
          </Pressable>
        </View>
        <View className="h-40" />
      </ScrollView>

      <AgentBottomNav primaryNavy={primaryNavy} />
    </SafeAreaView>
  );
};

export default AgentSettingsScreen;
