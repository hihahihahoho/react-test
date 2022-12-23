
// import loading from './media/loading.svg'
import Header from './components/Header'
import Counter, { Welcome } from './components/Counter'
import CounterHooks from './components/CounterHooks'
import { DatePicker, Form, Input, Select } from 'antd';
import 'antd/dist/antd.css';
import { CustomAntdSelect } from './components/Udatepicker';
import SearchInput from './components/TestSearch';
import { useState } from 'react';
import classnames from 'classnames';
import React from 'react';
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
      <MyFormItem>
        <Select></Select>
      </MyFormItem>
    </>
  );
}

type MyFormItemProps = {
  children: React.ReactNode;
};

function MyFormItem(props: MyFormItemProps) {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const className = classnames({
    'is-active': focused,
  });

  return (
    <Form.Item className={className}>
      {React.Children.map(props.children, (child: any) =>
        React.cloneElement(child, {
          ...child.props,
          onFocus: handleFocus,
          onBlur: handleBlur,
        })
      )}
    </Form.Item>
  );
}

export default App;
