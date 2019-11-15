import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import AppNameWithLogo from '../components/AppNameWithLogo';

export default ForgottenPasswordScreen = props => {
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}
    >
      <AppNameWithLogo />
      <View>
        <Text
          style={{
            marginTop: 40,
            textAlign: 'center'
          }}
        >
          Forgot your password?
        </Text>

        <Button
          title='Reset password'
          type='clear'
          onPress={() => {
            props.navigation.navigate('ForgottenPassword');
          }}
          style={{
            marginTop: 20
          }}
        />
        <Button
          title='Reset code'
          type='clear'
          onPress={() => {
            props.navigation.navigate('ForgottenPassword');
          }}
          style={{
            marginTop: 20
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  appName: {
    color: '#0096da',
    color: '#000',
    fontSize: 18,
    textTransform: 'uppercase'
  },
  announcementText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  }
});
