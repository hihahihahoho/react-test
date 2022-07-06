import React, { Component } from 'react'
import { DatePicker } from 'antd';

interface props {
  initialCount?: number
}

interface state {
  count?: number
}

type AppProps = {
  message: string;
};

export function Welcome({ message }: AppProps) {
  return (
    <h1><DatePicker></DatePicker></h1>
  );
}
class Counter extends Component<props, state> {

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

export default Counter;
