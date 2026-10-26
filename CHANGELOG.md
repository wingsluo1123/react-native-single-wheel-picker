# Changelog

## 鸿蒙化Log

## 3.0.3 - 2026-10-26

release @hxa-rn/react-native-single-wheel-picker@3.0.3

### Fixed
- 修复宿主工程仅做 autolinking 时 `WheelPicker` 不显示的问题（[issue #1](https://atomgit.com/hxa-rn/react-native-single-wheel-picker/issues/1)）。`GeneratedPackage` 现在重写 `RNOHPackage.createWrappedCustomRNComponentBuilderByComponentNameMap()`，自行注册 `WheelPicker` 的 ArkTS Builder；宿主工程不再需要在 `Index.ets` 中手写 `arkTsComponentNames` 与 `buildCustomRNComponent`。

### Changed
- README 重写「Autolinking」小节：说明装上即用，手动注册写法改为仅在宿主工程覆盖 RNOH 默认 Builder 时使用。

### Added
- README 新增「常见问题」小节，补充「页面上看不到滚轮」的排查清单。

## 3.0.2 - 2026-10-24

release @hxa-rn/react-native-single-wheel-picker@3.0.2

### Changed
- 修改 LICENSE 的 Copyright 声明。

## 3.0.1 - 2026-10-21

release @hxa-rn/react-native-single-wheel-picker@3.0.1

### Changed
- 补全 package.json 的 homepage、repository 元数据。
- LICENSE 增加 Modifications Copyright 声明。

## 3.0.0 - 2026-09-27

release @hxa-rn/react-native-single-wheel-picker@3.0.0

### Added
- 首个鸿蒙适配版本，基于上游 `ReactNativeWheelPicker` 3.0.0；能力对齐上游：`WheelPicker`、`TimePicker`、`DatePicker`、`data`、`selectedItem`、`initPosition`、`onItemSelected`、`isCyclic`、`format24`、`hours`、`minutes`、`onTimeSelected`、`startDate`、`daysCount`、`days`、`hideDate`、`hideHours`、`hideMinutes`、`hideAM`、`onDateSelected`。
- 适配 React Native for OpenHarmony 0.72.139，支持 HarmonyOS SDK API 21+。
- 新增鸿蒙侧原生实现：`WheelPicker`（基于 ArkUI `TextPicker`）、`GeneratedPackage`、`WheelPickerAndroidPackage`。
- 新增示例工程 `example` 与 `README.md` 文档，`README.md` 包含库说明及“快速验证（运行 Example）”小节（示例工程使用说明）。
- 基线：原库 `ReactNativeWheelPicker` 3.0.0；框架基线 React Native for OpenHarmony 0.72.x；系统 API 21+。
