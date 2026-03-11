import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

export const Logo = ({ size = 120, showText = true, inverted = false }: { size?: number, showText?: boolean, inverted?: boolean }) => {
  const primaryNavy = "#002B5B"; 
  const textColor = inverted ? "white" : primaryNavy;
  
  return (
    <View className="items-center justify-center">
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <Defs>
            <LinearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={inverted ? "rgba(255,255,255,0.2)" : primaryNavy} />
              <Stop offset="100%" stopColor={inverted ? "rgba(255,255,255,0.05)" : "#004C99"} />
            </LinearGradient>
          </Defs>
          
          {/* Rounded Background Box */}
          <Rect
            x="10"
            y="10"
            width="80"
            height="80"
            rx="24"
            fill={inverted ? "white" : "url(#logoGrad)"}
          />
          
          {/* Stylized 'N' */}
          <Path
            d="M35 70 V30 L65 70 V30"
            stroke={inverted ? primaryNavy : "white"}
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
      {showText && (
        <View className="mt-6 items-center">
          <Text style={{ color: textColor }} className="text-4xl font-black tracking-tighter uppercase">
            NEXA<Text className={inverted ? "opacity-50 font-light" : "opacity-60 font-light"}>PAY</Text>
          </Text>
          <Text style={{ color: textColor }} className="text-[10px] font-black uppercase tracking-[4px] mt-1 opacity-40">
            Payments Made Easy
          </Text>
        </View>
      )}
    </View>
  );
};
