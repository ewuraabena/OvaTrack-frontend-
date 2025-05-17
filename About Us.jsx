import { 
  StyleSheet, 
  View, 
  Linking, 
  TouchableOpacity 
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function AboutUsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFC0CB', dark: '#353636' }} // 🌸 Softer Pink for Elegance
      headerImage={
        <View style={styles.headerContainer}>
          <ThemedText type="title" style={styles.headerTitle}>About OvaTrack</ThemedText>
        </View>
      }
    >
      {/* Description Section */}
      <ThemedView style={styles.section}>
        <ThemedText type="title" style={styles.sectionTitle}>Our Mission</ThemedText>
        <ThemedText style={styles.description}>
          <ThemedText type="italic">
            We are committed to making family planning services more accessible, personalized, 
            and stigma-free. Our platform integrates AI and IoT to provide secure, data-driven insights 
            that empower individuals to make informed reproductive health decisions.
          </ThemedText>
        </ThemedText>
      </ThemedView>

      {/* What We Offer */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>What We Offer</ThemedText>
        <ThemedText>
          ✅ AI-Driven Contraceptive Recommendations{'\n'}
          ✅ Telehealth Consultations{'\n'}
          ✅ Fertility Monitoring with IoT-enabled smart rings & BBT tracking{'\n'}
          ✅ Educational Resources & Expert Guidance{'\n'}
        </ThemedText>
      </ThemedView>

      {/* Contact Us Section */}
      <ThemedView style={styles.contactCard}>
        <ThemedText type="title" style={styles.contactTitle}>Contact Us 📞</ThemedText>

        {/* Email */}
        <TouchableOpacity onPress={() => Linking.openURL('mailto:support@teleconceive.com')}>
          <ThemedText style={styles.contactText}>📧 mskaaky@gmail.com</ThemedText>
        </TouchableOpacity>

        {/* Phone */}
        <TouchableOpacity onPress={() => Linking.openURL('tel:+123456789')}>
          <ThemedText style={styles.contactText}>📞 +233 20 274 3824</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      

    </ParallaxScrollView>
  );
}

// Styles
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
  description: {
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 22,
  },
  contactCard: {
    backgroundColor: '#FFC0CB',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 5,
    textDecorationLine: 'underline',
  },
  link: {
    marginTop: 15,
    fontSize: 16,
    color: '#007bff',
    textAlign: 'right',
  },
});
