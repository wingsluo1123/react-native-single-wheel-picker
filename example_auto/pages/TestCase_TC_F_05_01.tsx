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

export function TestCase_TC_F_05_01({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [selectedItem, setSelectedItem] = useState(0);
  const data = ['A', 'B', 'C', 'D', 'E'];

  const handleItemSelected = (index: number) => {
    setSelectedItem(index);
    setResult({
      status: 'success',
      message: `当前选中项: ${data[index]} (索引: ${index})`,
      details: '循环模式已开启，可以从末项 E 滚动到首项 A，或从首项 A 滚动到末项 E，无边界限制。'
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-05-01] </Text>循环滚动-循环开启</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到循环滚动测试页面；WheelPicker组件已设置isCyclic=true，数据项包含['A', 'B', 'C', 'D', 'E']</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 将滚轮滚动到末项'E'</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮显示末项'E'为选中状态]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 继续向上滑动滚轮</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮从末项'E'循环滚动到首项'A'，无边界阻挡]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>3. 继续向上滑动，依次显示'B', 'C', 'D', 'E'</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮可无限循环向上滚动]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>4. 将滚轮滚动到首项'A'，然后向下滑动</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮从首项'A'循环滚动到末项'E'，无边界阻挡]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>循环开启时滚轮可无限向上或向下滚动</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>滚轮保持循环滚动能力</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>WheelPicker - 循环模式开启</Text>
          <View style={styles.pickerContainer}>
            <WheelPicker
              testID="wheel_picker_cyclic_true"
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
            请手动测试：滚动到末项'E'后继续向上滑动，应能循环到首项'A'；滚动到首项'A'后继续向下滑动，应能循环到末项'E'。
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
