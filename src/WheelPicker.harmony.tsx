import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import WheelPickerNativeComponent from './specs/v1/WheelPickerNativeComponent';

export type WheelPickerProps = {
  data: Array<string | number>;
  isCyclic?: boolean;
  selectedItemTextColor?: string;
  selectedItemTextSize?: number;
  selectedItemTextFontFamily?: string;
  indicatorWidth?: number;
  hideIndicator?: boolean;
  indicatorColor?: string;
  itemTextColor?: string;
  itemTextSize?: number;
  itemTextFontFamily?: string;
  initPosition?: number;
  backgroundColor?: string;
  selectedItem?: number;
  onItemSelected?: (position: number) => void;
  disabled?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
};

export type WheelPickerStyleProps = Omit<
  WheelPickerProps,
  'data' | 'initPosition' | 'selectedItem' | 'onItemSelected' | 'style'
>;

export default class WheelPicker extends React.Component<WheelPickerProps> {
  static defaultProps = {
    style: {
      width: 'auto',
      height: 150,
    },
  };

  onItemSelected = (event: { nativeEvent: { position: number } }) => {
    this.props.onItemSelected?.(event.nativeEvent.position);
  };

  render() {
    const {
      backgroundColor,
      data,
      disabled,
      isCyclic,
      onItemSelected: _onItemSelected,
      style,
      testID,
      ...nativeProps
    } = this.props;
    const normalizedData = data.map(item => String(item));

    return (
      <View
        testID={testID}
        pointerEvents={disabled ? 'none' : 'auto'}
        style={[styles.container, style, backgroundColor ? { backgroundColor } : null]}
      >
        <WheelPickerNativeComponent
          {...nativeProps}
          data={normalizedData}
          isCyclic={normalizedData.length > 2 ? isCyclic : false}
          onChange={this.onItemSelected}
          style={styles.nativeComponent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    overflow: 'hidden',
  },
  nativeComponent: {
    width: '100%',
    height: '100%',
  },
});
