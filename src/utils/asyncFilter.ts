import Product from '@customtypes/product'

const asyncFilter = async (
  arr: Product[],
  predicate: (obj: Product) => boolean,
): Promise<Product[]> => {
  const results = await Promise.all(arr.map(predicate))

  return arr.filter((_v, index) => results[index])
}

export default asyncFilter
