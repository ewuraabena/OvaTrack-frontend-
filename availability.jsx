import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createAvailabilitySlots } from '../../src/services/api'; // Make sure this is the correct path
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SelectAvailabilityScreen() {
  const [user, setUser] = useState(null);
  
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date');

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem('user');

      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
  
      }
    };

    fetchUserData();
  }, []);
  const handleChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showDatePicker = () => {
    setMode('date');
    setShowPicker(true);
  };

  const showTimePicker = () => {
    setMode('time');
    setShowPicker(true);
  };

  const handleSubmit = async () => {
    try {
      if (!user) throw new Error('User data not found.');
  
      const doctorId = user.id;  // Extract doctor ID from the `user` object
  
      const formattedDate = date.toISOString().split('T')[0];
      const formattedTime = date.toTimeString().split(' ')[0].slice(0, 5); // HH:MM
  
      await createAvailabilitySlots(doctorId, formattedDate, formattedTime);  // Send doctor ID along with the date/time
      Alert.alert('Success', 'Availability slot added!');
    } catch (error) {
      console.error('Error submitting slot:', error.message);
      Alert.alert('Error', 'Could not add slot. Try again.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Available Time Slot</Text>

      <TouchableOpacity style={styles.pickerButton} onPress={showDatePicker}>
        <Text style={styles.buttonText}>Select Date</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.pickerButton} onPress={showTimePicker}>
        <Text style={styles.buttonText}>Select Time</Text>
      </TouchableOpacity>

      <Text style={styles.selected}>
        Selected: {date.toDateString()} at {date.toTimeString().slice(0, 5)}
      </Text>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
        />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Slot</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#C2185B',
      marginBottom: 20,
      textAlign: 'center',
    },
    pickerButton: {
      backgroundColor: '#FFC0CB',
      padding: 12,
      borderRadius: 10,
      marginBottom: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
    },
    selected: {
      textAlign: 'center',
      marginVertical: 10,
      fontSize: 16,
    },
    submitButton: {
      backgroundColor: '#C2185B',
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
      alignItems: 'center',
    },
    submitText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
  