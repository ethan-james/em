import './App.css'
import initDB, * as db from './data-providers/dexie'
import { store } from './store'
import { getContexts, getThought, getAllChildren, getChildrenRanked } from './selectors'
import { State } from './util/initialState'

// util
import {
  hashContext,
  hashThought,
  initEvents,
  initFirebase,
  owner,
  urlDataSource,
} from './util'

// action-creators
import {
  loadFromUrl,
  loadLocalState,
  preloadSources,
} from './action-creators'

/** Initilaize local db , firebase and window events. */
export const initialize = async () => {

  // load local state unless loading a public context or source url
  await initDB()
  const src = urlDataSource()
  const thoughtsLocalPromise = owner() === '~'
    // authenticated or offline user
    ? store.dispatch(src
      ? await loadFromUrl(src)
      : loadLocalState())
    // other user context
    : Promise.resolve()

  // load =preload sources
  thoughtsLocalPromise.then(() => {
    // extra delay for good measure to not block rendering
    setTimeout(() => {
      store.dispatch(preloadSources)
    }, 500)
  })

  // allow initFirebase to start the authentication process, but pass the thoughtsLocalPromise promise so that loadRemoteState will wait, otherwise it will try to repopulate local db with data from the remote
  initFirebase({ thoughtsLocalPromise: thoughtsLocalPromise })

  // initialize window events
  initEvents()

  return thoughtsLocalPromise

}

/** Partially apply state to a function. */
const withState = <T, R>(f: (state: State, ...args: T[]) => R) =>
  (state: State, ...args: T[]) => f(store.getState(), ...args)

// add objects to window for debugging
window.em = {
  db,
  store,
  getContexts: withState(getContexts),
  getThought: withState(getThought),
  getAllChildren: withState(getAllChildren),
  getChildrenRanked: withState(getChildrenRanked),
  hashContext,
  hashThought,
}
