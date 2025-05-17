import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Doctors, bookAppointment, getAvailabilitySlots } from '../../src/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FindDoctorScreen() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [booking, setBooking] = useState(false);
  const [meetLink, setMeetLink] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await Doctors();
        const filteredDoctors = response.filter(doctor => doctor.role === 'Doctor');

        const updatedDoctors = await Promise.all(filteredDoctors.map(async (doctor) => {
          try {
            const slots = await getAvailabilitySlots(doctor.id);
            const availability = slots.reduce((acc, slot) => {
              const dateKey = new Date(slot.date).toISOString().split('T')[0];
              if (!acc[dateKey]) acc[dateKey] = [];
              acc[dateKey].push({ date: slot.date, time: slot.time });
              return acc;
            }, {});
            return { ...doctor, availability };
          } catch (e) {
            return { ...doctor, availability: {} };
          }
        }));

        setDoctors(updatedDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleDoctorSelection = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedTime(null);
  };

  const handleBooking = async () => {
    if (!selectedDoctor || !selectedTime) {
      Alert.alert('Missing Info', 'Please select a doctor and a time slot');
      return;
    }

    // Change: Ensuring the date is formatted correctly in ISO 8601 format
    const formattedDateandTime = new Date(selectedTime.date + 'T' + selectedTime.time).toISOString(); 

    const storedUser = await AsyncStorage.getItem('user');
  const parsedUser = JSON.parse(storedUser);
  const userId = parsedUser.id; 

    setBooking(true);

    try {
      const response = await bookAppointment(
      formattedDateandTime, // Correct: appointment_date first
      selectedDoctor.id,    // Correct: doctor
      userId                // Correct: patient
      );
      setMeetLink(response.meet_link);
      Alert.alert('Success', 'Appointment successfully booked!');
      navigation.navigate('meeting_details', { 
        doctor: selectedDoctor, 
        appointment_date: formattedDateandTime,
        meetLink: response.meet_link 
      });
    } catch (error) {
      console.error('Booking Error:', error.response?.data || error.message);
      Alert.alert('Booking Failed', 'Please try again later.');
    } finally {
      setBooking(false);
    }
  };

  const allAvailableSlots = selectedDoctor
    ? Object.entries(selectedDoctor.availability || {}).flatMap(([date, slots]) =>
        slots.map(slot => ({ date, time: slot.time }))
      )
    : [];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFC0CB', dark: '#353636' }}
      headerImage={
        <View style={styles.headerContainer}>
          <IconSymbol size={310} color="#808080" name="" style={styles.headerImage} />
          <ThemedText type="title" style={styles.headerTitle}>Find A Doctor</ThemedText>
        </View>
      }
    >
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <ThemedView style={styles.section}>
            <ThemedText type="title" style={styles.sectionTitle}>Available Doctors</ThemedText>
          </ThemedView>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.doctorCard, selectedDoctor?.id === item.id && styles.selectedDoctor]}
            onPress={() => handleDoctorSelection(item)}
          >
            <ThemedText style={styles.doctorName}>{item.full_name}</ThemedText>
            <ThemedText style={styles.specialty}>{item.specialty}</ThemedText>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => loading && <ActivityIndicator size="large" color="#E91E63" />}
      />

      <ThemedView style={styles.section}>
        {selectedDoctor && (
          <>
            <ThemedText type="title" style={styles.sectionTitle}>Available Time Slots</ThemedText>
            {allAvailableSlots.length > 0 ? (
              allAvailableSlots.map((slot, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.timeSlot, selectedTime?.date === slot.date && selectedTime?.time === slot.time && styles.selectedTimeSlot]}
                  onPress={() => setSelectedTime(slot)}
                >
                  <ThemedText style={styles.timeText}>{`${new Date(slot.date).toDateString()} - ${slot.time}`}</ThemedText>
                </TouchableOpacity>
              ))
            ) : (
              <ThemedText>No available time slots.</ThemedText>
            )}
          </>
        )}
      </ThemedView>

      <TouchableOpacity 
        style={[styles.bookButton, booking && { backgroundColor: '#ccc' }]} 
        onPress={handleBooking}
        disabled={booking}
      >
        <ThemedText style={styles.bookButtonText}>
          {booking
            ? 'Booking Appointment...'
            : `Book Appointment${selectedDoctor?.full_name ? ` with ${selectedDoctor.full_name}` : ''}`}
        </ThemedText>
      </TouchableOpacity>

      {meetLink && (
        <ThemedView style={styles.meetLinkContainer}>
          <ThemedText style={styles.meetLinkText}>Your Consultation Meet Link:</ThemedText>
          <TouchableOpacity onPress={() =>{ Linking.openURL(meetLink).catch(err=>console.log(ërr)) }}>
<ThemedText style={[styles.meetLink, { color: 'blue', textDecorationLine: 'underline' }]}>
        {meetLink}
      </ThemedText>          </TouchableOpacity>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingTop: 50,
  },
  headerImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15,
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#C2185B',
  },
  doctorCard: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFC0CB',
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedDoctor: {
    backgroundColor: '#E91E63',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  specialty: {
    fontSize: 14,
    color: '#fff',
  },
  timeSlot: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F8BBD0',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedTimeSlot: {
    backgroundColor: '#E91E63',
  },
  timeText: {
    fontSize: 16,
    color: '#fff',
  },
  bookButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#E91E63',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 30,
  },
  bookButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  meetLinkContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  meetLinkText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  meetLink: {
    fontSize: 14,
    color: '#C2185B',
    marginTop: 5,
  },
});
