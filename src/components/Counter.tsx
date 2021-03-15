import React, { Component } from 'react'

interface props {
  initialCount?: number
}

interface state {
  count?: number
}

export default class Counter extends Component<props, state> {

  constructor(props: props) {
    super(props);
    this.state = {
      count: props.initialCount
    }
  }

  render() {

    return (
      <div>
        <button className="btn" onClick={() => this.changeCount(-1)}>-</button>
        <span>{this.state.count}</span>
        <button onClick={() => this.changeCount(1)}>+</button>
      </div>
    )
  }

  changeCount(amount: number) {
    this.setState((prevState) => {
      if (prevState.count !== undefined) {
        return { count: prevState.count + amount }
      }
      else {
        return { count: 0 }
      }
    });
  }
}