
import Header from './components/Header'
import Counter from './components/Counter'
import CounterHooks from './components/CounterHooks'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

function App() {
  return (
    <>
      <div className="container">
        <Header number={4} />
      </div>
      <Counter initialCount={1} />
      <CounterHooks initialCount={0} />
      <DatePicker></DatePicker>
      <DatePicker></DatePicker>
    </>
  );
}

export default App;
