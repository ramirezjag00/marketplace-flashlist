import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import Brand from '@common/Brand'
import { COLORS } from '@constants/themes'
import Product from '@customtypes/product'

interface Props {
  item: Product
}

const CategoryItem: React.FC<Props> = (props) => {
  const { item } = props
  const { price, name, brand } = item

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.subDetails}>
          <Brand name={brand} />
          <Text style={styles.price}>₱{price.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.wildSand,
    borderBottomColor: COLORS.boulder,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  details: {
    flex: 1,
    paddingRight: 20,
  },
  title: {
    color: COLORS.mineShaft,
    fontSize: 14,
  },
  subDetails: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  price: {
    alignSelf: 'center',
    color: COLORS.mineShaft,
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default CategoryItem
