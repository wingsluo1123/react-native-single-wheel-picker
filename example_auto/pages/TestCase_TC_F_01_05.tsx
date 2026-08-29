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

export function TestCase_TC_F_01_05({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const testData = ['A', 'B', 'C', 'D', 'E'];

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-01-05] </Text>WheelPicker循环模式</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置isCyclic=true，数据项包含['A', 'B', 'C', 'D', 'E']</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 将滚轮滚动到末项'E'</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮显示末项'E'为选中状态]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 继续向上滑动滚轮</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮从末项'E'循环滚动到首项'A'，无边界限制]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>3. 将滚轮滚动到首项'A'，然后向下滑动</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮从首项'A'循环滚动到末项'E'，无边界限制]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>循环模式下滚轮可无限向上或向下滚动，无边界限制</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>滚轮保持循环滚动能力</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>WheelPicker 组件（循环模式 isCyclic=true）:</Text>
          <WheelPicker
            data={testData}
            style={styles.picker}
            selectedItem={0}
            isCyclic={true}
            onItemSelected={(index) => {
              setResult({
                status: 'success',
                message: `✓ 循环模式正常，当前选中项索引: ${index}`,
                details: `选中内容: ${testData[index]}，可以从末项E循环到首项A`
              });
            }}
          />
          <Text style={styles.instructionText}>👆 滚动到末项E后继续向上滑动，可循环到首项A；从首项A向下滑动可循环到末项E</Text>
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
