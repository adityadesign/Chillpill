import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native'

export const CalenderInput = ({ props, toggleModal, selected }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.txt}>{props}</Text>
      <View style={styles.calenderInput}>
        <TextInput
          value={selected}
          placeholder='YYYY-MM-DD' />
        <View style={styles.calenderInputIcon}>
          <View style={styles.separator}></View>
          <TouchableOpacity onPress={() => toggleModal()}>
            <Image source={require('../assets/calender2.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  txt: {
    color: '#333333',
    fontWeight: '500'
  },
  calenderInput: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    padding: 8,
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10
  },
  calenderInputIcon: {
    flexDirection: 'row',
    gap: 10,
    height: '100%',
    alignItems: 'center'
  },
  separator: {
    borderWidth: 0.5,
    borderColor: '#C4C4C4',
    height: '100%'
  }
})