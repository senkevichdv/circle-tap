import React, {useState} from 'react'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {AppContext} from './context/AppContext'
import Game from './screens/Game'
import Settings from './screens/Settings'
import {Appearance, Button} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'

const Stack = createStackNavigator()
const isDarkMode = Appearance.getColorScheme() === 'dark'

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
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              },
              title: '',
              headerRight: () =>
                !isGameStarted ? (
                  <Button
                    color={isDarkMode ? Colors.white : Colors.black}
                    onPress={() => navigation.navigate('Settings')}
                    title="Settings"
                  />
                ) : null,
              headerLeft: () =>
                isGameStarted && isEndless ? (
                  <Button
                    color={isDarkMode ? Colors.white : Colors.black}
                    onPress={stopGame}
                    title="✕"
                  />
                ) : null,
            })}
          />
          <Stack.Screen
            name="Settings"
            options={() => ({
              headerTintColor: '#fff',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
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
