import {Appearance, StyleSheet, ViewStyle} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'

const isDarkMode = Appearance.getColorScheme() === 'dark'

const styles = StyleSheet.create({
  background: {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
    flex: 1,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: isDarkMode ? Colors.white : Colors.black,
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  startButton: {
    fontSize: 22,
    margin: 10,
    color: isDarkMode ? Colors.white : Colors.black,
  },
  scoreText: {
    color: isDarkMode ? Colors.white : Colors.black,
    position: 'absolute',
    bottom: 0,
  },
  escButton: {
    fontSize: 22,
    position: 'absolute',
    color: isDarkMode ? Colors.white : Colors.black,
  },
  score: {
    fontSize: 18,
    fontWeight: '400',
    color: isDarkMode ? Colors.black : Colors.white,
  },
  vibrationSwitch: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  tapFeedbackButton: {
    marginRight: 10,
    color: isDarkMode ? Colors.white : Colors.black,
  },
})

export default styles
