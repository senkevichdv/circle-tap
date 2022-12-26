import {Appearance, StyleSheet} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'

const isDarkMode = Appearance.getColorScheme() === 'dark'

const styles = StyleSheet.create({
  background: {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
    flex: 1,
  },
  color: isDarkMode ? Colors.white : Colors.black,
  invertedColor: isDarkMode ? Colors.black : Colors.white,
})

export default styles
