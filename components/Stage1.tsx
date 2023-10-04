import { FlatList, Image, Text, TextInput, TouchableOpacity, View, Alert, StyleSheet, Switch, ScrollView } from "react-native"
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { setMedicineDetails } from '../features/userMedSlice'
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

export const Stage1 = ({ nextStage }) => {
  const medTypeArr = ['Tablet', 'Syrup', 'Powder', 'Salve']
  const FamMember = ['Me', 'Dad', 'Mom']
  const dispatch = useDispatch()

  const [medName, setMedName] = useState(null)
  const [medType, setMedType] = useState(null)
  const [famMember, setFamMember] = useState(null)
  const [imageSource, setImageSource] = useState(null);
  const [isUpload, setIsUpload] = useState(false);

  const handleImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      setImageSource(result.assets[0].uri);
    }
  }

  const toggleSwitch = () => setIsUpload(previousState => !previousState);

  const handleSubmit = () => {
    if (medName && medType && famMember) {
      nextStage()
      dispatch(setMedicineDetails({
        id: uuidv4(),
        medName: medName,
        medType: medType,
        person: famMember,
        image: imageSource,
        upload: isUpload,
        isTaken: false,
        isSkipped: false,
        statusTakenDate: [],
        statusSkippedDate: []
      }))
    } else {
      Alert.alert('Alert!', 'Enter all the fields', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK'},
      ])
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ paddingTop: 10, paddingBottom: 20, flex: 1 }}>
          <Text style={styles.formTxt}>Medication Name</Text>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Search med/Enter manually"
              onChangeText={text => setMedName(text)}
              value={medName} 
              style={{flex:1}} />
            <Image source={require('../assets/search.png')} />
          </View>
        </View>
        <View style={{ paddingTop: 10, paddingBottom: 20, flex: 1 }}>
          <Text style={styles.formTxt}>Med Type</Text>
          <FlatList
            horizontal={true}
            data={medTypeArr}
            renderItem={({ item }) =>
              <TouchableOpacity onPress={() => setMedType(item)}>
                <Text style={[styles.medType, medType === item && { backgroundColor: '#1F848A', color: 'white' }]}>{item}</Text>
              </TouchableOpacity>
            }
          />
        </View>
        <View style={{ paddingTop: 10, paddingBottom: 20, flex: 1 }}>
          <Text style={styles.formTxt}>Select Family Member</Text>
          <FlatList
            horizontal={true}
            data={FamMember}
            renderItem={({ item }) =>
              <TouchableOpacity onPress={() => setFamMember(item)}>
                <Text style={[styles.medType, famMember === item && { backgroundColor: '#1F848A', color: 'white' }]}>{item}</Text>
              </TouchableOpacity>
            }
          />
        </View>
        <View style={{ paddingTop: 10, paddingBottom: 20, flex: 1 }}>
          <Text style={styles.formTxt}>Upload Image</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {imageSource &&
              <View style={styles.uploadImage}>
                <Image source={{ uri: imageSource }} style={styles.image} />
              </View>}
            <TouchableOpacity style={styles.uploadImage} onPress={() => handleImage()}>
              <Image source={require('../assets/camera.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingBottom: 20, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: '500', color: '#333333' }}>Do you want to use uploaded image?</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#C4C4C4' }}
            thumbColor={isUpload ? '#1F848A' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isUpload}
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.nextBtn} onPress={() => handleSubmit()}>
        <Text style={styles.nextBtnTxt}>Next</Text>
      </TouchableOpacity>
    </View>
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
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
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