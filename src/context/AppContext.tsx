import {createContext} from 'react'

interface IContext {
  isEndless: boolean
  isSizeChange: boolean
  setIsEndless: (value: boolean) => void
  setIsSizeChange: (value: boolean) => void
  isGameStarted: boolean
  startGame: () => void
  stopGame: () => void
}

export const initialState: IContext = {
  isGameStarted: false,
  isEndless: false,
  isSizeChange: false,
  startGame: () => {},
  stopGame: () => {},
  setIsEndless: () => {},
  setIsSizeChange: () => {},
}

export const AppContext = createContext(initialState)
