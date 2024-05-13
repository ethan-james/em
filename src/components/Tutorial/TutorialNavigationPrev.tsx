import { useDispatch } from 'react-redux'
import { TUTORIAL_STEP_START } from '../../constants'
import { tutorialPrevActionCreator as tutorialPrev } from '../../reducers/tutorialPrev'
import TutorialNavigationButton from './TutorialNavigationButton'

// eslint-disable-next-line jsdoc/require-jsdoc
const TutorialNavigationPrev = ({ tutorialStep }: { tutorialStep: number }) => {
  const dispatch = useDispatch()
  return (
    <TutorialNavigationButton
      classes='tutorial-prev'
      disabled={tutorialStep === TUTORIAL_STEP_START}
      clickHandler={() => dispatch(tutorialPrev())}
      value='Prev'
    />
  )
}

export default TutorialNavigationPrev
