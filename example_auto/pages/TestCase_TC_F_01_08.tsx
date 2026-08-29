import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ResultPanel } from '../components/ResultPanel';
import { WheelPicker } from 'react-native-wheel-picker-android';

interface TestResult {
  status: 'idle' | 'running' | 'success' | 'fail';
  message: string;
  details?: string;
}

interface TestCaseDetailProps {
  onBack: () => void;
}

export function TestCase_TC_F_01_08({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [eventCount, setEventCount] = useState(0);
  const testData = ['事件1', '事件2', '事件3', '事件4', '事件5'];

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-01-08] </Text>WheelPicker事件触发</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置onItemSelected回调函数，初始选中项为索引0</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 滑动滚轮到索引2并等待滚轮停止</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮停止后触发onItemSelected回调，参数值为2]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 验证回调参数的准确性</Text>
            <Text style={styles.checkpointText}>[验证点: 回调参数与当前选中项索引完全一致]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>滚动停止后触发选中事件，回调参数正确</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>事件处理完毕</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>WheelPicker 组件（初始索引0）:</Text>
          <WheelPicker
            data={testData}
            style={styles.picker}
            selectedItem={0}
            onItemSelected={(index) => {
              setEventCount(prev => prev + 1);
              setResult({
                status: 'success',
                message: `✓ 事件触发成功（第${eventCount + 1}次）`,
                details: `滚轮停止后触发回调，索引: ${index}, 内容: ${testData[index]}`
              });
            }}
          />
          <Text style={styles.instructionText}>👆 滑动到索引2并等待停止，观察事件触发</Text>
          {eventCount > 0 && (
            <Text style={styles.eventCountText}>事件触发次数: {eventCount}</Text>
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
  pickerContainer: { marginTop: 16, padding: 12, backgroundColor: '#fff', borderRadius: 8 },
  pickerLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  picker: { width: '100%', height: 150 },
  instructionText: { fontSize: 12, color: '#666', marginTop: 8, textAlign: 'center' },
  eventCountText: { fontSize: 12, color: '#4CAF50', marginTop: 8, textAlign: 'center', fontWeight: 'bold' },
});
