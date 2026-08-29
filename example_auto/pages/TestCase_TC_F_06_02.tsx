import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { ResultPanel } from '../components/ResultPanel';

interface TestResult {
  status: 'idle' | 'running' | 'success' | 'fail';
  message: string;
  details?: string;
}

interface TestCaseDetailProps {
  onBack: () => void;
}

export function TestCase_TC_F_06_02({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [selectedItem, setSelectedItem] = useState(5);

  const items = Array.from({ length: 15 }, (_, i) => `选项 ${i + 1}`);

  const handleStartTest = () => {
    setResult({
      status: 'running',
      message: '请按照测试步骤手动测试',
      details: '1. 快速向上滑动滚轮后抬起手指，观察是否继续滚动并逐渐减速\n2. 观察滚轮惯性滚动过程，速度是否逐渐降低\n3. 快速向下滑动滚轮后抬起手指，观察惯性效果'
    });
  };

  const handlePass = () => {
    setResult({
      status: 'success',
      message: '测试通过',
      details: `滚轮惯性滚动正常，逐渐减速并停止，当前选中: ${items[selectedItem]}`
    });
  };

  const handleFail = () => {
    setResult({
      status: 'fail',
      message: '测试失败',
      details: '滚轮未能产生惯性滚动或减速不自然'
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-06-02] </Text>手势交互-惯性滚动</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到手势交互测试页面；WheelPicker组件已正常显示</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 快速向上滑动滚轮后抬起手指</Text>
            <Text style={styles.checkpointText}>[验证点: 手指离开后滚轮继续向上滚动，并逐渐减速]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 观察滚轮惯性滚动过程</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮滚动速度逐渐降低，最终停止在某个选中项]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>3. 快速向下滑动滚轮后抬起手指</Text>
            <Text style={styles.checkpointText}>[验证点: 手指离开后滚轮继续向下滚动，并逐渐减速]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>快速滑动后滚轮继续惯性滚动并逐渐减速</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>滚轮停止在某个选中项</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>测试滚轮 - 当前选中: {items[selectedItem]}</Text>
          <WheelPicker
            selectedItem={selectedItem}
            data={items}
            onItemSelected={setSelectedItem}
            style={styles.picker}
          />
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>测试操作</Text>
          <TouchableOpacity
            testID="btn_start_test"
            style={styles.actionButton}
            onPress={handleStartTest}
          >
            <Text style={styles.actionButtonText}>开始测试</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="btn_pass"
            style={[styles.actionButton, styles.passButton]}
            onPress={handlePass}
          >
            <Text style={styles.actionButtonText}>通过</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="btn_fail"
            style={[styles.actionButton, styles.failButton]}
            onPress={handleFail}
          >
            <Text style={styles.actionButtonText}>失败</Text>
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
  pickerContainer: { padding: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 16, alignItems: 'center' },
  pickerLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  picker: { width: 300, height: 180 },
  actionsContainer: { marginTop: 8 },
  actionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  actionButton: { padding: 12, backgroundColor: '#2196F3', borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  passButton: { backgroundColor: '#4CAF50' },
  failButton: { backgroundColor: '#F44336' },
  actionButtonText: { color: '#fff', fontWeight: 'bold' },
});
