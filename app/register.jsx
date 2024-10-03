import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FloatingLabelInput = ({ label, value, onChangeText, keyboardType }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: (isFocused || value) ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute',
    left: 0,
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0],  
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],  
    }),
    color: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],  
    }),
  };

  return (
    <View style={{ paddingTop: 18 }}>
      <Animated.Text style={labelStyle}>
        {label}
      </Animated.Text>
      <TextInput
        value={value}
        style={styles.input}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType={keyboardType}
        placeholder={isFocused ? '' : label}  
        placeholderTextColor="#aaa"  
      />
    </View>
  );
};

const RegisterScreen = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Register</Text>
        <Text style={styles.subHeaderText}>Create your WHMAS account.</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputRow}>
          <View style={styles.halfInput}>
            <FloatingLabelInput
              label="First name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.halfInput}>
            <FloatingLabelInput
              label="Last name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>

        <FloatingLabelInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <View style={styles.inputRow}>
          <View style={styles.halfInput}>
            <FloatingLabelInput
              label="State"
              value={state}
              onChangeText={setState}
            />
          </View>
          <View style={styles.halfInput}>
            <FloatingLabelInput
              label="City"
              value={city}
              onChangeText={setCity}
            />
          </View>
        </View>

        <FloatingLabelInput
          label="Address"
          value={address}
          onChangeText={setAddress}
        />

        <FloatingLabelInput
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedRole}
            onValueChange={(itemValue) => setSelectedRole(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Role" value="" />
            <Picker.Item label="Waste Buyer" value="Buyer" />
            <Picker.Item label="Waste Seller" value="Seller" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Already have an account? <Text style={styles.linkText}>Sign In</Text></Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#00C853',
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  headerText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  form: {
    marginTop: -40,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    marginHorizontal: 20,
    elevation: 5,
    width: '90%',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
  },
  halfInput: {
    flex: 1,
    paddingRight: 10,
  },
  pickerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#00C853',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
  linkText: {
    color: '#00C853',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
