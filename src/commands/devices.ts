import Command from '../@types/Command'
import { showModalActionCreator as showModal } from '../actions/showModal'
import DeviceIcon from '../components/icons/DeviceIcon'

const command: Command = {
  id: 'devices',
  label: 'Device Management',
  description: 'Add or remove devices that can access and edit this thoughtspace.',
  multicursor: false,
  svg: DeviceIcon,
  exec: dispatch => dispatch(showModal({ id: 'devices' })),
  allowExecuteFromModal: true,
}

export default command
