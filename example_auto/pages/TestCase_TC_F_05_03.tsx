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

export function TestCase_TC_F_05_03({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [selectedItem, setSelectedItem] = useState(0);
  const data = ['A', 'B', 'C', 'D', 'E'];

  const handleItemSelected = (index: number) => {
    setSelectedItem(index);
    let message = `当前选中项: ${data[index]} (索引: ${index})`;
    let details = '循环模式已开启，边界过渡应平滑无跳跃。';

    if (index === 0) {
      details = '已选中首项 A，继续向下滑动应平滑循环到末项 E。';
    } else if (index === data.length - 1) {
      details = '已选中末项 E，继续向上滑动应平滑循环到首项 A。';
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
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-05-03] </Text>循环滚动-边界无缝滚动</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到循环滚动测试页面；WheelPicker组件已设置isCyclic=true，数据项包含['A', 'B', 'C', 'D', 'E']</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 将滚轮滚动到末项'E'，然后慢速向上滑动</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮从'E'平滑过渡到'A'，无明显跳跃或闪烁]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 将滚轮滚动到首项'A'，然后慢速向下滑动</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮从'A'平滑过渡到'E'，无明显跳跃或闪烁]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>3. 快速滑动滚轮，观察循环边界过渡</Text>
            <Text style={styles.checkpointText}>[验证点: 快速滑动时循环边界过渡同样流畅，无卡顿]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>循环模式下从末项滚动到首项时过渡平滑无跳跃</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>滚轮保持流畅循环滚动</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>WheelPicker - 边界无缝滚动测试</Text>
          <View style={styles.pickerContainer}>
            <WheelPicker
              testID="wheel_picker_seamless_boundary"
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
            请手动测试：慢速滚动观察边界过渡是否平滑（'E'→'A'或'A'→'E'），快速滑动观察是否有卡顿或跳跃现象。
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
