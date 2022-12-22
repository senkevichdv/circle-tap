import {Appearance, StyleSheet} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import appStyles from '../app.styles'

const isDarkMode = Appearance.getColorScheme() === 'dark'

const styles = StyleSheet.create({
  background: appStyles.background,
  settingsContainer: {
    padding: 20,
  },
  switchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? Colors.white : Colors.black,
  },
  switchText: {
    color: isDarkMode ? Colors.white : Colors.black,
    marginRight: 10,
    fontSize: 16,
  },
})

export default styles
