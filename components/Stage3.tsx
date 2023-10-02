import { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';

export const Stage3 = () => {
  const data = [
    { label: '01', value: '1' },
    { label: '02', value: '2' },
    { label: '03', value: '3' },
    { label: '04', value: '4' },
    { label: '05', value: '5' },
    { label: '06', value: '6' },
    { label: '07', value: '7' },
    { label: '08', value: '8' },
    { label: '09', value: '9' },
    { label: '10', value: '10' },
  ]
  const [dose, setDose] = useState(null)
  const [pills, setPills] = useState('')
  const [isAfter, setIsAfter] = useState(false)
  const [notify, setNotify] = useState(false);
  const toggleSwitch = () => setNotify(previousState => !previousState);

  return (
    <>
      <View>
        <Text style={styles.txt}>Dose</Text>
        <Dropdown
          style={styles.input}
          placeholderStyle={styles.placeholderStyle}
          labelField="label"
          valueField="value"
          placeholder="Select"
          value={dose}
          onChange={item => {
            setDose(item.value);
          }}
          data={data} />
        <Text style={styles.txt}>Current number of Pills</Text>
        <TextInput
          placeholder='Ex: 10, 15, 20...'
          style={styles.input}
          value={pills}
          onChangeText={text => setPills(text)} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
          <Text style={styles.txt}>Is it Before food?</Text>
          <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 8, borderColor: '#E9E9E9', padding: 5 }}>
            <TouchableOpacity onPress={() => setIsAfter(false)} style={[styles.btn, !isAfter && { backgroundColor: '#1F848A' }]}>
              <Text style={[styles.btnText, !isAfter && { color: 'white' }]}>Before</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsAfter(true)} style={[styles.btn, isAfter && { backgroundColor: '#1F848A' }]}>
              <Text style={[styles.btnText, isAfter && { color: 'white' }]}>After</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.txt}>Notify me when Tablets are empty</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notify ? '#1F848A' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={notify} />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#E9E9E9',
    borderWidth: 2,
    width: '40%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 30
  },
  placeholderStyle: {
    fontWeight: '500',
    color: '#999999'
  },
  txt: {
    color: '#333333',
    fontWeight: '500'
  },
  btn: {
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 8
  },
  btnText: {
    color: '#999999',
    fontWeight: '500'
  }
})