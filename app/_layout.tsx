import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const hideSplash = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await SplashScreen.hideAsync();
    };
    hideSplash();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <StatusBar style="dark" />
    </View>
  );
}
