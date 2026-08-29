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

export function TestCase_TC_F_05_04({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [selectedItem, setSelectedItem] = useState(0);
  const data = ['A', 'B'];

  const handleItemSelected = (index: number) => {
    setSelectedItem(index);
    const message = `当前选中项: ${data[index]} (索引: ${index})`;
    const details = '数据长度≤2时，即使设置isCyclic=true，循环模式也会被强制关闭。尝试在边界继续滑动应无法超越。';

    setResult({
      status: 'success',
      message,
      details
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-05-04] </Text>循环滚动-2个元素强制关闭循环</Text>
      <Text style={styles.subHeader}>级别: L2</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到循环滚动测试页面；WheelPicker组件已设置isCyclic=true，数据项包含['A', 'B']（2个元素）</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 观察滚轮的初始状态</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮显示2个数据项'A'和'B']</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 将滚轮滚动到末项'B'，尝试继续向上滑动</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮停止在末项'B'，无法循环滚动]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>3. 将滚轮滚动到首项'A'，尝试继续向下滑动</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮停止在首项'A'，无法循环滚动]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>数据长度≤2时即使设置isCyclic为true也不循环</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>滚轮保持非循环模式</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>WheelPicker - 2个元素强制关闭循环</Text>
          <View style={styles.pickerContainer}>
            <WheelPicker
              testID="wheel_picker_two_elements"
              data={data}
              selectedItem={selectedItem}
              onItemSelected={handleItemSelected}
              isCyclic={true}
              selectedItemTextColor="#FF0000"
              itemTextColor="#000000"
              selectedItemTextSize={20}
              itemTextSize={16}
              style={styles.wheelPicker}
            />
          </View>
          <Text style={styles.instruction}>
            请手动测试：尽管isCyclic设置为true，但由于只有2个元素，滚动到'A'或'B'后尝试继续滑动应无法超越边界（循环被强制关闭）。
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
  pickerContainer: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 12 },
  wheelPicker: { width: '100%', height: 180 },
  instruction: { fontSize: 12, color: '#666', fontStyle: 'italic', marginTop: 8 },
});
