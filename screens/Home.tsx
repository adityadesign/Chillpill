import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
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
    <PagerView style={styles.container}>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    marginVertical: 10,
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
    fontSize: 16,
    color: '#999999'
  },
  dateTxt: {
    fontWeight: '700',
    color: '#666666',
    fontSize: 18,
    paddingVertical: 8,
  },
  activeDay: {
    color: '#333333',
    marginHorizontal: 5
  },
  activeDate: {
    backgroundColor: '#1F848A',
    color: '#FFFFFF',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 10,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})