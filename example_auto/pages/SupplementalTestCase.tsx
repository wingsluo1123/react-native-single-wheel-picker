import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { DatePicker, TimePicker, WheelPicker } from 'react-native-wheel-picker-android';
import { ResultPanel } from '../components/ResultPanel';
import { TestCase } from '../data/testCases';

type Props = {
  onBack: () => void;
  testCase: TestCase;
};

type ResultStatus = 'idle' | 'running' | 'success' | 'fail';

type DemoConfig = {
  description: string;
  render: (onSelection: (value: string) => void) => React.ReactNode;
};

const DEFAULT_STYLE = {
  selectedItemTextColor: '#D32F2F',
  selectedItemTextSize: 20,
  itemTextColor: '#1565C0',
  itemTextSize: 16,
  indicatorColor: '#2E7D32',
  indicatorWidth: 2,
  backgroundColor: '#F1F8E9',
};

const wheelData = ['选项 A', '选项 B', '选项 C', '选项 D', '选项 E'];

function formatDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function wheelPicker(
  props: React.ComponentProps<typeof WheelPicker>,
  onSelection: (value: string) => void,
): React.ReactNode {
  const data = props.data ?? [];
  return (
    <WheelPicker
      {...props}
      onItemSelected={(index) => onSelection(`onItemSelected(${index})：${String(data[index] ?? '无有效选项')}`)}
      style={[styles.picker, props.style]}
    />
  );
}

function datePicker(
  props: React.ComponentProps<typeof DatePicker>,
  onSelection: (value: string) => void,
): React.ReactNode {
  return (
    <DatePicker
      {...props}
      onDateSelected={(date) => onSelection(`onDateSelected：${formatDate(date)}`)}
      style={[styles.picker, props.style]}
    />
  );
}

function timePicker(
  props: React.ComponentProps<typeof TimePicker>,
  onSelection: (value: string) => void,
): React.ReactNode {
  return (
    <TimePicker
      {...props}
      onTimeSelected={(date) => onSelection(`onTimeSelected：${formatDate(date)}`)}
      style={[styles.picker, props.style]}
    />
  );
}

const demoConfigs: Record<string, DemoConfig> = {
  'TC-F-01-16': {
    description: '数据包含字符串与数字；原生层统一显示为字符串，回调仍返回数组索引。',
    render: onSelection => wheelPicker({ data: ['一', 2, '三', 4, '五'], isCyclic: true }, onSelection),
  },
  'TC-F-01-17': {
    description: '未传selectedItem，仅使用initPosition=3 设置初始位置。',
    render: onSelection => wheelPicker({ data: wheelData, initPosition: 3 }, onSelection),
  },
  'TC-F-01-18': {
    description: '原生topChange事件被组件封装为公开的onItemSelected(index) 回调。',
    render: onSelection => wheelPicker({ data: wheelData, initPosition: 0 }, onSelection),
  },
  'TC-F-01-19': {
    description: '自定义宽高与背景色，验证View style 可以传递给WheelPicker。',
    render: onSelection => wheelPicker({ data: wheelData, style: { width: 260, height: 190, alignSelf: 'center' }, backgroundColor: '#FFF3E0' }, onSelection),
  },
  'TC-F-01-20': {
    description: '本页面通过codegenNativeComponent注册的Fabric WheelPicker渲染；滚动后验证事件桥接可用。',
    render: onSelection => wheelPicker({ data: wheelData, initPosition: 2, isCyclic: true }, onSelection),
  },
  'TC-F-02-09': {
    description: '未传minutes，分钟列表应为00、05、10至55。',
    render: onSelection => timePicker({ initDate: new Date(2024, 0, 1, 14, 30), format24: true }, onSelection),
  },
  'TC-F-02-10': {
    description: 'WheelPicker颜色、字号、指示器与背景样式应继承到所有时间滚轮。',
    render: onSelection => timePicker({ initDate: new Date(2024, 0, 1, 14, 30), ...DEFAULT_STYLE }, onSelection),
  },
  'TC-F-02-11': {
    description: 'disabled=true 时，小时、分钟和AM/PM滚轮均不可交互。',
    render: onSelection => timePicker({ initDate: new Date(2024, 0, 1, 14, 30), disabled: true }, onSelection),
  },
  'TC-F-03-11': {
    description: '使用Date对象设置指定的日期与时间。',
    render: onSelection => datePicker({ initDate: new Date(2024, 5, 15, 14, 30), startDate: '2024-06-10', daysCount: 10, format24: true }, onSelection),
  },
  'TC-F-03-12': {
    description: '使用ISO日期字符串设置指定的日期与时间。',
    render: onSelection => datePicker({ initDate: '2024-07-20T09:45:00', startDate: '2024-07-15', daysCount: 10, format24: true }, onSelection),
  },
  'TC-F-03-13': {
    description: '使用days传入可解析的自定义日期列表；滚动时回调返回与显示项对应的日期。',
    render: onSelection => datePicker({ initDate: '2024-08-01T10:00:00', startDate: '2024-08-01', days: ['2024-08-01', '2024-08-02', '2024-08-03'], format24: true }, onSelection),
  },
  'TC-F-03-14': {
    description: '未传format，日期滚轮使用默认的ddd MMM D格式。',
    render: onSelection => datePicker({ initDate: new Date(), startDate: new Date(), daysCount: 7, format24: true }, onSelection),
  },
  'TC-F-03-15': {
    description: 'format24=true 时显示00至23小时，不显示AM/PM滚轮。',
    render: onSelection => datePicker({ initDate: new Date(2024, 0, 1, 14, 30), startDate: '2024-01-01', daysCount: 3, format24: true }, onSelection),
  },
  'TC-F-03-16': {
    description: 'format24=false 时显示1至12小时、分钟和AM/PM滚轮。',
    render: onSelection => datePicker({ initDate: new Date(2024, 0, 1, 14, 30), startDate: '2024-01-01', daysCount: 3, format24: false }, onSelection),
  },
  'TC-F-03-17': {
    description: 'hours限制为9、10、11、12、13、14。',
    render: onSelection => datePicker({ initDate: new Date(2024, 0, 1, 10, 30), startDate: '2024-01-01', daysCount: 3, hours: [9, 10, 11, 12, 13, 14], format24: true }, onSelection),
  },
  'TC-F-03-18': {
    description: 'minutes限制为00、15、30、45。',
    render: onSelection => datePicker({ initDate: new Date(2024, 0, 1, 10, 30), startDate: '2024-01-01', daysCount: 3, minutes: [0, 15, 30, 45], format24: true }, onSelection),
  },
  'TC-F-03-19': {
    description: '12小时格式下设置hideAM=true，AM/PM滚轮不显示。',
    render: onSelection => datePicker({ initDate: new Date(2024, 0, 1, 10, 30), startDate: '2024-01-01', daysCount: 3, format24: false, hideAM: true }, onSelection),
  },
  'TC-F-03-20': {
    description: 'WheelPicker颜色、字号、指示器与背景样式应继承到日期和时间滚轮。',
    render: onSelection => datePicker({ initDate: new Date(2024, 0, 1, 10, 30), startDate: '2024-01-01', daysCount: 3, ...DEFAULT_STYLE }, onSelection),
  },
  'TC-F-03-21': {
    description: 'disabled=true 时，日期、小时、分钟和AM/PM滚轮均不可交互。',
    render: onSelection => datePicker({ initDate: new Date(2024, 0, 1, 10, 30), startDate: '2024-01-01', daysCount: 3, disabled: true }, onSelection),
  },
  'TC-F-04-07': {
    description: 'hideIndicator=true 时，中间选择指示器不显示。',
    render: onSelection => wheelPicker({ data: wheelData, hideIndicator: true }, onSelection),
  },
  'TC-F-04-08': {
    description: '通过style自定义滚轮宽度、高度、边框与布局。',
    render: onSelection => wheelPicker({ data: wheelData, style: { width: 220, height: 180, alignSelf: 'center', borderWidth: 2, borderColor: '#7B1FA2', borderRadius: 12 } }, onSelection),
  },
};

export function SupplementalTestCase({ onBack, testCase }: Props) {
  const [status, setStatus] = useState<ResultStatus>('idle');
  const [selection, setSelection] = useState('尚未触发选择回调');
  const config = useMemo(() => demoConfigs[testCase.id], [testCase.id]);

  const onSelection = (value: string) => {
    setSelection(value);
    setStatus('success');
  };

  if (!config) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>← 返回用例列表</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>未找到 {testCase.id} 的演示配置。</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="btn_back_to_module" style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← 返回用例列表</Text>
      </TouchableOpacity>
      <Text style={styles.header}><Text style={styles.caseId}>[{testCase.id}] </Text>{testCase.title}</Text>
      <Text style={styles.subHeader}>级别: {testCase.level}</Text>
      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>补充验证说明</Text>
          <Text style={styles.infoText}>{config.description}</Text>
          <Text style={styles.infoText}>预期结果：{testCase.expectedResult}</Text>
        </View>
        <View style={styles.pickerCard}>
          {config.render(onSelection)}
          <Text style={styles.selectionText}>{selection}</Text>
        </View>
      </View>
      <ResultPanel status={status} message={status === 'success' ? '✓ 回调已触发' : '请按说明观察或滑动选择器'} details={selection} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  backButton: { padding: 16 },
  backText: { fontSize: 14, color: '#2196F3' },
  header: { fontSize: 20, fontWeight: 'bold', paddingHorizontal: 16 },
  caseId: { fontSize: 16, fontWeight: '600', color: '#2196F3' },
  subHeader: { fontSize: 14, color: '#666', paddingHorizontal: 16, marginBottom: 8 },
  content: { flex: 1, paddingHorizontal: 16 },
  infoCard: { padding: 12, backgroundColor: '#FFF', borderRadius: 8, marginBottom: 16 },
  infoTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  infoText: { fontSize: 14, color: '#333', marginTop: 4 },
  pickerCard: { padding: 12, backgroundColor: '#FFF', borderRadius: 8, alignItems: 'stretch' },
  picker: { width: '100%', height: 170 } as ViewStyle,
  selectionText: { fontSize: 14, color: '#2E7D32', marginTop: 12, textAlign: 'center' },
  errorText: { padding: 16, color: '#D32F2F', fontSize: 16 },
});
