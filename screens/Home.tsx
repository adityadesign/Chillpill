import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Image, ScrollView, ActivityIndicator } from 'react-native'
import { addDays, eachDayOfInterval, eachWeekOfInterval, format, getDate, parse, parseISO, subDays } from 'date-fns'
import PagerView from 'react-native-pager-view'
import { useEffect, useRef, useState } from 'react'
import { doc, onSnapshot, updateDoc, } from "firebase/firestore";
import { FIREBASE_DB } from '../firebase/Firebase.config';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const Home = ({ navigation, route }) => {
  const uid = route.params?.uid
  const medicineRef = doc(FIREBASE_DB, 'users', `${uid}`)
  const [dbData, setDbData] = useState([])
  const [loading, setLoading] = useState(false)

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  //Time format in IST
  const today = new Date()
  const options = {
    timeZone: 'Asia/Kolkata', // Set the timezone to IST
  };
  const temp = new Date().toLocaleString('en-GB', options);
  const parsedDate = parse(temp, 'dd/MM/yyyy, HH:mm:ss', new Date())
  const todayIST = format(parsedDate, 'yyyy-MM-dd\'T\'HH:mm:ss')
  const todayDate = format(parsedDate, 'yyyy-MM-dd')
  const [selectedDay, setSelectedDay] = useState(todayDate)

  useEffect(() => {
    const unsub = onSnapshot(medicineRef, (docSnapshot) => {
      setDbData(docSnapshot.data().medicines)
      setLoading(true)
    });
    return () => {
      unsub(); // Invoke unsubscribe when the component unmounts
    };
  }, [uid])

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

  const handleTakeSkip = async (Id: string, action: string) => {
    if (action === 'take') {
      dbData.find((doc) => doc.id === Id).isTaken = true
      dbData.find((doc) => doc.id === Id).statusTakenDate.push(selectedDay)
    }
    else if (action === 'skip') {
      dbData.find((doc) => doc.id === Id).isSkipped = true
      dbData.find((doc) => doc.id === Id).statusSkippedDate.push(selectedDay)
    }
    await updateDoc(medicineRef, {
      medicines: dbData
    })
  }

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
                  const dateTxt = parseInt(format(day, 'd'))
                  const selectedTxt = getDate(parseISO(selectedDay))

                  const handleDateSelect = () => {
                    const tempDay = new Date(day).toLocaleString('en-GB', options)
                    const parsedDate = parse(tempDay, 'dd/MM/yyyy, HH:mm:ss', new Date())
                    const formattedDateStr = format(new Date(parsedDate), "yyyy-MM-dd")
                    setSelectedDay(formattedDateStr)
                  }

                  return (
                    <View key={index}>
                      <TouchableOpacity style={styles.rowElement} onPress={() => handleDateSelect()}>
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
        {loading ?
          <ScrollView>
            {!dbData?.length &&
              <View style={styles.midContainer}>
                <Image source={require('../assets/abstract.png')} />
                <Text style={{ fontWeight: '600' }}>Hey! No meds are added to be reminded!</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddMedicineForm', { uid: uid })}
                  style={styles.remainderBtn}>
                  <Text style={styles.remainderBtnText}>+ Add a Reminder</Text>
                </TouchableOpacity>
              </View>
            }
            {dbData?.length > 0 &&
              dbData.sort((a, b) => {
                const dateA = new Date(a.dateTimeIST);
                const dateB = new Date(b.dateTimeIST)
                // Compare hours
                const hoursDiff = dateA.getHours() - dateB.getHours()
                // If hours are equal, compare minutes
                if (hoursDiff === 0) {
                  const minutesDiff = dateA.getMinutes() - dateB.getMinutes();
                  return minutesDiff;
                }
                return hoursDiff;
              }).map((item, index) => {
                const imageSource = item.image
                const startDate = item.fromDate
                const endDate = item.toDate
                return (
                  <View key={index}>
                    {selectedDay >= startDate && selectedDay <= endDate &&
                      <View style={styles.dataContainer}>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ flex: 1, alignItems: 'flex-start', gap: 10 }}>
                            <Text style={styles.userData}>{item.person}</Text>
                            <Image source={{ uri: imageSource }} style={styles.image} />
                          </View>
                          <View style={{ flex: 3, justifyContent: 'space-around' }}>
                            <Text style={{ color: '#666666', fontWeight: '500' }}>{item.medName}</Text>
                            <Text style={{ fontWeight: '700', fontSize: 24 }}>{item.time}</Text>
                            <View style={{ flexDirection: 'row', gap: 15 }}>
                              <Text style={{ color: '#999999', fontSize: 12, fontWeight: '500' }}>{item.dose} {item.medType}</Text>
                              <Text style={{ color: '#999999', fontSize: 12, fontWeight: '500' }}>{item.beforeFood ? 'Before breakfast' : 'After breakfast'}</Text>
                            </View>
                          </View>
                        </View>

                        {item.isTaken && item.statusTakenDate.includes(selectedDay) &&
                          <View style={styles.medicineStatus}>
                            <Image source={require('../assets/take.png')} />
                            <Text style={{ color: '#1F848A', fontWeight: '500' }}>Taken</Text>
                          </View>
                        }

                        {item.isSkipped && item.statusSkippedDate.includes(selectedDay) &&
                          <View style={styles.medicineStatus}>
                            <Image source={require('../assets/skip.png')} />
                            <Text style={{ color: '#DB6F6A', fontWeight: '500' }}>Skipped</Text>
                          </View>
                        }

                        {!item.statusTakenDate.includes(selectedDay) &&
                          !item.statusSkippedDate.includes(selectedDay) &&
                          (new Date(item?.dateTimeIST) <= new Date(todayIST)) &&
                          (new Date(item?.dateTimeIST).toTimeString() < new Date(todayIST).toTimeString()) &&
                          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity onPress={() => handleTakeSkip(item.id, 'skip')} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                              <Image source={require('../assets/skip.png')} />
                              <Text style={{ color: '#DB6F6A', fontWeight: '500' }}>Skip</Text>
                            </TouchableOpacity>
                            <View style={{ borderWidth: 0.6, borderColor: '#E9E9E9' }}></View>
                            <TouchableOpacity onPress={() => handleTakeSkip(item.id, 'take')} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                              <Image source={require('../assets/take.png')} />
                              <Text style={{ color: '#1F848A', fontWeight: '500' }}>Take</Text>
                            </TouchableOpacity>
                          </View>
                        }

                        {(new Date(item?.fromDate) < new Date(selectedDay)) &&
                          (new Date(item?.dateTimeIST).toTimeString() > new Date(todayIST).toTimeString()) &&
                          <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 5 }}>
                            <Image source={require('../assets/upcoming.png')} />
                            <Text style={{ color: '#999999', fontWeight: '500' }}>Upcoming</Text>
                          </View>
                        }
                      </View>}
                  </View>
                )
              })
            }
          </ScrollView> :
          <ActivityIndicator
            color="#1F848A"
            size={50} />
        }
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bottomContainerElement}>
          <Image source={require('../assets/Vector.png')} />
          <Text style={styles.bottomContainerElementTxt}>Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomContainerElement} onPress={() => navigation.navigate('AddMedicineForm', { uid: uid })}>
          <Image style={{ height: 25, width: 25 }} source={require('../assets/add.png')} />
          <Text style={styles.bottomContainerElementTxt}>Add Medicine</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomContainerElement}>
          <Image source={require('../assets/calender.png')} />
          <Text style={styles.bottomContainerElementTxt}>Appointments</Text>
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
    marginVertical: 5
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
  },
  image: {
    height: 58,
    width: 58,
    backgroundColor: '#E9E9E9',
    borderRadius: 5
  },
  medicineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    position: 'absolute',
    right: 20,
    top: 20
  }

})