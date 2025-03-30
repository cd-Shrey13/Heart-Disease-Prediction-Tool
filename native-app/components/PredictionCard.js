import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PredictionCard = ({ prediction }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{prediction.date}</Text>
      <Text style={styles.risk}>
        Risk Level: <Text style={{ color: prediction.risk === 'High' ? 'red' : 'green' }}>{prediction.risk}</Text>
      </Text>
      <Text style={styles.details}>
        Age: {prediction.age} | BP: {prediction.bp} | Chol: {prediction.chol}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 3,
  },
  date: {
    fontSize: 14,
    color: '#555',
  },
  risk: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  details: {
    fontSize: 12,
    marginTop: 5,
    color: '#777',
  },
});

export default PredictionCard;
