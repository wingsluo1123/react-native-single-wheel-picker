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

export function TestCase_TC_F_01_07({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({
    status: 'success',
    message: '✓ WheelPicker 已显示为禁用状态（disabled=true）',
    details: '尝试滑动滚轮，应该不会响应任何手势'
  });
  const testData = ['项1', '项2', '项3', '项4', '项5'];

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-01-07] </Text>WheelPicker禁用交互</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置disabled=true</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 尝试在WheelPicker滚轮区域进行滑动手势</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮不响应滑动手势，保持静止]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 尝试多次滑动操作</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮始终不响应任何滑动手势]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>禁用状态下滚轮完全不响应用户交互</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>滚轮保持禁用状态</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>WheelPicker 组件（禁用状态 disabled=true）:</Text>
          <WheelPicker
            data={testData}
            style={styles.picker}
            selectedItem={2}
            disabled={true}
            onItemSelected={(index) => {
              setResult({
                status: 'fail',
                message: `✗ 禁用状态下回调不应被触发`,
                details: `意外触发回调，索引: ${index}`
              });
            }}
          />
          <Text style={styles.instructionText}>👆 尝试滑动此滚轮，应该无法响应（已禁用）</Text>
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
});
