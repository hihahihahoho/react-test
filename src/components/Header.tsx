
import React, { useState, useEffect } from 'react';
import './Header.css'
import { ReactComponent as ReactLogo } from '@media/icons/adjustments-alt.svg'

interface props {
  title?: string,
  titleClassName?: string,
  number?: number
}

const Header: React.FC<props> = (props) => {
  const [state, setState] = useState({ focus: false });
  var focus = state.focus;
  var focusClassName = ''
  const onFocus = () => {
    setState({ focus: true })
  }
  const onBlur = () => {
    setState({ focus: false })
  }
  useEffect(() => {
    if (focus) {
      Promise.resolve().then(() => console.log('promise'))
    }
  });
  
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
