import {StyleSheet} from 'react-native'

import shared from '../styles/shared'

const styles = StyleSheet.create({
  background: shared.background,
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
    borderBottomColor: shared.color,
  },
  switchText: {
    color: shared.color,
    marginRight: 10,
    fontSize: 16,
  },
})

export default styles
