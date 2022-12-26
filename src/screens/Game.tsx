import React, {useCallback, useEffect, useState} from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import {
  SafeAreaView,
  Text,
  View,
  useWindowDimensions,
  Alert,
} from 'react-native'

import {AppContext} from '../context/AppContext'

import styles from './Game.styles'

const GAME_TIME = 10000

const Game = () => {
  const {startGame, stopGame, isGameStarted, isSizeChange, isEndless} =
    React.useContext(AppContext)
  const {height, width} = useWindowDimensions()
  const [score, setScore] = useState<number>(0)
  const [gameTime, setGameTime] = useState<number>(0)
  const [gameTimerId, setGameTimerId] = useState<number>(0)
  const [averageTapTime, setAverageTapTime] = useState<number>(0)
  const [timerId, setTimerId] = useState<number>(0)
  const [level, setLevel] = useState<number>(1)
  const [circleWidth, setCircleWidth] = useState<number>(100)

  const randomTopValue = Math.floor(Math.random() * (height - 200))
  const randomLeftValue = Math.floor(Math.random() * (width - 100))
  const offsetTop = useSharedValue(randomTopValue)
  const offsetLeft = useSharedValue(randomLeftValue)

  const centerCircle = useCallback(() => {
    offsetTop.value = (height - 200) / 2
    offsetLeft.value = (width - 100) / 2
  }, [height, offsetLeft, offsetTop, width])

  const start = useCallback(() => {
    startGame()
    setGameTime(1)
    centerCircle()
    setScore(0)
    if (!isEndless) {
      const timer = setTimeout(stopGame, GAME_TIME)
      setTimerId(timer)
    }
    const id = setInterval(() => {
      setGameTime(t => t + 1)
    }, 1000)
    setGameTimerId(id)
  }, [centerCircle, isEndless, startGame, stopGame])

  useEffect(() => {
    setLevel(Math.ceil(score / 5))
  }, [score])

  useEffect(() => {
    if (isSizeChange && isGameStarted) {
      const interval = setInterval(() => {
        setCircleWidth(w => w - level)
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isSizeChange, isGameStarted, level])

  useEffect(() => {
    if (circleWidth < 3) {
      stopGame()
    }
  }, [circleWidth, stopGame])

  const onCircleClickHandler = useCallback(() => {
    offsetTop.value = randomTopValue
    offsetLeft.value = randomLeftValue
    setScore(newScore => newScore + 1)
    setCircleWidth(100)
  }, [offsetLeft, offsetTop, randomLeftValue, randomTopValue])

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(offsetLeft.value),
      },
      {
        translateY: withSpring(offsetTop.value),
      },
    ],
    width: withSpring(circleWidth),
    height: withSpring(circleWidth),
  }))

  useEffect(() => {
    if (!isGameStarted) {
      if (score > 0) {
        Alert.alert('Your score is: ' + score, '', [{text: 'Close'}])
        setAverageTapTime(score / gameTime)
      }
      if (timerId) {
        clearTimeout(timerId)
      }
      if (gameTimerId) {
        clearInterval(gameTimerId)
      }
      setCircleWidth(100)
      setLevel(1)
    }
  }, [gameTime, gameTimerId, isGameStarted, score, timerId])

  return (
    <SafeAreaView style={styles.background}>
      {isGameStarted ? (
        <Animated.View
          onTouchStart={onCircleClickHandler}
          style={[styles.circle, animatedStyles]}
        />
      ) : (
        <View style={styles.container}>
          <Text onPress={start} style={styles.startButton}>
            Start
          </Text>
          <View style={styles.statsContainer}>
            <Text style={styles.scoreText}>Last score: {score}</Text>
            <Text style={styles.scoreText}>
              Average tap time: {averageTapTime.toPrecision(2)} tap/s
            </Text>
            <Text style={styles.scoreText}>Game time: {gameTime}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

export default Game
