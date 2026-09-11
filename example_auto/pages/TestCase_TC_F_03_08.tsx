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

export function TestCase_TC_F_03_08({ onBack }: TestCaseDetailProps) {
  const [result, setResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [scrollCount, setScrollCount] = useState<number>(0);
  const [initialDate] = useState(() => new Date());
  const [rangeStart] = useState(() => new Date().toISOString());

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
    const newCount = scrollCount + 1;
    setScrollCount(newCount);
    setResult({
      status: 'success',
      message: `日期已选择（第 ${newCount} 次滚动）`,
      details: `选中日期: ${formatDate(date)}\n滚动次数: ${newCount}`
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[TC-F-03-08] </Text>DatePicker大范围天数</Text>
      <Text style={styles.subHeader}>级别: L1</Text>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>测试信息</Text>
          <Text style={styles.infoLabel}>前置条件:</Text>
          <Text style={styles.infoValue}>应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件已设置daysCount=400（大范围天数）</Text>

          <Text style={styles.infoLabel}>测试步骤:</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>1. 快速滑动日期滚轮，从首项滚动到末项</Text>
            <Text style={styles.checkpointText}>[验证点: 日期滚轮滚动流畅，无明显卡顿]</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepText}>2. 进行多次快速滑动操作</Text>
            <Text style={styles.checkpointText}>[验证点: 日期滚轮持续流畅响应，性能稳定]</Text>
          </View>

          <Text style={styles.infoLabel}>预期结果:</Text>
          <Text style={styles.infoValue}>大范围天数（400+）时日期滚轮滚动流畅</Text>

          <Text style={styles.infoLabel}>后置条件:</Text>
          <Text style={styles.infoValue}>DatePicker保持正常性能</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionTitle}>DatePicker 组件（400天范围）</Text>
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>日期范围: 400 天</Text>
            <Text style={styles.statsText}>滚动次数: {scrollCount}</Text>
          </View>
          <View style={styles.pickerContainer}>
            <DatePicker
              initDate={initialDate}
              startDate={rangeStart}
              daysCount={400}
              format24={true}
              minutes={FULL_MINUTES}
              onDateSelected={handleDateSelected}
              style={styles.picker}
            />
          </View>
          {selectedDate && (
            <Text style={styles.selectedText}>
              当前选中: {formatDate(selectedDate)}
            </Text>
          )}
          <Text style={styles.hintText}>
            提示: 快速滑动日期滚轮，测试大数据量下的性能表现
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
  selectedText: { fontSize: 14, color: '#4CAF50', marginTop: 8, textAlign: 'center' },
  hintText: { fontSize: 12, color: '#666', marginTop: 4, fontStyle: 'italic' },
});
