import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import ProfileImageUploader from '../../components/ProfileImageUploader';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [editingBio, setEditingBio] = useState(false);
  const [contraceptiveMethod, setContraceptiveMethod] = useState('');
  const [consultations, setConsultations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      const method = await AsyncStorage.getItem('selectedMethod'); // Fetch selected contraceptive method
      const upcoming = await AsyncStorage.getItem('upcoming_consultations');

      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setBio(parsedUser.bio || '');
      }

      if (method) setContraceptiveMethod(method); // Set the fetched method
      if (upcoming) setConsultations(JSON.parse(upcoming));
    };

    fetchUserData();
  }, []); // Runs once when the component mounts

  const handleLogout = async () => {
    await AsyncStorage.clear();
    Alert.alert('Logged Out', 'You have been logged out.');
    router.replace('/'); // Navigate to login or welcome screen
  };

  const handleSaveBio = () => {
    setEditingBio(false);
    const updatedUser = { ...user, bio: bio };
    AsyncStorage.setItem('user', JSON.stringify(updatedUser)); // Save updated bio to AsyncStorage
    Alert.alert('Success', 'Bio updated successfully!');
  };

  const handleEditBio = () => {
    setEditingBio(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <ProfileImageUploader />
        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.nameText}>{user.full_name}</Text>
            <Text style={styles.emailText}>{user.email}</Text>
            <Text style={styles.dobText}>{user.date_of_birth || 'Date of Birth: Not set'}</Text>
            <Text style={styles.phoneText}>{user.phone_number || 'Phone: Not set'}</Text>
          </View>
        )}
      </View>

      <View style={styles.bioContainer}>
        {editingBio ? (
          <TextInput
            style={styles.input}
            multiline
            value={bio}
            onChangeText={setBio}
            placeholder="Write a short bio..."
          />
        ) : (
          <Text style={styles.userBio} onPress={handleEditBio}>
            {bio || 'Add your bio...'}
          </Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={editingBio ? handleSaveBio : handleEditBio}
        >
          <Text style={styles.buttonText}>{editingBio ? 'Save Changes' : 'Edit Bio'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.sectionHeader}>Selected Contraceptive Method:</Text>
        <Text style={styles.sectionText}>
          {contraceptiveMethod || 'No method selected'}
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.sectionHeader}>Upcoming Consultations:</Text>
        {consultations.length === 0 ? (
          <Text style={styles.sectionText}>No upcoming consultations</Text>
        ) : (
          consultations.map((c, index) => (
            <Text key={index} style={styles.sectionText}>
              {c.date} - {c.doctor}
            </Text>
          ))
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  userInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  emailText: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  dobText: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  phoneText: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  bioContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  userBio: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    minHeight: 40,
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#E91E63',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
  },
});

export default ProfileScreen;
