
import Header from './components/Header'
import Counter, { Welcome } from './components/Counter'
import CounterHooks from './components/CounterHooks'
import { DatePicker, Form, Input } from 'antd';
import 'antd/dist/antd.css';
import { UDatePicker } from './components/Udatepicker';

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
      <UDatePicker title='Tùng' picker='week' placeholder='Chọn ngày' textLeft={ <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmlldG5hbSUyMGJlYWNofGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" /> }></UDatePicker>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
    </>
  );
}

export default App;
