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

export function TestCase_TC_F_03_09({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
    setResult({
      status: 'success',
      message: '日期已选择（自定义格式）',
      details: `选中日期: ${date.toISOString().split('T')[0]}\n格式化显示应为: ddd, MMM D, YYYY`
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-03-09] </Text>DatePicker自定义格式</Text>
      <Text style={styles.subHeader}>级别: L1</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件已设置format='ddd, MMM D, YYYY'（自定义格式）</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 观察日期滚轮的日期显示</Text>
            <Text style={styles.checkpointText}>[验证点: 日期按照'ddd, MMM D, YYYY'格式显示（如'Mon, Jan 15, 2024'）]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 滚动日期滚轮，验证多个日期的格式</Text>
            <Text style={styles.checkpointText}>[验证点: 所有日期均按照自定义格式正确显示]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>自定义format格式正确应用到所有日期显示</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>DatePicker保持自定义格式显示</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>DatePicker 组件（自定义格式: ddd, MMM D, YYYY）</Text>
          <View style={styles.formatExampleContainer}>
            <Text style={styles.formatExampleText}>格式示例:</Text>
            <Text style={styles.formatExampleText}>• Mon, Jan 15, 2024</Text>
            <Text style={styles.formatExampleText}>• Tue, Jan 16, 2024</Text>
            <Text style={styles.formatExampleText}>• Wed, Jan 17, 2024</Text>
          </View>
          <View style={styles.pickerContainer}>
            <DatePicker
              initDate={new Date('2024-01-15')}
              startDate="2024-01-01"
              daysCount={30}
              format="ddd, MMM D, YYYY"
              format24={true}
              onDateSelected={handleDateSelected}
              style={styles.picker}
            />
          </View>
          {selectedDate && (
            <Text style={styles.selectedText}>
              当前选中: {selectedDate.toISOString().split('T')[0]}
            </Text>
          )}
          <Text style={styles.hintText}>
            提示: 观察日期滚轮中的日期是否按照自定义格式显示
          </Text>
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
  formatExampleContainer: { backgroundColor: '#FFF3E0', padding: 8, borderRadius: 4, marginBottom: 8 },
  formatExampleText: { fontSize: 12, color: '#E65100', marginTop: 2 },
  pickerContainer: { backgroundColor: '#fff', borderRadius: 8, padding: 8, marginBottom: 8 },
  picker: { width: '100%', height: 150 },
  selectedText: { fontSize: 14, color: '#4CAF50', marginTop: 8, textAlign: 'center' },
  hintText: { fontSize: 12, color: '#666', marginTop: 4, fontStyle: 'italic' },
});
