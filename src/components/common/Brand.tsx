import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS } from '@constants/themes'

interface Props {
  name: string
}

const Brand: React.FC<Props> = (props) => {
  const { name } = props

  return (
    <View style={styles.brandContainer}>
      <Text style={styles.brand}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  brandContainer: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.wildSand,
    borderColor: COLORS.tamarillo,
    borderRadius: 10,
    borderWidth: 1,
  },
  brand: {
    color: COLORS.tamarillo,
    fontSize: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
})

export default Brand
