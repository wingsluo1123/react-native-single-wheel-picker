// 自动生成的测试用例数据

export interface TestStep {
  action: string;
  checkpoint: string;
}

export interface TestCase {
  id: string;
  title: string;
  level: string;
  moduleCode: string;
  moduleName: string;
  preconditions: string;
  testSteps: TestStep[];
  expectedResult: string;
  postconditions: string;
}

export interface Module {
  code: string;
  name: string;
  testCases: TestCase[];
}

const baseModules: Module[] = [
  {
    code: 'F-01',
    name: 'WheelPicker 基础滚轮选择器',
    testCases: [
      {
        id: 'TC-F-01-01',
        title: 'WheelPicker有效数据显示',
        level: 'L0',
        moduleCode: 'F-01',
        moduleName: 'WheelPicker 基础滚轮选择器',
        preconditions: `应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已初始化，data属性包含多个数据项（如['选项1', '选项2', '选项3', '选项4', '选项5']）`,
        testSteps: [
      {
            "action": "观察WheelPicker组件的显示内容",
            "checkpoint": "滚轮显示所有数据项，内容完整无遗漏"
      },
      {
            "action": "滚动滚轮，检查所有项是否都能滚动到可见区域",
            "checkpoint": "所有数据项均可通过滚动显示在滚轮中"
      }
],
        expectedResult: `滚轮正确显示data数组中的所有项，无遗漏或重复`,
        postconditions: `WheelPicker组件保持正常显示状态`,
      },
      {
        id: 'TC-F-01-02',
        title: 'WheelPicker手势滑动',
        level: 'L0',
        moduleCode: 'F-01',
        moduleName: 'WheelPicker 基础滚轮选择器',
        preconditions: `应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已正常显示`,
        testSteps: [
      {
            "action": "在WheelPicker滚轮区域进行向上滑动手势",
            "checkpoint": "滚轮跟随手势向上滚动，响应流畅"
      },
      {
            "action": "在WheelPicker滚轮区域进行向下滑动手势",
            "checkpoint": "滚轮跟随手势向下滚动，响应流畅"
      }
],
        expectedResult: `滑动手势能够流畅驱动滚轮滚动，无延迟或卡顿`,
        postconditions: `滚轮恢复静止状态`,
      },
      {
        id: 'TC-F-01-03',
        title: 'WheelPicker选中项回调',
        level: 'L0',
        moduleCode: 'F-01',
        moduleName: 'WheelPicker 基础滚轮选择器',
        preconditions: `应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置onItemSelected回调函数；初始选中项为索引0`,
        testSteps: [
      {
            "action": "滚动滚轮，将选中项从索引0变更为索引2",
            "checkpoint": "onItemSelected回调被触发，参数值为2"
      },
      {
            "action": "继续滚动滚轮，将选中项变更为索引4",
            "checkpoint": "onItemSelected回调再次被触发，参数值为4"
      }
],
        expectedResult: `选中项变化时回调函数被正确触发，参数为准确的索引值`,
        postconditions: `回调函数执行完毕`,
      },
      {
        id: 'TC-F-01-04',
        title: 'WheelPicker样式配置',
        level: 'L0',
        moduleCode: 'F-01',
        moduleName: 'WheelPicker 基础滚轮选择器',
        preconditions: `应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置样式属性：selectedItemTextColor='#FF0000', itemTextColor='#0000FF', selectedItemTextSize=20, itemTextSize=16`,
        testSteps: [
      {
            "action": "观察选中项的文本颜色",
            "checkpoint": "选中项文本颜色为红色（#FF0000）"
      },
      {
            "action": "观察非选中项的文本颜色",
            "checkpoint": "非选中项文本颜色为蓝色（#0000FF）"
      },
      {
            "action": "观察选中项的文本大小",
            "checkpoint": "选中项文本大小为20"
      },
      {
            "action": "观察非选中项的文本大小",
            "checkpoint": "非选中项文本大小为16"
      }
],
        expectedResult: `所有样式配置正确应用到滚轮显示效果`,
        postconditions: `样式保持稳定显示`,
      },
      {
        id: 'TC-F-01-05',
        title: 'WheelPicker循环模式',
        level: 'L0',
        moduleCode: 'F-01',
        moduleName: 'WheelPicker 基础滚轮选择器',
        preconditions: `应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置isCyclic=true，数据项包含['A', 'B', 'C', 'D', 'E']`,
        testSteps: [
      {
            "action": "将滚轮滚动到末项'E'",
            "checkpoint": "滚轮显示末项'E'为选中状态"
      },
      {
            "action": "继续向上滑动滚轮",
            "checkpoint": "滚轮从末项'E'循环滚动到首项'A'，无边界限制"
      },
      {
            "action": "将滚轮滚动到首项'A'，然后向下滑动",
            "checkpoint": "滚轮从首项'A'循环滚动到末项'E'，无边界限制"
      }
],
        expectedResult: `循环模式下滚轮可无限向上或向下滚动，无边界限制`,
        postconditions: `滚轮保持循环滚动能力`,
      },
      {
        id: 'TC-F-01-06',
        title: 'WheelPicker初始位置',
        level: 'L0',
        moduleCode: 'F-01',
        moduleName: 'WheelPicker 基础滚轮选择器',
        preconditions: `应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置selectedItem=3，数据项包含['A', 'B', 'C', 'D', 'E']`,
        testSteps: [
      {
            "action": "观察WheelPicker组件初始显示状态",
            "checkpoint": "滚轮初始选中项为索引3对应的数据项'D'"
      },
      {
            "action": "验证选中项位置",
            "checkpoint": "选中项'D'位于滚轮中心位置，对齐指示器"
      }
],
        expectedResult: `滚轮初始显示位置与设置的selectedItem参数一致`,
        postconditions: `滚轮保持初始位置`,
      },
      {
        id: 'TC-F-01-07',
        title: 'WheelPicker禁用交互',
        level: 'L0',
        moduleCode: 'F-01',
        moduleName: 'WheelPicker 基础滚轮选择器',
        preconditions: `应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置disabled=true`,
        testSteps: [
      {
            "action": "尝试在WheelPicker滚轮区域进行滑动手势",
            "checkpoint": "滚轮不响应滑动手势，保持静止"
      },
      {
            "action": "尝试多次滑动操作",
            "checkpoint": "滚轮始终不响应任何滑动手势"
      }
],
        expectedResult: `禁用状态下滚轮完全不响应用户交互`,
        postconditions: `滚轮保持禁用状态`,
      },
      {
        id: 'TC-F-01-08',
        title: 'WheelPicker事件触发',
        level: 'L0',
        moduleCode: 'F-01',
        moduleName: 'WheelPicker 基础滚轮选择器',
        preconditions: `应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置onItemSelected回调函数，初始选中项为索引0`,
        testSteps: [
      {
            "action": "滑动滚轮到索引2并等待滚轮停止",
            "checkpoint": "滚轮停止后触发onItemSelected回调，参数值为2"
      },
      {
            "action": "验证回调参数的准确性",
            "checkpoint": "回调参数与当前选中项索引完全一致"
      }
],
        expectedResult: `滚动停止后触发选中事件，回调参数正确`,
        postconditions: `事件处理完毕`,
      },
      {
        id: 'TC-F-01-09',
        title: 'WheelPicker空数组处理',
        level: 'L1',
        moduleCode: 'F-01',
        moduleName: 'WheelPicker 基础滚轮选择器',
        preconditions: `应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置data=[]（空数组）`,
        testSteps: [
      {
            "action": "观察WheelPicker组件的显示状态",
            "checkpoint": "组件不崩溃，显示为空白或空状态"
      },
      {
            "action": "尝试滑动空滚轮",
            "checkpoint": "滚轮不响应滑动，保持空状态"
      }
],
        expectedResult: `空数组时滚轮不崩溃，正常显示为空`,
        postconditions: `组件保持稳定状态`,
      },
      {
        id: 'TC-F-01-10',
        title: 'WheelPicker单元素数组',
        level: 'L1',
        moduleCode: 'F-01',
        moduleName: 'WheelPicker 基础滚轮选择器',
        preconditions: `应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置data=['唯一选项']（单元素数组）`,
        testSteps: [
      {
            "action": "观察WheelPicker组件的显示状态",
            "checkpoint": "滚轮正常显示唯一元素'唯一选项'"
      },
      {
            "action": "尝试滑动滚轮",
            "checkpoint": "滚轮无法滚动或始终显示该唯一元素"
      }
],
        expectedResult: `单元素数组时滚轮正常显示该元素，不崩溃`,
        postconditions: `组件保持稳定状态`,
      },
      {
        id: 'TC-F-01-11',
        title: 'WheelPicker大数据列表',
        level: 'L1',
        moduleCode: 'F-01',
        moduleName: 'WheelPicker 基础滚轮选择器',
        preconditions: `应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置data包含150个数据项`,
        testSteps: [
      {
            "action": "快速滑动滚轮，从首项滚动到末项",
            "checkpoint": "滚轮滚动流畅，无明显卡顿或延迟"
      },
      {
            "action": "进行多次快速滑动操作",
            "checkpoint": "滚轮持续流畅响应，性能稳定"
      }
],
        expectedResult: `大数据列表时滚轮滚动流畅，无性能问题`,
        postconditions: `组件保持正常性能`,
      },
      {
        id: 'TC-F-01-12',
        title: 'WheelPicker颜色格式',
        level: 'L1',
        moduleCode: 'F-01',
        moduleName: 'WheelPicker 基础滚轮选择器',
        preconditions: `应用已安装并启动；已导航到WheelPicker测试页面`,
        testSteps: [
      {
            "action": "设置selectedItemTextColor='#FF0000'（hex格式），观察选中项颜色",
            "checkpoint": "选中项文本颜色正确显示为红色"
      },
      {
            "action": "设置itemTextColor='rgb(0,255,0)'（rgb格式），观察非选中项颜色",
            "checkpoint": "非选中项文本颜色正确显示为绿色"
      },
      {
            "action": "设置indicatorColor='rgba(0,0,255,0.5)'（rgba格式），观察指示器颜色",
            "checkpoint": "指示器颜色正确显示为半透明蓝色"
      }
],
        expectedResult: `不同颜色格式（hex、rgb、rgba）均能正确解析并显示`,
        postconditions: `颜色显示稳定`,
      },
      {
        id: 'TC-F-01-13',
        title: 'WheelPicker字体配置',
        level: 'L1',
        moduleCode: 'F-01',
        moduleName: 'WheelPicker 基础滚轮选择器',
        preconditions: `应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置selectedItemTextFontFamily='serif', itemTextFontFamily='monospace'`,
        testSteps: [
      {
            "action": "观察选中项的字体样式",
            "checkpoint": "选中项文本使用serif字体显示"
      },
      {
            "action": "观察非选中项的字体样式",
            "checkpoint": "非选中项文本使用monospace字体显示"
      }
],
        expectedResult: `自定义字体正确应用到滚轮文本中`,
        postconditions: `字体显示稳定`,
      },
      {
        id: 'TC-F-01-14',
        title: 'WheelPicker索引越界',
        level: 'L2',
        moduleCode: 'F-01',
        moduleName: 'WheelPicker 基础滚轮选择器',
        preconditions: `应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置data=['A', 'B', 'C']（3个元素），selectedItem=10（越界索引）`,
        testSteps: [
      {
            "action": "观察WheelPicker组件的初始显示状态",
            "checkpoint": "组件不崩溃，显示默认位置（如索引0）或最后一个有效索引"
      },
      {
            "action": "验证滚轮功能正常",
            "checkpoint": "滚轮可以正常滚动和交互"
      }
],
        expectedResult: `索引越界时使用默认位置或边界值，不崩溃`,
        postconditions: `组件保持稳定状态`,
      },
      {
        id: 'TC-F-01-15',
        title: 'WheelPicker无效颜色格式',
        level: 'L2',
        moduleCode: 'F-01',
        moduleName: 'WheelPicker 基础滚轮选择器',
        preconditions: `应用已安装并启动；已导航到WheelPicker测试页面；WheelPicker组件已设置selectedItemTextColor='invalid_color'（无效颜色字符串）`,
        testSteps: [
      {
            "action": "观察WheelPicker组件的显示状态",
            "checkpoint": "组件不崩溃，选中项文本使用默认颜色显示"
      },
      {
            "action": "验证滚轮功能正常",
            "checkpoint": "滚轮可以正常滚动和交互"
      }
],
        expectedResult: `无效颜色时使用默认颜色，不崩溃`,
        postconditions: `组件保持稳定状态`,
      },
    ],
  },
  {
    code: 'F-02',
    name: 'TimePicker 时间选择器',
    testCases: [
      {
        id: 'TC-F-02-01',
        title: 'TimePicker 24小时格式显示',
        level: 'L0',
        moduleCode: 'F-02',
        moduleName: 'TimePicker 时间选择器',
        preconditions: `应用已安装并启动；已导航到TimePicker测试页面；TimePicker组件已设置format24=true（24小时格式）`,
        testSteps: [
      {
            "action": "观察TimePicker小时滚轮的显示内容",
            "checkpoint": "小时滚轮显示0-23共24个小时选项"
      },
      {
            "action": "滚动小时滚轮，验证所有小时值",
            "checkpoint": "可以选择从00到23的所有小时值"
      }
],
        expectedResult: `24小时格式下正确显示0-23小时列表`,
        postconditions: `TimePicker保持正常显示`,
      },
      {
        id: 'TC-F-02-02',
        title: 'TimePicker 12小时格式显示',
        level: 'L0',
        moduleCode: 'F-02',
        moduleName: 'TimePicker 时间选择器',
        preconditions: `应用已安装并启动；已导航到TimePicker测试页面；TimePicker组件已设置format24=false（12小时格式）`,
        testSteps: [
      {
            "action": "观察TimePicker的滚轮组成",
            "checkpoint": "显示小时滚轮（1-12）、分钟滚轮和AM/PM滚轮"
      },
      {
            "action": "滚动小时滚轮，验证小时范围",
            "checkpoint": "小时滚轮显示1-12共12个小时选项"
      },
      {
            "action": "观察AM/PM滚轮",
            "checkpoint": "AM/PM滚轮显示AM和PM两个选项"
      }
],
        expectedResult: `12小时格式下正确显示1-12小时列表和AM/PM选择器`,
        postconditions: `TimePicker保持正常显示`,
      },
      {
        id: 'TC-F-02-03',
        title: 'TimePicker初始时间设置',
        level: 'L0',
        moduleCode: 'F-02',
        moduleName: 'TimePicker 时间选择器',
        preconditions: `应用已安装并启动；已导航到TimePicker测试页面；TimePicker组件已设置initDate为特定时间（如2024-01-01 14:30）`,
        testSteps: [
      {
            "action": "观察TimePicker的初始显示状态",
            "checkpoint": "小时滚轮显示14（或14时对应格式），分钟滚轮显示30"
      },
      {
            "action": "验证初始时间与设置的initDate一致",
            "checkpoint": "初始时间准确对应initDate参数值"
      }
],
        expectedResult: `时间选择器根据initDate正确定位到指定时间`,
        postconditions: `TimePicker保持初始时间`,
      },
      {
        id: 'TC-F-02-04',
        title: 'TimePicker时间变化回调',
        level: 'L0',
        moduleCode: 'F-02',
        moduleName: 'TimePicker 时间选择器',
        preconditions: `应用已安装并启动；已导航到TimePicker测试页面；TimePicker组件已设置onTimeSelected回调函数`,
        testSteps: [
      {
            "action": "调整小时滚轮，将小时从14变更为16",
            "checkpoint": "onTimeSelected回调被触发，返回的Date对象小时值为16"
      },
      {
            "action": "调整分钟滚轮，将分钟从30变更为45",
            "checkpoint": "onTimeSelected回调再次被触发，返回的Date对象分钟值为45"
      }
],
        expectedResult: `时间变化时回调触发，返回的Date对象时间正确`,
        postconditions: `回调处理完毕`,
      },
      {
        id: 'TC-F-02-05',
        title: 'TimePicker自定义小时分钟列表',
        level: 'L0',
        moduleCode: 'F-02',
        moduleName: 'TimePicker 时间选择器',
        preconditions: `应用已安装并启动；已导航到TimePicker测试页面；TimePicker组件已设置hours=[9,10,11,12,13,14], minutes=[0,15,30,45]`,
        testSteps: [
      {
            "action": "观察小时滚轮的显示内容",
            "checkpoint": "小时滚轮仅显示9,10,11,12,13,14这6个选项"
      },
      {
            "action": "观察分钟滚轮的显示内容",
            "checkpoint": "分钟滚轮仅显示0,15,30,45这4个选项"
      }
],
        expectedResult: `自定义小时和分钟列表正确显示在对应滚轮中`,
        postconditions: `TimePicker保持自定义列表显示`,
      },
      {
        id: 'TC-F-02-06',
        title: 'TimePicker默认时间',
        level: 'L1',
        moduleCode: 'F-02',
        moduleName: 'TimePicker 时间选择器',
        preconditions: `应用已安装并启动；已导航到TimePicker测试页面；TimePicker组件未设置initDate参数`,
        testSteps: [
      {
            "action": "记录当前系统时间",
            "checkpoint": "获取当前系统时间作为参考"
      },
      {
            "action": "观察TimePicker的初始显示时间",
            "checkpoint": "TimePicker显示的时间与当前系统时间一致（误差在1分钟内）"
      }
],
        expectedResult: `未设置initDate时使用当前系统时间作为初始时间`,
        postconditions: `TimePicker保持当前时间显示`,
      },
      {
        id: 'TC-F-02-07',
        title: 'TimePicker样式继承',
        level: 'L1',
        moduleCode: 'F-02',
        moduleName: 'TimePicker 时间选择器',
        preconditions: `应用已安装并启动；已导航到TimePicker测试页面；TimePicker组件已设置从WheelPicker继承的样式：selectedItemTextColor='#FF0000', itemTextSize=18`,
        testSteps: [
      {
            "action": "观察小时滚轮选中项的文本颜色",
            "checkpoint": "选中项文本颜色为红色（#FF0000）"
      },
      {
            "action": "观察分钟滚轮非选中项的文本大小",
            "checkpoint": "非选中项文本大小为18"
      }
],
        expectedResult: `继承的样式配置正确应用到时间选择器的所有滚轮`,
        postconditions: `样式保持稳定显示`,
      },
      {
        id: 'TC-F-02-08',
        title: 'TimePicker无效日期处理',
        level: 'L2',
        moduleCode: 'F-02',
        moduleName: 'TimePicker 时间选择器',
        preconditions: `应用已安装并启动；已导航到TimePicker测试页面；TimePicker组件已设置initDate='invalid_date_string'（无效日期字符串）`,
        testSteps: [
      {
            "action": "观察TimePicker的显示状态",
            "checkpoint": "组件不崩溃，显示当前时间或默认时间"
      },
      {
            "action": "验证TimePicker功能正常",
            "checkpoint": "时间滚轮可以正常滚动和选择"
      }
],
        expectedResult: `无效日期时使用当前时间或默认值，不崩溃`,
        postconditions: `组件保持稳定状态`,
      },
    ],
  },
  {
    code: 'F-03',
    name: 'DatePicker 日期时间选择器',
    testCases: [
      {
        id: 'TC-F-03-01',
        title: 'DatePicker日期范围配置',
        level: 'L0',
        moduleCode: 'F-03',
        moduleName: 'DatePicker 日期时间选择器',
        preconditions: `应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件已设置startDate='2024-01-01', daysCount=10`,
        testSteps: [
      {
            "action": "观察日期滚轮的显示内容",
            "checkpoint": "日期滚轮显示从2024-01-01开始的10天日期"
      },
      {
            "action": "滚动日期滚轮到首项和末项",
            "checkpoint": "首项为2024-01-01，末项为2024-01-10"
      }
],
        expectedResult: `日期范围与startDate和daysCount设置完全一致`,
        postconditions: `DatePicker保持日期范围显示`,
      },
      {
        id: 'TC-F-03-02',
        title: 'DatePicker当天Today显示',
        level: 'L0',
        moduleCode: 'F-03',
        moduleName: 'DatePicker 日期时间选择器',
        preconditions: `应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件日期范围包含当天日期`,
        testSteps: [
      {
            "action": "滚动日期滚轮到当天日期",
            "checkpoint": "当天日期显示为'Today'字样，而非具体日期格式"
      },
      {
            "action": "滚动到其他非当天日期",
            "checkpoint": "其他日期按正常格式显示，不显示'Today'"
      }
],
        expectedResult: `当天日期显示为Today，其他日期显示具体日期`,
        postconditions: `DatePicker保持正常显示`,
      },
      {
        id: 'TC-F-03-03',
        title: 'DatePicker日期格式化',
        level: 'L0',
        moduleCode: 'F-03',
        moduleName: 'DatePicker 日期时间选择器',
        preconditions: `应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件已设置format='YYYY-MM-DD'`,
        testSteps: [
      {
            "action": "观察日期滚轮的日期显示格式",
            "checkpoint": "日期按照'YYYY-MM-DD'格式显示（如'2024-01-15'）"
      },
      {
            "action": "更改format为'DD/MM/YYYY'，观察日期格式变化",
            "checkpoint": "日期按照'DD/MM/YYYY'格式显示（如'15/01/2024'）"
      }
],
        expectedResult: `日期显示格式与format参数设置一致`,
        postconditions: `DatePicker保持格式化显示`,
      },
      {
        id: 'TC-F-03-04',
        title: 'DatePicker隐藏日期滚轮',
        level: 'L0',
        moduleCode: 'F-03',
        moduleName: 'DatePicker 日期时间选择器',
        preconditions: `应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件已设置hideDate=true`,
        testSteps: [
      {
            "action": "观察DatePicker的滚轮组成",
            "checkpoint": "日期滚轮不显示，仅显示小时和分钟滚轮"
      },
      {
            "action": "验证时间滚轮功能正常",
            "checkpoint": "小时和分钟滚轮可以正常滚动和选择"
      }
],
        expectedResult: `hideDate为true时日期滚轮不显示`,
        postconditions: `DatePicker保持时间滚轮显示`,
      },
      {
        id: 'TC-F-03-05',
        title: 'DatePicker隐藏时间滚轮',
        level: 'L0',
        moduleCode: 'F-03',
        moduleName: 'DatePicker 日期时间选择器',
        preconditions: `应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件已设置hideHours=true, hideMinutes=true`,
        testSteps: [
      {
            "action": "观察DatePicker的滚轮组成",
            "checkpoint": "小时和分钟滚轮均不显示，仅显示日期滚轮"
      },
      {
            "action": "验证日期滚轮功能正常",
            "checkpoint": "日期滚轮可以正常滚动和选择"
      }
],
        expectedResult: `hideHours和hideMinutes为true时对应滚轮不显示`,
        postconditions: `DatePicker保持日期滚轮显示`,
      },
      {
        id: 'TC-F-03-06',
        title: 'DatePicker日期变化回调',
        level: 'L0',
        moduleCode: 'F-03',
        moduleName: 'DatePicker 日期时间选择器',
        preconditions: `应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件已设置onDateSelected回调函数`,
        testSteps: [
      {
            "action": "调整日期滚轮，选择新的日期",
            "checkpoint": "onDateSelected回调被触发，返回的Date对象日期正确"
      },
      {
            "action": "调整时间滚轮，选择新的时间",
            "checkpoint": "onDateSelected回调再次被触发，返回的Date对象时间正确"
      }
],
        expectedResult: `日期时间变化时回调触发，返回的Date对象完整且正确`,
        postconditions: `回调处理完毕`,
      },
      {
        id: 'TC-F-03-07',
        title: 'DatePicker默认日期',
        level: 'L1',
        moduleCode: 'F-03',
        moduleName: 'DatePicker 日期时间选择器',
        preconditions: `应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件未设置initDate参数`,
        testSteps: [
      {
            "action": "记录当前系统日期时间",
            "checkpoint": "获取当前系统时间作为参考"
      },
      {
            "action": "观察DatePicker的初始显示",
            "checkpoint": "DatePicker显示的日期时间与当前系统日期时间一致"
      }
],
        expectedResult: `未设置initDate时使用当前系统日期时间`,
        postconditions: `DatePicker保持当前日期时间显示`,
      },
      {
        id: 'TC-F-03-08',
        title: 'DatePicker大范围天数',
        level: 'L1',
        moduleCode: 'F-03',
        moduleName: 'DatePicker 日期时间选择器',
        preconditions: `应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件已设置daysCount=400（大范围天数）`,
        testSteps: [
      {
            "action": "快速滑动日期滚轮，从首项滚动到末项",
            "checkpoint": "日期滚轮滚动流畅，无明显卡顿"
      },
      {
            "action": "进行多次快速滑动操作",
            "checkpoint": "日期滚轮持续流畅响应，性能稳定"
      }
],
        expectedResult: `大范围天数（400+）时日期滚轮滚动流畅`,
        postconditions: `DatePicker保持正常性能`,
      },
      {
        id: 'TC-F-03-09',
        title: 'DatePicker自定义格式',
        level: 'L1',
        moduleCode: 'F-03',
        moduleName: 'DatePicker 日期时间选择器',
        preconditions: `应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件已设置format='ddd, MMM D, YYYY'（自定义格式）`,
        testSteps: [
      {
            "action": "观察日期滚轮的日期显示",
            "checkpoint": "日期按照'ddd, MMM D, YYYY'格式显示（如'Mon, Jan 15, 2024'）"
      },
      {
            "action": "滚动日期滚轮，验证多个日期的格式",
            "checkpoint": "所有日期均按照自定义格式正确显示"
      }
],
        expectedResult: `自定义format格式正确应用到所有日期显示`,
        postconditions: `DatePicker保持自定义格式显示`,
      },
      {
        id: 'TC-F-03-10',
        title: 'DatePicker无效日期范围',
        level: 'L2',
        moduleCode: 'F-03',
        moduleName: 'DatePicker 日期时间选择器',
        preconditions: `应用已安装并启动；已导航到DatePicker测试页面；DatePicker组件已设置startDate='invalid_date', daysCount=-10（无效参数）`,
        testSteps: [
      {
            "action": "观察DatePicker的显示状态",
            "checkpoint": "组件不崩溃，使用默认日期范围或当前日期"
      },
      {
            "action": "验证DatePicker功能正常",
            "checkpoint": "日期和时间滚轮可以正常滚动和选择"
      }
],
        expectedResult: `无效参数时使用默认值，不崩溃`,
        postconditions: `组件保持稳定状态`,
      },
    ],
  },
  {
    code: 'F-04',
    name: '样式定制能力',
    testCases: [
      {
        id: 'TC-F-04-01',
        title: '样式定制-选中项颜色',
        level: 'L0',
        moduleCode: 'F-04',
        moduleName: '样式定制能力',
        preconditions: `应用已安装并启动；已导航到样式定制测试页面；WheelPicker组件已设置selectedItemTextColor='#FF0000'（红色）`,
        testSteps: [
      {
            "action": "观察滚轮选中项的文本颜色",
            "checkpoint": "选中项文本颜色为红色（#FF0000）"
      },
      {
            "action": "滚动滚轮，更换选中项，观察新选中项颜色",
            "checkpoint": "新选中项文本颜色同样为红色（#FF0000）"
      }
],
        expectedResult: `选中项文本颜色与selectedItemTextColor设置一致`,
        postconditions: `样式保持稳定显示`,
      },
      {
        id: 'TC-F-04-02',
        title: '样式定制-普通项颜色',
        level: 'L0',
        moduleCode: 'F-04',
        moduleName: '样式定制能力',
        preconditions: `应用已安装并启动；已导航到样式定制测试页面；WheelPicker组件已设置itemTextColor='#0000FF'（蓝色）`,
        testSteps: [
      {
            "action": "观察滚轮非选中项的文本颜色",
            "checkpoint": "所有非选中项文本颜色为蓝色（#0000FF）"
      },
      {
            "action": "滚动滚轮，观察非选中项颜色是否保持一致",
            "checkpoint": "所有非选中项文本颜色始终为蓝色（#0000FF）"
      }
],
        expectedResult: `普通项文本颜色与itemTextColor设置一致`,
        postconditions: `样式保持稳定显示`,
      },
      {
        id: 'TC-F-04-03',
        title: '样式定制-文本大小',
        level: 'L0',
        moduleCode: 'F-04',
        moduleName: '样式定制能力',
        preconditions: `应用已安装并启动；已导航到样式定制测试页面；WheelPicker组件已设置selectedItemTextSize=24, itemTextSize=16`,
        testSteps: [
      {
            "action": "观察选中项的文本大小",
            "checkpoint": "选中项文本大小为24"
      },
      {
            "action": "观察非选中项的文本大小",
            "checkpoint": "非选中项文本大小为16"
      },
      {
            "action": "滚动滚轮，验证文本大小变化",
            "checkpoint": "项目变为选中时文本变大为24，变为非选中时文本变小为16"
      }
],
        expectedResult: `文本大小与对应的TextSize参数一致`,
        postconditions: `样式保持稳定显示`,
      },
      {
        id: 'TC-F-04-04',
        title: '样式定制-字体配置',
        level: 'L0',
        moduleCode: 'F-04',
        moduleName: '样式定制能力',
        preconditions: `应用已安装并启动；已导航到样式定制测试页面；WheelPicker组件已设置selectedItemTextFontFamily='serif', itemTextFontFamily='monospace'`,
        testSteps: [
      {
            "action": "观察选中项的字体样式",
            "checkpoint": "选中项文本使用serif字体显示"
      },
      {
            "action": "观察非选中项的字体样式",
            "checkpoint": "非选中项文本使用monospace字体显示"
      },
      {
            "action": "滚动滚轮，验证字体样式变化",
            "checkpoint": "项目变为选中时字体变为serif，变为非选中时字体变为monospace"
      }
],
        expectedResult: `字体与对应的TextFontFamily参数一致`,
        postconditions: `样式保持稳定显示`,
      },
      {
        id: 'TC-F-04-05',
        title: '样式定制-指示器样式',
        level: 'L1',
        moduleCode: 'F-04',
        moduleName: '样式定制能力',
        preconditions: `应用已安装并启动；已导航到样式定制测试页面；WheelPicker组件已设置indicatorColor='#00FF00', indicatorWidth=3`,
        testSteps: [
      {
            "action": "观察滚轮指示器的颜色",
            "checkpoint": "指示器颜色为绿色（#00FF00）"
      },
      {
            "action": "观察滚轮指示器的宽度",
            "checkpoint": "指示器线条宽度为3像素"
      }
],
        expectedResult: `指示器样式与indicatorColor和indicatorWidth设置一致`,
        postconditions: `样式保持稳定显示`,
      },
      {
        id: 'TC-F-04-06',
        title: '样式定制-背景颜色',
        level: 'L1',
        moduleCode: 'F-04',
        moduleName: '样式定制能力',
        preconditions: `应用已安装并启动；已导航到样式定制测试页面；WheelPicker组件已设置backgroundColor='#F0F0F0'（浅灰色）`,
        testSteps: [
      {
            "action": "观察滚轮的背景颜色",
            "checkpoint": "滚轮背景颜色为浅灰色（#F0F0F0）"
      },
      {
            "action": "滚动滚轮，验证背景颜色是否保持一致",
            "checkpoint": "滚动过程中背景颜色始终为浅灰色（#F0F0F0）"
      }
],
        expectedResult: `背景颜色与backgroundColor设置一致`,
        postconditions: `样式保持稳定显示`,
      },
    ],
  },
  {
    code: 'F-05',
    name: '循环滚动支持',
    testCases: [
      {
        id: 'TC-F-05-01',
        title: '循环滚动-循环开启',
        level: 'L0',
        moduleCode: 'F-05',
        moduleName: '循环滚动支持',
        preconditions: `应用已安装并启动；已导航到循环滚动测试页面；WheelPicker组件已设置isCyclic=true，数据项包含['A', 'B', 'C', 'D', 'E']`,
        testSteps: [
      {
            "action": "将滚轮滚动到末项'E'",
            "checkpoint": "滚轮显示末项'E'为选中状态"
      },
      {
            "action": "继续向上滑动滚轮",
            "checkpoint": "滚轮从末项'E'循环滚动到首项'A'，无边界阻挡"
      },
      {
            "action": "继续向上滑动，依次显示'B', 'C', 'D', 'E'",
            "checkpoint": "滚轮可无限循环向上滚动"
      },
      {
            "action": "将滚轮滚动到首项'A'，然后向下滑动",
            "checkpoint": "滚轮从首项'A'循环滚动到末项'E'，无边界阻挡"
      }
],
        expectedResult: `循环开启时滚轮可无限向上或向下滚动`,
        postconditions: `滚轮保持循环滚动能力`,
      },
      {
        id: 'TC-F-05-02',
        title: '循环滚动-循环关闭',
        level: 'L0',
        moduleCode: 'F-05',
        moduleName: '循环滚动支持',
        preconditions: `应用已安装并启动；已导航到循环滚动测试页面；WheelPicker组件已设置isCyclic=false，数据项包含['A', 'B', 'C', 'D', 'E']`,
        testSteps: [
      {
            "action": "将滚轮滚动到末项'E'",
            "checkpoint": "滚轮显示末项'E'为选中状态"
      },
      {
            "action": "尝试继续向上滑动滚轮",
            "checkpoint": "滚轮停止在末项'E'，无法继续向上滚动"
      },
      {
            "action": "将滚轮滚动到首项'A'",
            "checkpoint": "滚轮显示首项'A'为选中状态"
      },
      {
            "action": "尝试继续向下滑动滚轮",
            "checkpoint": "滚轮停止在首项'A'，无法继续向下滚动"
      }
],
        expectedResult: `循环关闭时滚轮在边界停止，无法超越首项或末项`,
        postconditions: `滚轮保持非循环滚动模式`,
      },
      {
        id: 'TC-F-05-03',
        title: '循环滚动-边界无缝滚动',
        level: 'L0',
        moduleCode: 'F-05',
        moduleName: '循环滚动支持',
        preconditions: `应用已安装并启动；已导航到循环滚动测试页面；WheelPicker组件已设置isCyclic=true，数据项包含['A', 'B', 'C', 'D', 'E']`,
        testSteps: [
      {
            "action": "将滚轮滚动到末项'E'，然后慢速向上滑动",
            "checkpoint": "滚轮从'E'平滑过渡到'A'，无明显跳跃或闪烁"
      },
      {
            "action": "将滚轮滚动到首项'A'，然后慢速向下滑动",
            "checkpoint": "滚轮从'A'平滑过渡到'E'，无明显跳跃或闪烁"
      },
      {
            "action": "快速滑动滚轮，观察循环边界过渡",
            "checkpoint": "快速滑动时循环边界过渡同样流畅，无卡顿"
      }
],
        expectedResult: `循环模式下从末项滚动到首项时过渡平滑无跳跃`,
        postconditions: `滚轮保持流畅循环滚动`,
      },
      {
        id: 'TC-F-05-04',
        title: '循环滚动-2个元素强制关闭循环',
        level: 'L2',
        moduleCode: 'F-05',
        moduleName: '循环滚动支持',
        preconditions: `应用已安装并启动；已导航到循环滚动测试页面；WheelPicker组件已设置isCyclic=true，数据项包含['A', 'B']（2个元素）`,
        testSteps: [
      {
            "action": "观察滚轮的初始状态",
            "checkpoint": "滚轮显示2个数据项'A'和'B'"
      },
      {
            "action": "将滚轮滚动到末项'B'，尝试继续向上滑动",
            "checkpoint": "滚轮停止在末项'B'，无法循环滚动"
      },
      {
            "action": "将滚轮滚动到首项'A'，尝试继续向下滑动",
            "checkpoint": "滚轮停止在首项'A'，无法循环滚动"
      }
],
        expectedResult: `数据长度≤2时即使设置isCyclic为true也不循环`,
        postconditions: `滚轮保持非循环模式`,
      },
    ],
  },
  {
    code: 'F-06',
    name: '惯性滚动与手势交互',
    testCases: [
      {
        id: 'TC-F-06-01',
        title: '手势交互-手势滑动',
        level: 'L0',
        moduleCode: 'F-06',
        moduleName: '惯性滚动与手势交互',
        preconditions: `应用已安装并启动；已导航到手势交互测试页面；WheelPicker组件已正常显示`,
        testSteps: [
      {
            "action": "手指在滚轮区域向上滑动",
            "checkpoint": "滚轮内容跟随手指向上移动，响应灵敏"
      },
      {
            "action": "手指在滚轮区域向下滑动",
            "checkpoint": "滚轮内容跟随手指向下移动，响应灵敏"
      },
      {
            "action": "手指在滚轮区域进行短距离滑动",
            "checkpoint": "滚轮精确跟随手指移动，位移准确"
      }
],
        expectedResult: `手指滑动时滚轮实时跟随移动`,
        postconditions: `滚轮恢复静止状态`,
      },
      {
        id: 'TC-F-06-02',
        title: '手势交互-惯性滚动',
        level: 'L0',
        moduleCode: 'F-06',
        moduleName: '惯性滚动与手势交互',
        preconditions: `应用已安装并启动；已导航到手势交互测试页面；WheelPicker组件已正常显示`,
        testSteps: [
      {
            "action": "快速向上滑动滚轮后抬起手指",
            "checkpoint": "手指离开后滚轮继续向上滚动，并逐渐减速"
      },
      {
            "action": "观察滚轮惯性滚动过程",
            "checkpoint": "滚轮滚动速度逐渐降低，最终停止在某个选中项"
      },
      {
            "action": "快速向下滑动滚轮后抬起手指",
            "checkpoint": "手指离开后滚轮继续向下滚动，并逐渐减速"
      }
],
        expectedResult: `快速滑动后滚轮继续惯性滚动并逐渐减速`,
        postconditions: `滚轮停止在某个选中项`,
      },
      {
        id: 'TC-F-06-03',
        title: '手势交互-平滑动画',
        level: 'L0',
        moduleCode: 'F-06',
        moduleName: '惯性滚动与手势交互',
        preconditions: `应用已安装并启动；已导航到手势交互测试页面；WheelPicker组件已正常显示`,
        testSteps: [
      {
            "action": "进行多次不同速度的滑动操作",
            "checkpoint": "滚轮滚动动画始终流畅，无卡顿或跳帧现象"
      },
      {
            "action": "观察滚轮停止时的对齐动画",
            "checkpoint": "滚轮停止时自动对齐选中项的动画流畅自然"
      },
      {
            "action": "连续快速滑动滚轮",
            "checkpoint": "连续滑动时动画保持流畅，响应稳定"
      }
],
        expectedResult: `滚轮滚动动画帧率稳定，视觉流畅`,
        postconditions: `滚轮保持流畅滚动能力`,
      },
      {
        id: 'TC-F-06-04',
        title: '手势交互-准确停止',
        level: 'L0',
        moduleCode: 'F-06',
        moduleName: '惯性滚动与手势交互',
        preconditions: `应用已安装并启动；已导航到手势交互测试页面；WheelPicker组件已正常显示`,
        testSteps: [
      {
            "action": "滑动滚轮后等待其自动停止",
            "checkpoint": "滚轮停止时选中项准确对齐指示器中心位置"
      },
      {
            "action": "进行多次不同力度的滑动，观察停止位置",
            "checkpoint": "每次停止时选中项均准确对齐中心，无偏移"
      },
      {
            "action": "快速滑动后观察停止对齐",
            "checkpoint": "快速滑动后停止时选中项同样准确对齐中心"
      }
],
        expectedResult: `滚轮停止时选中项准确对齐指示器中心`,
        postconditions: `滚轮保持准确对齐`,
      },
      {
        id: 'TC-F-06-05',
        title: '手势交互-快速滑动',
        level: 'L1',
        moduleCode: 'F-06',
        moduleName: '惯性滚动与手势交互',
        preconditions: `应用已安装并启动；已导航到手势交互测试页面；WheelPicker组件已正常显示，包含较多数据项（20+）`,
        testSteps: [
      {
            "action": "用力快速向上滑动滚轮",
            "checkpoint": "滚轮产生较长的惯性滚动距离，跨越多个数据项"
      },
      {
            "action": "观察惯性滚动的减速过程",
            "checkpoint": "减速曲线自然，符合物理惯性规律"
      },
      {
            "action": "用力快速向下滑动滚轮",
            "checkpoint": "滚轮同样产生较长的惯性滚动距离"
      }
],
        expectedResult: `快速滑动后惯性滚动距离较长且符合物理规律`,
        postconditions: `滚轮恢复静止状态`,
      },
      {
        id: 'TC-F-06-06',
        title: '手势交互-慢速滑动',
        level: 'L1',
        moduleCode: 'F-06',
        moduleName: '惯性滚动与手势交互',
        preconditions: `应用已安装并启动；已导航到手势交互测试页面；WheelPicker组件已正常显示`,
        testSteps: [
      {
            "action": "缓慢向上滑动滚轮，保持手指不离开屏幕",
            "checkpoint": "滚轮精确跟随手指移动，无延迟或飘移"
      },
      {
            "action": "缓慢向下滑动滚轮，观察滚轮响应",
            "checkpoint": "滚轮能够精确响应慢速滑动，移动距离与手指移动距离一致"
      },
      {
            "action": "进行极慢速微调滑动",
            "checkpoint": "滚轮能够响应微小的滑动距离，精确控制选中项"
      }
],
        expectedResult: `慢速滑动时滚轮能够精确跟随手指移动`,
        postconditions: `滚轮保持灵敏响应`,
      },
    ],
  },
];

const supplementalTestCases: Record<string, TestCase[]> = {
  'F-01': [
    createSupplementalCase('TC-F-01-16', 'WheelPicker混合数据容错', 'L1', '混合字符串和数字数组，确认所有值均可显示与选择。'),
    createSupplementalCase('TC-F-01-17', 'WheelPicker非受控初始位置', 'L1', '使用initPosition设置初始选中项，确认初始位置正确。'),
    createSupplementalCase('TC-F-01-18', 'WheelPicker原生事件映射', 'L1', '滚动滚轮，确认原生topChange事件经onItemSelected返回准确position。'),
    createSupplementalCase('TC-F-01-19', 'WheelPicker自定义布局', 'L1', '确认自定义style宽高正确应用，组件在布局内正常显示。'),
    createSupplementalCase('TC-F-01-20', 'WheelPicker Fabric组件注册与渲染', 'L1', '确认Fabric Component Spec注册的WheelPicker可渲染并通过onItemSelected返回选中索引。'),
  ],
  'F-02': [
    createSupplementalCase('TC-F-02-09', 'TimePicker默认五分钟间隔', 'L1', '未传minutes时，确认分钟滚轮显示00、05至55。'),
    createSupplementalCase('TC-F-02-10', 'TimePicker完整样式继承', 'L1', '确认WheelPicker的颜色、字号、指示器与背景样式应用到全部时间滚轮。'),
    createSupplementalCase('TC-F-02-11', 'TimePicker禁用交互', 'L1', '设置disabled后，确认全部时间滚轮不可滑动。'),
  ],
  'F-03': [
    createSupplementalCase('TC-F-03-11', 'DatePicker指定初始日期时间', 'L1', '使用Date对象设置initDate，确认日期和时间初始值正确。'),
    createSupplementalCase('TC-F-03-12', 'DatePicker字符串初始日期时间', 'L1', '使用ISO字符串设置initDate，确认日期和时间初始值正确。'),
    createSupplementalCase('TC-F-03-13', 'DatePicker自定义日期列表', 'L1', '使用days传入自定义日期列表，确认列表标签完整显示。'),
    createSupplementalCase('TC-F-03-14', 'DatePicker默认日期格式', 'L1', '不传format，确认日期滚轮使用默认ddd MMM D格式。'),
    createSupplementalCase('TC-F-03-15', 'DatePicker 24小时格式', 'L1', '设置format24=true，确认仅显示00至23小时滚轮。'),
    createSupplementalCase('TC-F-03-16', 'DatePicker 12小时格式', 'L1', '设置format24=false，确认显示1至12小时与AM/PM滚轮。'),
    createSupplementalCase('TC-F-03-17', 'DatePicker自定义小时列表', 'L1', '使用hours限制可选小时，确认仅显示指定小时。'),
    createSupplementalCase('TC-F-03-18', 'DatePicker自定义分钟列表', 'L1', '使用minutes限制可选分钟，确认仅显示指定分钟。'),
    createSupplementalCase('TC-F-03-19', 'DatePicker隐藏AM/PM滚轮', 'L1', '在12小时格式下设置hideAM，确认AM/PM滚轮不显示。'),
    createSupplementalCase('TC-F-03-20', 'DatePicker完整样式继承', 'L1', '确认WheelPicker样式配置应用到日期与时间滚轮。'),
    createSupplementalCase('TC-F-03-21', 'DatePicker禁用交互', 'L1', '设置disabled后，确认日期和全部时间滚轮不可滑动。'),
  ],
  'F-04': [
    createSupplementalCase('TC-F-04-07', '样式定制-隐藏指示器', 'L1', '设置hideIndicator后，确认中间选中指示器不显示。'),
    createSupplementalCase('TC-F-04-08', '样式定制-自定义布局', 'L1', '设置自定义style，确认滚轮尺寸和布局生效。'),
  ],
};

function createSupplementalCase(id: string, title: string, level: string, expectedResult: string): TestCase {
  const moduleCode = id.slice(3, 7);
  const moduleName = baseModules.find(module => module.code === moduleCode)?.name ?? '补充验证';
  return {
    id,
    title,
    level,
    moduleCode,
    moduleName,
    preconditions: '应用已安装并启动；已进入对应补充验证页面。',
    testSteps: [{ action: '按页面说明观察或滑动选择器', checkpoint: expectedResult }],
    expectedResult,
    postconditions: '组件保持稳定，选择结果显示在页面中。',
  };
}

export const modules: Module[] = baseModules.map(module => ({
  ...module,
  testCases: [...module.testCases, ...(supplementalTestCases[module.code] ?? [])],
}));