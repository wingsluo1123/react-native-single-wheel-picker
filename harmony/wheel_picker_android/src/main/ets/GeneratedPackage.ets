import { RNOHPackage } from '@rnoh/react-native-openharmony/ets';
import type {
  DescriptorWrapperFactoryByDescriptorTypeCtx,
  DescriptorWrapperFactoryByDescriptorType,
} from '@rnoh/react-native-openharmony/ts';
import { WheelPicker as WheelPickerSpec } from './generated/components/WheelPicker';

export class GeneratedPackage extends RNOHPackage {
  createDescriptorWrapperFactoryByDescriptorType(
    ctx: DescriptorWrapperFactoryByDescriptorTypeCtx
  ): DescriptorWrapperFactoryByDescriptorType {
    return {
      WheelPicker: (ctx) => new WheelPickerSpec.DescriptorWrapper(ctx.descriptor),
    };
  }
}
