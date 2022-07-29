import { Select } from 'antd';
import axios from 'axios';
import qs from 'qs';
import React, { useState } from 'react';
import Highlighter from "react-highlight-words";
const { Option } = Select;
let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const fetch = (value: string, callback: (data: { value: string; text: string }[]) => void) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  const fake = () => {
    const str = qs.stringify({
      code: 'utf-8',
      q: value,
    });
    axios.get(`https://restapi.quiz.edu.vn/api_work/v1/searchtasks?q=${str}`)
      .then((response: any) => { return response.data.tasks })
      .then((d: any) => {
        if (currentValue === value) {
          const data = d.map((item: any, index: number) => ({
            value: index,
            search: currentValue,
            text: item['task_name']
          }));
          callback(data);
        }
      });
  };

  timeout = setTimeout(fake, 500);
};

const SearchInput: React.FC<{ placeholder?: string; style?: React.CSSProperties; }> = props => {
  const [data, setData] = useState<any[]>([]);
  const [value, setValue] = useState<string>();

  const handleSearch = (newValue: string) => {
    if (newValue) {
      fetch(newValue, setData);
    } else {
      setData([]);
    }
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const options = data.map(d => {return <Option key={d.value}><Highlighter
      highlightClassName="YourHighlightClass"
      searchWords={[d.search]}
      autoEscape={true}
      textToHighlight={d.text ? d.text : ''}
    /></Option>});

  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      className='width-100'
    >
      {options}
    </Select>
  );
};

export default SearchInput