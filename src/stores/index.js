import { createContext, useContext } from 'react'
import { useStaticRendering } from 'mobx-react'
import { HomeStore } from './homeStore'
import { ArticleStore } from './articleStore'
import { ChartStore } from './chartStore'
import { ReportStore } from './reportStore'
import { NewsTrendsStore } from './chartStore/newstrendsStore.js'
import { MediaTypeStore } from './chartStore/mediatypeStore.js'
import { WordCloudStore } from './chartStore/wordcloudStore.js'
import { MediaHotStore } from './chartStore/mediahotStore.js'
import { EmotionStore } from './chartStore/emotionStore.js'
import { RegionStore } from './chartStore/regionStore.js'
import { AllStore } from './chartStore/allStore.js'
import { ArtallStore } from './articleStore/artallStore.js'
import { CategoryStore } from './articleStore/categoryStore.js'
import { TagStore } from './articleStore/tagStore.js'


const isServer = typeof window === 'undefined'
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer)
const StoreContext = createContext()
let store = {
  homeStore: new HomeStore(),
  articleStore: new ArticleStore(),
  ArtallStore: new ArtallStore(),
  chartStore: new ChartStore(),
  ReportStore: new ReportStore(),
  NewsTrendsStore: new NewsTrendsStore(),
  MediaTypeStore: new MediaTypeStore(),
  WordCloudStore: new WordCloudStore(),
  MediaHotStore: new MediaHotStore(),
  EmotionStore: new EmotionStore(),
  RegionStore: new RegionStore(),
  AllStore: new AllStore(),
  categoryStore: new CategoryStore(),
  tagStore: new TagStore(),
}

// const getStore = (initialData={}) => ({
//   homeStore: new HomeStore(initialData.homeStore),
// })

// function initializeData(initialData = {}) {

//   if (isServer) {
//     return getStore(initialData)
//   }

//   if (!store) {
//     store = getStore(initialData)
//   }

//   return store
// }

// function StoreProvider({ children, initialData }) {
//   store = initializeData(initialData)

//   return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
// }

const useStores = () => (useContext(StoreContext) || {})

export { StoreContext, useStores, store }