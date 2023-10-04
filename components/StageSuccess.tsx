import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import type { RootState } from '../src/store'
import type {CounterState} from '../features/userMedSlice'

export const StageSuccess = () => {
  const data:CounterState = useSelector((state: RootState) => state.medicines)
  console.log(data)

  return (
    <View>
      <Text style={styles.txtHead}>Your medication reminder is created successfully!</Text>
      <Image style={{ alignSelf: 'center', marginVertical: 20 }} source={require('../assets/abstract2.png')} />
      {data && <View>
        <View>
          <Text>{data.medicineDetails.medName}</Text>
        </View>
      </View>}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <Text style={styles.editTxt}>Do you wish to edit the above details?</Text>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
          <Image source={require('../assets/edit.png')} />
          <Text style={styles.editBtn}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  txtHead: {
    marginTop: 15,
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 24
  },
  editTxt: {
    color: '#999999',
    fontWeight: '500',
    fontSize: 12
  },
  editBtn: {
    color: '#1F848A',
    fontWeight: '500',
    fontSize: 13,
    textDecorationLine: 'underline'
  }
})