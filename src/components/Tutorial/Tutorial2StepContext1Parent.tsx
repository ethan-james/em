import { isEqual } from 'lodash'
import { useSelector } from 'react-redux'
import { isTouch } from '../../browser'
import newThoughtCommand from '../../commands/newThought'
import { HOME_TOKEN, TUTORIAL_CONTEXT1_PARENT } from '../../constants'
import { getAllChildrenAsThoughts } from '../../selectors/getChildren'
import selectTutorialChoice from '../../selectors/selectTutorialChoice'
import ellipsize from '../../util/ellipsize'
import headValue from '../../util/headValue'
import joinConjunction from '../../util/joinConjunction'
import TutorialGestureDiagram from './TutorialGestureDiagram'
import TutorialHint from './TutorialHint'

// eslint-disable-next-line jsdoc/require-jsdoc
const Tutorial2StepContext1Parent = () => {
  const tutorialChoice = useSelector(selectTutorialChoice)
  const cursor = useSelector(state => state.cursor)
  const hasQuotes = useSelector(state => state.cursor && headValue(state, state.cursor)?.startsWith('"'))
  const rootChildren = useSelector(state => getAllChildrenAsThoughts(state, HOME_TOKEN), isEqual)

  return (
    <>
      <p>
        Excellent choice. Now create a new thought with the text “{TUTORIAL_CONTEXT1_PARENT[tutorialChoice]}”
        {hasQuotes ? ' (without quotes)' : null}.
      </p>
      <p>
        You should create this thought at the top level, i.e. not <i>within</i> any other thoughts.
        <TutorialHint>
          <br />
          <br />
          {rootChildren.length > 0 && (!cursor || cursor.length > 1) ? (
            <>
              Select {rootChildren.length === 1 ? 'the top-level thought' : 'one of the top-level thoughts'} (
              {joinConjunction(
                rootChildren.map(child => `"${ellipsize(child.value)}"`),
                'or',
              )}
              ).{' '}
            </>
          ) : null}
          {isTouch ? 'Trace the line below with your finger' : 'Hit the Enter key'} to create a new thought. Then type "
          {TUTORIAL_CONTEXT1_PARENT[tutorialChoice]}".
          <TutorialGestureDiagram gesture={newThoughtCommand.gesture} />
        </TutorialHint>
      </p>
    </>
  )
}

export default Tutorial2StepContext1Parent
