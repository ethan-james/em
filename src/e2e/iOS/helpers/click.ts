import tap from './tap'
import waitForElement from './waitForElement'

/**
 * Click a node by selector or element with an optional x,y offset.
 * Note: The text character offset option from the Puppeteer version is not supported in WDIO/XCUITest.
 */
const click = async (selector: string) => {
  const el = await waitForElement(selector, { timeout: 10000 })

  if (!el) throw new Error(`editable node for the given selector(${selector}) not found.`)

  await tap(el)
}

export default click
