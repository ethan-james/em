import { isTouch } from '../../browser'
import { commandById } from '../../commands'
import TutorialGestureDiagram from './TutorialGestureDiagram'
import TutorialHint from './TutorialHint'

// eslint-disable-next-line jsdoc/require-jsdoc
const TutorialStepSecondThought = () => (
  <>
    <p>Well done!</p>
    <p>
      Try adding another thought. Do you remember how to do it?
      <TutorialHint>
        <br />
        <br />
        {isTouch ? 'Trace the line below with your finger' : 'Hit the Enter key'} to create a new thought.
        <TutorialGestureDiagram gesture={commandById('newThought').gesture} />
      </TutorialHint>
    </p>
  </>
)

export default TutorialStepSecondThought
