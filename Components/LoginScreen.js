// Import Dependencies
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Strings from './Strings';
import { CustomText } from './CustomText';

const LoginScreen = props => {
  // React hooks for functional Component
  const navigation = useNavigation();
  const [loginFlow, setLoginFlow] = React.useState(false);
  /**
   * The `yup` Login Form schema
   */
  const loginValidationSchema = Yup.object().shape({
    userName: Yup.string()
      .email('Please enter valid username')
      .required('UserName Address is Required'),
    password: Yup.string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
  });

  const validateLogin = async val => {
    const { fetchLoginDetails, loginState } = props;

    Keyboard.dismiss();
    fetchLoginDetails(val);
    setLoginFlow(true);
  };

  React.useEffect(() => {
    if (props.loginState && loginFlow) {
      setLoginFlow(false);
      navigation.navigate('HomeScreen');
    } else if (loginFlow && props.loginFailed) {
      alert('Invalid Login or Password');
      setLoginFlow(false);
    }
  }, [props]);

  return (
    <View style={styles.mainContainer}>
      <CustomText style={styles.appTitleStyle}>{Strings.appName}</CustomText>
      <View style={styles.formContainerStyle}>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={loginValidationSchema}
          initialValues={{ userName: '', password: '' }}
          onSubmit={(values, { resetForm }) => {
            validateLogin(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            values,
            errors,
            touched,
          }) => (
            <>
              <CustomText style={styles.titleStyle}>
                {Strings.userName}
              </CustomText>

              {/* Input UserName */}
              <TextInput
                style={styles.inputTextStyle}
                maxLength={25}
                name="userName"
                placeholder="please enter UserName"
                placeholderTextColor={'grey'}
                onChangeText={e => {
                  setFieldValue('userName', e);
                  setFieldTouched('userName', false);
                }}
                onBlur={handleBlur('userName')}
                value={values.userName}
                keyboardType="email-address"
              />
              {errors.userName && touched.userName && (
                <CustomText style={styles.errorTextStyle}>
                  {errors.userName}
                </CustomText>
              )}
              <CustomText style={styles.titleStyle}>
                {Strings.password}
              </CustomText>

              {/* Input password */}
              <TextInput
                style={styles.inputTextStyle}
                maxLength={25}
                name="password"
                placeholder="please enter Password"
                placeholderTextColor={'grey'}
                onChangeText={e => {
                  setFieldValue('password', e);
                  setFieldTouched('password', false);
                }}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              {errors.password && touched.password && (
                <CustomText style={styles.errorTextStyle}>
                  {errors.password}
                </CustomText>
              )}

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.buttonStyle}>
                <CustomText style={styles.buttonTextStyle}>
                  {Strings.loginText}
                </CustomText>
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
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  appTitleStyle: { color: 'white', padding: 10, fontSize: 25 },
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
