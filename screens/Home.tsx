import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native'
import { addDays, eachDayOfInterval, eachWeekOfInterval, format, subDays } from 'date-fns'
import PagerView from 'react-native-pager-view'
import { useEffect, useState } from 'react'
import { collection, doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from '../firebase/Firebase.config';

export const Home = ({ navigation, route }) => {
  const today = new Date()
  const uid = route.params?.uid
  const [selectedDay, setSelectedDay] = useState(today)
  const data = [
    {
      medicineName: 'Paracetamol',
      medType: 'Tablet',
      image: '',
    },
    {
      medicineName: 'Paracetamol',
      medType: 'Tablet',
      image: '',
    },
    {
      medicineName: 'Paracetamol',
      medType: 'Tablet',
      image: '',
    },
  ]

  const getData = async () => {
    const querySnapshot = await getDoc(doc(FIREBASE_DB, "users", `${uid}`));
    console.log(querySnapshot.data())
  }

  useEffect(() => {
    getData()
  }, [])

  const dates = eachWeekOfInterval({
    start: subDays(today, 14),
    end: addDays(today, 14)
  })
    .reduce((acc: Date[][], cur) => {
      const allDays = eachDayOfInterval({
        start: cur,
        end: addDays(cur, 6)
      })
      acc.push(allDays)
      return acc
    }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.user}>
          <Image source={require('../assets/user.png')} />
          <Text style={styles.userText}>Me</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filter}>
          <Image source={require('../assets/filter.png')} />
        </TouchableOpacity>
      </View>
      <PagerView style={styles.container} initialPage={2}>
        {dates.map((week, index) => {
          return (
            <View key={index}>
              <View style={styles.row}>
                {week.map((day, index) => {
                  const dayTxt = format(day, 'EEE')
                  const dateTxt = format(day, 'd')
                  const selectedTxt = format(selectedDay, 'd')
                  return (
                    <View key={index}>
                      <TouchableOpacity style={styles.rowElement} onPress={() => setSelectedDay(day)}>
                        <Text style={[styles.dayTxt, selectedTxt === dateTxt && styles.activeDay]}>{dayTxt}</Text>
                        <Text style={[styles.dateTxt, selectedTxt === dateTxt && styles.activeDate]}>{dateTxt}</Text>
                      </TouchableOpacity>
                    </View>
                  )
                })}
              </View>
            </View>
          )
        })}
      </PagerView>
      <View style={{ flex: 4, marginTop: 10 }}>
        <ScrollView>
          {data.length === 0 ?
            <View style={styles.midContainer}>
              <Image source={require('../assets/abstract.png')} />
              <Text style={{ fontWeight: '600' }}>Hey! No meds are added to be reminded!</Text>
              <TouchableOpacity style={styles.remainderBtn}><Text style={styles.remainderBtnText}>+ Add a Reminder</Text></TouchableOpacity>
            </View> :
            data.map((item, index) => {
              const [isTake, setIsTake] = useState(false)
              const [isSkip, setIsSkip] = useState(false)
              return (
                <View style={styles.dataContainer} key={index}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'flex-start', gap: 10 }}>
                      <Text style={styles.userData}>Mine</Text>
                      <View style={{ height: 58, width: 58, backgroundColor: '#E9E9E9', borderRadius: 5 }}></View>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'space-around' }}>
                      <Text style={{ color: '#666666', fontWeight: '500' }}>Paracetamol</Text>
                      <Text style={{ fontWeight: '700', fontSize: 24 }}>8:00 <Text style={{ fontSize: 14, fontWeight: '500' }}>AM</Text></Text>
                      <View style={{ flexDirection: 'row', gap: 15 }}>
                        <Text style={{ color: '#999999', fontSize: 12, fontWeight: '500' }}>1 tablet</Text>
                        <Text style={{ color: '#999999', fontSize: 12, fontWeight: '500' }}>Before breakfast</Text>
                      </View>
                    </View>
                  </View>
                  {isTake &&
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, position: 'absolute', right: 20, top: 20 }}>
                      <Image source={require('../assets/take.png')} />
                      <Text style={{ color: '#1F848A', fontWeight: '500' }}>Taken</Text>
                    </View>
                  }
                  {isSkip &&
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, position: 'absolute', right: 20, top: 20 }}>
                      <Image source={require('../assets/skip.png')} />
                      <Text style={{ color: '#DB6F6A', fontWeight: '500' }}>Skipped</Text>
                    </View>
                  }
                  {!isSkip && !isTake &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                      <TouchableOpacity onPress={() => setIsSkip(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Image source={require('../assets/skip.png')} />
                        <Text style={{ color: '#DB6F6A', fontWeight: '500' }}>Skip</Text>
                      </TouchableOpacity>
                      <View style={{ borderWidth: 0.6, borderColor: '#E9E9E9' }}></View>
                      <TouchableOpacity onPress={() => setIsTake(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Image source={require('../assets/take.png')} />
                        <Text style={{ color: '#1F848A', fontWeight: '500' }}>Take</Text>
                      </TouchableOpacity>
                    </View>
                  }
                </View>
              )
            })
          }
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bottomContainerElement}>
          <Image source={require('../assets/Vector.png')} />
          <Text style={styles.bottomContainerElementTxt}>Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomContainerElement} onPress={() => navigation.navigate('AddMedicineForm', { uid: uid })}>
          <Image style={{ position: 'relative' }} source={require('../assets/addBack.png')} />
          <Image style={{ position: 'absolute', top: 4 }} source={require('../assets/add.png')} />
          <Text style={styles.bottomContainerElementTxt}>Add Medicine</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomContainerElement}>
          <Image source={require('../assets/calender.png')} />
          <Text style={styles.bottomContainerElementTxt}>Appointments </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  user: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: '#E9E9E9',
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5
  },
  userText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filter: {
    backgroundColor: '#1F848A',
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E9E9E9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    elevation: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E9E9E9'
  },
  rowElement: {
    rowGap: 15,
    alignItems: 'center',
    paddingVertical: 20
  },
  dayTxt: {
    fontWeight: '600',
    fontSize: 13,
    color: '#999999'
  },
  dateTxt: {
    fontWeight: '700',
    color: '#666666',
    fontSize: 14,
    paddingVertical: 8,
  },
  activeDay: {
    color: '#333333'
  },
  activeDate: {
    backgroundColor: '#1F848A',
    color: '#FFFFFF',
    borderRadius: 50,
    height: 34,
    width: 34,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  midContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    rowGap: 20,
  },
  dataContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    padding: 20,
    marginBottom: 15,
    gap: 20
  },
  userData: {
    backgroundColor: '#FFECD2',
    color: '#E78500',
    fontWeight: '500',
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10
  },
  remainderBtn: {
    backgroundColor: '#1F848A',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5
  },
  remainderBtnText: {
    color: 'white',
    fontWeight: '500'
  },
  bottomContainer: {
    backgroundColor: '#1F848A',
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomContainerElement: {
    alignItems: 'center',
    flex: 1,
    rowGap: 2
  },
  bottomContainerElementTxt: {
    color: '#C1E7EA',
    fontWeight: '500',
    fontSize: 11
  }
})