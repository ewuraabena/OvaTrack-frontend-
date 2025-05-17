import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getUserIotData } from '../../src/services/api'; // Adjust the import path as necessary

const screenWidth = Dimensions.get('window').width;

const RingScreen = () => {
  const [ringData, setRingData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserIotData();

        // Assuming API returns a list, get latest or last 6
        const recentData = data.slice(-6); 
        const latest = recentData[recentData.length - 1];

        const formattedData = {
          heartRate: latest.heart_rate,
          bbt: latest.temperature,
          historicalBBT: recentData.map(entry => entry.temperature),
          historicalHeartRate: recentData.map(entry => entry.heart_rate),
        };

        setRingData(formattedData);

        // Simulate ML result
        setTimeout(() => {
          setAnalysis({
            cyclePhase: 'Ovulation Phase',
          });
        }, 1000);
      } catch (error) {
        console.error('Error loading ring data:', error);
        Alert.alert('Error', 'Unable to fetch ring data. Please check your connection or login status.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>💍 Smart Ring Dashboard</Text>
      <Text style={styles.description}>
        Stay in tune with your body. Your smart ring tracks health metrics in real-time, helping you make informed lifestyle decisions.
      </Text>

      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator size="large" color="#4B9CD3" />
        ) : ringData ? (
          <>
            <Text style={styles.metricTitle}>📈 Heart Rate</Text>
            <Text style={styles.metricValue}>{ringData.heartRate} bpm</Text>
            <Text style={styles.metricTitle}>🌡️ Basal Body Temperature</Text>
            <Text style={styles.metricValue}>{ringData.bbt} °C</Text>
          </>
        ) : (
          <Text style={{ color: '#EF4444' }}>No data available</Text>
        )}
      </View>

      {analysis && ringData && (
        <View style={styles.analysisBox}>
          <Text style={styles.analysisHeader}>🔬 Analyze</Text>
          <Text style={styles.phase}>Cycle Phase: {analysis.cyclePhase}</Text>
          <Text style={styles.analysisText}>{analysis.message}</Text>

          <Text style={styles.chartLabel}>BBT Over Time</Text>
          <LineChart
            data={{
              labels: ['Day 1', '2', '3', '4', '5', '6'],
              datasets: [{ data: ringData.historicalBBT }],
            }}
            width={screenWidth - 40}
            height={180}
            chartConfig={{
              backgroundColor: '#F3F4F6',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: () => '#4B9CD3',
              labelColor: () => '#6B7280',
              strokeWidth: 2,
            }}
            bezier
            style={{ marginVertical: 10, borderRadius: 12 }}
          />

          <Text style={styles.chartLabel}>Heart Rate Over Time</Text>
          <LineChart
            data={{
              labels: ['Day 1', '2', '3', '4', '5', '6'],
              datasets: [{ data: ringData.historicalHeartRate }],
            }}
            width={screenWidth - 40}
            height={180}
            chartConfig={{
              backgroundColor: '#F3F4F6',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: () => '#EF4444',
              labelColor: () => '#6B7280',
              strokeWidth: 2,
            }}
            bezier
            style={{ marginVertical: 10, borderRadius: 12 }}
          />
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={() => router.push('/ringdata')}>
        <Text style={styles.buttonText}>See Ring Data 📊</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#1F2937', marginBottom: 10 },
  description: { fontSize: 16, color: '#4B5563', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  metricTitle: { fontSize: 16, color: '#6B7280', marginTop: 10 },
  metricValue: { fontSize: 22, fontWeight: 'bold', color: '#111827' },
  analysisBox: {
    backgroundColor: '#E0F2FE',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
  },
  analysisHeader: { fontSize: 18, fontWeight: 'bold', color: '#2563EB' },
  phase: { fontSize: 16, fontWeight: '600', marginTop: 5, color: '#1E40AF' },
  analysisText: { fontSize: 14, marginTop: 5, color: '#374151' },
  chartLabel: { fontSize: 14, marginTop: 10, marginBottom: 5, color: '#4B5563' },
  button: {
    backgroundColor: '#4B9CD3',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#4B9CD3',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default RingScreen;
