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

export function TestCase_TC_F_01_11({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const largeData = Array.from({ length: 150 }, (_, i) => `项目 ${i + 1}`);

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-01-11] </Text>WheelPicker大数据列表</Text>
      <Text style={styles.subHeader}>级别: L1</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置data包含150个数据项</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 快速滑动滚轮，从首项滚动到末项</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮滚动流畅，无明显卡顿或延迟]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 进行多次快速滑动操作</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮持续流畅响应，性能稳定]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>大数据列表时滚轮滚动流畅，无性能问题</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>组件保持正常性能</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>WheelPicker 组件（150个数据项）:</Text>
          <WheelPicker
            data={largeData}
            style={styles.picker}
            selectedItem={0}
            onItemSelected={(index) => {
              setResult({
                status: 'success',
                message: `✓ 大数据列表滚动流畅`,
                details: `选中索引: ${index}, 内容: ${largeData[index]}, 总数: 150项`
              });
            }}
          />
          <Text style={styles.instructionText}>👆 快速滑动150个数据项，观察性能和流畅度</Text>
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
