import {createContext} from 'react'

interface IContext {
  isEndless: boolean
  isShrinking: boolean
  setIsEndless: (value: boolean) => void
  setIsShrinking: (value: boolean) => void
  isGameStarted: boolean
  startGame: () => void
  stopGame: () => void
}

export const initialState: IContext = {
  isGameStarted: false,
  startGame: () => {},
  stopGame: () => {},
  setIsEndless: () => {},
  isEndless: true,
  setIsShrinking: () => {},
  isShrinking: true,
}

export const AppContext = createContext(initialState)
