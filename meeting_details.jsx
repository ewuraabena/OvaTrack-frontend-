import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, Alert } from 'react-native';

export default function AppointmentDetailsScreen(props) {
  const route = props?.route || { params: {} };
  const { doctor = {}, appointment_date = '', meetLink = '	https://meet.google.com/rff-oixx-ewi' } = route.params;

  const handleOpenLink = async () => {
    if (meetLink) {
      const supported = await Linking.canOpenURL(meetLink);
      if (supported) {
        Linking.openURL(meetLink);
      } else {
        Alert.alert("Can't open the Meet link", meetLink);
      }
    } else {
      Alert.alert("No Meet link provided");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Details</Text>

      <View style={styles.card}>
        {/* <Text style={styles.label}>Doctor:</Text>
        <Text style={styles.value}>{doctor.id|| 'N/A'}</Text>

        <Text style={styles.label}>Date & Time:</Text>
        <Text style={styles.value}>
          {appointment_date ? new Date(appointment_date).toLocaleString() : 'N/A'}
        </Text> */}

        {meetLink ? (
          <TouchableOpacity style={styles.button} onPress={handleOpenLink}>
            <Text style={styles.buttonText}>Join Meet Link</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.value}>No Meet link available</Text>
        )}
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4e6', // Light pink background
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#be123c', // Deep pink
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#be123c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#be123c',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#be123c',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
