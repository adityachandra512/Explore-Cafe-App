import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios'; // Import Axios for HTTP requests

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const fullNameRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSignUp = async () => {
    if (!email || !password || !fullName || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      // Send POST request to your JSON server API endpoint
      const response = await axios.post('http://your-json-server-url/signup', {
        full_name: fullName,
        email,
        password,
      });

      if (response.status === 201) {
        Alert.alert(
          'Success',
          'Registration successful. Please check your email for verification.',
          [{ text: 'OK', onPress: () => navigation.navigate('SignIn') }]
        );
      }
    } catch (error) {
      Alert.alert('Error', error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider) => {
    try {
      // Call your social sign-up API
      const response = await axios.post('http://your-json-server-url/social-signup', {
        provider,
      });
      if (response.status === 200) {
        Alert.alert('Success', 'Social sign-up successful.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const InputWithIcon = ({
    icon,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    inputRef,
    onSubmitEditing,
  }) => (
    <View
      style={[
        styles.inputWrapper,
        focusedInput === placeholder && styles.inputWrapperFocused,
      ]}
    >
      {icon}
      <TextInput
        style={styles.inputWithIcon}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#666"
        autoCapitalize="none"
        keyboardType={
          placeholder.toLowerCase().includes('email') ? 'email-address' : 'default'
        }
        ref={inputRef}
        onFocus={() => setFocusedInput(placeholder)}
        onBlur={() => setFocusedInput(null)}
        returnKeyType="next"
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <Text style={styles.logo}>Explor Cafe</Text>
          <Text style={styles.title}>Sign Up</Text>

          <View style={styles.inputContainer}>
            <InputWithIcon
              icon={<MaterialIcons name="person-outline" size={20} color="#666" />}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              inputRef={fullNameRef}
              onSubmitEditing={() => emailRef.current.focus()}
            />

            <InputWithIcon
              icon={<MaterialIcons name="mail-outline" size={20} color="#666" />}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              inputRef={emailRef}
              onSubmitEditing={() => passwordRef.current.focus()}
            />

            <InputWithIcon
              icon={<MaterialIcons name="lock-outline" size={20} color="#666" />}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              inputRef={passwordRef}
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
            />

            <InputWithIcon
              icon={<MaterialIcons name="lock-outline" size={20} color="#666" />}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              inputRef={confirmPasswordRef}
              onSubmitEditing={handleSignUp}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialSignUp('google')}
            >
              <FontAwesome5 name="google" size={20} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialSignUp('facebook')}
            >
              <FontAwesome5 name="facebook" size={20} color="#4267B2" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialSignUp('apple')}
            >
              <FontAwesome5 name="apple" size={20} color="#000000" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.switchTextContainer}
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={styles.switchText}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F0FF',
  },
  scrollContainer: {
    flexGrow: 1,
    minHeight: '100%',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 24,
    color: '#8B3DFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B3DFF',
    marginBottom: 30,
  },
  inputContainer: {
    gap: 15,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  inputWrapperFocused: {
    borderBottomColor: '#8B3DFF',
  },
  inputWithIcon: {
    flex: 1,
    height: 50,
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
    padding: 0,
  },
  button: {
    backgroundColor: '#8B3DFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D1D1',
  },
  dividerText: {
    color: '#666',
    paddingHorizontal: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  switchTextContainer: {
    paddingVertical: 10,
  },
  switchText: {
    fontSize: 16,
    color: '#8B3DFF',
    textAlign: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#C1A2E3',
  },
});

export default SignUpScreen;
