import { ComponentBuilderContext, RNOHPackage } from '@rnoh/react-native-openharmony/ets';
import type {
  DescriptorWrapperFactoryByDescriptorTypeCtx,
  DescriptorWrapperFactoryByDescriptorType,
} from '@rnoh/react-native-openharmony/ts';
import { WheelPicker as WheelPickerSpec } from './generated/components/WheelPicker';
import { WheelPicker } from './components/WheelPicker';

@Builder
function buildWheelPicker(ctx: ComponentBuilderContext) {
  WheelPicker({
    ctx: ctx.rnComponentContext,
    tag: ctx.tag,
  })
}

export class GeneratedPackage extends RNOHPackage {
  createDescriptorWrapperFactoryByDescriptorType(
    ctx: DescriptorWrapperFactoryByDescriptorTypeCtx
  ): DescriptorWrapperFactoryByDescriptorType {
    return {
      WheelPicker: (ctx) => new WheelPickerSpec.DescriptorWrapper(ctx.descriptor),
    };
  }

  // 让 WheelPicker 这个 ArkTS 自定义组件随 autolinking 一起生效：RNOH 内置的
  // buildCustomRNComponent 会优先查询各 RNOHPackage 提供的 builder 映射，
  // 宿主工程无需在 Index.ets 中手写 arkTsComponentNames 和 buildCustomRNComponent。
  createWrappedCustomRNComponentBuilderByComponentNameMap(
  ): Map<string, WrappedBuilder<[ComponentBuilderContext]>> {
    return new Map<string, WrappedBuilder<[ComponentBuilderContext]>>()
      .set(WheelPicker.NAME, wrapBuilder(buildWheelPicker));
  }
}
