import _ from 'lodash'
import State from '../@types/State'
import Thunk from '../@types/Thunk'
import { registerActionMetadata } from '../util/actionMetadata.registry'

/** Track editing independently of cursor to allow navigation when keyboard is hidden. */
const editing = (state: State, { value }: { value: boolean }) => ({
  ...state,
  editing: value,
})

/** Action-creator for editing. */
export const editingActionCreator =
  (payload: Parameters<typeof editing>[1]): Thunk =>
  dispatch =>
    dispatch({ type: 'editing', ...payload })

export default _.curryRight(editing)

// Register this action's metadata
registerActionMetadata('editing', {
  undoable: false,
})
