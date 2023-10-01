import { Calendar } from 'react-native-calendars';
import { View, Text, FlatList, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { CalenderInput } from '../utils/CalenderInput';
import { useState } from 'react'

export const Stage2 = () => {
  const defaultTime = ['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '06:00 PM', '09:00 PM']
  const [modalVisible, setModalVisible] = useState(false)
  const [modalTxt, setModalTxt] = useState('')
  const [tempDate, setTempDate] = useState('')
  const [selectedFrom, setSelectedFrom] = useState('')
  const [selectedTo, setSelectedTo] = useState('')

  const toggleModal = (text: string) => {
    setModalTxt(text)
    setModalVisible(true)
  }

  const handleApply = () => {
    if(modalTxt==='From'){
      setSelectedFrom(tempDate)
    } else if(modalTxt==='To'){
      setSelectedTo(tempDate)
    } 
    setModalVisible(false)
  }

  return (
    <>
      <View style={styles.firstContainer}>
        <CalenderInput props={'From'} selected={selectedFrom} toggleModal={() => toggleModal('From')} />
        <CalenderInput props={'To'} selected={selectedTo} toggleModal={() => toggleModal('To')} />
      </View>
      <View>
        <Text style={styles.txt}>Select Time</Text>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={defaultTime}
            renderItem={({ item }) => <TouchableOpacity><Text style={styles.medType}>{item}</Text></TouchableOpacity>}
          />
        </View>
      </View>
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
                if(modalTxt==='From') setTempDate(day.dateString)
                else if (modalTxt==='To') setTempDate(day.dateString)
              }}
              markedDates={{ [tempDate]: { selected: true, disableTouchEvent: true, } }} 
              />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 15, gap: 15 }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalBtn}>
                <Text style={{ color: '#1F848A', fontWeight: '500', fontSize: 13 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#1F848A' }]}>
                <Text onPress={() => handleApply()} style={{ color: 'white', fontWeight: '500', fontSize: 13 }}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  firstContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 30
  },
  txt: {
    color: '#333333',
    fontWeight: '500'
  },
  medType: {
    backgroundColor: '#F0F0F0',
    height: 40,
    width: 78,
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
  }
})