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
  startGame: () => {},
  stopGame: () => {},
  setIsEndless: () => {},
  isEndless: false,
  setIsSizeChange: () => {},
  isSizeChange: false,
}

export const AppContext = createContext(initialState)
