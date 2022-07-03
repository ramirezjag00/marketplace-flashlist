import React, { memo, ReactElement, useEffect, useMemo, useRef } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { FlashList } from '@shopify/flash-list'

import ProductItem from './ProductItem'
import { COLORS } from '@constants/themes'
import Product from '@customtypes/product'

interface Props {
  categories: string[]
  products: Product[]
  activeIndex: number
}

type DataItem = Product | string

const renderItem = ({ item }: { item: DataItem }): ReactElement => {
  if (typeof item === 'string') {
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeaderText}>{item}</Text>
      </View>
    )
  } else {
    return <ProductItem item={item} />
  }
}

const Products: React.FC<Props> = (props) => {
  const { activeIndex, categories, products } = props
  const listRef = useRef<FlashList<DataItem>>(null)

  const data: DataItem[] = useMemo(() => [], [])

  categories.forEach((category: string) => {
    data.push(
      ...[
        category,
        ...products
          .filter((item: Product): boolean => item.category === category)
          .sort((a: Product, b: Product): number => {
            const itemA = a.name
            const itemB = b.name

            let comparison = 0
            if (itemA > itemB) {
              comparison = 1
            } else if (itemA < itemB) {
              comparison = -1
            }

            return comparison
          }),
      ],
    )
  })

  useEffect(() => {
    if (listRef.current) {
      listRef.current?.scrollToIndex({
        animated: true,
        index: data.indexOf(categories[activeIndex]),
      })
    }
  }, [activeIndex, categories, data])

  const getItemType = (item: DataItem) =>
    typeof item === 'string' ? 'sectionHeader' : 'row'

  return (
    <FlashList
      ref={listRef}
      contentContainerStyle={styles.container}
      data={data}
      estimatedItemSize={100}
      extraData={data}
      getItemType={getItemType}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.wildSand,
  },
  sectionHeaderContainer: {
    backgroundColor: COLORS.wildSand,
    borderBottomColor: COLORS.boulder,
    borderBottomWidth: 1,
    paddingLeft: 20,
  },
  sectionHeaderText: {
    color: COLORS.mineShaft,
    fontSize: 20,
    paddingBottom: 12,
    paddingTop: 12,
  },
})

export default memo(Products)
