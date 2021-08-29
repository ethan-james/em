import { HOME_TOKEN } from '../../constants'
import { hashContext, initialState, reducerFlow } from '../../util'
import { exportContext } from '../../selectors'
import { State } from '../../@types'

// reducers
import newSubthought from '../newSubthought'
import newThought from '../newThought'
import setCursor from '../setCursor'
import toggleAttribute from '../toggleAttribute'

it('toggle on', () => {
  const steps = [
    newThought('a'),
    toggleAttribute({
      context: ['a'],
      key: '=test',
      value: 'hello',
    }),
  ]

  // run steps through reducer flow and export as plaintext for readable test
  const stateNew = reducerFlow(steps)(initialState())
  const exported = exportContext(stateNew, [HOME_TOKEN], 'text/plain')

  expect(exported).toBe(`- ${HOME_TOKEN}
  - a
    - =test
      - hello`)
})

it('toggle off', () => {
  const steps = [
    newThought('a'),
    toggleAttribute({
      context: ['a'],
      key: '=test',
      value: 'hello',
    }),
    toggleAttribute({
      context: ['a'],
      key: '=test',
      value: 'hello',
    }),
  ]

  // run steps through reducer flow and export as plaintext for readable test
  const stateNew = reducerFlow(steps)(initialState())
  const exported = exportContext(stateNew, [HOME_TOKEN], 'text/plain')

  expect(exported).toBe(`- ${HOME_TOKEN}
  - a`)
})

it('different value should override existing value', () => {
  const steps = [
    newThought('a'),
    toggleAttribute({
      context: ['a'],
      key: '=test',
      value: 'hello',
    }),
    toggleAttribute({
      context: ['a'],
      key: '=test',
      value: 'goodbye',
    }),
  ]

  // run steps through reducer flow and export as plaintext for readable test
  const stateNew = reducerFlow(steps)(initialState())
  const exported = exportContext(stateNew, [HOME_TOKEN], 'text/plain')

  expect(exported).toBe(`- ${HOME_TOKEN}
  - a
    - =test
      - goodbye`)
})

it('add attribute if key has already been created', () => {
  const steps = [
    newThought('a'),
    newSubthought('=test'),
    (newState: State) => setCursor(newState, { path: [hashContext(newState, ['a'])!] }),
    toggleAttribute({
      context: ['a'],
      key: '=test',
      value: 'hello',
    }),
  ]

  // run steps through reducer flow and export as plaintext for readable test
  const stateNew = reducerFlow(steps)(initialState())
  const exported = exportContext(stateNew, [HOME_TOKEN], 'text/plain')

  expect(exported).toBe(`- ${HOME_TOKEN}
  - a
    - =test
      - hello`)
})
