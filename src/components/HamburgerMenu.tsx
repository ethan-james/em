import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '../../styled-system/css'
import Index from '../@types/IndexType'
import { toggleSidebarActionCreator as toggleSidebar } from '../actions/toggleSidebar'
import { isSafari, isTouch } from '../browser'
import usePositionFixed from '../hooks/usePositionFixed'
import distractionFreeTypingStore from '../stores/distractionFreeTyping'
import fastClick from '../util/fastClick'
import FadeTransition from './FadeTransition'

const lineClassName = css({
  display: 'block',
  width: '100%',
  position: 'absolute',
  background: 'fg',
})

/** Basic menu with three horizontal lines. */
function Menu(props: { width?: number; height?: number; strokeWidth?: number }) {
  const width = `${props.width || 36}px`
  const height = `${props.height || 30}px`
  const halfHeight = `${parseInt(height.replace('px', '')) / 2}px`
  const strokeWidth = props.strokeWidth || 2
  const halfStrokeWidth = `-${strokeWidth / 2}px`

  const styles: Index<React.CSSProperties> = {
    container: {
      width,
      height,
    },
    lineBase: {
      height: `${strokeWidth}px`,
    },
    firstLine: {
      marginTop: halfStrokeWidth,
    },
    secondLine: {
      top: halfHeight,
      marginTop: halfStrokeWidth,
    },
    thirdLine: {
      marginTop: height,
    },
  }

  return (
    <div style={styles.container} className={css({ position: 'relative' })}>
      <span className={lineClassName} style={{ ...styles.lineBase, ...styles.firstLine }}></span>
      <span className={lineClassName} style={{ ...styles.lineBase, ...styles.secondLine }}></span>
      <span className={lineClassName} style={{ ...styles.lineBase, ...styles.thirdLine }}></span>
    </div>
  )
}

/** An options menu with three little bars that looks like a hamburger. */
const HamburgerMenu = () => {
  const distractionFreeTyping = distractionFreeTypingStore.useState()
  const dispatch = useDispatch()
  const fontSize = useSelector(state => state.fontSize)
  const positionFixedStyles = usePositionFixed()

  const width = fontSize * 1.3
  const paddingTop = 15 + fontSize * 0.1

  return (
    <FadeTransition in={!distractionFreeTyping} type='distractionFreeTyping' unmountOnExit>
      <div
        aria-label='menu'
        className={css({
          zIndex: 'hamburgerMenu',
          userSelect: 'none',
          cursor: 'pointer',
          /* prevent long press to select */
          /* user-select is not inherited */
          '& *': {
            userSelect: 'none',
          },
        })}
        style={{
          ...positionFixedStyles,
          padding: `${paddingTop}px 15px 10px 15px`,
          // On macOS, if the user cancels a drag and then switches tabs, upon returning mouseup will fire at coordinates (0,0), triggering fastClick on any element located at (0,0).
          // Therefore, position the HamburgerMenu at top: 1px so that the sidebar is not accidentally opened on tab change.
          top: `calc(${positionFixedStyles.top} + 1px)`,
        }}
        {...fastClick(e => {
          // TODO: Why does the sidebar not open with fastClick or onTouchEnd without a setTimeout?
          // onClick does not have the same problem
          setTimeout(() => {
            dispatch(toggleSidebar({}))
          }, 10)
          // There is no click event fired when the sidebar is opened on iOS Safari, but there is one fired when it is closed via hamburger menu. This extraneous click event doesn't
          // interfere as long as we want the keyboard to stay closed when users close the sidebar, but if we want to restore focus to an Editable then it will need to be suppressed.
          if (isTouch && isSafari()) {
            e.preventDefault()
          }
        })}
      >
        <Menu width={width} height={width * 0.7} strokeWidth={fontSize / 20} />
      </div>
    </FadeTransition>
  )
}

export default HamburgerMenu
