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

export function TestCase_TC_F_05_02({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [selectedItem, setSelectedItem] = useState(0);
  const data = ['A', 'B', 'C', 'D', 'E'];

  const handleItemSelected = (index: number) => {
    setSelectedItem(index);
    let message = `当前选中项: ${data[index]} (索引: ${index})`;
    let details = '循环模式已关闭，滚动到首项 A 或末项 E 时将无法继续滚动。';

    if (index === 0) {
      details = '已到达首项 A，向下滑动将无法继续（非循环模式）。';
    } else if (index === data.length - 1) {
      details = '已到达末项 E，向上滑动将无法继续（非循环模式）。';
    }

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
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-05-02] </Text>循环滚动-循环关闭</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到循环滚动测试页面；WheelPicker组件已设置isCyclic=false，数据项包含['A', 'B', 'C', 'D', 'E']</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 将滚轮滚动到末项'E'</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮显示末项'E'为选中状态]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 尝试继续向上滑动滚轮</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮停止在末项'E'，无法继续向上滚动]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>3. 将滚轮滚动到首项'A'</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮显示首项'A'为选中状态]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>4. 尝试继续向下滑动滚轮</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮停止在首项'A'，无法继续向下滑动]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>循环关闭时滚轮在边界停止，无法超越首项或末项</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>滚轮保持非循环滚动模式</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>WheelPicker - 循环模式关闭</Text>
          <View style={styles.pickerContainer}>
            <WheelPicker
              testID="wheel_picker_cyclic_false"
              data={data}
              selectedItem={selectedItem}
              onItemSelected={handleItemSelected}
              isCyclic={false}
              selectedItemTextColor="#FF0000"
              itemTextColor="#000000"
              selectedItemTextSize={20}
              itemTextSize={16}
              style={styles.wheelPicker}
            />
          </View>
          <Text style={styles.instruction}>
            请手动测试：滚动到末项'E'后尝试继续向上滑动，应无法超越边界；滚动到首项'A'后尝试继续向下滑动，应无法超越边界。
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
