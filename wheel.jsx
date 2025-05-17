import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  StyleSheet, 
  Text, 
  Linking, 
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WheelScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Load stored data on mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const method = await AsyncStorage.getItem('selectedMethod');
        const notes = await AsyncStorage.getItem('userInput');
        if (method) setSelectedMethod(method);
        if (notes) setUserInput(notes);
        if (method || notes) setIsSaved(true);
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    };

    loadSavedData();
  }, []);

  const handleSaveOrEdit = async () => {
    if (isSaved) {
      setIsSaved(false); // Switch to edit mode
    } else {
      try {
        await AsyncStorage.setItem('selectedMethod', selectedMethod);
        await AsyncStorage.setItem('userInput', userInput);
        setIsSaved(true);
        Alert.alert('Saved!', 'Your choices were saved successfully.');
      } catch (error) {
        console.error('Error saving to AsyncStorage:', error);
      }
    }
  };

  const openPlayStore = () => {
    const playStoreURL = 'https://play.google.com/store/apps/details?id=com.who.mecwheel';
    Linking.openURL(playStoreURL);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🔄 WHO MEC Wheel</Text>
      <Text style={styles.description}>
        This page helps you choose the best contraceptive method based on WHO’s guidelines. You can explore recommendations, record your decision, and adjust it anytime.
      </Text>

      <Button title="Open WHO MEC App on Play Store" onPress={openPlayStore} color="#E91E63" />

      <Text style={styles.label}>💊 Contraceptive Method Selected:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., IUD"
        value={selectedMethod}
        editable={!isSaved}
        onChangeText={(text) => {
          setSelectedMethod(text);
          setIsSaved(false);
        }}
      />

      <Text style={styles.label}>📝 Notes / Additional Info:</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Any observations or comments"
        value={userInput}
        editable={!isSaved}
        multiline
        numberOfLines={4}
        onChangeText={(text) => {
          setUserInput(text);
          setIsSaved(false);
        }}
      />

      <Button
        title={isSaved ? 'Edit' : 'Save Changes'}
        onPress={handleSaveOrEdit}
        color={isSaved ? '#FFA000' : '#4CAF50'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C2185B',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
    lineHeight: 22,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default WheelScreen;
