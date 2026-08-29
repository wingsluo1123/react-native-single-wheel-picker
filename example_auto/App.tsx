import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, BackHandler } from 'react-native';
import { modules, Module, TestCase } from './data/testCases';
import { ModuleList } from './pages/ModuleList';
import { TestCaseList } from './pages/TestCaseList';
import { TestCase_TC_F_01_01 } from './pages/TestCase_TC_F_01_01';
import { TestCase_TC_F_01_02 } from './pages/TestCase_TC_F_01_02';
import { TestCase_TC_F_01_03 } from './pages/TestCase_TC_F_01_03';
import { TestCase_TC_F_01_04 } from './pages/TestCase_TC_F_01_04';
import { TestCase_TC_F_01_05 } from './pages/TestCase_TC_F_01_05';
import { TestCase_TC_F_01_06 } from './pages/TestCase_TC_F_01_06';
import { TestCase_TC_F_01_07 } from './pages/TestCase_TC_F_01_07';
import { TestCase_TC_F_01_08 } from './pages/TestCase_TC_F_01_08';
import { TestCase_TC_F_01_09 } from './pages/TestCase_TC_F_01_09';
import { TestCase_TC_F_01_10 } from './pages/TestCase_TC_F_01_10';
import { TestCase_TC_F_01_11 } from './pages/TestCase_TC_F_01_11';
import { TestCase_TC_F_01_12 } from './pages/TestCase_TC_F_01_12';
import { TestCase_TC_F_01_13 } from './pages/TestCase_TC_F_01_13';
import { TestCase_TC_F_01_14 } from './pages/TestCase_TC_F_01_14';
import { TestCase_TC_F_01_15 } from './pages/TestCase_TC_F_01_15';
import { TestCase_TC_F_02_01 } from './pages/TestCase_TC_F_02_01';
import { TestCase_TC_F_02_02 } from './pages/TestCase_TC_F_02_02';
import { TestCase_TC_F_02_03 } from './pages/TestCase_TC_F_02_03';
import { TestCase_TC_F_02_04 } from './pages/TestCase_TC_F_02_04';
import { TestCase_TC_F_02_05 } from './pages/TestCase_TC_F_02_05';
import { TestCase_TC_F_02_06 } from './pages/TestCase_TC_F_02_06';
import { TestCase_TC_F_02_07 } from './pages/TestCase_TC_F_02_07';
import { TestCase_TC_F_02_08 } from './pages/TestCase_TC_F_02_08';
import { TestCase_TC_F_03_01 } from './pages/TestCase_TC_F_03_01';
import { TestCase_TC_F_03_02 } from './pages/TestCase_TC_F_03_02';
import { TestCase_TC_F_03_03 } from './pages/TestCase_TC_F_03_03';
import { TestCase_TC_F_03_04 } from './pages/TestCase_TC_F_03_04';
import { TestCase_TC_F_03_05 } from './pages/TestCase_TC_F_03_05';
import { TestCase_TC_F_03_06 } from './pages/TestCase_TC_F_03_06';
import { TestCase_TC_F_03_07 } from './pages/TestCase_TC_F_03_07';
import { TestCase_TC_F_03_08 } from './pages/TestCase_TC_F_03_08';
import { TestCase_TC_F_03_09 } from './pages/TestCase_TC_F_03_09';
import { TestCase_TC_F_03_10 } from './pages/TestCase_TC_F_03_10';
import { TestCase_TC_F_04_01 } from './pages/TestCase_TC_F_04_01';
import { TestCase_TC_F_04_02 } from './pages/TestCase_TC_F_04_02';
import { TestCase_TC_F_04_03 } from './pages/TestCase_TC_F_04_03';
import { TestCase_TC_F_04_04 } from './pages/TestCase_TC_F_04_04';
import { TestCase_TC_F_04_05 } from './pages/TestCase_TC_F_04_05';
import { TestCase_TC_F_04_06 } from './pages/TestCase_TC_F_04_06';
import { TestCase_TC_F_05_01 } from './pages/TestCase_TC_F_05_01';
import { TestCase_TC_F_05_02 } from './pages/TestCase_TC_F_05_02';
import { TestCase_TC_F_05_03 } from './pages/TestCase_TC_F_05_03';
import { TestCase_TC_F_05_04 } from './pages/TestCase_TC_F_05_04';
import { TestCase_TC_F_06_01 } from './pages/TestCase_TC_F_06_01';
import { TestCase_TC_F_06_02 } from './pages/TestCase_TC_F_06_02';
import { TestCase_TC_F_06_03 } from './pages/TestCase_TC_F_06_03';
import { TestCase_TC_F_06_04 } from './pages/TestCase_TC_F_06_04';
import { TestCase_TC_F_06_05 } from './pages/TestCase_TC_F_06_05';
import { TestCase_TC_F_06_06 } from './pages/TestCase_TC_F_06_06';
import { SupplementalTestCase } from './pages/SupplementalTestCase';

const DetailPages: Record<string, React.ComponentType<{ onBack: () => void }>> = {
  'TC-F-01-01': TestCase_TC_F_01_01,
  'TC-F-01-02': TestCase_TC_F_01_02,
  'TC-F-01-03': TestCase_TC_F_01_03,
  'TC-F-01-04': TestCase_TC_F_01_04,
  'TC-F-01-05': TestCase_TC_F_01_05,
  'TC-F-01-06': TestCase_TC_F_01_06,
  'TC-F-01-07': TestCase_TC_F_01_07,
  'TC-F-01-08': TestCase_TC_F_01_08,
  'TC-F-01-09': TestCase_TC_F_01_09,
  'TC-F-01-10': TestCase_TC_F_01_10,
  'TC-F-01-11': TestCase_TC_F_01_11,
  'TC-F-01-12': TestCase_TC_F_01_12,
  'TC-F-01-13': TestCase_TC_F_01_13,
  'TC-F-01-14': TestCase_TC_F_01_14,
  'TC-F-01-15': TestCase_TC_F_01_15,
  'TC-F-02-01': TestCase_TC_F_02_01,
  'TC-F-02-02': TestCase_TC_F_02_02,
  'TC-F-02-03': TestCase_TC_F_02_03,
  'TC-F-02-04': TestCase_TC_F_02_04,
  'TC-F-02-05': TestCase_TC_F_02_05,
  'TC-F-02-06': TestCase_TC_F_02_06,
  'TC-F-02-07': TestCase_TC_F_02_07,
  'TC-F-02-08': TestCase_TC_F_02_08,
  'TC-F-03-01': TestCase_TC_F_03_01,
  'TC-F-03-02': TestCase_TC_F_03_02,
  'TC-F-03-03': TestCase_TC_F_03_03,
  'TC-F-03-04': TestCase_TC_F_03_04,
  'TC-F-03-05': TestCase_TC_F_03_05,
  'TC-F-03-06': TestCase_TC_F_03_06,
  'TC-F-03-07': TestCase_TC_F_03_07,
  'TC-F-03-08': TestCase_TC_F_03_08,
  'TC-F-03-09': TestCase_TC_F_03_09,
  'TC-F-03-10': TestCase_TC_F_03_10,
  'TC-F-04-01': TestCase_TC_F_04_01,
  'TC-F-04-02': TestCase_TC_F_04_02,
  'TC-F-04-03': TestCase_TC_F_04_03,
  'TC-F-04-04': TestCase_TC_F_04_04,
  'TC-F-04-05': TestCase_TC_F_04_05,
  'TC-F-04-06': TestCase_TC_F_04_06,
  'TC-F-05-01': TestCase_TC_F_05_01,
  'TC-F-05-02': TestCase_TC_F_05_02,
  'TC-F-05-03': TestCase_TC_F_05_03,
  'TC-F-05-04': TestCase_TC_F_05_04,
  'TC-F-06-01': TestCase_TC_F_06_01,
  'TC-F-06-02': TestCase_TC_F_06_02,
  'TC-F-06-03': TestCase_TC_F_06_03,
  'TC-F-06-04': TestCase_TC_F_06_04,
  'TC-F-06-05': TestCase_TC_F_06_05,
  'TC-F-06-06': TestCase_TC_F_06_06,
};

export default function App() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);

  // 监听返回事件（支持鸿蒙侧滑返回和物理返回键）
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (selectedTestCase) {
        setSelectedTestCase(null);
        return true;
      }
      if (selectedModule) {
        setSelectedModule(null);
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, [selectedModule, selectedTestCase]);

  if (selectedTestCase && selectedModule) {
    const DetailComponent = DetailPages[selectedTestCase.id];
    const onBack = () => setSelectedTestCase(null);
    if (DetailComponent) {
      return (
        <SafeAreaView style={styles.container}>
          <DetailComponent onBack={onBack} />
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <SupplementalTestCase onBack={onBack} testCase={selectedTestCase} />
      </SafeAreaView>
    );
  }

  // 渲染列表页
  if (selectedModule) {
    return (
      <SafeAreaView style={styles.container}>
        <TestCaseList
          moduleName={selectedModule.name}
          testCases={selectedModule.testCases}
          onSelectTestCase={setSelectedTestCase}
          onBack={() => setSelectedModule(null)}
        />
      </SafeAreaView>
    );
  }

  // 渲染模块页
  return (
    <SafeAreaView style={styles.container}>
      <ModuleList modules={modules} onSelectModule={setSelectedModule} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
