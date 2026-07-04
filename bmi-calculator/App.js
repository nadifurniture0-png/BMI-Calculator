import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';

export default function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [color, setColor] = useState('black');

  // ඔයා ලබාදුන්න නියොන් ලෝගෝ ලින්ක් එක මෙතනට ඇතුළත් කර ඇත
  const appIconUrl = 'https://i.postimg.cc/N04fgKTg/file-000000004ae87207adf970f8adcff5b2.png'; 

  const calculateBMI = () => {
    // බර හෝ උස ඇතුළත් කර නොමැති නම් ගණනය කිරීම නවත්වන්න
    if (!weight || !height) return;

    // උස මීටර් වලින් සහ බර කිලෝග්‍රෑම් වලින්
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);

    // BMI ගණනය කිරීම
    const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    // BMI අගය අනුව සෞඛ්‍ය තත්ත්වය තීරණය කිරීම
    if (bmiValue < 18.5) {
      setStatus('Underweight (අඩු බර)');
      setColor('#3498db'); // නිල් පාට
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setStatus('Normal Weight (සාමාන්‍ය බර)');
      setColor('#2ecc71'); // කොළ පාට
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setStatus('Overweight (වැඩි බර)');
      setColor('#f39c12'); // තැඹිලි පාට
    } else {
      setStatus('Obesity (තරබාරු)');
      setColor('#e74c3c'); // රතු පාට
    }
    
    // කීබෝඩ් එක ඉවත් කිරීම
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        
        {/* ඔයාගේ අලුත් නියොන් ලෝගෝව මෙතනින් පෙන්වයි */}
        <Image 
          source={{ uri: appIconUrl }} 
          style={styles.logo} 
          resizeMode="contain" 
        />
        
        <Text style={styles.headerTitle}>BMI Calculator</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Weight (kg) / බර:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            placeholder="Enter weight e.g. 70"
          />

          <Text style={styles.label}>Height (cm) / උස:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            placeholder="Enter height e.g. 175"
          />

          <TouchableOpacity style={styles.button} onPress={calculateBMI}>
            <Text style={styles.buttonText}>Calculate BMI</Text>
          </TouchableOpacity>
        </View>

        {bmi && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Your BMI Score:</Text>
            <Text style={styles.bmiValue}>{bmi}</Text>
            <Text style={[styles.statusText, { color: color }]}>{status}</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 10,
    borderRadius: 20, // ලෝගෝ එකේ වටකුරු හැඩය සඳහා
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Android හිරවීම් නැතිව shadow පෙන්වීමට
  },
  label: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '85%',
    elevation: 3,
  },
  resultLabel: {
    fontSize: 18,
    color: '#7f8c8d',
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 10,
  },
  statusText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});