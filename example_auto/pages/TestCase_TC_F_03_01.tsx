import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ResultPanel } from '../components/ResultPanel';
import { DatePicker } from 'react-native-wheel-picker-android';

interface TestResult {
  status: 'idle' | 'running' | 'success' | 'fail';
  message: string;
  details?: string;
}

interface TestCaseDetailProps {
  onBack: () => void;
}

function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function TestCase_TC_F_03_01({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const initialDate = new Date(2024, 0, 1);

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
    setResult({
      status: 'success',
      message: '日期已选择',
      details: `选中日期: ${formatLocalDate(date)}`
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-03-01] </Text>DatePicker日期范围配置</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件已设置startDate='2024-01-01', daysCount=10</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 观察日期滚轮的显示内容</Text>
            <Text style={styles.checkpointText}>[验证点: 日期滚轮显示从2024-01-01开始的10天日期]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 滚动日期滚轮到首项和末项</Text>
            <Text style={styles.checkpointText}>[验证点: 首项为2024-01-01，末项为2024-01-10]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>日期范围与startDate和daysCount设置完全一致</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>DatePicker保持日期范围显示</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>DatePicker 组件</Text>
          <View style={styles.pickerContainer}>
            <DatePicker
              initDate={initialDate}
              startDate="2024-01-01"
              daysCount={10}
              onDateSelected={handleDateSelected}
              style={styles.picker}
            />
          </View>
          {selectedDate && (
            <Text style={styles.selectedText}>
              当前选中: {formatLocalDate(selectedDate)}
            </Text>
          )}
        </View>
      </ScrollView>

      <ResultPanel status={result.status} message={result.message} details={result.details} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  backButton: { padding: 16 },
  backText: { fontSize: 14, color: '#2196F3' },
  header: { fontSize: 20, fontWeight: 'bold', paddingHorizontal: 16 },
  caseId: { fontSize: 16, fontWeight: '600', color: '#2196F3' },
  subHeader: { fontSize: 14, color: '#666', paddingHorizontal: 16, marginBottom: 8 },
  content: { flex: 1, paddingHorizontal: 16 },
  infoCard: { padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 16 },
  infoTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  infoLabel: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  infoValue: { fontSize: 14, color: '#333', marginTop: 2 },
  stepItem: { marginTop: 4 },
  stepText: { fontSize: 14 },
  checkpointText: { fontSize: 12, color: '#2196F3', marginTop: 2 },
  actionsContainer: { marginTop: 8 },
  actionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  pickerContainer: { backgroundColor: '#fff', borderRadius: 8, padding: 8, marginBottom: 8 },
  picker: { width: '100%', height: 150 },
  selectedText: { fontSize: 14, color: '#4CAF50', marginTop: 8, textAlign: 'center' },
});
