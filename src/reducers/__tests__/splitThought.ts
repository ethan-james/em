import { HOME_TOKEN } from '../../constants'
import { initialState, reducerFlow } from '../../util'
import { childIdsToThoughts, exportContext } from '../../selectors'

// reducers
import newThought from '../newThought'
import splitThought from '../splitThought'

it('split thought', () => {
  const steps = [
    newThought('apple'),
    splitThought({
      splitResult: {
        left: 'ap',
        right: 'ple',
      },
    }),
  ]

  // run steps through reducer flow and export as plaintext for readable test
  const stateNew = reducerFlow(steps)(initialState())
  const exported = exportContext(stateNew, [HOME_TOKEN], 'text/plain')

  expect(exported).toBe(`- ${HOME_TOKEN}
  - ap
  - ple`)
})

it('cursor moves to second thought', () => {
  const steps = [
    newThought('apple'),
    splitThought({
      splitResult: {
        left: 'ap',
        right: 'ple',
      },
    }),
  ]

  // run steps through reducer flow
  const stateNew = reducerFlow(steps)(initialState())

  const cursorThoughts = childIdsToThoughts(stateNew, stateNew.cursor!)

  expect(cursorThoughts).toMatchObject([{ value: 'ple', rank: 1 }])
})
