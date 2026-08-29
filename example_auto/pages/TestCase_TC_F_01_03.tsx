import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ResultPanel } from '../components/ResultPanel';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { formatTime24 } from '../data/dateFormat';

interface TestResult {
  status: 'idle' | 'running' | 'success' | 'fail';
  message: string;
  details?: string;
}

interface TestCaseDetailProps {
  onBack: () => void;
}

export function TestCase_TC_F_01_03({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [callbackHistory, setCallbackHistory] = useState<string[]>([]);
  const testData = ['索引0', '索引1', '索引2', '索引3', '索引4', '索引5'];

  const handleItemSelected = (index: number) => {
    const timestamp = formatTime24(new Date());
    const logEntry = `[${timestamp}] 回调触发: 索引=${index}, 内容=${testData[index]}`;
    setCallbackHistory(prev => [...prev, logEntry]);
    setResult({
      status: 'success',
      message: `✓ onItemSelected 回调已触发`,
      details: `当前选中索引: ${index}, 内容: ${testData[index]}`
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-01-03] </Text>WheelPicker选中项回调</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置onItemSelected回调函数；初始选中项为索引0</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 滚动滚轮，将选中项从索引0变更为索引2</Text>
            <Text style={styles.checkpointText}>[验证点: onItemSelected回调被触发，参数值为2]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 继续滚动滚轮，将选中项变更为索引4</Text>
            <Text style={styles.checkpointText}>[验证点: onItemSelected回调再次被触发，参数值为4]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>选中项变化时回调函数被正确触发，参数为准确的索引值</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>回调函数执行完毕</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>WheelPicker 组件（初始位置索引0）:</Text>
          <WheelPicker
            data={testData}
            style={styles.picker}
            selectedItem={0}
            onItemSelected={handleItemSelected}
          />
          <Text style={styles.instructionText}>👆 滚动到索引2，然后滚动到索引4验证回调</Text>
        </View>

        {callbackHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>回调历史记录:</Text>
            {callbackHistory.map((log, idx) => (
              <Text key={idx} style={styles.historyText}>{log}</Text>
            ))}
          </View>
        )}
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
  pickerContainer: { marginTop: 16, padding: 12, backgroundColor: '#fff', borderRadius: 8 },
  pickerLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  picker: { width: '100%', height: 150 },
  instructionText: { fontSize: 12, color: '#666', marginTop: 8, textAlign: 'center' },
  historyContainer: { marginTop: 16, padding: 12, backgroundColor: '#fff', borderRadius: 8 },
  historyTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  historyText: { fontSize: 12, color: '#333', marginTop: 2 },
});
