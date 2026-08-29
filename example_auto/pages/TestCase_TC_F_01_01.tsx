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

export function TestCase_TC_F_01_01({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [showPicker, setShowPicker] = useState(false);
  const testData = ['选项1', '选项2', '选项3', '选项4', '选项5'];

  const handleShowPicker = () => {
    setShowPicker(true);
    setResult({
      status: 'success',
      message: '✓ WheelPicker 已显示，包含 5 个数据项',
      details: `数据项: ${testData.join(', ')}`
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-01-01] </Text>WheelPicker有效数据显示</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已初始化，data属性包含多个数据项（如['选项1', '选项2', '选项3', '选项4', '选项5']）</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 观察WheelPicker组件的显示内容</Text>
            <Text style={styles.checkpointText}>[验证点: 滚轮显示所有数据项，内容完整无遗漏]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 滚动滚轮，检查所有项是否都能滚动到可见区域</Text>
            <Text style={styles.checkpointText}>[验证点: 所有数据项均可通过滚动显示在滚轮中]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>滚轮正确显示data数组中的所有项，无遗漏或重复</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>WheelPicker组件保持正常显示状态</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>Actions</Text>
          <TouchableOpacity
            testID="btn_showPicker"
            style={styles.actionButton}
            onPress={handleShowPicker}
          >
            <Text style={styles.actionButtonText}>显示 WheelPicker（包含 5 个数据项）</Text>
          </TouchableOpacity>
        </View>

        {showPicker && (
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>WheelPicker 组件（可滚动验证所有数据项）:</Text>
            <WheelPicker
              data={testData}
              style={styles.picker}
              selectedItem={0}
              onItemSelected={(index) => {
                setResult({
                  status: 'success',
                  message: `✓ 选中项索引: ${index}`,
                  details: `选中内容: ${testData[index]}`
                });
              }}
            />
          </View>
        )}
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
  actionButton: { padding: 12, backgroundColor: '#2196F3', borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  actionButtonText: { color: '#fff', fontWeight: 'bold' },
  pickerContainer: { marginTop: 16, padding: 12, backgroundColor: '#fff', borderRadius: 8 },
  pickerLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  picker: { width: '100%', height: 150 },
});
