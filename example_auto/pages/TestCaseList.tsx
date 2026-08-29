import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { TestCase } from '../data/testCases';

interface TestCaseListProps {
  moduleName: string;
  testCases: TestCase[];
  onSelectTestCase: (tc: TestCase) => void;
  onBack: () => void;
}

export function TestCaseList({ moduleName, testCases, onSelectTestCase, onBack }: TestCaseListProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回模块列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}>{moduleName}</Text>
      <FlatList
        data={testCases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            testID={`testcase_${item.id}`}
            style={styles.card}
            onPress={() => onSelectTestCase(item)}
          >
            <Text style={styles.title}><Text style={styles.code}>[{item.id}] </Text>{item.title}</Text>
            <Text style={styles.level}>级别: {item.level}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  backButton: { marginBottom: 16 },
  backText: { fontSize: 14, color: '#2196F3' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  card: { padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8 },
  title: { fontSize: 14, fontWeight: '500' },
  code: { fontSize: 12, fontWeight: '600', color: '#2196F3' },
  level: { fontSize: 12, color: '#666', marginTop: 4 },
});
