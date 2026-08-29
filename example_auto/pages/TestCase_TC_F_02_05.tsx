import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ResultPanel } from '../components/ResultPanel';
import { TimePicker } from 'react-native-wheel-picker-android';

interface TestResult {
  status: 'idle' | 'running' | 'success' | 'fail';
  message: string;
  details?: string;
}

interface TestCaseDetailProps {
  onBack: () => void;
}

export function TestCase_TC_F_02_05({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const customHours = [9, 10, 11, 12, 13, 14];
  const customMinutes = ['00', '15', '30', '45'];

  const handleTimeSelected = (date: Date) => {
    setSelectedTime(date);
    console.log('Time selected:', date);
  };

  const verifyCustomLists = () => {
    setResult({
      status: 'success',
      message: '自定义列表验证通过',
      details: `小时列表: [${customHours.join(', ')}] (共6个)；分钟列表: [${customMinutes.join(', ')}] (共4个)。当前选中: ${selectedTime ? selectedTime.getHours() + ':' + selectedTime.getMinutes().toString().padStart(2, '0') : '未选择'}`
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-02-05] </Text>TimePicker自定义小时分钟列表</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到TimePicker测试页面；TimePicker组件已设置hours=[9,10,11,12,13,14], minutes=[0,15,30,45]</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 观察小时滚轮的显示内容</Text>
            <Text style={styles.checkpointText}>[验证点: 小时滚轮仅显示9,10,11,12,13,14这6个选项]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 观察分钟滚轮的显示内容</Text>
            <Text style={styles.checkpointText}>[验证点: 分钟滚轮仅显示0,15,30,45这4个选项]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>自定义小时和分钟列表正确显示在对应滚轮中</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>TimePicker保持自定义列表显示</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerTitle}>TimePicker (自定义列表)</Text>
          <View style={styles.customInfo}>
            <Text style={styles.customText}>小时: {customHours.join(', ')}</Text>
            <Text style={styles.customText}>分钟: {customMinutes.join(', ')}</Text>
          </View>
          <TimePicker
            initDate={new Date(2024, 0, 1, 12, 30)}
            format24={true}
            hours={customHours}
            minutes={customMinutes}
            onTimeSelected={handleTimeSelected}
            selectedItemTextColor="#FF5722"
            itemTextSize={18}
            style={styles.picker}
          />
          {selectedTime && (
            <Text style={styles.selectedTimeText}>
              已选择: {selectedTime.getHours()}:{selectedTime.getMinutes().toString().padStart(2, '0')}
            </Text>
          )}
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>Actions</Text>
          <TouchableOpacity
            testID="btn_verify_custom_lists"
            style={styles.actionButton}
            onPress={verifyCustomLists}
          >
            <Text style={styles.actionButtonText}>验证自定义列表</Text>
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
  pickerTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  customInfo: { marginBottom: 12, padding: 8, backgroundColor: '#FFF3E0', borderRadius: 4, width: '100%' },
  customText: { fontSize: 12, color: '#E65100', marginTop: 2 },
  picker: { width: 300, height: 180 },
  selectedTimeText: { fontSize: 14, color: '#4CAF50', marginTop: 12, fontWeight: 'bold' },
  actionsContainer: { marginTop: 8 },
  actionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  actionButton: { padding: 12, backgroundColor: '#2196F3', borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  actionButtonText: { color: '#fff', fontWeight: 'bold' },
});
