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

export function TestCase_TC_F_02_04({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [callbackHistory, setCallbackHistory] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const handleTimeSelected = (date: Date) => {
    setSelectedTime(date);
    const timeStr = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    const callbackMsg = `回调触发 - 时间: ${timeStr} (小时: ${date.getHours()}, 分钟: ${date.getMinutes()})`;
    setCallbackHistory(prev => [...prev, callbackMsg]);
    console.log('Time callback:', date);
  };

  const verifyCallback = () => {
    if (callbackHistory.length === 0) {
      setResult({
        status: 'fail',
        message: '未检测到回调',
        details: '请先滚动TimePicker的小时或分钟滚轮以触发回调'
      });
    } else {
      setResult({
        status: 'success',
        message: '回调功能验证通过',
        details: `回调已触发 ${callbackHistory.length} 次。最新时间: ${selectedTime ? selectedTime.getHours() + ':' + selectedTime.getMinutes().toString().padStart(2, '0') : '无'}`
      });
    }
  };

  const clearHistory = () => {
    setCallbackHistory([]);
    setResult({ status: 'idle', message: '' });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-02-04] </Text>TimePicker时间变化回调</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到TimePicker测试页面；TimePicker组件已设置onTimeSelected回调函数</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 调整小时滚轮，将小时从14变更为16</Text>
            <Text style={styles.checkpointText}>[验证点: onTimeSelected回调被触发，返回的Date对象小时值为16]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 调整分钟滚轮，将分钟从30变更为45</Text>
            <Text style={styles.checkpointText}>[验证点: onTimeSelected回调再次被触发，返回的Date对象分钟值为45]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>时间变化时回调触发，返回的Date对象时间正确</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>回调处理完毕</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerTitle}>TimePicker (初始: 14:30)</Text>
          <TimePicker
            initDate={new Date(2024, 0, 1, 14, 30)}
            format24={true}
            onTimeSelected={handleTimeSelected}
            selectedItemTextColor="#9C27B0"
            itemTextSize={18}
            style={styles.picker}
          />
          <View style={styles.callbackInfo}>
            <Text style={styles.callbackTitle}>回调历史 (共 {callbackHistory.length} 次):</Text>
            {callbackHistory.slice(-3).map((msg, idx) => (
              <Text key={idx} style={styles.callbackText}>• {msg}</Text>
            ))}
            {callbackHistory.length === 0 && (
              <Text style={styles.callbackEmpty}>请滚动时间选择器触发回调</Text>
            )}
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>Actions</Text>
          <TouchableOpacity
            testID="btn_verify_callback"
            style={styles.actionButton}
            onPress={verifyCallback}
          >
            <Text style={styles.actionButtonText}>验证回调功能</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="btn_clear_history"
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={clearHistory}
          >
            <Text style={styles.actionButtonText}>清除历史</Text>
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
  callbackInfo: { marginTop: 12, width: '100%', padding: 8, backgroundColor: '#f0f0f0', borderRadius: 4 },
  callbackTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  callbackText: { fontSize: 12, color: '#4CAF50', marginTop: 2 },
  callbackEmpty: { fontSize: 12, color: '#999', fontStyle: 'italic' },
  actionsContainer: { marginTop: 8 },
  actionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  actionButton: { padding: 12, backgroundColor: '#2196F3', borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  secondaryButton: { backgroundColor: '#757575' },
  actionButtonText: { color: '#fff', fontWeight: 'bold' },
});
