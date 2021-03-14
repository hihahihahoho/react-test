
import React, { useState } from 'react';
import './Header.css'
import { ReactComponent as ReactLogo } from '@media/icons/adjustments-alt.svg'

interface props {
  title?: String,
  titleClassName?: String,
  number?: Number
}

const Header:React.FC<props> = (props) => {
  const [state, setState] = useState({ focus: false });
  var focus = state.focus;
  var focusClassName = ''
  const onFocus = () => {
    setState({ focus: true })
  }
  const onBlur = () => {
    setState({ focus: false })
  }
  if (focus) {
    focusClassName = ' focused'
  } else {
    focusClassName = ''
  }
  return (
    <div>
      <h1 className={props.titleClassName + `${focusClassName}`}>{props.title} {props.number} </h1>
      <ReactLogo />
      <input type="text" onFocus={onFocus} onBlur={onBlur} />
    </div>
  )
}


Header.defaultProps = {
  title: 'Task Tracker 3',
  titleClassName: 'class-name',
}


export default Header