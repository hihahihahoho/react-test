
import Header from './components/Header'
import Counter, { Welcome } from './components/Counter'
import CounterHooks from './components/CounterHooks'
import { DatePicker, Form, Input } from 'antd';
import 'antd/dist/antd.css';
import { UDatePicker } from './components/Udatepicker';
import SearchInput from './components/TestSearch';

function App() {
  return (
    <>
      <div className="container">
        <Header number={4} />
      </div>
      <Counter initialCount={1} />
      <CounterHooks initialCount={0}>
        Tùng
      </CounterHooks>
      <DatePicker></DatePicker>
      <DatePicker></DatePicker>
      <Welcome message='ádf'></Welcome>
      <UDatePicker title='Tùng' placeholder='Chọn ngày' contentLeft={ <img src="" alt="" /> }></UDatePicker>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <SearchInput></SearchInput>
    </>
  );
}

export default App;
