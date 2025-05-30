import Command from '../@types/Command'
import { showModalActionCreator as showModal } from '../actions/showModal'
import Icon from '../components/icons/HelpIcon'
import scrollTo from '../device/scrollTo'

const customizeToolbarCommand: Command = {
  id: 'customizeToolbar',
  label: 'Customize Toolbar',
  description: 'Add or remove buttons from the toolbar.',
  multicursor: false,
  svg: Icon,
  exec: dispatch => {
    dispatch(showModal({ id: 'customizeToolbar' }))
    scrollTo('top')
  },
  allowExecuteFromModal: true,
}

export default customizeToolbarCommand
