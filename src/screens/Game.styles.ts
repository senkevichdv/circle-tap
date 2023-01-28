import {StyleSheet} from 'react-native'

import shared from '../styles/shared'

const styles = StyleSheet.create({
  background: shared.background,
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: shared.color,
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  helpText: {
    color: shared.color,
    textAlign: 'center',
    marginTop: 20,
  },
  startButton: {
    fontSize: 22,
    margin: 10,
    color: shared.color,
  },
  statsContainer: {
    position: 'absolute',
    bottom: 0,
  },
  scoreText: {
    textAlign: 'center',
    marginBottom: 5,
    position: 'relative',
    color: shared.color,
  },
})

export default styles
