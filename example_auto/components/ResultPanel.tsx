import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface ResultPanelProps {
  status: 'idle' | 'running' | 'success' | 'fail';
  message: string;
  details?: string;
}

export function ResultPanel({ status, message, details }: ResultPanelProps) {
  const statusColor = {
    idle: '#666',
    running: '#2196F3',
    success: '#4CAF50',
    fail: '#F44336',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>执行结果:</Text>
      <ScrollView style={styles.scroll}>
        <Text
          testID="txt_result"
          style={[styles.text, { color: statusColor[status] }]}
        >
          {message || '待执行'}
        </Text>
        {details && <Text style={styles.details}>{details}</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 12,
    backgroundColor: '#fff',
  },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  scroll: { flex: 1 },
  text: { fontSize: 14, fontFamily: 'monospace' },
  details: { fontSize: 12, color: '#666', marginTop: 4 },
});
