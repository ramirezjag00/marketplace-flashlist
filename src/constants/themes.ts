import { StyleSheet } from 'react-native'

import type {
  ColorsInterface,
  ThemesInterface,
  StyleSheetInterface,
} from '@customtypes/themes'

// naming convention using vs-code extension: "Name that color"
const COLORS: ColorsInterface = {
  boulder: '#7a7a7a',
  mineShaft: '#202020',
  tamarillo: '#991912',
  wildSand: '#f7f7f7',
}

const CONTAINERS: StyleSheetInterface = StyleSheet.create({
  centerCenter: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

const THEMES: ThemesInterface = {
  COLORS,
  CONTAINERS,
}

export { COLORS, CONTAINERS, THEMES }
