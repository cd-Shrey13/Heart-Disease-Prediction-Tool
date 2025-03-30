import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HealthTip = ({ tip }) => {
  return (
    <View style={styles.tipContainer}>
      <Text style={styles.tipText}>💡 {tip}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tipContainer: {
    backgroundColor: '#FFF3CD',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  tipText: {
    fontSize: 14,
    color: '#856404',
  },
});

export default HealthTip;
