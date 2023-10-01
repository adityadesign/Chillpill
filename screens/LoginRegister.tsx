import { useState } from "react"
import { ActivityIndicator, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { FIREBASE_AUTH } from '../firebase/Firebase.config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';


export const LoginRegister = ({ navigation }) => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(true)
  const [toggleRegister, setToggleRegister] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [error, setError] = useState(false)
  const auth = FIREBASE_AUTH;

  //Function for new User Registration
  const signUp = async () => {
    setLoading(true);
    setPasswordMatch(true)
    setError(false)
    if (password === confirmPassword) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        console.log(response)
      } catch (err) {
        console.log(err)
        setError(true)
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Password does not matches')
      setLoading(false)
      setPasswordMatch(false)
    }
  };

  //Function for User Login
  const signIn = async () => {
    setLoading(true);
    setError(false)
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setIsSignedIn(true)
      navigation.navigate('Home')
      console.log(response)
    } catch (err) {
      console.log(err.code);
      setError(true)
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={require('../assets/logo.png')} />
        <Text style={styles.brandText}>Chillpill</Text>
        <Text style={styles.subBrandText}>Medication Reminder App</Text>
      </View>
      <KeyboardAvoidingView style={styles.bottomContainer}>
        <View style={styles.loginRegister}>
          <TouchableOpacity
            onPress={() => [setToggleBtn(true), setToggleRegister(false)]}
            style={[styles.btn, { borderBottomColor: toggleBtn ? '#1F848A' : '#F0F0F0' }]}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => [setToggleBtn(false), setToggleRegister(true)]}
            style={[styles.btn, { borderBottomColor: !toggleBtn ? '#1F848A' : '#F0F0F0' }]}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder='Email'
          autoCapitalize="none"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Password'
          autoCapitalize="none"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        {toggleRegister &&
          <TextInput
            style={styles.textInput}
            placeholder='Confirm Password'
            autoCapitalize="none"
            value={confirmPassword}
            secureTextEntry={true}
            onChangeText={text => setConfirmPassword(text)}
          />}
        {loading ? (
          <ActivityIndicator
            color="#1F848A"
            size={40}
          />
        ) :
          <TouchableOpacity style={styles.submitBtn} onPress={() => toggleBtn ? signIn() : signUp()}>
            <Text style={styles.submitBtnText}>{!toggleRegister ? 'Login' : 'Register'}</Text>
          </TouchableOpacity>
        }
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: {
    flex: 1.1,
    width: '80%',
    gap: 10,
  },
  brandText: {
    fontSize: 22,
    fontWeight: '700',
    color: 'black'
  },
  subBrandText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#999999'
  },
  loginRegister: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    width: '50%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingVertical: 15,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 3
  },
  btnText: {
    fontSize: 14,
    fontWeight: '500'
  },
  textInput: {
    borderColor: 'grey',
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 5
  },
  submitBtn: {
    flex: 0,
    alignItems: 'center',
    backgroundColor: '#1F848A',
    padding: 10,
    borderRadius: 5
  },
  submitBtnText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600'
  }
});