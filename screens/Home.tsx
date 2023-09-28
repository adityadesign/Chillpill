import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import { addDays, eachDayOfInterval, eachWeekOfInterval, format, subDays } from 'date-fns'
import PagerView from 'react-native-pager-view'
import { useState } from 'react'

export const Home = () => {
  const today = new Date()
  const [selectedDay, setSelectedDay] = useState(today)

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
        <View style={styles.midContainer}>
          <Image source={require('../assets/abstract.png')} />
          <Text style={{ fontWeight: '600' }}>Hey! No meds are added to be reminded!</Text>
          <TouchableOpacity style={styles.remainderBtn}><Text style={styles.remainderBtnText}>+ Add a Reminder</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bottomContainerElement}>
          <Image source={require('../assets/Vector.png')} />
          <Text style={styles.bottomContainerElementTxt}>Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomContainerElement}>
          <Image style={{position: 'relative'}} source={require('../assets/addBack.png')}/>
          <Image style={{position: 'absolute', top:4}} source={require('../assets/add.png')}/>
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: '#E9E9E9',
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5
  },
  userText: {
    fontSize: 16,
    fontWeight: '500',
  },
  filter: {
    backgroundColor: '#1F848A',
    paddingHorizontal: 15,
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
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: 5,
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
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    rowGap: 20,
    paddingTop: 30
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
  bottomContainerElement:{
    alignItems: 'center',
    flex: 1,
    rowGap: 2
  },
  bottomContainerElementTxt:{
    color: '#C1E7EA',
    fontWeight: '500',
    fontSize: 11
  }
})