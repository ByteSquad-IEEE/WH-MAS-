import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

const Start = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground 
        source={require('../assets/start.png')} 
        style={styles.backgroundImage}>

        {/* Green Transparent Overlay */}
        <View style={styles.overlay} />

        {/* App Title */}
        <Text style={styles.title}>WMHAS</Text>

        {/* Welcome Section */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.description}>
            Turn Waste into value. Buy, sell, and help create a waste-free world.
          </Text>

          {/* Login and Register Buttons */}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity 
        style={styles.registerButton} 
        onPress={() => navigation.navigate('register')}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0, 128, 0, 0.5)', 
  },
  title: {
    position: 'absolute',
    top: 50,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    right: 20,
  },
  welcomeContainer: {
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 80,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,  
    width: '85%',
    borderRadius: 25,
    marginBottom: 15,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#1db954',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: 'transparent', 
    borderColor: '#fff',  
    borderWidth: 2, 
    paddingVertical: 12, 
    width: '85%', 
    borderRadius: 25,
    alignSelf: 'center',
  },
  registerText: {
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Start;
