import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export default function ResultScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { result } = route.params || {};
  const { report_url: pdfURL, critical_params: criticalParams } = result;
  const predictResult = result.prediction
    ? "Patient likely has heart-disease!"
    : "Patient doesn't have heart-disease";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prediction Result</Text>
      <Text style={styles.result}>
        {predictResult || "No Result Available"}
      </Text>

      <Text style={styles.paramTitle}>Critical Parameters:</Text>
      {criticalParams ? (
        Object.entries(criticalParams).map(([key, value]) => (
          <Text key={key} style={styles.param}>
            {key.toUpperCase()}: {value}
          </Text>
        ))
      ) : (
        <Text style={styles.noParam}>No Critical Parameters Available</Text>
      )}

      {/* Download Report Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => downloadPdfFile(pdfURL)}
      >
        <Text style={styles.buttonText}>Download Report</Text>
      </TouchableOpacity>

      {/* Navigate Back Button */}
      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const downloadPdfFile = async (fileUrl) => {
  try {
    // Check if sharing is available on the device
    const canShare = await Sharing.isAvailableAsync();

    // Create a file URI for the download
    const fileName = fileUrl.split("/").pop();
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    // Download the file
    const downloadResult = await FileSystem.downloadAsync(fileUrl, fileUri);

    // Check if download was successful
    if (downloadResult.status === 200) {
      // If sharing is available, offer to share/save the file
      if (canShare) {
        await Sharing.shareAsync(downloadResult.uri, {
          mimeType: "application/pdf",
          dialogTitle: "Save or Share PDF",
        });
      } else {
        // Fallback for devices without sharing
        Alert.alert("Download Complete", `File saved to: ${fileUri}`);
      }

      return downloadResult.uri;
    } else {
      throw new Error("Download failed");
    }
  } catch (error) {
    console.error("Error downloading PDF:", error);
    Alert.alert("Download Error", "Unable to download the PDF file.");
    return null;
  }
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1c1c1e", // Dark theme background
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff7f50",
    textAlign: "center",
    marginBottom: 20,
  },
  result: {
    fontSize: 48,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: 900,
  },
  paramTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
    marginBottom: 8,
  },
  param: {
    fontSize: 18,
    color: "#dcdcdc",
    marginBottom: 4,
    fontWeight: 600,
    color: "red",
  },
  noParam: {
    fontSize: 16,
    color: "#dcdcdc",
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#ff7f50",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#4a4a4a",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
