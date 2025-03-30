import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ToastAndroid,
} from "react-native";
import HealthTip from "../components/HealthTip";
import { useNavigation } from "expo-router";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
const predictions = [
  { id: "1", date: "2025-03-20", risk: "High", age: 60, bp: 140, chol: 220 },
  { id: "2", date: "2025-03-22", risk: "Low", age: 45, bp: 120, chol: 180 },
];

const tips = [
  "Maintain a balanced diet rich in fiber.",
  "Exercise regularly for at least 30 mins/day.",
  "Avoid smoking and limit alcohol intake.",
  "Monitor blood pressure and cholesterol.",
];
async function connectionStatus() {
  const response = await fetch("https://heart-disease-prediction-tool.onrender.com/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (result.success) {
    ToastAndroid.show("Connected to server!", ToastAndroid.LONG);
  } else {
    ToastAndroid.show("Unable to connect to server!", ToastAndroid.LONG);
  }
}
const Dashboard = () => {
  useEffect(() => {
    connectionStatus();
  }, []);
  const navigation = useNavigation();
  return (
    <ScrollView
    contentContainerStyle={styles.container}
    nestedScrollEnabled={true}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Heart Disease Prediction</Text>
        <Text style={styles.subtitle}>
          Welcome back! Stay informed about your health.
        </Text>
      </View>

      {/* Summary of Predictions */}
      {/* <Text style={styles.sectionTitle}>📊 Recent Predictions</Text>
      <FlatList
       nestedScrollEnabled={true}
        data={predictions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PredictionCard prediction={item} />}
      /> */}

      {/* Start Prediction Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Prediction")}
      >
        <Text style={styles.buttonText}>Start New Prediction</Text>
      </TouchableOpacity>

      {/* Health Tips Section */}
      <Text style={styles.sectionTitle}>💡 Health Tips</Text>
      {tips.map((tip, index) => (
        <HealthTip key={index} tip={tip} />
      ))}

      {/* Import/Export Options */}
      {/* <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>📥 Import Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>📤 Export Results</Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#F8F9FA",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    color: "#444",
  },
  button: {
    backgroundColor: "#FF6F61",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  menuButton: {
    backgroundColor: "#E9ECEF",
    padding: 10,
    borderRadius: 8,
  },
  menuText: {
    fontSize: 14,
    color: "#555",
  },
});

export default Dashboard;
