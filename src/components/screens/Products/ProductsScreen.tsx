import React, { Fragment, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import products from '../../../data/products.json'
import Categories from './components/Categories/Categories'
import Products from './components/Products/Products'
import { COLORS } from '@constants/themes'
import Product from '@customtypes/product'
import { defaultCategories } from '@utils/results'

const ProductsScreen: React.FC = () => {
  const [items, setItems] = useState<Product[]>(products.items)
  const [categories, setCategories] = useState<string[]>(defaultCategories)
  const [activeCategory, setCategory] = useState<string>(defaultCategories[0])
  const [activeIndex, setActiveIndex] = useState<number>(0)

  useEffect(() => {
    setActiveIndex(categories.indexOf(activeCategory))
  }, [activeCategory, categories])

  useEffect(() => {
    setCategories(defaultCategories)
    setItems(products.items)
    setCategory(defaultCategories[0])
  }, [])

  return (
    <View style={styles.container}>
      {items.length ? (
        <Fragment>
          <Categories
            activeCategory={activeCategory}
            data={categories}
            setCategory={setCategory}
          />
          <Products
            activeIndex={activeIndex}
            categories={categories}
            products={items}
          />
        </Fragment>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.wildSand,
    flex: 1,
  },
})

export default ProductsScreen
