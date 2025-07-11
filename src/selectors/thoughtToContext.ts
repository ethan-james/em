import Context from '../@types/Context'
import State from '../@types/State'
import ThoughtId from '../@types/ThoughtId'
import { EM_TOKEN, HOME_PATH } from '../constants'
import getThoughtById from '../selectors/getThoughtById'
import isRoot from '../util/isRoot'

/**
 * Generates the Context for a Thought by traversing upwards to the root thought.
 */
const thoughtToContext = (state: State, thoughtId: ThoughtId, visited: Set<ThoughtId> = new Set()): Context => {
  // Detect cycles
  if (visited.has(thoughtId)) {
    console.error(`Cycle detected in parent chain for thought: ${thoughtId}`)
    return HOME_PATH
  }

  visited.add(thoughtId)

  // HOME_PATH is both a Path and a Context
  if (isRoot([thoughtId])) return [thoughtId]
  const thought = getThoughtById(state, thoughtId)
  return thought
    ? isRoot([thought.parentId]) || thought.id === EM_TOKEN
      ? [thought.value]
      : [...thoughtToContext(state, thought.parentId, visited), thought.value]
    : // TODO: Should probably return null if the thought is missing (i.e. not loaded into state)
      HOME_PATH
}

export default thoughtToContext
