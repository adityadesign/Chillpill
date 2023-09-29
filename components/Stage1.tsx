import { FlatList, Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Switch } from "react-native"
import {useState} from 'react'
export const Stage1 = () => {
  const medType = ['Tablet', 'Syrup', 'Powder', 'Salve']
  const FamMember = ['Me', 'Dad', 'Mom']
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <>
      <View style={{ paddingTop: 10, paddingBottom: 20 }}>
        <Text style={styles.formTxt}>Medication Name</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Search med/Enter manually" />
          <Image source={require('../assets/search.png')} />
        </View>
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 20 }}>
        <Text style={styles.formTxt}>Med Type</Text>
        <FlatList
          horizontal={true}
          data={medType}
          renderItem={({ item }) => <TouchableOpacity><Text style={styles.medType}>{item}</Text></TouchableOpacity>}
        />
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 20 }}>
        <Text style={styles.formTxt}>Select Family Member</Text>
        <FlatList
          horizontal={true}
          data={FamMember}
          renderItem={({ item }) => <TouchableOpacity><Text style={styles.medType}>{item}</Text></TouchableOpacity>}
        />
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 20 }}>
        <Text style={styles.formTxt}>Upload Image</Text>
        <TouchableOpacity style={styles.uploadImage}>
          <Image source={require('../assets/camera.png')} />
        </TouchableOpacity>
      </View>
      <View style={{ paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: '500', color: '#333333' }}>Do you want to use uploaded image?</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#1F848A' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  formTxt: {
    fontWeight: '500',
    color: '#333333'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#E9E9E9',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10
  },
  medType: {
    backgroundColor: '#F0F0F0',
    height: 40,
    width: 78,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
    fontSize: 12,
    color: '#666666',
    fontWeight: '500'
  },
  uploadImage: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    width: 58,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
})