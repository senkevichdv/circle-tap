import React, {useCallback, useEffect, useState} from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import {
  SafeAreaView,
  Text,
  Vibration,
  View,
  useWindowDimensions,
  Alert,
  Switch,
} from 'react-native'

import styles from './app.styles'

const GAME_TIME = 10000

const App = () => {
  const {height, width} = useWindowDimensions()
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const [timerId, setTimerId] = useState<number>(0)
  const [level, setLevel] = useState<number>(1)
  const [isEndless, setIsEndless] = useState<boolean>(false)
  const [isVibrationEnabled, setIsVibrationEnabled] = useState<boolean>(false)
  const [isReducingCircleSize, setIsReducingCirceSize] =
    useState<boolean>(false)
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

  const startGame = useCallback(() => {
    setIsGameStarted(true)
    centerCircle()
    setScore(0)
    const timer = setTimeout(() => setIsGameStarted(false), GAME_TIME)
    setTimerId(timer)
  }, [centerCircle])

  const startEndless = useCallback(() => {
    centerCircle()
    setIsEndless(true)
    setIsGameStarted(true)
    setScore(0)
  }, [centerCircle])

  const stopEndlessGame = useCallback(() => {
    setIsGameStarted(false)
    setIsEndless(false)
    setIsReducingCirceSize(false)
    setCircleWidth(100)
    setLevel(1)
  }, [])

  useEffect(() => {
    setLevel(Math.ceil(score / 5))
  }, [score])

  const startWithSizeReducing = useCallback(() => {
    setIsReducingCirceSize(true)
    startEndless()
  }, [startEndless])

  useEffect(() => {
    if (isReducingCircleSize && isGameStarted) {
      const interval = setInterval(() => {
        setCircleWidth(w => w - level)
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isReducingCircleSize, isGameStarted, level])

  useEffect(() => {
    if (circleWidth < 3) {
      stopEndlessGame()
    }
  }, [circleWidth, stopEndlessGame])

  const onCircleClickHandler = useCallback(() => {
    if (isVibrationEnabled) {
      Vibration.vibrate()
    }
    offsetTop.value = randomTopValue
    offsetLeft.value = randomLeftValue
    setScore(newScore => newScore + 1)
    setCircleWidth(100)
  }, [
    isVibrationEnabled,
    offsetLeft,
    offsetTop,
    randomLeftValue,
    randomTopValue,
  ])

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
  }, [isEndless, isGameStarted, score, timerId])

  const escButtonOffset = {
    right: width / 2 - 8,
    top: isLandscape ? 20 : 50,
  }
  return (
    <SafeAreaView style={styles.background}>
      {isGameStarted && isEndless && (
        <Text
          style={[styles.escButton, escButtonOffset]}
          onPress={stopEndlessGame}>
          ✕
        </Text>
      )}
      {isGameStarted ? (
        <Animated.View
          onTouchStart={onCircleClickHandler}
          style={[styles.circle, animatedStyles]}>
          {!isReducingCircleSize && <Text style={styles.score}>{score}</Text>}
        </Animated.View>
      ) : (
        <View style={styles.container}>
          <View style={styles.vibrationSwitch}>
            <Text style={styles.tapFeedbackButton}>Tap feedback</Text>
            <Switch
              value={isVibrationEnabled}
              onChange={() => setIsVibrationEnabled(!isVibrationEnabled)}
            />
          </View>
          <View style={styles.container}>
            <Text onPress={startGame} style={styles.startButton}>
              Start limited
            </Text>
            <Text onPress={startEndless} style={styles.startButton}>
              Start endless
            </Text>
            <Text onPress={startWithSizeReducing} style={styles.startButton}>
              Start endless with size change
            </Text>
            <Text style={styles.scoreText}>Last score: {score}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

export default App
