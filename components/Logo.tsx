import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

export const Logo = ({ size = 120, showText = true }: { size?: number, showText?: boolean }) => {
  const primaryNavy = "#002B5B"; 
  
  return (
    <View className="items-center justify-center">
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <Defs>
            <LinearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={primaryNavy} />
              <Stop offset="100%" stopColor="#004C99" />
            </LinearGradient>
          </Defs>
          
          {/* Rounded Background Box */}
          <Rect
            x="10"
            y="10"
            width="80"
            height="80"
            rx="24"
            fill="url(#logoGrad)"
          />
          
          {/* Stylized 'N' */}
          <Path
            d="M35 70 V30 L65 70 V30"
            stroke="white"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
      {showText && (
        <View className="mt-6 items-center">
          <Text style={{ color: primaryNavy }} className="text-4xl font-black tracking-tighter">
            NEXA<Text className="opacity-60 font-light">PAY</Text>
          </Text>
          <View style={{ backgroundColor: primaryNavy }} className="h-1 w-8 mt-1 rounded-full opacity-20" />
        </View>
      )}
    </View>
  );
};
