import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getUserIotData } from '../src/services/api'; // Adjust the import path as necessary

const RingDataScreen = () => {
  const router = useRouter();
  const [ringData, setRingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRingData = async () => {
      try {
        const data = await getUserIotData ();
        setRingData(data);
      } catch (error) {
        console.error('Failed to load ring data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRingData();
  }, []);

  const handleAnalyzePress = () => {
    router.push('/ring'); // Adjust route if needed
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4B9CD3" />
        <Text style={{ marginTop: 10 }}>Loading ring data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📊 Ring Data</Text>
      <FlatList
        data={ringData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.metricContainer}>
            <Text style={styles.date}>{item.date} - {item.time}</Text>
            <Text style={styles.metricLabel}>Basal Body Temperature (BBT)</Text>
            <Text style={styles.metricValue}>{item.temperature}</Text>
            <Text style={styles.metricLabel}>Heart Rate</Text>
            <Text style={styles.metricValue}>{item.heart_rate}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      <TouchableOpacity style={styles.analyzeButton} onPress={handleAnalyzePress}>
        <Text style={styles.analyzeButtonText}>🔬 Analyze</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 20 },
  header: { fontSize: 26, fontWeight: 'bold', color: '#111827', marginBottom: 20 },
  metricContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  date: { fontSize: 14, color: '#9CA3AF', marginBottom: 8 },
  metricLabel: { fontSize: 16, color: '#6B7280' },
  metricValue: { fontSize: 22, fontWeight: 'bold', color: '#111827', marginBottom: 10 },
  analyzeButton: {
    backgroundColor: '#4B9CD3',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#4B9CD3',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  analyzeButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default RingDataScreen;
