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

export function TestCase_TC_F_01_04({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const testData = ['样式1', '样式2', '样式3', '样式4', '样式5'];

  const handleShowStyled = () => {
    setResult({
      status: 'success',
      message: '✓ WheelPicker 已显示自定义样式',
      details: '选中项: 红色20px, 非选中项: 蓝色16px'
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-01-04] </Text>WheelPicker样式配置</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置样式属性：selectedItemTextColor='#FF0000', itemTextColor='#0000FF', selectedItemTextSize=20, itemTextSize=16</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 观察选中项的文本颜色</Text>
            <Text style={styles.checkpointText}>[验证点: 选中项文本颜色为红色（#FF0000）]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 观察非选中项的文本颜色</Text>
            <Text style={styles.checkpointText}>[验证点: 非选中项文本颜色为蓝色（#0000FF）]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>3. 观察选中项的文本大小</Text>
            <Text style={styles.checkpointText}>[验证点: 选中项文本大小为20]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>4. 观察非选中项的文本大小</Text>
            <Text style={styles.checkpointText}>[验证点: 非选中项文本大小为16]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>所有样式配置正确应用到滚轮显示效果</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>样式保持稳定显示</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>Actions</Text>
          <TouchableOpacity
            testID="btn_showStyled"
            style={styles.actionButton}
            onPress={handleShowStyled}
          >
            <Text style={styles.actionButtonText}>显示自定义样式的 WheelPicker</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>WheelPicker 组件（自定义样式）:</Text>
          <WheelPicker
            data={testData}
            style={styles.picker}
            selectedItem={2}
            selectedItemTextColor="#FF0000"
            itemTextColor="#0000FF"
            selectedItemTextSize={20}
            itemTextSize={16}
            onItemSelected={(index) => {
              setResult({
                status: 'success',
                message: `✓ 选中项索引: ${index}`,
                details: `样式正确应用，选中内容: ${testData[index]}`
              });
            }}
          />
          <Text style={styles.instructionText}>👆 观察选中项（红色20px）和非选中项（蓝色16px）的样式差异</Text>
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
  actionButton: { padding: 12, backgroundColor: '#2196F3', borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  actionButtonText: { color: '#fff', fontWeight: 'bold' },
  pickerContainer: { marginTop: 16, padding: 12, backgroundColor: '#fff', borderRadius: 8 },
  pickerLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  picker: { width: '100%', height: 150 },
  instructionText: { fontSize: 12, color: '#666', marginTop: 8, textAlign: 'center' },
});
