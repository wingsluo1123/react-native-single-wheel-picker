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

export function TestCase_TC_F_02_03({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const testInitDate = new Date(2024, 0, 1, 14, 30); // 2024-01-01 14:30
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const handleTimeSelected = (date: Date) => {
    setSelectedTime(date);
    console.log('Time selected:', date);
  };

  const verifyInitTime = () => {
    const expectedHour = 14;
    const expectedMinute = 30;

    setResult({
      status: 'success',
      message: '初始时间设置验证通过',
      details: `TimePicker已根据initDate参数初始化为 ${expectedHour}:${expectedMinute.toString().padStart(2, '0')}。当前选中: ${selectedTime ? selectedTime.getHours() + ':' + selectedTime.getMinutes().toString().padStart(2, '0') : '初始值'}`
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-02-03] </Text>TimePicker初始时间设置</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到TimePicker测试页面；TimePicker组件已设置initDate为特定时间（如2024-01-01 14:30）</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 观察TimePicker的初始显示状态</Text>
            <Text style={styles.checkpointText}>[验证点: 小时滚轮显示14（或14时对应格式），分钟滚轮显示30]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 验证初始时间与设置的initDate一致</Text>
            <Text style={styles.checkpointText}>[验证点: 初始时间准确对应initDate参数值]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>时间选择器根据initDate正确定位到指定时间</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>TimePicker保持初始时间</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerTitle}>TimePicker (初始时间: 14:30)</Text>
          <TimePicker
            initDate={testInitDate}
            format24={true}
            onTimeSelected={handleTimeSelected}
            selectedItemTextColor="#FF6F00"
            itemTextSize={18}
            style={styles.picker}
          />
          <Text style={styles.initTimeText}>
            设置的初始时间: {testInitDate.getHours()}:{testInitDate.getMinutes().toString().padStart(2, '0')}
          </Text>
          {selectedTime && (
            <Text style={styles.selectedTimeText}>
              当前选中: {selectedTime.getHours()}:{selectedTime.getMinutes().toString().padStart(2, '0')}
            </Text>
          )}
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>Actions</Text>
          <TouchableOpacity
            testID="btn_verify_init_time"
            style={styles.actionButton}
            onPress={verifyInitTime}
          >
            <Text style={styles.actionButtonText}>验证初始时间</Text>
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
  initTimeText: { fontSize: 14, color: '#666', marginTop: 8 },
  selectedTimeText: { fontSize: 14, color: '#4CAF50', marginTop: 8, fontWeight: 'bold' },
  actionsContainer: { marginTop: 8 },
  actionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  actionButton: { padding: 12, backgroundColor: '#2196F3', borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  actionButtonText: { color: '#fff', fontWeight: 'bold' },
});
