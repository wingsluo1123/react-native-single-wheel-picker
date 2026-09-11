import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ResultPanel } from '../components/ResultPanel';
import { DatePicker } from 'react-native-wheel-picker-android';
import { formatDate } from '../data/dateFormat';

interface TestResult {
  status: 'idle' | 'running' | 'success' | 'fail';
  message: string;
  details?: string;
}

interface TestCaseDetailProps {
  onBack: () => void;
}

export function TestCase_TC_F_03_03({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [dateFormat, setDateFormat] = useState<string>('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
    setResult({
      status: 'success',
      message: `日期已选择（格式: ${dateFormat}）`,
      details: `选中日期: ${formatDate(date)}`
    });
  };

  const changeFormat = (format: string) => {
    setDateFormat(format);
    setResult({
      status: 'idle',
      message: `已切换到格式: ${format}`,
      details: '请观察日期滚轮的显示格式变化'
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-03-03] </Text>DatePicker日期格式化</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件已设置format='YYYY-MM-DD'</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 观察日期滚轮的日期显示格式</Text>
            <Text style={styles.checkpointText}>[验证点: 日期按照'YYYY-MM-DD'格式显示（如'2024-01-15'）]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 更改format为'DD/MM/YYYY'，观察日期格式变化</Text>
            <Text style={styles.checkpointText}>[验证点: 日期按照'DD/MM/YYYY'格式显示（如'15/01/2024'）]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>日期显示格式与format参数设置一致</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>DatePicker保持格式化显示</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>格式切换按钮</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              testID="btn_format_1"
              style={[styles.actionButton, dateFormat === 'YYYY-MM-DD' && styles.activeButton]}
              onPress={() => changeFormat('YYYY-MM-DD')}
            >
              <Text style={styles.actionButtonText}>YYYY-MM-DD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="btn_format_2"
              style={[styles.actionButton, dateFormat === 'DD/MM/YYYY' && styles.activeButton]}
              onPress={() => changeFormat('DD/MM/YYYY')}
            >
              <Text style={styles.actionButtonText}>DD/MM/YYYY</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.actionTitle}>DatePicker 组件（当前格式: {dateFormat}）</Text>
          <View style={styles.pickerContainer}>
            <DatePicker
              initDate={new Date('2024-01-15')}
              startDate="2024-01-01"
              daysCount={30}
              format={dateFormat}
              onDateSelected={handleDateSelected}
              style={styles.picker}
            />
          </View>
          {selectedDate && (
            <Text style={styles.selectedText}>
              当前选中: {formatDate(selectedDate)}
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
  buttonRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  actionButton: { flex: 1, padding: 12, backgroundColor: '#2196F3', borderRadius: 8, alignItems: 'center' },
  activeButton: { backgroundColor: '#4CAF50' },
  actionButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  pickerContainer: { backgroundColor: '#fff', borderRadius: 8, padding: 8, marginBottom: 8 },
  picker: { width: '100%', height: 150 },
  selectedText: { fontSize: 14, color: '#4CAF50', marginTop: 8, textAlign: 'center' },
});
