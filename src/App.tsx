import React, {useState} from 'react'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {Button} from 'react-native'

import {AppContext} from './context/AppContext'
import Game from './screens/Game'
import Settings from './screens/Settings'
import shared from './styles/shared'

const Stack = createStackNavigator()

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isEndless, setIsEndless] = useState<boolean>(false)
  const [isSizeChange, setIsSizeChange] = useState<boolean>(false)
  const startGame = () => setIsGameStarted(true)
  const stopGame = () => setIsGameStarted(false)
  const contextProviderValue = {
    isGameStarted,
    startGame,
    stopGame,
    isEndless,
    setIsEndless,
    isSizeChange,
    setIsSizeChange,
  }
  return (
    <NavigationContainer>
      <AppContext.Provider value={contextProviderValue}>
        <Stack.Navigator>
          <Stack.Screen
            name="Game"
            component={Game}
            options={({navigation}) => ({
              headerShadowVisible: false,
              headerTintColor: shared.invertedColor,
              headerStyle: {
                backgroundColor: shared.invertedColor,
              },
              title: '',
              headerRight: () =>
                !isGameStarted ? (
                  <Button
                    color={shared.color}
                    onPress={() => navigation.navigate('Settings')}
                    title="Settings"
                  />
                ) : null,
              headerLeft: () =>
                isGameStarted && isEndless ? (
                  <Button color={shared.color} onPress={stopGame} title="✕" />
                ) : null,
            })}
          />
          <Stack.Screen
            name="Settings"
            options={() => ({
              headerTintColor: shared.color,
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: shared.invertedColor,
              },
            })}
            component={Settings}
          />
        </Stack.Navigator>
      </AppContext.Provider>
    </NavigationContainer>
  )
}

export default App
