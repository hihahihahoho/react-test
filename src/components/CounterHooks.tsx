
import React, { useState } from 'react';

interface props {
  initialCount?: number,
}

const CounterHooks: React.FC<props> = (props) => {
  const [count, setCount] = useState(props.initialCount)
  const changeCount = (number: number) => {
    setCount((prevState) => {
      if (prevState !== undefined) {
        return prevState + number
      }
    })
  }
  const buttonMinusClick = () => {
    changeCount(-1)
  }
  const buttonPlusClick = () => {
    changeCount(1)
  }
  return (
    <div>
      <button onClick={buttonMinusClick}>-</button>
      <span>{count}</span>
      <button onClick={buttonPlusClick}>+</button>
    </div>
  )

}

CounterHooks.defaultProps = {
  initialCount: 0
}

export default CounterHooks