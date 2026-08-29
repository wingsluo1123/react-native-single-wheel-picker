import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Module } from '../data/testCases';

interface ModuleListProps {
  modules: Module[];
  onSelectModule: (module: Module) => void;
}

export function ModuleList({ modules, onSelectModule }: ModuleListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>测试模块列表</Text>
      <FlatList
        data={modules}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            testID={`module_${item.code}`}
            style={styles.card}
            onPress={() => onSelectModule(item)}
          >
            <Text style={styles.title}><Text style={styles.code}>[{item.code}] </Text>{item.name}</Text>
            <Text style={styles.subtitle}>测试用例: {item.testCases.length}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  code: { fontSize: 14, fontWeight: '600', color: '#2196F3' },
  subtitle: { fontSize: 12, color: '#666', marginTop: 4 },
});
