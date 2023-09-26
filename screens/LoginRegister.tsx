import { useState } from "react"
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const LoginRegister = () => {
  const [toggleBtn, setToggleBtn] = useState(true)
  const [toggleRegister, setToggleRegister] = useState(false)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={require('../assets/logo.png')} />
        <Text style={styles.brandText}>Chillpill</Text>
        <Text style={styles.subBrandText}>Medication Reminder App</Text>
      </View>
      <View style={styles.bottomContainer}>
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
        <TextInput style={styles.textInput} placeholder='Email' />
        <TextInput style={styles.textInput} placeholder='Password' />
        {toggleRegister && <TextInput style={styles.textInput} placeholder='Confirm Password' />}
        <TouchableOpacity style={styles.submitBtn}><Text style={styles.submitBtnText}>{!toggleRegister ? 'Login' : 'Register'}</Text></TouchableOpacity>
      </View>
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
    fontSize: 26,
    fontWeight: '700',
    color: 'black'
  },
  subBrandText: {
    fontSize: 22,
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
    fontSize: 16,
    fontWeight: '500'
  },
  textInput: {
    borderColor: 'grey',
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5
  },
  submitBtn:{
    flex: 0,
    alignItems: 'center',
    backgroundColor: '#1F848A',
    padding: 10,
    borderRadius: 5
  },
  submitBtnText:{
    fontSize: 18,
    color: 'white',
    fontWeight: '600'
  }
});