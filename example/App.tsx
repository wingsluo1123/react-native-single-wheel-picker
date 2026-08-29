/**
 * React Native Wheel Picker Example for HarmonyOS
 * 完整测试所有 WheelPicker Props 和事件
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
// @ts-ignore - Type definitions may have issues in the compiled package
import {WheelPicker, TimePicker, DatePicker} from 'react-native-wheel-picker-android';
import moment from 'moment';

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const fruits = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry', 'Fig', 'Grape'];
const numbers = Array.from({length: 20}, (_, i) => i + 1);
const fullMinutes = Array.from({length: 60}, (_, minute) =>
  minute.toString().padStart(2, '0'),
);

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  // WheelPicker - Basic
  const [selectedWeekday, setSelectedWeekday] = useState(0);
  const [selectedCyclicFruit, setSelectedCyclicFruit] = useState(0);
  const [selectedItemStyleFruit, setSelectedItemStyleFruit] = useState(0);
  const [itemStyleFruit, setItemStyleFruit] = useState(0);
  const [selectedIndicatorNumber, setSelectedIndicatorNumber] = useState(0);
  const [selectedEventNumber, setSelectedEventNumber] = useState(0);

  // WheelPicker - Style Props
  const [showStyledPicker, setShowStyledPicker] = useState(true);
  const [selectedItemColor, setSelectedItemColor] = useState('#0066CC');
  const [selectedItemSize, setSelectedItemSize] = useState(20);
  const [itemColor, setItemColor] = useState('#999999');
  const [itemSize, setItemSize] = useState(16);
  const [indicatorColor, setIndicatorColor] = useState('#0066CC');
  const [indicatorWidth, setIndicatorWidth] = useState(2);
  const [hideIndicator, setHideIndicator] = useState(false);
  const [isCyclic, setIsCyclic] = useState(true);

  // TimePicker
  const [time, setTime] = useState(new Date());
  const [format24, setFormat24] = useState(false);

  // DatePicker
  const [date, setDate] = useState(new Date());

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? '#222' : '#F3F3F3',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>React Native Wheel Picker</Text>

          {/* Section 1: Basic WheelPicker - data & selectedItem */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Basic WheelPicker (data & selectedItem)</Text>
            <Text testID="test-weekday-result" style={styles.result}>
              Selected: {weekdays[selectedWeekday]} (index: {selectedWeekday})
            </Text>
            <WheelPicker
              data={weekdays}
              selectedItem={selectedWeekday}
              onItemSelected={(index: number) => {
                console.log('Weekday selected:', index);
                setSelectedWeekday(index);
              }}
              style={styles.picker}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                testID="test-select-sunday-btn"
                style={styles.button}
                onPress={() => setSelectedWeekday(0)}>
                <Text style={styles.buttonText}>Sunday</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="test-select-wednesday-btn"
                style={styles.button}
                onPress={() => setSelectedWeekday(3)}>
                <Text style={styles.buttonText}>Wednesday</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="test-select-saturday-btn"
                style={styles.button}
                onPress={() => setSelectedWeekday(6)}>
                <Text style={styles.buttonText}>Saturday</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section 2: isCyclic */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Cyclic Mode (isCyclic)</Text>
            <Text testID="test-cyclic-status" style={styles.result}>
              Cyclic: {isCyclic ? 'ON' : 'OFF'} | Selected: {fruits[selectedCyclicFruit]}
            </Text>
            <WheelPicker
              data={fruits}
              selectedItem={selectedCyclicFruit}
              onItemSelected={(index: number) => setSelectedCyclicFruit(index)}
              isCyclic={isCyclic}
              style={styles.picker}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                testID="test-enable-cyclic-btn"
                style={styles.button}
                onPress={() => setIsCyclic(true)}>
                <Text style={styles.buttonText}>Enable Cyclic</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="test-disable-cyclic-btn"
                style={styles.button}
                onPress={() => setIsCyclic(false)}>
                <Text style={styles.buttonText}>Disable Cyclic</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section 3: Selected Item Text Style */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Selected Item Text Style</Text>
            <Text testID="test-selected-style-result" style={styles.result}>
              Color: {selectedItemColor} | Size: {selectedItemSize}
            </Text>
            <WheelPicker
              data={fruits}
              selectedItem={selectedItemStyleFruit}
              onItemSelected={(index: number) => setSelectedItemStyleFruit(index)}
              selectedItemTextColor={selectedItemColor}
              selectedItemTextSize={selectedItemSize}
              selectedItemTextFontFamily="sans-serif-medium"
              style={styles.picker}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                testID="test-set-selected-color-red-btn"
                style={styles.button}
                onPress={() => setSelectedItemColor('#FF0000')}>
                <Text style={styles.buttonText}>Red</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="test-set-selected-color-blue-btn"
                style={styles.button}
                onPress={() => setSelectedItemColor('#0066CC')}>
                <Text style={styles.buttonText}>Blue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="test-set-selected-size-24-btn"
                style={styles.button}
                onPress={() => setSelectedItemSize(24)}>
                <Text style={styles.buttonText}>Size 24</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="test-set-selected-size-16-btn"
                style={styles.button}
                onPress={() => setSelectedItemSize(16)}>
                <Text style={styles.buttonText}>Size 16</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section 4: Item Text Style */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Item Text Style</Text>
            <Text testID="test-item-style-result" style={styles.result}>
              Item Color: {itemColor} | Item Size: {itemSize}
            </Text>
            <WheelPicker
              data={fruits}
              selectedItem={itemStyleFruit}
              onItemSelected={(index: number) => setItemStyleFruit(index)}
              itemTextColor={itemColor}
              itemTextSize={itemSize}
              itemTextFontFamily="sans-serif"
              selectedItemTextColor={selectedItemColor}
              selectedItemTextSize={selectedItemSize}
              style={styles.picker}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                testID="test-set-item-color-gray-btn"
                style={styles.button}
                onPress={() => setItemColor('#999999')}>
                <Text style={styles.buttonText}>Gray</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="test-set-item-color-lightblue-btn"
                style={styles.button}
                onPress={() => setItemColor('#AACCFF')}>
                <Text style={styles.buttonText}>Light Blue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="test-set-item-size-14-btn"
                style={styles.button}
                onPress={() => setItemSize(14)}>
                <Text style={styles.buttonText}>Size 14</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="test-set-item-size-18-btn"
                style={styles.button}
                onPress={() => setItemSize(18)}>
                <Text style={styles.buttonText}>Size 18</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section 5: Indicator Style */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Indicator Style</Text>
            <Text testID="test-indicator-result" style={styles.result}>
              Indicator: {hideIndicator ? 'Hidden' : 'Visible'} | Color: {indicatorColor} | Width: {indicatorWidth}
            </Text>
            <WheelPicker
              data={numbers.map(n => n.toString())}
              selectedItem={selectedIndicatorNumber}
              onItemSelected={(index: number) => setSelectedIndicatorNumber(index)}
              indicatorColor={indicatorColor}
              indicatorWidth={indicatorWidth}
              hideIndicator={hideIndicator}
              style={styles.picker}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                testID="test-hide-indicator-btn"
                style={styles.button}
                onPress={() => setHideIndicator(true)}>
                <Text style={styles.buttonText}>Hide</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="test-show-indicator-btn"
                style={styles.button}
                onPress={() => setHideIndicator(false)}>
                <Text style={styles.buttonText}>Show</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="test-set-indicator-color-green-btn"
                style={styles.button}
                onPress={() => setIndicatorColor('#00CC66')}>
                <Text style={styles.buttonText}>Green</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="test-set-indicator-width-4-btn"
                style={styles.button}
                onPress={() => setIndicatorWidth(4)}>
                <Text style={styles.buttonText}>Width 4</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section 6: initPosition */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. initPosition Test</Text>
            <Text testID="test-initposition-result" style={styles.result}>
              Re-render to test initPosition
            </Text>
            {showStyledPicker && (
              <WheelPicker
                data={weekdays}
                initPosition={3}
                onItemSelected={(index: number) => {
                  console.log('initPosition test - selected:', index);
                }}
                style={styles.picker}
              />
            )}
            <TouchableOpacity
              testID="test-toggle-initposition-btn"
              style={styles.button}
              onPress={() => setShowStyledPicker(!showStyledPicker)}>
              <Text style={styles.buttonText}>
                {showStyledPicker ? 'Hide' : 'Show'} (initPosition=3)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Section 7: onChange Event */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. onChange Event Test</Text>
            <Text testID="test-onchange-result" style={styles.result}>
              Selected: Item {numbers[selectedEventNumber]}
            </Text>
            <WheelPicker
              data={numbers.map(n => `Item ${n}`)}
              selectedItem={selectedEventNumber}
              onItemSelected={(index: number) => {
                console.log('onChange fired, position:', index);
                setSelectedEventNumber(index);
              }}
              style={styles.picker}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                testID="test-trigger-onchange-5-btn"
                style={styles.button}
                onPress={() => setSelectedEventNumber(4)}>
                <Text style={styles.buttonText}>Trigger Item 5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="test-trigger-onchange-10-btn"
                style={styles.button}
                onPress={() => setSelectedEventNumber(9)}>
                <Text style={styles.buttonText}>Trigger Item 10</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section 8: TimePicker */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Time Picker</Text>
            <Text testID="test-time-result" style={styles.result}>
              Selected Time: {moment(time).format(format24 ? 'HH:mm' : 'hh:mm A')}
            </Text>
            <TimePicker
              initDate={time}
              format24={format24}
              minutes={fullMinutes}
              onTimeSelected={(selectedTime: Date) => {
                setTime(selectedTime);
                console.log('Time selected:', selectedTime);
              }}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                testID="test-set-time-noon-btn"
                style={styles.button}
                onPress={() => {
                  const noon = new Date();
                  noon.setHours(12, 0, 0, 0);
                  setTime(noon);
                }}>
                <Text style={styles.buttonText}>12:00 PM</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="test-toggle-format24-btn"
                style={styles.button}
                onPress={() => setFormat24(!format24)}>
                <Text style={styles.buttonText}>
                  {format24 ? '12H' : '24H'} Format
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section 9: DatePicker */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. Date Picker</Text>
            <Text testID="test-date-result" style={styles.result}>
              Selected Date: {moment(date).format('YYYY-MM-DD HH:mm')}
            </Text>
            <DatePicker
              initDate={date.toISOString()}
              startDate={new Date().toISOString()}
              daysCount={30}
              minutes={fullMinutes}
              onDateSelected={(selectedDate: Date) => {
                setDate(selectedDate);
                console.log('Date selected:', selectedDate);
              }}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                testID="test-set-date-today-btn"
                style={styles.button}
                onPress={() => setDate(new Date())}>
                <Text style={styles.buttonText}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="test-set-date-tomorrow-btn"
                style={styles.button}
                onPress={() => {
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  setDate(tomorrow);
                }}>
                <Text style={styles.buttonText}>Tomorrow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  result: {
    fontSize: 16,
    marginBottom: 10,
    color: '#0066CC',
    fontWeight: '500',
  },
  picker: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginVertical: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default App;
