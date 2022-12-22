import React from 'react'
import {SafeAreaView, Text, View, Switch} from 'react-native'

import styles from './Settings.styles'
import {AppContext} from '../context/AppContext'

const Settings = () => {
  const {setIsEndless, isEndless, setIsSizeChange, isSizeChange} =
    React.useContext(AppContext)

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.settingsContainer}>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Endless mode</Text>
          <Switch onValueChange={setIsEndless} value={isEndless} />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Reduce circle size</Text>
          <Switch onValueChange={setIsSizeChange} value={isSizeChange} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Settings
