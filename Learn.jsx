import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { sendMessageToDialogflow } from '../../src/services/api';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '698762368909-o8qvgikbmk5lbvvnre3lindllt7lbms1.apps.googleusercontent.com',
});

export default function LearnScreen() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { user: false, message: 'Hello! How can I help you with reproductive health?' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  }, [chatHistory]);

  const handleSend = () => {
    if (message.trim() === '') return;

    const userMessage = { user: true, message };
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    setMessage('');
    setIsLoading(true);

    sendMessageToDialogflow(message)
  .then((botReply) => {
    setChatHistory([...updatedHistory, { user: false, message: botReply }]);
  })
  .catch((error) => {
    console.error(error);
    Alert.alert('Error', 'Failed to fetch response from the chatbot. Please try again.');
  });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFC0CB', dark: '#353636' }}
      headerImage={
        <View style={styles.headerContainer}>
          <ThemedText type="title" style={styles.headerTitle}>All You Need to Know About Reproductive Health</ThemedText>
        </View>
      }
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <ThemedView style={styles.chatContainer}>
            <ScrollView style={styles.chatWindow} ref={scrollRef}>
              {chatHistory.map((chat, index) => (
                <View key={index} style={chat.user ? styles.userMessage : styles.botMessage}>
                  <Text style={chat.user ? styles.userText : styles.botText}>{chat.message}</Text>
                </View>
              ))}
              
            </ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Ask me anything..."
                placeholderTextColor="#888"
                onSubmitEditing={handleSend}
              />
              <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </ThemedView>

          {/* Educational Sections */}
          <ThemedView style={styles.section}>
            <ThemedText type="title" style={styles.sectionTitle}>Empower Yourself with Knowledge</ThemedText>
            <ThemedText style={styles.description}>
              Learning about reproductive health is essential for making informed decisions.
              Explore our resources to better understand contraception, fertility, pregnancy, and more.
            </ThemedText>
          </ThemedView>

          <Collapsible title="Understanding Contraception">
            <ThemedText>
              Contraceptive methods help prevent pregnancy and can also offer health benefits.
              Options include birth control pills, IUDs, implants, condoms, and natural methods.
            </ThemedText>
            <ExternalLink href="https://www.plannedparenthood.org/learn/birth-control">
              <ThemedText type="link">Learn More About Birth Control</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Fertility & Family Planning">
            <ThemedText>
              Fertility awareness helps individuals track ovulation cycles. Factors such as age,
              lifestyle, and health conditions can influence fertility.
            </ThemedText>
            <ExternalLink href="https://www.who.int/news-room/fact-sheets/detail/family-planning-contraception">
              <ThemedText type="link">Learn More About Fertility</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Menstrual Health & Cycle Tracking">
            <ThemedText>
              Tracking your menstrual cycle helps predict ovulation and identify potential health concerns.
              IoT-enabled devices, such as smart rings, can assist with monitoring body temperature for accuracy.
            </ThemedText>
            <ExternalLink href="https://www.womenshealth.gov/menstrual-cycle">
              <ThemedText type="link">Menstrual Health Resources</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Pregnancy & Prenatal Care">
            <ThemedText>
              Prenatal care is crucial for a healthy pregnancy. Regular check-ups, balanced nutrition,
              and avoiding harmful substances can help ensure a smooth pregnancy journey.
            </ThemedText>
            <ExternalLink href="https://www.acog.org/womens-health">
              <ThemedText type="link">Pregnancy Health Guide</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Sexual Wellness & Safe Practices">
            <ThemedText>
              Safe sex practices help prevent STIs and promote overall well-being.
              Understanding sexual health and using protection is key.
            </ThemedText>
            <ExternalLink href="https://www.who.int/health-topics/sexual-health#tab=tab_1">
              <ThemedText type="link">Sexual Health Resources</ThemedText>
            </ExternalLink>
          </Collapsible>

          <View style={styles.imageContainer}>
            <Image source={require('../../assets/learn.jpg')} style={styles.image} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  contentContainer: {
    paddingBottom: 30,
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
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  chatContainer: {
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
  chatWindow: {
    maxHeight: 200,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF80AB',
    padding: 10,
    borderRadius: 20,
    marginBottom: 5,
    marginLeft: 50,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E1E1E1',
    padding: 10,
    borderRadius: 20,
    marginBottom: 5,
    marginRight: 50,
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  sendButton: {
    backgroundColor: '#E91E63',
    padding: 10,
    marginLeft: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
