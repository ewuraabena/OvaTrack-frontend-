import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* Tab Bar Options */}
      <Tabs.Screen 
        name="LandingPage" 
        options={{ 
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} /> , 
        }}
      />
      {/* Learn Tab */}
      <Tabs.Screen 
        name="Learn" 
        options={{ 
          title: 'Learn', 
          tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" color={color} size={size} /> 
        }} 
      />
      {/* Find a Doctor Tab */}
      <Tabs.Screen 
        name="FindADoctor" 
        options={{ 
          title: 'Find A Doctor', 
          tabBarIcon: ({ color, size }) => <Ionicons name="medkit-outline" color={color} size={size} /> 
        }} 
      />

      {/* About Us Tab */}
      <Tabs.Screen 
        name="About Us" 
        options={{ 
          title: 'About', 
          tabBarIcon: ({ color, size }) => <Ionicons name="information-circle-outline" color={color} size={size} /> 
        }} 
      />

      {/* Get a Contraceptive Method Tab */}
      <Tabs.Screen 
        name="wheel" 
        options={{ 
          title: 'Get a Contraceptive Method', 
          tabBarIcon: ({ color, size }) => <Ionicons name="medkit-outline" color={color} size={size} /> 
        }}
      />

      {/* Our Smart Ring Tab */}
      <Tabs.Screen 
        name="ring" 
        options={{ 
          title: 'Our Smart Ring', 
          tabBarIcon: ({ color, size }) => <Ionicons name="medkit-outline" color={color} size={size} /> 
        }}
      />
      {/*Profile Tab */}
      <Tabs.Screen 
        name="Profile" 
        options={{ 
          title: 'Profile', 
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} /> 
        }}
      />
      {/* Home Tab */}
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'LogIn', 
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} /> 
        }} 
      />
      
      
      {/* Sign Up Tab */}
      <Tabs.Screen 
        name="SignUp" 
        options={{ 
          title: 'Sign Up', 
          tabBarIcon: ({ color, size }) => <Ionicons name="person-add-outline" color={color} size={size} /> 
        }} 
      />
    </Tabs>
  );
}
