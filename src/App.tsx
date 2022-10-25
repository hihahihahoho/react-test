
// import loading from './media/loading.svg'
import Header from './components/Header'
import Counter, { Welcome } from './components/Counter'
import CounterHooks from './components/CounterHooks'
import { DatePicker, Form, Input, Select } from 'antd';
import 'antd/dist/antd.css';
import { CustomAntdSelect } from './components/Udatepicker';
import SearchInput from './components/TestSearch';
const { Option } = Select;

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
      <Form layout="vertical" autoComplete="off">
        <Form.Item
          name="username"
        >
          <CustomAntdSelect placeholder='Chọn ngày' title='Select' allowClear={true} onChange={(evt) => console.log(evt)}>
            <Option value="jack">Jack (100)</Option>
            <Option value="lucy">Lucy (101)</Option>
          </CustomAntdSelect>
        </Form.Item>
        <Form.Item
          name="username2"
        >
        </Form.Item>
        <Form.Item>
          <Input></Input>
        </Form.Item>
      </Form>
      <SearchInput></SearchInput>

    </>
  );
}

export default App;
