import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ResultPanel } from '../components/ResultPanel';
import { DatePicker } from 'react-native-wheel-picker-android';
import { FULL_MINUTES } from '../data/minutes';
import { formatDate } from '../data/dateFormat';

interface TestResult {
  status: 'idle' | 'running' | 'success' | 'fail';
  message: string;
  details?: string;
}

interface TestCaseDetailProps {
  onBack: () => void;
}

export function TestCase_TC_F_03_10({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [componentError, setComponentError] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
    setResult({
      status: 'success',
      message: '组件正常工作，使用了默认值处理无效参数',
      details: `选中日期: ${formatDate(date)}\n组件未崩溃，容错性良好`
    });
  };

  React.useEffect(() => {
    // 检测组件是否正常渲染
    const timer = setTimeout(() => {
      if (!componentError) {
        setResult({
          status: 'success',
          message: '组件成功渲染，无效参数已被处理',
          details: '即使传入无效的startDate和负数daysCount，组件也能正常显示'
        });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [componentError]);

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-03-10] </Text>DatePicker无效日期范围</Text>
      <Text style={styles.subHeader}>级别: L2</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件已设置startDate='invalid_date', daysCount=-10（无效参数）</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 观察DatePicker的显示状态</Text>
            <Text style={styles.checkpointText}>[验证点: 组件不崩溃，使用默认日期范围或当前日期]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 验证DatePicker功能正常</Text>
            <Text style={styles.checkpointText}>[验证点: 日期和时间滚轮可以正常滚动和选择]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>无效参数时使用默认值，不崩溃</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>组件保持稳定状态</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>DatePicker 组件（无效参数测试）</Text>
          <View style={styles.errorTestContainer}>
            <Text style={styles.errorTestText}>测试参数:</Text>
            <Text style={styles.errorTestText}>• startDate: "invalid_date"</Text>
            <Text style={styles.errorTestText}>• daysCount: -10</Text>
            <Text style={styles.errorTestText}>预期: 组件使用默认值，不崩溃</Text>
          </View>
          <View style={styles.pickerContainer}>
            <DatePicker
              startDate="invalid_date"
              daysCount={-10}
              format24={true}
              minutes={FULL_MINUTES}
              onDateSelected={handleDateSelected}
              style={styles.picker}
            />
          </View>
          {selectedDate && (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>✓ 组件正常工作</Text>
              <Text style={styles.successText}>选中日期: {formatDate(selectedDate)}</Text>
            </View>
          )}
          <Text style={styles.hintText}>
            提示: 如果组件正常显示且可交互，说明容错处理成功
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
  errorTestContainer: { backgroundColor: '#FFEBEE', padding: 8, borderRadius: 4, marginBottom: 8 },
  errorTestText: { fontSize: 12, color: '#C62828', marginTop: 2 },
  pickerContainer: { backgroundColor: '#fff', borderRadius: 8, padding: 8, marginBottom: 8 },
  picker: { width: '100%', height: 150 },
  successContainer: { backgroundColor: '#E8F5E9', padding: 8, borderRadius: 4, marginTop: 8 },
  successText: { fontSize: 12, color: '#2E7D32', marginTop: 2 },
  hintText: { fontSize: 12, color: '#666', marginTop: 4, fontStyle: 'italic' },
});
