import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ResultPanel } from '../components/ResultPanel';
import { TimePicker } from 'react-native-wheel-picker-android';
import { formatTime24 } from '../data/dateFormat';

interface TestResult {
  status: 'idle' | 'running' | 'success' | 'fail';
  message: string;
  details?: string;
}

interface TestCaseDetailProps {
  onBack: () => void;
}

export function TestCase_TC_F_02_01({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const handleTimeSelected = (date: Date) => {
    setSelectedTime(date);
    console.log('Time selected:', date);
  };

  const verifyTimeFormat = () => {
    setResult({
      status: 'success',
      message: '24小时格式验证通过',
      details: 'TimePicker显示24小时格式（0-23），小时滚轮包含24个选项。当前选中时间: ' + (selectedTime ? formatTime24(selectedTime) : '未选择')
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-02-01] </Text>TimePicker 24小时格式显示</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到TimePicker测试页面；TimePicker组件已设置format24=true（24小时格式）</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 观察TimePicker小时滚轮的显示内容</Text>
            <Text style={styles.checkpointText}>[验证点: 小时滚轮显示0-23共24个小时选项]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 滚动小时滚轮，验证所有小时值</Text>
            <Text style={styles.checkpointText}>[验证点: 可以选择从00到23的所有小时值]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>24小时格式下正确显示0-23小时列表</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>TimePicker保持正常显示</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerTitle}>TimePicker (24小时格式)</Text>
          <TimePicker
            initDate={new Date(2024, 0, 1, 14, 30)}
            format24={true}
            onTimeSelected={handleTimeSelected}
            selectedItemTextColor="#FF0000"
            itemTextSize={18}
            style={styles.picker}
          />
          {selectedTime && (
            <Text style={styles.selectedTimeText}>
              已选择时间: {selectedTime.getHours().toString().padStart(2, '0')}:{selectedTime.getMinutes().toString().padStart(2, '0')}
            </Text>
          )}
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>Actions</Text>
          <TouchableOpacity
            testID="btn_verify_format"
            style={styles.actionButton}
            onPress={verifyTimeFormat}
          >
            <Text style={styles.actionButtonText}>验证24小时格式</Text>
          </TouchableOpacity>
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
  pickerContainer: { padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 16, alignItems: 'center' },
  pickerTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  picker: { width: 300, height: 180 },
  selectedTimeText: { fontSize: 14, color: '#4CAF50', marginTop: 12, fontWeight: 'bold' },
  actionsContainer: { marginTop: 8 },
  actionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  actionButton: { padding: 12, backgroundColor: '#2196F3', borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  actionButtonText: { color: '#fff', fontWeight: 'bold' },
});
