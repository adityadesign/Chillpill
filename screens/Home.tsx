import { View, StyleSheet, Text } from 'react-native'
import { addDays, eachDayOfInterval, eachWeekOfInterval, subDays } from 'date-fns'
import PagerView from 'react-native-pager-view'

export const Home = () => {
  const dates = eachWeekOfInterval(
    {
      start: subDays(new Date(), 14),
      end: addDays(new Date(), 14)
    },
    { weekStartsOn: 1 })
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
            <View>
              {week.map((day, index) => {
                return (
                  <View key={index}><Text>{day.toDateString()}</Text></View>
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
  }
})