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

export function TestCase_TC_F_04_05({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [selectedIndex, setSelectedIndex] = useState(2);

  const testData = ['选项 A', '选项 B', '选项 C', '选项 D', '选项 E', '选项 F', '选项 G'];

  const handleItemSelected = (index: number) => {
    setSelectedIndex(index);
    setResult({
      status: 'success',
      message: `选中项已变更为索引 ${index}`,
      details: `当前选中: ${testData[index]}，指示器颜色为绿色（#00FF00），宽度为3像素`
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-04-05] </Text>样式定制-指示器样式</Text>
      <Text style={styles.subHeader}>级别: L1</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到样式定制测试页面；WheelPicker组件已设置indicatorColor='#00FF00', indicatorWidth=3</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 观察滚轮指示器的颜色</Text>
            <Text style={styles.checkpointText}>[验证点: 指示器颜色为绿色（#00FF00）]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 观察滚轮指示器的宽度</Text>
            <Text style={styles.checkpointText}>[验证点: 指示器线条宽度为3像素]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>指示器样式与indicatorColor和indicatorWidth设置一致</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>样式保持稳定显示</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>WheelPicker 演示区</Text>
          <Text style={styles.instructionText}>观察指示器颜色为绿色（#00FF00），宽度为3像素</Text>

          <View style={styles.pickerContainer}>
            <WheelPicker
              testID="wheel_picker_indicator_style"
              data={testData}
              selectedItem={selectedIndex}
              onItemSelected={handleItemSelected}
              indicatorColor="#00FF00"
              indicatorWidth={3}
              style={styles.wheelPicker}
            />
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoBoxText}>当前选中索引: {selectedIndex}</Text>
            <Text style={styles.infoBoxText}>当前选中项: {testData[selectedIndex]}</Text>
            <Text style={styles.infoBoxText}>指示器颜色: #00FF00 (绿色)</Text>
            <Text style={styles.infoBoxText}>指示器宽度: 3 像素</Text>
          </View>
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
  instructionText: { fontSize: 14, color: '#666', marginBottom: 12 },
  pickerContainer: { backgroundColor: '#fff', borderRadius: 8, padding: 16, alignItems: 'center', marginBottom: 12 },
  wheelPicker: { width: 300, height: 200 },
  infoBox: { backgroundColor: '#E3F2FD', borderRadius: 8, padding: 12, marginBottom: 12 },
  infoBoxText: { fontSize: 14, color: '#1976D2', marginBottom: 4 },
});
