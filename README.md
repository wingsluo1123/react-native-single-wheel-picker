# react-native-single-wheel-picker

本项目基于 [Cero-Studio/ReactNativeWheelPicker](https://github.com/Cero-Studio/ReactNativeWheelPicker) 开发，并适配 React Native for OpenHarmony。
如果在使用过程中有任何问题，可以在 [GitCode](https://gitcode.com/hxa-rn/react-native-single-wheel-picker) 提交 Issue，我们会及时跟进。

## **项目介绍**

`react-native-single-wheel-picker` 是 `react-native-wheel-picker-android` 的 React Native for OpenHarmony 适配包，提供滚轮、时间和日期时间选择能力。

- `WheelPicker`：鸿蒙原生 Fabric 组件，底层使用 ArkUI `TextPicker`。
- `TimePicker`：JS 层组合两个或三个 `WheelPicker`，用于选择时、分与 AM/PM。
- `DatePicker`：JS 层组合日期、时、分与 AM/PM 滚轮，用于选择日期时间。

## **集成指南**

### 安装

在 React Native 工程根目录执行：

```bash
npm install @hxa-rn/react-native-single-wheel-picker
```

本库要求宿主工程提供以下 peer dependency：

- `react-native >=0.72`

### Autolinking

本库支持 RNOH Autolinking。安装依赖后由宿主工程自动接入，无需手动注册 ETS 或 C++ Package；请继续执行宿主工程自身的依赖同步、Bundle 生成和构建流程。

### 导入

```tsx
import {
  DatePicker,
  TimePicker,
  WheelPicker,
} from '@hxa-rn/react-native-single-wheel-picker';
```

## **使用说明**

### 基础用法

`WheelPicker` 为单列滚轮选择器，`data` 为必填项。

```tsx
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { WheelPicker } from '@hxa-rn/react-native-single-wheel-picker';

export function WheelPickerExample() {
  const options = ['星期一', '星期二', '星期三', '星期四', '星期五'];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View>
      <Text>当前选择：{options[selectedIndex]}</Text>
      <WheelPicker
        data={options}
        selectedItem={selectedIndex}
        isCyclic
        selectedItemTextColor="#0A59F7"
        selectedItemTextSize={20}
        itemTextColor="#808080"
        itemTextSize={16}
        indicatorColor="#D9D9D9"
        indicatorWidth={1}
        onItemSelected={setSelectedIndex}
        style={{ height: 150 }}
      />
    </View>
  );
}
```

`selectedItemTextColor`、`selectedItemTextSize` 等样式属性可直接写在 `WheelPicker` 上，也可通过 `TimePicker`、`DatePicker` 透传给内部的每一列滚轮。

### 时间选择（TimePicker）

```tsx
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TimePicker } from '@hxa-rn/react-native-single-wheel-picker';

export function TimePickerExample() {
  const [selectedTime, setSelectedTime] = useState(new Date(2026, 0, 1, 9, 30));

  return (
    <View>
      <Text>{selectedTime.toLocaleTimeString()}</Text>
      <TimePicker
        initDate={selectedTime}
        format24={true}
        hours={[9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
        minutes={[0, 15, 30, 45]}
        onTimeSelected={setSelectedTime}
        selectedItemTextColor="#0A59F7"
        style={{ height: 150 }}
      />
    </View>
  );
}
```

`format24={false}`（默认值）时，组件额外显示 `AM` / `PM` 列；`format24={true}` 时只显示时、分两列。

### 日期时间选择（DatePicker）

```tsx
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { DatePicker } from '@hxa-rn/react-native-single-wheel-picker';

export function DatePickerExample() {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 1, 9, 30));

  return (
    <View>
      <Text>{selectedDate.toLocaleString()}</Text>
      <DatePicker
        initDate={selectedDate}
        startDate="2026-01-01T00:00:00"
        daysCount={30}
        format24={true}
        minutes={[0, 15, 30, 45]}
        dayLabel="日"
        hourLabel="时"
        minuteLabel="分"
        onDateSelected={setSelectedDate}
        selectedItemTextColor="#0A59F7"
        style={{ height: 150 }}
      />
    </View>
  );
}
```

`DatePicker` 默认显示日期、小时、分钟和 AM/PM。可通过 `hideDate`、`hideHours`、`hideMinutes`、`hideAM` 隐藏对应列；当 `format24` 为 `true` 时，AM/PM 列不会显示。

## **接口文档**

以下 API 依据 `src/index.tsx`、`src/index.d.ts`、`src/WheelPicker.harmony.tsx`、`src/TimePicker.harmony.tsx`、`src/DatePicker.harmony.tsx`、`src/specs/v1/WheelPickerNativeComponent.ts` 和 `harmony/wheel_picker_android/src/main/ets/components/WheelPicker.ets` 整理。

### WheelPicker

鸿蒙原生 Fabric 组件，底层使用 ArkUI `TextPicker` 实现滚轮选择。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `Array<string \| number>` | - | 必填，滚轮数据。数值会转换为字符串。 |
| `selectedItem` | `number` | - | 当前选中项索引，适用于受控模式。 |
| `initPosition` | `number` | `0` | 初始选中项索引，仅在首次初始化时使用。 |
| `onItemSelected` | `(position: number) => void` | - | 选中项变化时触发，参数为新项索引。 |
| `isCyclic` | `boolean` | `false` | 是否循环滚动；数据项数不大于 `2` 时自动关闭。 |
| `selectedItemTextColor` | `string` | `#000000` | 选中项文本颜色。 |
| `selectedItemTextSize` | `number` | `20` | 选中项字体大小。 |
| `selectedItemTextFontFamily` | `string` | - | 选中项字体名称。 |
| `itemTextColor` | `string` | `#808080` | 非选中项文本颜色。 |
| `itemTextSize` | `number` | `16` | 非选中项字体大小。 |
| `itemTextFontFamily` | `string` | - | 非选中项字体名称。 |
| `indicatorColor` | `string` | `#000000` | 中间选中区域分割线颜色。 |
| `indicatorWidth` | `number` | `1` | 中间选中区域分割线宽度。 |
| `hideIndicator` | `boolean` | `false` | 是否隐藏中间选中区域分割线。 |
| `backgroundColor` | `string` | - | JS 包装容器背景色。 |
| `disabled` | `boolean` | `false` | 是否禁用触摸选择。 |
| `testID` | `string` | - | 测试标识，设置在 JS 包装容器上。 |
| `style` | `StyleProp<ViewStyle>` | `{ height: 150 }` | 容器样式。 |

### TimePicker

除下表属性外，`TimePicker` 还支持 `WheelPicker` 的样式属性：`selectedItemTextColor`、`selectedItemTextSize`、`selectedItemTextFontFamily`、`itemTextColor`、`itemTextSize`、`itemTextFontFamily`、`indicatorColor`、`indicatorWidth`、`hideIndicator`、`backgroundColor`、`disabled` 和 `testID`。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `initDate` | `Date \| string` | 当前时间 | 初始时间；无效值会回退到当前时间。 |
| `onTimeSelected` | `(date: Date) => void` | - | 用户改变小时、分钟或 AM/PM 时触发。 |
| `format24` | `boolean` | `false` | 是否使用 24 小时制。 |
| `hours` | `number[]` | 12 小时制为 `1`–`12`；24 小时制为 `0`–`23` | 可选小时列表。 |
| `minutes` | `Array<number \| string>` | `[0, 5, ..., 55]` | 可选分钟列表。 |
| `style` | `StyleProp<ViewStyle>` | `{ height: 150 }` | 选择器整体样式。 |

### DatePicker

除下表属性外，`DatePicker` 同样支持 `TimePicker` 所列的 `WheelPicker` 样式属性。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `initDate` | `Date \| string` | 当前时间 | 初始日期时间；无效值会回退到当前时间。 |
| `onDateSelected` | `(date: Date) => void` | - | 用户改变任意可见列时触发。 |
| `startDate` | `Date \| string` | 当前日期 | 自动生成日期列表的起始日期。 |
| `daysCount` | `number` | `365` | 未传 `days` 时生成的连续日期数量；非正数按 `365` 处理。 |
| `days` | `Array<string \| number>` | - | 自定义日期显示列表，优先级高于 `startDate` 和 `daysCount`。 |
| `format` | `string` | `ddd MMM D` | 自动生成日期列表时使用的 Moment 格式。 |
| `format24` | `boolean` | `false` | 是否使用 24 小时制。 |
| `hours` | `number[]` | 同 `TimePicker` | 可选小时列表。 |
| `minutes` | `Array<number \| string>` | `[0, 5, ..., 55]` | 可选分钟列表。 |
| `hideDate` | `boolean` | `false` | 是否隐藏日期列。 |
| `hideHours` | `boolean` | `false` | 是否隐藏小时列。 |
| `hideMinutes` | `boolean` | `false` | 是否隐藏分钟列。 |
| `hideAM` | `boolean` | `false` | 是否隐藏 AM/PM 列；24 小时制下始终不显示该列。 |
| `dayLabel` | `string` | - | 自动生成日期文本的后缀。 |
| `hourLabel` | `string` | - | 小时文本的后缀。 |
| `minuteLabel` | `string` | - | 分钟文本的后缀。 |
| `isCyclic` | `boolean` | `false` | 是否循环滚动日期列。 |
| `style` | `StyleProp<ViewStyle>` | `{ height: 150 }` | 选择器整体样式。 |

## 快速验证（运行 Example）

### 前置条件

| 依赖 | 版本要求 |
| :-- | --- |
| Node.js | `>=20` |
| React Native for OpenHarmony | `0.72.139` |
| HarmonyOS SDK | API 21 或更高版本 |

### 运行步骤

1. 在仓库根目录安装依赖（`prepare` 钩子会执行 `bob build` 生成 `dist/`）：

   ```bash
   npm i
   ```

2. 生成供示例工程安装的本地安装包：

   ```bash
   npm pack
   ```

   该命令会生成 `hxa-rn-react-native-single-wheel-picker-3.0.0.tgz`，`example/package.json` 已通过 `file:` 引用该文件。

3. 进入 `example` 目录并安装示例工程依赖：

   ```bash
   cd example
   npm i
   ```

4. 生成 React Native JavaScript Bundle：

   ```bash
   npm run dev
   ```

5. 使用 DevEco Studio 打开 `example/harmony`，同步依赖，完成签名配置后构建并运行应用。

## **约束与限制**

### 兼容性

| 依赖 | 要求 |
| --- | --- |
| React Native for OpenHarmony | `0.72.139` |
| HarmonyOS SDK | API `21` 或更高版本 |
| Example 工程 `compatibleSdkVersion` | `6.0.1(21)` |
| Example 工程 `targetSdkVersion` | `6.1.1(24)` |
| Node.js | `>=20` |

### 使用限制

- 原生滚轮只在鸿蒙平台实现；底层为 ArkUI `TextPicker`。
- `WheelPicker.data` 为必填项。传入的数值会在 JS 层转换为字符串后显示。
- 仅当 `data` 项数大于 `2` 时，`isCyclic` 才会生效；项数为 `2` 或更少时会自动关闭循环。
- `WheelPicker` 默认高度为 `150`。传入 `style` 时应提供可见高度。
- `selectedItem` 是受控索引；未提供时，首次渲染使用 `initPosition`，两者缺省时默认选中第 `0` 项。
- `DatePicker` 自动生成的日期列表中，与当天日期相同的项会显示为 `Today`；传入 `dayLabel` 时显示为 `Today <dayLabel>`。
- `DatePicker.days` 建议传入可由 JavaScript `Date` 解析的日期字符串；其显示文本保留原值，但内部仍需将其转换为日期以构造回调结果。
- `TimePicker` 和 `DatePicker` 的 `minutes` 会转换为数字并过滤无效值；请传入可转换为有效数字的分钟值。
- `TimePicker`、`DatePicker` 不支持通过 `startTime`、`endTime` 限制可选时段；这两个属性不会参与当前鸿蒙实现。

### 系统权限

本库不依赖额外的 HarmonyOS 系统权限。

## **开源 License**

本项目采用 [MIT License](./LICENSE)，与上游项目保持一致。

## **问题反馈渠道**

如在使用过程中遇到问题，请在 [GitCode](https://gitcode.com/hxa-rn/react-native-single-wheel-picker) 提交 [Issue](https://gitcode.com/hxa-rn/react-native-single-wheel-picker/issues)，我们会及时跟进。

- 提交问题时建议附上项目版本、RN 版本、OpenHarmony SDK/API 版本、DevEco Studio 版本、设备信息、复现步骤及相关日志。
- 涉及签名、账号、密钥或用户数据时，请勿在 Issue 中上传敏感信息；可按组织安全流程提交脱敏日志。
