import React, {useCallback, useEffect, useMemo, useState} from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {Icon} from '@rneui/themed'
import {
  SafeAreaView,
  Text,
  View,
  useWindowDimensions,
  Alert,
} from 'react-native'

import {AppContext} from '../context/AppContext'
import {useRealm} from '../realm'

import styles from './Game.styles'
import shared from '../styles/shared'

const GAME_TIME = 10000

const Game = () => {
  const {startGame, stopGame, isGameStarted, isShrinking, isEndless} =
    React.useContext(AppContext)
  const {height, width} = useWindowDimensions()
  const [score, setScore] = useState<number>(0)
  const [gameTime, setGameTime] = useState<number>(0)
  const [gameTimerId, setGameTimerId] = useState<number>(0)
  const [averageTapTime, setAverageTapTime] = useState<number>(0)
  const [timerId, setTimerId] = useState<number>(0)
  const [level, setLevel] = useState<number>(1)
  const [circleWidth, setCircleWidth] = useState<number>(100)
  const realm = useRealm()

  const offsetTop = useSharedValue(Math.floor(Math.random() * (height - 200)))
  const offsetLeft = useSharedValue(Math.floor(Math.random() * (width - 100)))
  const pressed = useSharedValue(false)

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
    if (isShrinking && isGameStarted) {
      const interval = setInterval(() => {
        setCircleWidth(w => w - level)
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isShrinking, isGameStarted, level])

  useEffect(() => {
    if (circleWidth < 3) {
      stopGame()
    }
  }, [circleWidth, stopGame])

  const onTouchHandler = useCallback(() => {
    setScore(newScore => newScore + 1)
    setCircleWidth(100)
  }, [])

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(offsetLeft.value),
      },
      {
        translateY: withSpring(offsetTop.value),
      },
      {
        scale: withSpring(pressed.value ? 1.5 : 1),
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
        realm.write(() => {
          realm.create('Score', {
            score,
            gameTime,
            isEndless,
            date: new Date().toLocaleDateString(),
          })
        })
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
    // We need to disable eslint here because we should not rely on isEndless value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameTime, gameTimerId, isGameStarted, score, timerId])

  const gesture = useMemo(
    () =>
      Gesture.Tap()
        .onBegin(() => {
          pressed.value = true
          offsetTop.value = Math.floor(Math.random() * (height - 200))
          offsetLeft.value = Math.floor(Math.random() * (width - 100))
        })
        .onFinalize(() => {
          pressed.value = false
        }),
    [height, offsetLeft, offsetTop, pressed, width],
  )

  return (
    <SafeAreaView style={styles.background}>
      {isGameStarted ? (
        <GestureDetector gesture={gesture}>
          <Animated.View
            onTouchEnd={onTouchHandler}
            style={[styles.circle, animatedStyles]}
          />
        </GestureDetector>
      ) : (
        <View style={styles.container}>
          <Icon
            type="material"
            name="play-circle-outline"
            onPress={start}
            size={120}
            color={shared.color}
          />
          {isEndless && isShrinking && (
            <Text style={styles.helpText}>
              "Shrinking Circle Challenge" is enabled!
            </Text>
          )}
          {isEndless && isShrinking && (
            <Text style={styles.helpText}>
              "Shrinking Circle Challenge" is a game mode where players must tap
              as many circles as possible before they shrink to nothing. The
              circles start out large and gradually decrease in size over time,
              adding an element of urgency to the gameplay.
            </Text>
          )}
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
