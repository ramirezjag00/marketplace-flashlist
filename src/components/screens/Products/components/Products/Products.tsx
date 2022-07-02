import React, { memo, ReactElement, useEffect, useMemo, useRef } from 'react'
import { Text, View, StyleSheet } from 'react-native'
// import EStyleSheet from 'react-native-extended-stylesheet'

import { FlashList } from '@shopify/flash-list'

import ProductItem from './ProductItem'
import { COLORS } from '@constants/themes'
import Product from '@customtypes/product'

const FOOTER_PADDING = 120

interface Props {
  categories: string[]
  products: Product[]
  activeIndex: number
}

type DataItem = Product | string

// const keyExtractor = (_: DataItem, index: number): string => index.toString()

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

// const sectionHeader = ({
//   section,
// }: {
//   section: SectionListData<Product>
// }): ReactElement | null => {
//   return section?.data?.length ? (

//   ) : null
// }

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

  // const stickyHeaderIndices = data
  //   .map((item: DataItem, index: number) => {
  //     if (typeof item === 'string') {
  //       return index
  //     } else {
  //       return null
  //     }
  //   })
  //   .filter((item) => item !== null) as number[]

  const getItemType = (item: DataItem) =>
    typeof item === 'string' ? 'sectionHeader' : 'row'

  return (
    <FlashList
      ref={listRef}
      // ListFooterComponent={cart.length ? <View style={styles.footer} /> : null}
      // extraData={products}
      // getItemLayout={(
      //   _data: SectionListData<Product, DefaultSectionT>[] | null,
      //   index: number,
      // ): ItemLayoutType => {
      //   return {
      //     length: ITEM_HEIGHT,
      //     offset: ITEM_HEIGHT * index + ITEM_PADDING,
      //     index,
      //   }
      // }}
      // initialNumToRender={20}
      // initialScrollIndex={activeIndex}
      // keyExtractor={keyExtractor}
      // renderSectionHeader={sectionHeader}
      // scrollEventThrottle={16}
      contentContainerStyle={styles.container}
      data={data}
      extraData={data}
      // stickySectionHeadersEnabled={false}
      estimatedItemSize={100}
      getItemType={getItemType}
      renderItem={renderItem}
      // stickyHeaderIndices={stickyHeaderIndices}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.wildSand,
  },
  sectionHeaderContainer: {
    backgroundColor: COLORS.wildSand,
    borderBottomColor: '#7a7a7a',
    borderBottomWidth: 1,
    paddingLeft: 20,
  },
  sectionHeaderText: {
    color: COLORS.mineShaft,
    fontSize: 20,
    // fontFamily: ,
    paddingBottom: 12,
    paddingTop: 12,
  },
  footer: {
    height: FOOTER_PADDING,
  },
})

export default memo(Products)
