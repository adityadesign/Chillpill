import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import type { RootState } from '../src/store'
import type { details } from '../features/userMedSlice'

export const StageSuccess = () => {
  const data: details = useSelector((state: RootState) => state.medicines.medicineDetails)

  return (
    <View>
      <Text style={styles.txtHead}>Your medication reminder is created successfully!</Text>
      <Image style={{ alignSelf: 'center', marginTop: 20 }} source={require('../assets/abstract2.png')} />
      {data &&
        <View style={styles.dataContainer}>
          <View style={{ flex: 1, alignItems: 'flex-start', gap: 10 }}>
            <Text style={styles.userData}>{data.person}</Text>
            <Image style={styles.image} source={{ uri: data.image }} />
          </View>
          <View style={{ flex: 3, justifyContent: 'space-around' }}>
            <Text style={{ color: '#666666', fontWeight: '500' }}>{data.medName}</Text>
            <Text style={{ fontWeight: '700', fontSize: 24 }}>{data.time}</Text>
            <View style={{ flexDirection: 'row', gap: 15 }}>
              <Text style={{ color: '#999999', fontSize: 12, fontWeight: '500' }}>{data.dose} {data.medType}</Text>
              <Text style={{ color: '#999999', fontSize: 12, fontWeight: '500' }}>{data.beforeFood ? 'Before breakfast' : 'After breakfast'}</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Image source={require('../assets/success.png')} />
          </View>
        </View>
      }
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
  },
  dataContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    padding: 20,
    marginBottom: 20,
    gap: 20,
    flexDirection: 'row'
  },
  userData: {
    backgroundColor: '#FFECD2',
    color: '#E78500',
    fontWeight: '500',
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10
  },
  image: {
    height: 58,
    width: 58,
    backgroundColor: '#E9E9E9',
    borderRadius: 5
  },
})