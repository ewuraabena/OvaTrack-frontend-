import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  View, 
  ImageBackground, 
  Animated,
  Alert
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { registerUser } from '../src/services/api';
import { useRouter } from 'expo-router'; // ✅ Navigate after login
import { Picker } from '@react-native-picker/picker'; // ✅ Import Picker for role selection


export function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [role, setRole] = useState('Patient'); // Default role: Patient
  const [specialization, setSpecialization] = useState(''); // For Doctor role
  
  const [fadeAnim] = useState(new Animated.Value(0));
  const router = useRouter(); // ✅ Use router for navigation
  const [loading, setLoading] = useState(false);

  // Fade in effect for smooth UI
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignUp = async () => {
    if (!name || !email || !password || !phone || !dob || !specialization) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      const userData = {
        email,
        full_name: name, // Correct field name
        password, 
        phone_number: phone, // Added phone
        date_of_birth: dob, // Added DOB
        role, // Selected role (Patient or Doctor)
        specialization, // Added specialization for Doctor role
      };

      console.log("Sending user data:", userData); // Debugging Log

      const response = await registerUser(userData);
      console.log(response);
      
      Alert.alert("Sign Up Successful", "Account created successfully!");
      router.push('/'); // Navigate to Login screen
    } catch (error) {
      console.error("Sign Up Error:", error);
      Alert.alert("Sign Up Failed", error.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <ImageBackground 
      source={require('../assets/login.jpg')} // Replace with an elegant background image
      style={styles.background}
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>

        {/* SignUp Icon */}
        <IconSymbol size={100} color="#fff" name="person-outline" style={styles.icon} />

        {/* Title */}
        <ThemedText type="title" style={styles.title}>Create an Account</ThemedText>
        <ThemedText style={styles.subtitle}>Join us and start your journey</ThemedText>

        {/* Sign Up Form */}
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
          
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth (YYYY-MM-DD)"
            placeholderTextColor="#888"
            value={dob}
            onChangeText={setDob}
          />

          {/* Role Selection */}
          <View style={styles.pickerContainer}>
            <ThemedText style={styles.roleLabel}>Select Role</ThemedText>
            <Picker
              selectedValue={role}
              onValueChange={(itemValue) => setRole(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Patient" value="Patient" />
              <Picker.Item label="Doctor" value="Doctor" />
            </Picker>
          </View>

          {/* Specialization Input for Doctor role */}
          {role === 'Doctor' && (
            <TextInput
              style={styles.input}
              placeholder="Specialization"
              placeholderTextColor="#888"
              value={specialization}
              onChangeText={setSpecialization}
            />
          )}

          {/* Sign Up Button */}

          <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}> 
            <ThemedText type="buttonText" style={styles.buttonText}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </ThemedText>
          </TouchableOpacity>

          {/* Links */}
          <TouchableOpacity onPress={() => router.push('/')}>
            <ThemedText type="link" style={styles.link}>Already have an account? Log In</ThemedText>
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
  pickerContainer: {
    width: '100%',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  roleLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
});

export default SignUpScreen;
