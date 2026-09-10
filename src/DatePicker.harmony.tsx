import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import moment from 'moment';
import WheelPicker, { WheelPickerStyleProps } from './WheelPicker.harmony';

type Props = WheelPickerStyleProps & {
  initDate?: Date | string;
  onDateSelected?: (date: Date) => void;
  startDate?: Date | string;
  daysCount?: number;
  days?: Array<string | number>;
  format24?: boolean;
  hours?: number[];
  minutes?: Array<number | string>;
  format?: string;
  hideDate?: boolean;
  hideHours?: boolean;
  hideMinutes?: boolean;
  hideAM?: boolean;
  dayLabel?: string;
  hourLabel?: string;
  minuteLabel?: string;
  isCyclic?: boolean;
  style?: StyleProp<ViewStyle>;
};

type State = {
  selectedDate: Date;
  selectedDayIndex: number;
  selectedHourIndex: number;
  selectedMinuteIndex: number;
  selectedPeriodIndex: number;
};

type DayOption = {
  date: Date;
  label: string;
};

const PERIODS = ['AM', 'PM'];
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

function parseDate(value?: Date | string, fallback = new Date()): Date {
  const parsed = value instanceof Date ? new Date(value.getTime()) : new Date(value ?? fallback);
  return Number.isNaN(parsed.getTime()) ? new Date(fallback.getTime()) : parsed;
}

function startOfDay(date: Date): Date {
  const normalized = new Date(date.getTime());
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

function closestIndex(values: number[], target: number): number {
  if (values.length === 0) return 0;

  return values.reduce((bestIndex, value, index) => {
    return Math.abs(value - target) < Math.abs(values[bestIndex] - target)
      ? index
      : bestIndex;
  }, 0);
}

function dateTimestamp(value?: Date | string): number | undefined {
  if (value === undefined) return undefined;
  const parsed = value instanceof Date ? new Date(value.getTime()) : new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  parsed.setSeconds(0, 0);
  return parsed.getTime();
}

function dayTimestamp(value?: Date | string): number | undefined {
  const timestamp = dateTimestamp(value);
  return timestamp === undefined ? undefined : startOfDay(new Date(timestamp)).getTime();
}

function numberArraysEqual(left: number[], right: number[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function stringArraysEqual(left?: Array<string | number>, right?: Array<string | number>): boolean {
  if (left === right) return true;
  if (!left || !right || left.length !== right.length) return false;
  return left.every((value, index) => String(value) === String(right[index]));
}

function statesEqual(left: State, right: State): boolean {
  return left.selectedDate.getTime() === right.selectedDate.getTime()
    && left.selectedDayIndex === right.selectedDayIndex
    && left.selectedHourIndex === right.selectedHourIndex
    && left.selectedMinuteIndex === right.selectedMinuteIndex
    && left.selectedPeriodIndex === right.selectedPeriodIndex;
}

export default class DatePicker extends React.Component<Props, State> {
  static defaultProps = {
    daysCount: 365,
    format: 'ddd MMM D',
    format24: false,
    hideDate: false,
    hideHours: false,
    hideMinutes: false,
    hideAM: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = this.createState(props, parseDate(props.initDate));
  }

  componentDidMount() {
    this.notifyNormalizedDate(this.props.initDate);
  }

  componentDidUpdate(previousProps: Props) {
    const initDateChanged = dateTimestamp(previousProps.initDate) !== dateTimestamp(this.props.initDate);
    const startDateChanged = dayTimestamp(previousProps.startDate) !== dayTimestamp(this.props.startDate);
    const daysChanged = !stringArraysEqual(previousProps.days, this.props.days);
    const hoursChanged = !numberArraysEqual(this.getHours(previousProps), this.getHours(this.props));
    const minutesChanged = !numberArraysEqual(this.getMinutes(previousProps), this.getMinutes(this.props));
    const configurationChanged = startDateChanged
      || previousProps.daysCount !== this.props.daysCount
      || daysChanged
      || previousProps.format24 !== this.props.format24
      || hoursChanged
      || minutesChanged;

    if (!initDateChanged && !configurationChanged) return;

    const sourceDate = initDateChanged
      ? parseDate(this.props.initDate)
      : new Date(this.state.selectedDate.getTime());
    const nextState = this.createState(this.props, sourceDate);
    const normalized = dateTimestamp(nextState.selectedDate) !== dateTimestamp(sourceDate);

    if (!statesEqual(this.state, nextState)) {
      this.setState(nextState, normalized ? this.notifyDateChange : undefined);
    } else if (normalized) {
      this.notifyDateChange();
    }
  }

  createState = (props: Props, sourceDate: Date): State => {
    const selectedDate = new Date(sourceDate.getTime());
    const dayOptions = this.getDayOptions(props);
    const hours = this.getHours(props);
    const minutes = this.getMinutes(props);
    const selectedDay = startOfDay(selectedDate).getTime();
    const matchingDayIndex = dayOptions.findIndex(option => startOfDay(option.date).getTime() === selectedDay);
    const selectedDayIndex = matchingDayIndex >= 0 ? matchingDayIndex : 0;
    const hour = selectedDate.getHours();
    const selectedPeriodIndex = hour >= 12 ? 1 : 0;
    const displayHour = props.format24 ? hour : hour % 12 || 12;
    const selectedHourIndex = closestIndex(hours, displayHour);
    const selectedMinuteIndex = closestIndex(minutes, selectedDate.getMinutes());
    const selectedDayOption = dayOptions[selectedDayIndex];
    const selectedHour = hours[selectedHourIndex];
    const selectedMinute = minutes[selectedMinuteIndex];

    if (selectedDayOption) {
      selectedDate.setFullYear(
        selectedDayOption.date.getFullYear(),
        selectedDayOption.date.getMonth(),
        selectedDayOption.date.getDate(),
      );
    }
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
      selectedDayIndex,
      selectedHourIndex,
      selectedMinuteIndex,
      selectedPeriodIndex,
    };
  };

  getDayOptions = (props: Props = this.props): DayOption[] => {
    const baseDate = startOfDay(parseDate(props.startDate));
    const format = props.format || 'ddd MMM D';
    const today = startOfDay(new Date()).getTime();

    if (props.days?.length) {
      return props.days.map((item, index) => {
        const parsedDate = parseDate(String(item), new Date(baseDate.getTime() + index * DAY_IN_MILLISECONDS));
        return {
          date: parsedDate,
          label: String(item),
        };
      });
    }

    const requestedCount = props.daysCount ?? 365;
    const count = requestedCount > 0 ? requestedCount : 365;

    return Array.from({ length: count }, (_, index) => {
      const date = new Date(baseDate.getTime() + index * DAY_IN_MILLISECONDS);
      const label = startOfDay(date).getTime() === today
        ? 'Today'
        : moment(date).format(format);
      return {
        date,
        label: props.dayLabel ? `${label} ${props.dayLabel}` : label,
      };
    });
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

  notifyNormalizedDate = (source?: Date | string) => {
    const sourceTimestamp = dateTimestamp(source);
    const normalizedTimestamp = dateTimestamp(this.state.selectedDate);
    if (sourceTimestamp !== undefined && sourceTimestamp !== normalizedTimestamp) {
      this.notifyDateChange();
    }
  };

  notifyDateChange = () => {
    this.props.onDateSelected?.(new Date(this.state.selectedDate.getTime()));
  };

  onDaySelected = (position: number) => {
    if (position === this.state.selectedDayIndex) return;
    const option = this.getDayOptions()[position];
    if (!option) return;

    this.setState(previousState => {
      const selectedDate = new Date(option.date.getTime());
      selectedDate.setHours(
        previousState.selectedDate.getHours(),
        previousState.selectedDate.getMinutes(),
        0,
        0,
      );
      return {
        ...previousState,
        selectedDate,
        selectedDayIndex: position,
      };
    }, this.notifyDateChange);
  };

  onHourSelected = (position: number) => {
    if (position === this.state.selectedHourIndex) return;

    const selectedHour = this.getHours()[position];
    if (selectedHour === undefined) return;

    this.setState(previousState => {
      const selectedDate = new Date(previousState.selectedDate.getTime());
      let hour = selectedHour;
      if (!this.props.format24) {
        hour = selectedHour % 12 + (previousState.selectedPeriodIndex === 1 ? 12 : 0);
      }
      selectedDate.setHours(hour);
      return {
        ...previousState,
        selectedDate,
        selectedHourIndex: position,
      };
    }, this.notifyDateChange);
  };

  onMinuteSelected = (position: number) => {
    if (position === this.state.selectedMinuteIndex) return;

    const selectedMinute = this.getMinutes()[position];
    if (selectedMinute === undefined) return;

    this.setState(previousState => {
      const selectedDate = new Date(previousState.selectedDate.getTime());
      selectedDate.setMinutes(selectedMinute, 0, 0);
      return {
        ...previousState,
        selectedDate,
        selectedMinuteIndex: position,
      };
    }, this.notifyDateChange);
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
    }, this.notifyDateChange);
  };

  render() {
    const {
      backgroundColor,
      dayLabel: _dayLabel,
      days: _days,
      daysCount: _daysCount,
      format: _format,
      format24,
      hideAM,
      hideDate,
      hideHours,
      hideMinutes,
      hourLabel,
      hours: _hours,
      initDate: _initDate,
      minuteLabel,
      minutes: _minutes,
      onDateSelected: _onDateSelected,
      startDate: _startDate,
      isCyclic = false,
      style,
      ...pickerProps
    } = this.props;
    const dayOptions = this.getDayOptions();
    const hours = this.getHours();
    const minutes = this.getMinutes();
    const {
      selectedDayIndex,
      selectedHourIndex,
      selectedMinuteIndex,
      selectedPeriodIndex,
    } = this.state;

    return (
      <View style={[styles.container, style, backgroundColor ? { backgroundColor } : null]}>
        {!hideDate && (
          <WheelPicker
            {...pickerProps}
            data={dayOptions.map(option => option.label)}
            initPosition={selectedDayIndex}
            onItemSelected={this.onDaySelected}
            isCyclic={isCyclic}
            style={styles.dateColumn}
          />
        )}
        {!hideHours && (
          <WheelPicker
            {...pickerProps}
            data={hours.map(hour => `${hour.toString().padStart(2, '0')}${hourLabel ? ` ${hourLabel}` : ''}`)}
            initPosition={selectedHourIndex}
            onItemSelected={this.onHourSelected}
            isCyclic
            style={styles.timeColumn}
          />
        )}
        {!hideMinutes && (
          <WheelPicker
            {...pickerProps}
            data={minutes.map(minute => `${minute.toString().padStart(2, '0')}${minuteLabel ? ` ${minuteLabel}` : ''}`)}
            initPosition={selectedMinuteIndex}
            onItemSelected={this.onMinuteSelected}
            isCyclic
            style={styles.timeColumn}
          />
        )}
        {!format24 && !hideAM && (
          <WheelPicker
            {...pickerProps}
            data={PERIODS}
            selectedItem={selectedPeriodIndex}
            initPosition={selectedPeriodIndex}
            onItemSelected={this.onPeriodSelected}
            isCyclic={false}
            style={styles.timeColumn}
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
  dateColumn: {
    flex: 2,
    height: '100%',
    minWidth: 1,
  },
  timeColumn: {
    flex: 1,
    height: '100%',
    minWidth: 1,
  },
});
