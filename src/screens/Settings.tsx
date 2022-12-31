import React from 'react'
import {SafeAreaView, Text, View, Switch, ScrollView} from 'react-native'

import {AppContext} from '../context/AppContext'

import styles from './Settings.styles'
import {useQuery, IScore} from '../realm'

const Settings = () => {
  const {setIsEndless, isEndless, setIsSizeChange, isSizeChange} =
    React.useContext(AppContext)

  const scores = useQuery<IScore>('Score').sorted('score', true)

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.settingsContainer}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionText}>Endless mode</Text>
          <Switch onValueChange={setIsEndless} value={isEndless} />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionText}>Reduce circle size</Text>
          <Switch onValueChange={setIsSizeChange} value={isSizeChange} />
        </View>
      </View>
      <Text style={styles.sectionTitle}>Leaderboard</Text>
      <ScrollView style={styles.settingsContainer}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionText}>Date</Text>
          <Text style={styles.sectionText}>Score</Text>
        </View>
        {scores.map(s => (
          <View style={styles.sectionContainer} key={s._id}>
            <Text style={styles.sectionText}>{s.date}</Text>
            <Text style={styles.sectionText}>{s.score}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings
