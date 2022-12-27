import React from 'react'
import { useSelector } from 'react-redux'
import IconType from '../../@types/Icon'
import themeColors from '../../selectors/themeColors'

/** Device icon. */
const DeviceIcon = ({ fill, size = 20, style }: IconType) => {
  const colors = useSelector(themeColors)
  return (
    <svg className='icon' width={size} height={size} fill={fill || colors.fg} style={style} viewBox='150 70 400 420'>
      <g>
        <path d='m264.32 446.88c0 8.9688-7.2695 16.242-16.242 16.242-8.9688 0-16.238-7.2734-16.238-16.242s7.2695-16.238 16.238-16.238c8.9727 0 16.242 7.2695 16.242 16.238' />
        <path d='m421.12 409.92c0 8.9688-7.2734 16.238-16.242 16.238s-16.238-7.2695-16.238-16.238c0-8.9727 7.2695-16.242 16.238-16.242s16.242 7.2695 16.242 16.242' />
        <path d='m512.96 67.199h-213.92c-20.16 0-38.641 17.922-38.641 37.52v40.883h-70c-26.32 0-47.602 21.281-47.602 47.602v246.4c0 26.32 21.281 47.602 47.602 47.602h112c19.039 0 35.84-11.762 43.121-28h167.44c20.16 0 38.641-17.922 38.641-37.52v-316.96c0-19.598-18.48-37.52-38.641-37.52zm-322.56 95.199h112c16.801 0 30.801 14 30.801 30.801v8.4023h-173.6v-8.3984c0-16.805 14-30.805 30.797-30.805zm-30.797 56h173.6v190.4l-173.6 0.003906zm142.8 252h-112c-16.801 0-30.801-14-30.801-30.801l0.003906-13.996h173.6v14c-0.003906 16.797-14.004 30.797-30.805 30.797zm232.4-48.719c0 10.641-10.641 20.719-21.84 20.719h-162.96v-2.8008-246.4c0-26.32-21.281-47.602-47.602-47.602l-25.199 0.003906v-40.879c0-10.641 10.641-20.719 21.84-20.719h214.48c11.199 0 21.84 10.078 21.84 20.719v316.96z' />
      </g>
    </svg>
  )
}

export default DeviceIcon
