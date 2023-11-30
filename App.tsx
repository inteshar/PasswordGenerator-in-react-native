import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';

// Form validation
import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
const PasswordSchema = Yup.object().shape({
  PassLength: Yup.number()
    .min(4, 'Should not be less than 4 characters.')
    .max(16, 'Maximum of 16 characters allowed')
    .required('Length is required'),
});

const App = () => {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasword = (PassLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const symbolsChars = '!@#$%^&*()_+';
    const numbersChars = '0123456789';
    if (uppercase) {
      characterList += upperCaseChars;
    }
    if (lowercase) {
      characterList += lowerCaseChars;
    }
    if (symbols) {
      characterList += symbolsChars;
    }
    if (numbers) {
      characterList += numbersChars;
    }

    const passwordResult = createPassword(characterList, PassLength);

    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters: string, PassLength: number) => {
    let result = '';
    for (let i = 0; i < PassLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setUppercase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <Text style={styles.headingText}>Password Generator</Text>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{PassLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log(values);
              generatePasword(+values.PassLength);
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.PassLength && errors.PassLength && (
                      <Text style={styles.errorText}>{errors.PassLength}</Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.PassLength}
                    onChangeText={handleChange('PassLength')}
                    placeholder="eg. 5"
                    keyboardType="numeric"
                    maxLength={2}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowercase}
                    onPress={() => setLowercase(!lowercase)}
                    fillColor="#4490c1"
                  />
                  <View>
                    <Text style={styles.heading}>Include lowercase</Text>
                    <Text
                      style={[
                        styles.passHint,
                        {textAlign: 'left', marginTop: 0},
                      ]}>
                      abcdefghijklmnopqrstuvwxyz
                    </Text>
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={uppercase}
                    onPress={() => setUppercase(!uppercase)}
                    fillColor="#4490c1"
                  />
                  <View>
                    <Text style={styles.heading}>Include Uppercase</Text>
                    <Text
                      style={[
                        styles.passHint,
                        {textAlign: 'left', marginTop: 0},
                      ]}>
                      ABCDEFGHIJKLMNOPQRSTUVWXYZ
                    </Text>
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#4490c1"
                  />
                  <View>
                    <Text style={styles.heading}>Include Symbols</Text>
                    <Text
                      style={[
                        styles.passHint,
                        {textAlign: 'left', marginTop: 0},
                      ]}>
                      !@#$%^&*()_+
                    </Text>
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#4490c1"
                  />
                  <View>
                    <Text style={styles.heading}>Include Numbers</Text>
                    <Text
                      style={[
                        styles.passHint,
                        {textAlign: 'left', marginTop: 0},
                      ]}>
                      0123456789
                    </Text>
                  </View>
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}>
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.resetBtn}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>
                    <Text style={styles.resetBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPasswordGenerated ? (
          <View style={styles.generatedPassArea}>
            <Text style={styles.passTitle}>
              Below is your generated Password
            </Text>
            <Text style={styles.passHint}>Long press the password to copy</Text>
            <Text selectable style={styles.generatedPass}>
              {password}
            </Text>
          </View>
        ) : (
          <View style={styles.generatedPassArea}>
            <Text style={{color: '#000', textAlign: 'center'}}>
              Generate a password first to see the result here
            </Text>
          </View>
        )}
      </SafeAreaView>
      <Text style={{textAlign: 'center', fontSize: 11}}>
        Developed by <Text style={{fontWeight: 'bold'}}>MrXiwlev</Text>
      </Text>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 22,
    color: '#03A9F4',
    marginBottom: 20,
    fontWeight: 'bold',
    borderLeftWidth: 3,
    paddingLeft: 12,
  },
  appContainer: {
    padding: 12,
  },
  formContainer: {
    backgroundColor: '#e0f2f1',
    padding: 16,
    borderRadius: 8,
    elevation: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    justifyContent: 'space-evenly',
  },
  inputColumn: {
    marginRight: 8,
  },
  inputStyle: {
    backgroundColor: '#fff',
    width: 80,
    borderRadius: 4,
    height: 40,
    textAlign: 'center',
    color: '#000',
  },
  heading: {
    fontSize: 16,
    color: '#000',
    width: 260,
  },
  errorText: {
    color: '#dd2c00',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 12,
  },
  primaryBtn: {
    backgroundColor: '#03a9f4',
    padding: 12,
    borderRadius: 4,
    elevation: 5,
  },
  primaryBtnTxt: {
    color: '#fff',
  },
  resetBtn: {
    backgroundColor: '#ffa726',
    padding: 12,
    borderRadius: 4,
    elevation: 5,
  },
  resetBtnTxt: {
    color: '#fff',
  },
  generatedPassArea: {
    backgroundColor: '#eeeeee',
    marginVertical: 40,
    padding: 12,
    borderRadius: 8,
  },
  passTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
  },
  passHint: {
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic',
    marginVertical: 8,
    color: '#616161',
  },
  generatedPass: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    fontSize: 30,
    color: '#263238',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 12,
    borderRadius: 8,
  },
});
