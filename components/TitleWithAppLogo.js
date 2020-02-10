import React from 'react';
import { Platform, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';

export default function getLogoTitle(props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={
          Platform.OS === 'ios'
            ? require('../assets/images/tiw-app-logo-trans.png')
            : require('../assets/images/tiw-app-logo-trans-white.png')
        }
        style={{ width: 26, height: 26 }}
      />
      <Text
        style={{
          fontFamily: 'the-sans-bold',
          fontSize: RFPercentage(2.2),
          paddingLeft: 5,
          color: Colors.vwgHeaderTitle,
          textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase'
        }}
      >
        {props.title}
      </Text>
    </View>
  );
}
