import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
  ScrollView,
  Image 
} from 'react-native';
import { useRouter } from 'expo-router';

const bgImage = require('../../assets/background.jpg');
const serviceImages = [
  require('../../assets/expertguidance.jpg'),  // Image for Find A Doctor
  require('../../assets/educationalcontent.jpg'),        // Image for Learn
  require('../../assets/personalizedcontraception.jpg'), // Image for Get a Contraceptive Method
  require('../../assets/realtime.jpg'),   // Image for Our Smart Ring

];

export default function LandingScreen() {
  const router = useRouter();

  const services = [
    { title: 'Find A Doctor', route: '/FindADoctor', description: 'Connect with healthcare professionals for expert guidance.', image: serviceImages[0] },
    { title: 'Learn', route: '/Learn', description: 'Access educational content on reproductive health and family planning.', image: serviceImages[1] },
    { title: 'Get a Contraceptive Method', route: '/wheel', description: 'Find personalized contraceptive options based on your profile.', image: serviceImages[2] },
    { title: 'Our Smart Ring', route: '/ring', description: 'Discover our wearable device for real-time reproductive health tracking.', image: serviceImages[3] },
  { title: 'About Us', route: '/About Us', description: 'Begin your journey towards informed family planning.', image: serviceImages[0] },
  ];

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          {/* Header */}
          <Text style={styles.header}>
            <Text style={styles.boldText}>Welcome to</Text> {' '}
            <Text style={styles.brandText}>OvaTrack</Text>
          </Text>

          <Text style={styles.subHeader}>What we offer?</Text>

          {/* Description */}
          <Text style={styles.description}>
            At <Text style={styles.boldText}>OvaTrack</Text>, we are dedicated to empowering individuals with personalized reproductive health insights through innovative telehealth solutions. Our platform connects you with healthcare professionals for discreet, expert consultations and offers personalized contraceptive recommendations based on your unique health profile. With integrated reminders and valuable educational content, OvaTrack ensures that you have the support you need for informed family planning, all from the convenience and privacy of your home.
          </Text>

          {/* Service Buttons with Descriptions */}
          {services.map((service, index) => (
            <View key={index} style={styles.serviceContainer}>
              <Image source={service.image} style={styles.serviceImage} />
              <Text style={styles.serviceDescription}>{service.description}</Text>
              <TouchableOpacity 
                style={styles.serviceButton}
                onPress={() => router.push(service.route)}
              >
                <Text style={styles.serviceText}>{service.title}</Text>
              </TouchableOpacity>
            </View>
          ))}

          
        </ScrollView>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity 
      style={styles.getStartedButton} activeOpacity={0.8}
      onPress={() => router.push('/FindADoctor')}>
        <Text style={styles.getStartedText}>GET STARTED</Text>
        
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: '80%',
  },
  header: {
    fontSize: 28,
    fontWeight: '500',
    color: '#444',
    textAlign: 'center',
  },
  brandText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 15,
  },
  description: {
    fontSize: 18,
    color: '#555',
    lineHeight: 26,
    textAlign: 'center',
    marginVertical: 10,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#C2185B',
  },
  contactLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E91E63', 
    textDecorationLine: 'underline',
    marginTop: 15,
  },
  getStartedButton: {
    backgroundColor: '#FF80AB', 
    paddingVertical: 18,
    width: '90%',
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    elevation: 5,
  },
  getStartedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  serviceContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
  },
  serviceImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  serviceDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  serviceButton: {
    backgroundColor: '#F8BBD0',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
  },
  serviceText: {
    fontSize: 17,
    color: '#880E4F',
    fontWeight: '600',
  },
});
