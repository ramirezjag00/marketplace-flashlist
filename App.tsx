import { SafeAreaView, StyleSheet } from 'react-native'

import Products from '@screens/Products/ProductsScreen'

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Products />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
