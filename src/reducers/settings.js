// constants
import {
  EM_TOKEN
} from '../constants.js'

// util
import {
  getThoughtsRanked,
  isFunction,
  rankThoughtsFirstMatch,
} from '../util.js'

import existingThoughtChange from './existingThoughtChange'

// SIDE EFFECTS: localStorage, syncRemote
export default (state, { key, value }) => {

  const newValue = value.toString()

  const oldThoughtRanked = getThoughtsRanked([EM_TOKEN, 'Settings'].concat(key), state.thoughtIndex, state.contextIndex)
    .find(child => !isFunction(child.value))

  if (!oldThoughtRanked) {
    console.warn('Missing oldThoughtRanked in Settings update:', key, value)
    return {}
  }

  const context = [EM_TOKEN, 'Settings'].concat(key)

  return existingThoughtChange(state, {
    context,
    oldValue: oldThoughtRanked.value,
    newValue,
    thoughtsRanked: rankThoughtsFirstMatch(context, { state }).concat({
      value: newValue,
      rank: oldThoughtRanked.rank
    }),
  })
}
