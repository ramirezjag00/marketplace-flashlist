import React, { ReactElement, memo } from 'react'
import { StyleSheet } from 'react-native'

import { FlashList } from '@shopify/flash-list'

import CategoryItem from './CategoryItem'

interface Props {
  data: string[]
  activeCategory: string
  setCategory: (item: string) => void
}

const Categories: React.FC<Props> = (props) => {
  const { activeCategory, data, setCategory } = props
  console.log(activeCategory)
  const onItemPress = (item: string) => (): void => setCategory(item)

  const renderItem = ({ item }: { item: string }): ReactElement => {
    return (
      <CategoryItem
        onPress={onItemPress}
        style={styles.categoryContainer}
        title={item}
      />
    )
  }

  const getItemType = () => 'row'

  return (
    <FlashList
      data={data}
      estimatedItemSize={50}
      getItemType={getItemType}
      horizontal={true}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 14,
    paddingVertical: 5,
  },
})

export default memo(Categories)
