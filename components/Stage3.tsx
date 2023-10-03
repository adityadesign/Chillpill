import { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch } from 'react-redux';
import { setMedicineDetails } from '../features/userMedSlice';

export const Stage3 = ({nextStage}) => {
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
  const [isBefore, setIsBefore] = useState(false)
  const [notify, setNotify] = useState(false);
  const toggleSwitch = () => setNotify(previousState => !previousState);
  const dispatch = useDispatch()

  const handleSubmit =()=>{
    nextStage()
    dispatch(setMedicineDetails({
      dose: dose,
      numberOfPills: pills,
      beforeFood: isBefore,
      notify: notify
    }))
  }

  return (
    <>
      <ScrollView>
        <Text style={styles.txt}>Dose</Text>
        <Dropdown
          style={styles.input}
          itemTextStyle = {{fontSize:14}}
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
          keyboardType='number-pad'
          onChangeText={text => setPills(text)} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
          <Text style={styles.txt}>Is it Before food?</Text>
          <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 8, borderColor: '#E9E9E9', padding: 5 }}>
            <TouchableOpacity onPress={() => setIsBefore(true)} style={[styles.btn, isBefore && { backgroundColor: '#1F848A' }]}>
              <Text style={[styles.btnText, isBefore && { color: 'white' }]}>Before</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsBefore(false)} style={[styles.btn, !isBefore && { backgroundColor: '#1F848A' }]}>
              <Text style={[styles.btnText, !isBefore && { color: 'white' }]}>After</Text>
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
      </ScrollView>
      <TouchableOpacity style={styles.nextBtn} onPress={() => handleSubmit()}>
        <Text style={styles.nextBtnTxt}>Next</Text>
      </TouchableOpacity>
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
    color: '#999999',
    fontSize: 14
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
  },
  nextBtn: {
    backgroundColor: '#1F848A',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  nextBtnTxt: {
    color: 'white',
    fontWeight: '500'
  }
})