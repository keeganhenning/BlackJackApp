import React, { useState } from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';

const CustomSlider = ({ min, max, step, onValueChange }) => {
  const [sliderValue, setSliderValue] = useState(min);

  const onSliderValueChange = (value) => {
    setSliderValue(value);
    onValueChange(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Slider Value: {sliderValue}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  slider: {
    width: 300,
  },
});

export default CustomSlider;