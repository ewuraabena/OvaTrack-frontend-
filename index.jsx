import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { loginUser } from '../src/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'; 

import { 
  StyleSheet, 
  TextInput,
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
  Animated,
  Alert,

} from 'react-native';

const bgImage = require('../assets/background.jpg'); // ✅ FIXED IMAGE IMPORT

export default function () {
  
  const [email, setEmail] = useState('');
  // const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const router = useRouter(); // ✅ Use router for navigation

  let role = ''; // Initialize role variable
  
  const handleLogin = async () => {
     // Reset role on new login attempt
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
  
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      role = data.user?.role // ✅ Correctly access role from nested user object

      console.log('Returned user role:', role); 

      if (!role) {
        throw new Error('User role not found.');
      }
  
      await AsyncStorage.setItem('userRole', role); // ✅ Store role safely
      Alert.alert('Login Successful', 'Welcome back!');
  
       if (role === 'Doctor') {
         router.push('/(doctortabs)/LandingPage');
       } else if (role === 'Patient') {
      router.push('/(tabs)/LandingPage');
       } else {
         throw new Error('Unknown role received.');
       }
    } 
    catch (error) {
      Alert.alert('Login Failed', error.message || 'Something went wrong');
    }
  
    setLoading(false);
  };
  
  
  
  

  // Fade in effect for smooth UI
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground 
      source={require('../assets/login.jpg')} // Replace with an elegant image
      style={styles.background}
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {/* Login Icon */}
        <IconSymbol size={100} color="#fff" name="lock-outline" style={styles.icon} />

        {/* Title */}
        <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
        <ThemedText style={styles.subtitle}>Log in to continue</ThemedText>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <ThemedText type="buttonText" style={styles.buttonText}>
              {loading ? 'Logging in...' : 'Login'}
            </ThemedText>
          </TouchableOpacity>

          
          <TouchableOpacity onPress={() => router.push('/SignUp')}>  
            <ThemedText type="link" style={styles.link}>
              Not a User? Create Account
            </ThemedText>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ImageBackground>
  );
}

// Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E91E63', // Soft Pink
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  button: {
    backgroundColor: '#E91E63',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3, // Adds a soft shadow on Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    color: '#E91E63',
    fontSize: 16,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
});