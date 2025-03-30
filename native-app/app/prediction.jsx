import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput, RadioButton } from "react-native-paper";
// import { configDotenv } from "dotenv";
// import { BACKEND_URL } from "@env";

import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ToastAndroid,
} from "react-native";

// configDotenv()

export default function FormScreen() {
  const [formData, setFormData] = useState({
    sex: "",
    age: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [result, setResult] = useState(null); // Stores prediction result
  const navigation = useNavigation(); // To navigate to result page

  // Handles input changes
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Handles form submission
  const handleSubmit = async () => {
    if (Object.values(formData).some((value) => value === "")) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      const response = await fetch(process.env.EXPO_PUBLIC_PREDICT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const resultData = await response.json();

      if (response.status === 200) {
        setResult(resultData);
        setModalVisible(true); // Show dialog
        ToastAndroid.show("Prediction successful!", ToastAndroid.SHORT);
        // navigation.navigate("ResultScreen", {
        //   result,
        // });
      } else {
        Alert.alert("Error", "Failed to get prediction result.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
      console.error("Error:", error);
    }
  };

  // Navigate to Result Page
  const goToResultPage = () => {
    setModalVisible(false);
    navigation.navigate("ResultScreen", {
      result,
    });
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Heart Disease Prediction</Text>
        <View style={styles.inputFieldsContainer}>
          {/* Radio Buttons for Gender */}
          <View style={styles.inputWrapper}>
            <View style={styles.radioGroup}>
              <View style={styles.radioOption}>
                <RadioButton
                  value="1"
                  status={formData.sex === "1" ? "checked" : "unchecked"}
                  onPress={() => handleInputChange("sex", "1")}
                  color="black"
                />
                <Text style={styles.radioLabel}>Male</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton
                  value="0"
                  status={formData.sex === "0" ? "checked" : "unchecked"}
                  onPress={() => handleInputChange("sex", "0")}
                  color="black"
                />
                <Text style={styles.radioLabel}>Female</Text>
              </View>
            </View>
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            {Object.keys(formData)
              .filter((field) => field !== "sex")
              .map((field, index) => (
                <View style={styles.inputWrapper} key={index}>
                  <TextInput
                    placeholderTextColor="8b008b"
                    textColor="black"
                    outlineColor="#dda0dd"
                    activeOutlineColor="#8b008b"
                    label={field}
                    style={styles.input}
                    keyboardType="numeric"
                    value={formData[field]}
                    onChangeText={(value) => handleInputChange(field, value)}
                    mode="outlined"
                  />
                </View>
              ))}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
          <Text style={styles.primaryText}>Start Prediction</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal to Show Prediction Result */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Prediction Successful!</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={goToResultPage}
            >
              <Text style={styles.modalButtonText}>Show Result</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  inputFieldsContainer: {
    width: "100%",
    maxWidth: 400,
    // backgroundColor: "yellow",
  },
  inputWrapper: {
    marginBottom: 15,
    width: "100%", // Make input wrappers take full width
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: "#555",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    // borderRadius: 8,
    // paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
    // borderColor: "#ccc",
    // borderWidth: 1,
  },
  primaryButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 30,
  },
  primaryText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#28a745", // Success color
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#007bff", // Primary button color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
