import { Calendar } from 'react-native-calendars';
import { View, Text, FlatList, Modal, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import { CalenderInput } from '../utils/CalenderInput';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setMedicineDetails } from '../features/userMedSlice';
import { format } from 'date-fns';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export const Stage2 = ({ nextStage }) => {

  const defaultTime = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '6:00 PM', '9:00 PM']
  const [modalVisible, setModalVisible] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [modalTxt, setModalTxt] = useState('')
  const [tempDate, setTempDate] = useState('')
  const dispatch = useDispatch()

  const [selectedFrom, setSelectedFrom] = useState(null)
  const [selectedTo, setSelectedTo] = useState(null)
  const [time, setTime] = useState(null)

  const toggleModal = (text: string) => {
    setModalTxt(text)
    setModalVisible(true)
  }

  // const onChange = (event, selectedTime) => {
  //   const currentTime = selectedTime || time;
  //   setShowTimePicker(false);
  //   setTime(currentTime);
  // };

  const onChange = (event: DateTimePickerEvent) => {
    setShowTimePicker(false)
    const {
      type,
      nativeEvent: { timestamp },
    } = event
    const temp = new Date(event.nativeEvent.timestamp)
    const hours = temp.getHours()
    const minutes = temp.getMinutes().toString().padStart(2, '0')
    const period = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12;
    setTime(`${formattedHours}:${minutes} ${period}`)
  };

  const handleApply = () => {
    if (modalTxt === 'From') {
      setSelectedFrom(tempDate)
    } else if (modalTxt === 'To') {
      setSelectedTo(tempDate)
    }
    setModalVisible(false)
  }

  const handleSubmit = () => {
    if (selectedFrom && selectedTo && time) {
      nextStage()
      dispatch(setMedicineDetails({
        fromDate: selectedFrom,
        toDate: selectedTo,
        time: time
      }))
    } else {
      Alert.alert('Alert!', 'Enter all the fields', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK' },
      ])
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.firstContainer}>
          <CalenderInput props={'From'} selected={selectedFrom} toggleModal={() => toggleModal('From')} />
          <CalenderInput props={'To'} selected={selectedTo} toggleModal={() => toggleModal('To')} />
        </View>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.txt}>Select Time</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <Image source={require('../assets/add.png')} />
            </TouchableOpacity>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={defaultTime}
            renderItem={({ item }) =>
              <TouchableOpacity onPress={() => setTime(item)}>
                <Text style={[styles.time, time === item && { backgroundColor: '#1F848A', color: 'white' }]}>{item}</Text>
              </TouchableOpacity>
            }
          />
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 15, paddingBottom: 30 }}>
              <Text style={styles.modalText}>Select "{modalTxt}" date</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}><Image source={require('../assets/close.png')} /></TouchableOpacity>
            </View>
            <Calendar
              onDayPress={day => {
                const dateObject = new Date(day.dateString)
                const formattedDate = format(dateObject, "yyyy-MM-dd")
                if (modalTxt === 'From') setTempDate(formattedDate)
                else if (modalTxt === 'To') setTempDate(formattedDate)
              }}
              markedDates={{ [tempDate]: { selected: true, disableTouchEvent: true, } }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 15, gap: 15 }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalBtn}>
                <Text style={[styles.applyTxt, { color: '#1F848A' }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleApply()}
                style={[styles.modalBtn, { backgroundColor: '#1F848A' }]}>
                <Text style={styles.applyTxt}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.nextBtn} onPress={() => handleSubmit()}>
        <Text style={styles.nextBtnTxt}>Next</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <RNDateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={false}
          display="spinner"
          onChange={onChange}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  firstContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 50
  },
  txt: {
    color: '#333333',
    fontWeight: '500'
  },
  time: {
    backgroundColor: '#F0F0F0',
    height: 40,
    width: 90,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    marginRight: 10,
    marginTop: 15,
    fontSize: 12,
    color: '#666666',
    fontWeight: '500'
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  modalText: {
    fontWeight: '700',
    fontSize: 15
  },
  modalBtn: {
    borderColor: '#1F848A',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 25
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
  },
  applyTxt: {
    color: 'white',
    fontWeight: '500',
    fontSize: 13
  }
})