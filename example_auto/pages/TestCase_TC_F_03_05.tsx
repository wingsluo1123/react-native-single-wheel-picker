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

export function TestCase_TC_F_03_05({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [initialDate] = useState(() => new Date());
  const [rangeStart] = useState(() => new Date().toISOString());

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
    setResult({
      status: 'success',
      message: '日期已选择（仅日期滚轮可见）',
      details: `选中日期: ${date.toISOString().split('T')[0]}`
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-03-05] </Text>DatePicker隐藏时间滚轮</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件已设置hideHours=true, hideMinutes=true</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 观察DatePicker的滚轮组成</Text>
            <Text style={styles.checkpointText}>[验证点: 小时和分钟滚轮均不显示，仅显示日期滚轮]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 验证日期滚轮功能正常</Text>
            <Text style={styles.checkpointText}>[验证点: 日期滚轮可以正常滚动和选择]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>hideHours和hideMinutes为true时对应滚轮不显示</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>DatePicker保持日期滚轮显示</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>DatePicker 组件（隐藏时间滚轮）</Text>
          <View style={styles.pickerContainer}>
            <DatePicker
              initDate={initialDate}
              startDate={rangeStart}
              daysCount={30}
              hideHours={true}
              hideMinutes={true}
              onDateSelected={handleDateSelected}
              style={styles.picker}
            />
          </View>
          {selectedDate && (
            <Text style={styles.selectedText}>
              当前选中日期: {selectedDate.toISOString().split('T')[0]}
            </Text>
          )}
          <Text style={styles.hintText}>
            提示: 时间滚轮已隐藏，仅显示日期选择器
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
  pickerContainer: { backgroundColor: '#fff', borderRadius: 8, padding: 8, marginBottom: 8 },
  picker: { width: '100%', height: 150 },
  selectedText: { fontSize: 14, color: '#4CAF50', marginTop: 8, textAlign: 'center' },
  hintText: { fontSize: 12, color: '#666', marginTop: 4, fontStyle: 'italic' },
});
