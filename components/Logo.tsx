import React from 'react';
import { View, Text, Image } from 'react-native';

export const Logo = ({ size = 120, showText = true, inverted = false }: { size?: number, showText?: boolean, inverted?: boolean }) => {
  const primaryNavy = "#002B5B"; 
  const textColor = inverted ? "white" : primaryNavy;
  
  return (
    <View className="items-center justify-center">
      <View style={{ width: size, height: size }}>
        <Image 
          source={require('../assets/nexa.png')}
          style={{ 
            width: size, 
            height: size,
            resizeMode: 'contain'
          }}
        />
      </View>
      {showText && (
        <View className="mt-6 items-center">
          <Text style={{ 
            color: textColor,
            fontFamily: 'Poppins_900Black'
          }} className="text-4xl tracking-tighter uppercase">
            NEXA<Text style={{ 
              fontFamily: 'Poppins_300Light',
              opacity: inverted ? 0.5 : 0.6
            }}>PAY</Text>
          </Text>
          <Text style={{ 
            color: textColor,
            fontFamily: 'Poppins_800ExtraBold',
            opacity: 0.4
          }} className="text-[10px] uppercase tracking-[4px] mt-1">
            Payments Made Easy
          </Text>
        </View>
      )}
    </View>
  );
};
