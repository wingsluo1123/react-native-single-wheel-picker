import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ResultPanel } from '../components/ResultPanel';
import { DatePicker } from 'react-native-wheel-picker-android';
import { formatDateTime } from '../data/dateFormat';
import { FULL_MINUTES } from '../data/minutes';

interface TestResult {
  status: 'idle' | 'running' | 'success' | 'fail';
  message: string;
  details?: string;
}

interface TestCaseDetailProps {
  onBack: () => void;
}

export function TestCase_TC_F_03_07({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [systemTime] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [rangeStart] = useState(() => new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString());

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
    const timeDiff = Math.abs(date.getTime() - systemTime.getTime()) / 1000 / 60; // 分钟差
    setResult({
      status: timeDiff < 5 ? 'success' : 'idle',
      message: timeDiff < 5 ? '默认日期与系统时间一致（误差小于5分钟）' : '日期已选择',
      details: `系统时间: ${systemTime.toISOString()}\n选中时间: ${date.toISOString()}\n时间差: ${timeDiff.toFixed(1)} 分钟`
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-03-07] </Text>DatePicker默认日期</Text>
      <Text style={styles.subHeader}>级别: L1</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件未设置initDate参数</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 记录当前系统日期时间</Text>
            <Text style={styles.checkpointText}>[验证点: 获取当前系统时间作为参考]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 观察DatePicker的初始显示</Text>
            <Text style={styles.checkpointText}>[验证点: DatePicker显示的日期时间与当前系统日期时间一致]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>未设置initDate时使用当前系统日期时间</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>DatePicker保持当前日期时间显示</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>系统时间参考</Text>
          <View style={styles.systemTimeContainer}>
            <Text style={styles.systemTimeText}>
              页面加载时系统时间: {formatDateTime(systemTime)}
            </Text>
            <Text style={styles.systemTimeText}>
              ISO格式: {systemTime.toISOString()}
            </Text>
          </View>

          <Text style={styles.actionTitle}>DatePicker 组件（无 initDate 参数）</Text>
          <View style={styles.pickerContainer}>
            <DatePicker
              startDate={rangeStart}
              daysCount={7}
              format24={true}
              minutes={FULL_MINUTES}
              onDateSelected={handleDateSelected}
              style={styles.picker}
            />
          </View>
          {selectedDate && (
            <View style={styles.detailsContainer}>
              <Text style={styles.selectedText}>
                选中日期时间: {formatDateTime(selectedDate)}
              </Text>
              <Text style={styles.selectedText}>
                ISO格式: {selectedDate.toISOString()}
              </Text>
            </View>
          )}
          <Text style={styles.hintText}>
            提示: 未设置initDate时，DatePicker应使用当前系统时间
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
  systemTimeContainer: { backgroundColor: '#FFF3E0', padding: 8, borderRadius: 4, marginBottom: 12 },
  systemTimeText: { fontSize: 12, color: '#E65100', marginTop: 2 },
  pickerContainer: { backgroundColor: '#fff', borderRadius: 8, padding: 8, marginBottom: 8 },
  picker: { width: '100%', height: 150 },
  detailsContainer: { backgroundColor: '#E8F5E9', padding: 8, borderRadius: 4, marginTop: 8 },
  selectedText: { fontSize: 12, color: '#2E7D32', marginTop: 2 },
  hintText: { fontSize: 12, color: '#666', marginTop: 4, fontStyle: 'italic' },
});
