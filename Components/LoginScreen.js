// Import Dependencies
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Strings from './Strings';

const LoginScreen = () => {
  /**
   * The `yup` Login Form schema
   */
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: Yup.string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.appTitleStyle}>{Strings.appName}</Text>
      <View style={styles.formContainerStyle}>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={loginValidationSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={values => {
            navigation.navigate('HomeScreen');
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <Text style={styles.titleStyle}>{Strings.userName}</Text>

              {/* Input UserName */}
              <TextInput
                style={styles.inputTextStyle}
                maxLength={25}
                name="email"
                placeholder="Email Address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <Text style={styles.errorTextStyle}>{errors.email}</Text>
              )}
              <Text style={styles.titleStyle}>{Strings.password}</Text>

              {/* Input password */}
              <TextInput
                style={styles.inputTextStyle}
                maxLength={25}
                name="password"
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              {errors.password && touched.password && (
                <Text style={styles.errorTextStyle}>{errors.password}</Text>
              )}

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>{Strings.loginText}</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  appTitleStyle: { color: 'black', padding: 10, fontSize: 25 },
  titleStyle: { paddingTop: 5, paddingBottom: 5, color: 'black' },
  inputTextStyle: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
  },
  buttonStyle: {
    backgroundColor: '#0077b6',
    width: '40%',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10,
    borderRadius: 30,
    padding: 5,
    marginTop: 30,
  },
  buttonTextStyle: { padding: 5, color: 'white' },
  errorTextStyle: { fontSize: 12, color: 'red', paddingTop: 5 },
  formContainerStyle: {
    justifyContent: 'center',
    padding: 15,
    elevation: 5,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 5,
  },
});
