import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Text,
  Linking,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getConsultations } from '../../src/services/api'; // ✅ Corrected import

export default function DoctorConsultationsScreen() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await getConsultations(); // ✅ Updated function call
        setAppointments(response);
      } catch (error) {
        console.error('Error fetching appointments:', error.response?.data || error.message);
        Alert.alert('Error', 'Failed to load appointments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  const handleAppointmentSelection = (appointment) => {
    console.log('Selected Appointment:', appointment);
    // Optional: navigate to detail view or show modal
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <IconSymbol size={100} color="#808080" name="" style={styles.headerImage} />
        <ThemedText type="title" style={styles.headerTitle}>
          Upcoming Consultations
        </ThemedText>
      </View>

      <ThemedView style={styles.section}>
        <ThemedText type="title" style={styles.sectionTitle}>Consultations</ThemedText>
      </ThemedView>

      {loading ? (
        <ActivityIndicator size="large" color="#C2185B" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.appointmentCard}
              onPress={() => handleAppointmentSelection(item)}
            >
              <Text style={styles.patient}>{item.patient || item.full_name || 'Unknown Patient'}</Text>
              <Text style={styles.appointmentDetails}>Date: {item.appointment_date}</Text>
              <Text style={styles.appointmentDetails}>Status: {item.status}</Text>
              <Text
                style={[styles.appointmentDetails, styles.linkText]}
                onPress={() => Linking.openURL(item.meet_link)}
              >
                Join Meet: {item.meet_link}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  headerContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  headerImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#C2185B',
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#C2185B',
  },
  appointmentCard: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFC0CB',
    marginBottom: 10,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  appointmentDetails: {
    fontSize: 16,
    color: '#fff',
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#0000EE',
  },
});
