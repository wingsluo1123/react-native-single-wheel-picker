import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ResultPanel } from '../components/ResultPanel';
import { DatePicker } from 'react-native-wheel-picker-android';
import { FULL_MINUTES } from '../data/minutes';
import { formatDate, formatDateTime } from '../data/dateFormat';

interface TestResult {
  status: 'idle' | 'running' | 'success' | 'fail';
  message: string;
  details?: string;
}

interface TestCaseDetailProps {
  onBack: () => void;
}

export function TestCase_TC_F_03_06({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [callbackCount, setCallbackCount] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [initialDate] = useState(() => new Date());
  const [rangeStart] = useState(() => new Date().toISOString());

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
    const newCount = callbackCount + 1;
    setCallbackCount(newCount);
    setResult({
      status: 'success',
      message: `日期时间变化回调已触发（第 ${newCount} 次）`,
      details: `选中日期时间: ${formatDateTime(date)}\n日期: ${formatDate(date)}\n时间: ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-03-06] </Text>DatePicker日期变化回调</Text>
      <Text style={styles.subHeader}>级别: L0</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件已设置onDateSelected回调函数</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 调整日期滚轮，选择新的日期</Text>
            <Text style={styles.checkpointText}>[验证点: onDateSelected回调被触发，返回的Date对象日期正确]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 调整时间滚轮，选择新的时间</Text>
            <Text style={styles.checkpointText}>[验证点: onDateSelected回调再次被触发，返回的Date对象时间正确]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>日期时间变化时回调触发，返回的Date对象完整且正确</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>回调处理完毕</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>DatePicker 组件（带回调监听）</Text>
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>回调触发次数: {callbackCount}</Text>
          </View>
          <View style={styles.pickerContainer}>
            <DatePicker
              initDate={initialDate}
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
                完整日期时间: {formatDateTime(selectedDate)}
              </Text>
              <Text style={styles.selectedText}>
                日期: {formatDate(selectedDate)}
              </Text>
              <Text style={styles.selectedText}>
                时间: {selectedDate.getHours()}:{selectedDate.getMinutes().toString().padStart(2, '0')}
              </Text>
            </View>
          )}
          <Text style={styles.hintText}>
            提示: 滚动日期或时间滚轮都会触发回调
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
  statsContainer: { backgroundColor: '#E3F2FD', padding: 8, borderRadius: 4, marginBottom: 8 },
  statsText: { fontSize: 14, fontWeight: 'bold', color: '#1976D2' },
  pickerContainer: { backgroundColor: '#fff', borderRadius: 8, padding: 8, marginBottom: 8 },
  picker: { width: '100%', height: 150 },
  detailsContainer: { backgroundColor: '#E8F5E9', padding: 8, borderRadius: 4, marginTop: 8 },
  selectedText: { fontSize: 12, color: '#2E7D32', marginTop: 2 },
  hintText: { fontSize: 12, color: '#666', marginTop: 4, fontStyle: 'italic' },
});
