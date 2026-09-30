# Changelog

## 鸿蒙化Log

## 1.0.0 - 2026-09-27

发布 `@hxa-rn/react-native-single-wheel-picker@3.0.0`。

### Added
- 首个鸿蒙适配版本，基于上游 `ReactNativeWheelPicker` 3.0.0；能力对齐上游：`WheelPicker`、`TimePicker`、`DatePicker`、`data`、`selectedItem`、`initPosition`、`onItemSelected`、`isCyclic`、`format24`、`hours`、`minutes`、`onTimeSelected`、`startDate`、`daysCount`、`days`、`hideDate`、`hideHours`、`hideMinutes`、`hideAM`、`onDateSelected`。
- 适配 React Native for OpenHarmony 0.72.139，支持 HarmonyOS SDK API 21+。
- 新增鸿蒙侧原生实现：`WheelPicker`（基于 ArkUI `TextPicker`）、`GeneratedPackage`、`WheelPickerAndroidPackage`。
- 新增示例工程 `example` 与 `README.md` 文档，`README.md` 包含库说明及“快速验证（运行 Example）”小节（示例工程使用说明）。
- 基线：原库 `ReactNativeWheelPicker` 3.0.0；框架基线 React Native for OpenHarmony 0.72.x；系统 API 21+。
