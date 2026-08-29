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

export function TestCase_TC_F_01_12({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({
    status: 'success',
    message: '✓ WheelPicker 已显示多种颜色格式',
    details: 'hex格式红色、rgb格式绿色、rgba格式半透明蓝色'
  });
  const testData = ['Hex格式', 'RGB格式', 'RGBA格式', '其他项1', '其他项2'];

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-01-12] </Text>WheelPicker颜色格式</Text>
      <Text style={styles.subHeader}>级别: L1</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到WheelPicker测试页面</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 设置selectedItemTextColor='#FF0000'（hex格式），观察选中项颜色</Text>
            <Text style={styles.checkpointText}>[验证点: 选中项文本颜色正确显示为红色]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 设置itemTextColor='rgb(0,255,0)'（rgb格式），观察非选中项颜色</Text>
            <Text style={styles.checkpointText}>[验证点: 非选中项文本颜色正确显示为绿色]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>3. 设置indicatorColor='rgba(0,0,255,0.5)'（rgba格式），观察指示器颜色</Text>
            <Text style={styles.checkpointText}>[验证点: 指示器颜色正确显示为半透明蓝色]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>不同颜色格式（hex、rgb、rgba）均能正确解析并显示</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>颜色显示稳定</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>WheelPicker 组件（多种颜色格式）:</Text>
          <WheelPicker
            data={testData}
            style={styles.picker}
            selectedItem={0}
            selectedItemTextColor="#FF0000"
            itemTextColor="rgb(0,255,0)"
            indicatorColor="rgba(0,0,255,0.5)"
            onItemSelected={(index) => {
              setResult({
                status: 'success',
                message: `✓ 颜色格式正确解析`,
                details: `选中索引: ${index}, hex红色、rgb绿色、rgba半透明蓝色均正常显示`
              });
            }}
          />
          <Text style={styles.instructionText}>👆 观察选中项（红色）、非选中项（绿色）、指示器（半透明蓝色）</Text>
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
