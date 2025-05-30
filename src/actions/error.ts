import _ from 'lodash'
import State from '../@types/State'
import Thunk from '../@types/Thunk'
import { registerActionMetadata } from '../util/actionMetadata.registry'

/** Sets an error. */
const error = (state: State, { value }: { value: string | null }) => ({
  ...state,
  error: value,
})

/** Action-creator for error. */
export const errorActionCreator =
  ({ value }: Parameters<typeof error>[1]): Thunk =>
  (dispatch, getState) => {
    if (value !== getState().error) {
      dispatch({ type: 'error', value })
    }
  }

export default _.curryRight(error)

// Register this action's metadata
registerActionMetadata('error', {
  undoable: false,
})
