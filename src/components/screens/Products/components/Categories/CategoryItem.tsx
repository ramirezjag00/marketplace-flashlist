import React, { memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'

import { COLORS } from '@constants/themes'

interface Props {
  style: ViewStyle
  onPress: (item: string) => () => void
  title: string
}

const CategoryItem: React.FC<Props> = (props) => {
  const { style, onPress, title } = props

  return (
    <TouchableOpacity onPress={onPress(title)} style={style}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  title: {
    color: COLORS.mineShaft,
    fontSize: 16,
    paddingBottom: 5,
    textAlign: 'center',
  },
})

export default memo(CategoryItem)
