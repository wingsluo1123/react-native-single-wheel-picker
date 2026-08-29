import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import WheelPicker, { WheelPickerStyleProps } from './WheelPicker.harmony';

type Props = WheelPickerStyleProps & {
  initDate?: Date | string;
  onTimeSelected?: (date: Date) => void;
  hours?: number[];
  minutes?: Array<number | string>;
  format24?: boolean;
  startTime?: string;
  endTime?: string;
  style?: StyleProp<ViewStyle>;
};

type State = {
  selectedDate: Date;
  selectedHourIndex: number;
  selectedMinuteIndex: number;
  selectedPeriodIndex: number;
};

const PERIODS = ['AM', 'PM'];

function parseDate(value?: Date | string): Date {
  const parsed = value instanceof Date ? new Date(value.getTime()) : new Date(value ?? Date.now());
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function dateTimestamp(value?: Date | string): number | undefined {
  if (value === undefined) return undefined;
  const parsed = value instanceof Date ? new Date(value.getTime()) : new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  parsed.setSeconds(0, 0);
  return parsed.getTime();
}

function closestIndex(values: number[], target: number): number {
  if (values.length === 0) return 0;

  return values.reduce((bestIndex, value, index) => {
    return Math.abs(value - target) < Math.abs(values[bestIndex] - target)
      ? index
      : bestIndex;
  }, 0);
}

function numberArraysEqual(left: number[], right: number[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function statesEqual(left: State, right: State): boolean {
  return left.selectedDate.getTime() === right.selectedDate.getTime()
    && left.selectedHourIndex === right.selectedHourIndex
    && left.selectedMinuteIndex === right.selectedMinuteIndex
    && left.selectedPeriodIndex === right.selectedPeriodIndex;
}

export default class TimePicker extends React.Component<Props, State> {
  static defaultProps = {
    format24: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = this.createState(props, parseDate(props.initDate));
  }

  componentDidMount() {
    this.notifyNormalizedTime(this.props.initDate);
  }

  componentDidUpdate(previousProps: Props) {
    const initDateChanged = dateTimestamp(previousProps.initDate) !== dateTimestamp(this.props.initDate);
    const formatChanged = previousProps.format24 !== this.props.format24;
    const hoursChanged = !numberArraysEqual(this.getHours(previousProps), this.getHours(this.props));
    const minutesChanged = !numberArraysEqual(this.getMinutes(previousProps), this.getMinutes(this.props));

    if (!initDateChanged && !formatChanged && !hoursChanged && !minutesChanged) return;

    const sourceDate = initDateChanged
      ? parseDate(this.props.initDate)
      : new Date(this.state.selectedDate.getTime());
    const nextState = this.createState(this.props, sourceDate);
    const normalized = dateTimestamp(nextState.selectedDate) !== dateTimestamp(sourceDate);

    if (!statesEqual(this.state, nextState)) {
      this.setState(nextState, normalized ? this.notifyTimeChange : undefined);
    } else if (normalized) {
      this.notifyTimeChange();
    }
  }

  createState = (props: Props, sourceDate: Date): State => {
    const selectedDate = new Date(sourceDate.getTime());
    const hours = this.getHours(props);
    const minutes = this.getMinutes(props);
    const sourceHour = selectedDate.getHours();
    const selectedPeriodIndex = sourceHour >= 12 ? 1 : 0;
    const displayHour = props.format24 ? sourceHour : sourceHour % 12 || 12;
    const selectedHourIndex = closestIndex(hours, displayHour);
    const selectedMinuteIndex = closestIndex(minutes, selectedDate.getMinutes());
    const selectedHour = hours[selectedHourIndex];
    const selectedMinute = minutes[selectedMinuteIndex];

    if (selectedHour !== undefined) {
      const normalizedHour = props.format24
        ? selectedHour
        : selectedHour % 12 + (selectedPeriodIndex === 1 ? 12 : 0);
      selectedDate.setHours(normalizedHour);
    }
    if (selectedMinute !== undefined) {
      selectedDate.setMinutes(selectedMinute, 0, 0);
    }

    return {
      selectedDate,
      selectedHourIndex,
      selectedMinuteIndex,
      selectedPeriodIndex,
    };
  };

  getHours = (props: Props = this.props): number[] => {
    if (props.hours?.length) return props.hours;
    return props.format24
      ? Array.from({ length: 24 }, (_, index) => index)
      : Array.from({ length: 12 }, (_, index) => index + 1);
  };

  getMinutes = (props: Props = this.props): number[] => {
    if (props.minutes?.length) {
      return props.minutes.map(value => Number(value)).filter(value => Number.isFinite(value));
    }
    return Array.from({ length: 12 }, (_, index) => index * 5);
  };

  notifyNormalizedTime = (source?: Date | string) => {
    const sourceTimestamp = dateTimestamp(source);
    const normalizedTimestamp = dateTimestamp(this.state.selectedDate);
    if (sourceTimestamp !== undefined && sourceTimestamp !== normalizedTimestamp) {
      this.notifyTimeChange();
    }
  };

  notifyTimeChange = () => {
    this.props.onTimeSelected?.(new Date(this.state.selectedDate.getTime()));
  };

  onHourSelected = (position: number) => {
    if (position === this.state.selectedHourIndex) return;

    const hours = this.getHours();
    const selectedHour = hours[position];
    if (selectedHour === undefined) return;

    this.setState(previousState => {
      const selectedDate = new Date(previousState.selectedDate.getTime());
      const hour = this.props.format24
        ? selectedHour
        : selectedHour % 12 + (previousState.selectedPeriodIndex === 1 ? 12 : 0);
      selectedDate.setHours(hour);

      return {
        ...previousState,
        selectedDate,
        selectedHourIndex: position,
      };
    }, this.notifyTimeChange);
  };

  onMinuteSelected = (position: number) => {
    if (position === this.state.selectedMinuteIndex) return;

    const minutes = this.getMinutes();
    const selectedMinute = minutes[position];
    if (selectedMinute === undefined) return;

    this.setState(previousState => {
      const selectedDate = new Date(previousState.selectedDate.getTime());
      selectedDate.setMinutes(selectedMinute, 0, 0);

      return {
        ...previousState,
        selectedDate,
        selectedMinuteIndex: position,
      };
    }, this.notifyTimeChange);
  };

  onPeriodSelected = (position: number) => {
    if (position < 0 || position >= PERIODS.length || position === this.state.selectedPeriodIndex) return;

    this.setState(previousState => {
      const selectedDate = new Date(previousState.selectedDate.getTime());
      const twelveHour = selectedDate.getHours() % 12;
      selectedDate.setHours(twelveHour + (position === 1 ? 12 : 0));

      return {
        ...previousState,
        selectedDate,
        selectedPeriodIndex: position,
      };
    }, this.notifyTimeChange);
  };

  render() {
    const {
      endTime: _endTime,
      format24,
      hours: _hours,
      initDate: _initDate,
      minutes: _minutes,
      onTimeSelected: _onTimeSelected,
      startTime: _startTime,
      style,
      ...pickerProps
    } = this.props;
    const hours = this.getHours();
    const minutes = this.getMinutes();
    const { selectedHourIndex, selectedMinuteIndex, selectedPeriodIndex } = this.state;

    return (
      <View style={[styles.container, style]}>
        <WheelPicker
          {...pickerProps}
          data={hours.map(hour => hour.toString().padStart(2, '0'))}
          selectedItem={selectedHourIndex}
          initPosition={selectedHourIndex}
          onItemSelected={this.onHourSelected}
          isCyclic
          style={styles.column}
        />
        <WheelPicker
          {...pickerProps}
          data={minutes.map(minute => minute.toString().padStart(2, '0'))}
          selectedItem={selectedMinuteIndex}
          initPosition={selectedMinuteIndex}
          onItemSelected={this.onMinuteSelected}
          isCyclic
          style={styles.column}
        />
        {!format24 && (
          <WheelPicker
            {...pickerProps}
            data={PERIODS}
            selectedItem={selectedPeriodIndex}
            initPosition={selectedPeriodIndex}
            onItemSelected={this.onPeriodSelected}
            isCyclic={false}
            style={styles.column}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  column: {
    flex: 1,
    height: '100%',
    minWidth: 1,
  },
});
