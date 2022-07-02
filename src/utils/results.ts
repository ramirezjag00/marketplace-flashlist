import products from '../data/products.json'
import asyncFilter from './asyncFilter'
import Product from '@customtypes/product'
import ProductResults from '@customtypes/results'

const productResults = async (value: string): Promise<ProductResults> => {
  const filteredByName = await asyncFilter(products.items, (obj: Product) =>
    obj.name.toLowerCase().includes(value.toLowerCase()),
  )
  const filteredByBrand = await asyncFilter(products.items, (obj: Product) =>
    obj.brand.toLowerCase().includes(value.toLowerCase()),
  )
  const filteredByCategory = await asyncFilter(products.items, (obj: Product) =>
    obj.category.toLowerCase().includes(value.toLowerCase()),
  )
  const mergedResults = [
    ...filteredByName,
    ...filteredByBrand,
    ...filteredByCategory,
  ]
  const refinedResults = [
    ...new Map(mergedResults.map((o) => [o.id, o])).values(),
  ].sort((a: Product, b: Product): number => {
    const itemA = a.name
    const itemB = b.name

    let comparison = 0
    if (itemA > itemB) {
      comparison = 1
    } else if (itemA < itemB) {
      comparison = -1
    }

    return comparison
  })

  const refinedCategories = refinedResults
    .reduce((final: string[], obj: Product) => {
      if (!final.includes(obj.category)) {
        return [...final, obj.category]
      } else {
        return [...final]
      }
    }, [])
    .sort()

  return {
    items: refinedResults,
    categories: refinedCategories,
  }
}

const defaultCategories = products.items
  .reduce((final: string[], obj: Product) => {
    if (!final.includes(obj.category)) {
      return [...final, obj.category]
    } else {
      return [...final]
    }
  }, [])
  .sort()

export { productResults as default, defaultCategories }
