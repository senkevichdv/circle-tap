import React, {useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {Button} from 'react-native'

import {AppContext} from './context/AppContext'
import Game from './screens/Game'
import Settings from './screens/Settings'
import shared from './styles/shared'

import {RealmProvider} from './realm'

const Stack = createStackNavigator()

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isEndless, setIsEndless] = useState<boolean>(true)
  const [isSizeChange, setIsSizeChange] = useState<boolean>(true)
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
    <RealmProvider>
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
    </RealmProvider>
  )
}

export default App
