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

export function TestCase_TC_F_06_06({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [selectedItem, setSelectedItem] = useState(5);

  const items = Array.from({ length: 15 }, (_, i) => `选项 ${i + 1}`);

  const handleItemSelected = (index: number) => {
    setSelectedItem(index);
    setResult({
      status: 'success',
      message: '✓ onItemSelected 回调已触发',
      details: `当前选中索引: ${index}，选中项: ${items[index]}`
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-06-06] </Text>手势交互-慢速滑动</Text>
      <Text style={styles.subHeader}>级别: L1</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到手势交互测试页面；WheelPicker组件已正常显示</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 缓慢向上滑动滚轮，保持手指不离开屏幕</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮精确跟随手指移动，无延迟或飘移]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 缓慢向下滑动滚轮，观察滚轮响应</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮能够精确响应慢速滑动，移动距离与手指移动距离一致]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>3. 进行极慢速微调滑动</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮能够响应微小的滑动距离，精确控制选中项]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>慢速滑动时滚轮能够精确跟随手指移动</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>滚轮保持灵敏响应</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>测试滚轮 - 当前选中: {items[selectedItem]}</Text>
          <WheelPicker
            selectedItem={selectedItem}
            data={items}
            onItemSelected={handleItemSelected}
            style={styles.picker}
          />
          <Text style={styles.hint}>缓慢滑动观察精确跟随效果</Text>
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
  hint: { fontSize: 12, color: '#666', marginTop: 8 },
});
