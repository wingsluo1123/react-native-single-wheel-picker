import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { BubblingEventHandler, Int32, Float } from 'react-native/Libraries/Types/CodegenTypes';
import type { ViewProps } from 'react-native';

export interface OnChangeEvent {
  position: Int32;
}

export interface WheelPickerProps extends ViewProps {
  data?: ReadonlyArray<string>;
  isCyclic?: boolean;
  selectedItemTextColor?: string;
  selectedItemTextSize?: Float;
  selectedItemTextFontFamily?: string;
  indicatorWidth?: Float;
  hideIndicator?: boolean;
  indicatorColor?: string;
  itemTextColor?: string;
  itemTextSize?: Float;
  itemTextFontFamily?: string;
  initPosition?: Int32;
  selectedItem?: Int32;
  onChange?: BubblingEventHandler<OnChangeEvent>;
}

export default codegenNativeComponent<WheelPickerProps>(
  'WheelPicker',
);
