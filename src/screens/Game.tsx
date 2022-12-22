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

import styles from '../app.styles'
import {AppContext} from '../context/AppContext'

const GAME_TIME = 10000

const Game = () => {
  const {startGame, stopGame, isGameStarted, isSizeChange, isEndless} =
    React.useContext(AppContext)
  const {height, width} = useWindowDimensions()
  const [score, setScore] = useState<number>(0)
  const [timerId, setTimerId] = useState<number>(0)
  const [level, setLevel] = useState<number>(1)
  const [circleWidth, setCircleWidth] = useState<number>(100)

  const isLandscape = height < width
  const heightOffset = isLandscape ? 100 : 200
  const widthOffset = isLandscape ? 200 : 100

  const randomTopValue = Math.floor(Math.random() * (height - heightOffset))
  const randomLeftValue = Math.floor(Math.random() * (width - widthOffset))
  const offsetTop = useSharedValue(randomTopValue)
  const offsetLeft = useSharedValue(randomLeftValue)

  const centerCircle = useCallback(() => {
    offsetTop.value = (height - heightOffset) / 2
    offsetLeft.value = (width - widthOffset) / 2
  }, [height, heightOffset, offsetLeft, offsetTop, width, widthOffset])

  const start = useCallback(() => {
    startGame()
    centerCircle()
    setScore(0)
    if (!isEndless) {
      const timer = setTimeout(stopGame, GAME_TIME)
      setTimerId(timer)
    }
  }, [centerCircle, isEndless, startGame, stopGame])

  const stop = useCallback(() => {
    stopGame()
    setCircleWidth(100)
    setLevel(1)
  }, [stopGame])

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
      stop()
    }
  }, [circleWidth, stop])

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
      }
      if (timerId) {
        clearTimeout(timerId)
      }
      setCircleWidth(100)
    }
  }, [isGameStarted, score, timerId])

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
          <Text style={styles.scoreText}>Last score: {score}</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default Game
