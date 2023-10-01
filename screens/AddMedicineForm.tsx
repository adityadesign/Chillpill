import { useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Switch } from "react-native"
import { Stage1 } from "../components/Stage1";
import { Stage2 } from "../components/Stage2";
import { Stage3 } from "../components/Stage3";
import { StageSuccess } from "../components/StageSuccess";

export const AddMedicineForm = ({navigation}) => {
  const [stage, setStage] = useState(1)

  const handleBack = () => {
    setStage(prev => prev - 1)
    if(stage === 1) navigation.navigate("Home")
  }

  const handleBtn = () => {
    if (stage < 4) setStage(prev => prev + 1)
    else if (stage === 4) navigation.navigate('Home')
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.topContainerElement} onPress={handleBack}>
          <Image source={require('../assets/leftArrow.png')} />
          <Text style={styles.topContainerText}>Back</Text>
        </TouchableOpacity>
        {stage < 3 && <TouchableOpacity style={styles.topContainerElement} onPress={() => setStage(prev => prev + 1)}>
          <Text style={styles.topContainerText}>Next</Text>
          <Image source={require('../assets/rightArrow.png')} />
        </TouchableOpacity>}
      </View>
      {stage < 4 && <View style={{ paddingTop: 10, paddingBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10 }}>
          <Text style={styles.headingTxt}>
            {stage === 1 && 'Basic Info'}
            {stage === 2 && 'Select Date/Time'}
            {stage === 3 && 'Dosage Count'}
          </Text>
          <Text style={styles.subHeadingTxt}>({stage}/3)</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 5, paddingVertical: 5 }}>
          <View style={styles.progress}></View>
          <View style={[styles.progress, stage < 2 && { backgroundColor: '#E9E9E9' }]}></View>
          <View style={[styles.progress, stage < 3 && { backgroundColor: '#E9E9E9' }]}></View>
        </View>
      </View>}
      <ScrollView>
        {stage === 1 && <Stage1 />}
        {stage === 2 && <Stage2 />}
        {stage === 3 && <Stage3 />}
        {stage === 4 && <StageSuccess />}
      </ScrollView>
      <TouchableOpacity style={styles.nextBtn} onPress={() => handleBtn()}>
        <Text style={styles.nextBtnTxt}>
          {stage < 3 && 'Next'}
          {stage === 3 && 'Submit'}
          {stage === 4 && 'Finish'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25
  },
  topContainerElement: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  topContainerText: {
    color: '#1F848A',
    fontWeight: '500'
  },
  headingTxt: {
    fontWeight: '700',
    fontSize: 26
  },
  subHeadingTxt: {
    fontWeight: '700',
    color: '#999999',
    fontSize: 16
  },
  progress: {
    height: 6,
    width: 50,
    backgroundColor: '#1F848A',
    borderRadius: 5
  },
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
  nextBtn: {
    backgroundColor: '#1F848A',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center'
  },
  nextBtnTxt: {
    color: 'white',
    fontWeight: '500'
  }
})