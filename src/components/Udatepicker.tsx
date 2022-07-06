import React, { useLayoutEffect, useRef, useState } from "react";
import { DatePicker, DatePickerProps, Input, Select } from "antd";
const { Option } = Select;

interface DefaultProps {
  title?: string,
  textLeft?: any,
  focus?: boolean,
}

type props = DatePickerProps & DefaultProps;
const inputState = {
  focus: false,
  value: true
}

const UDatePickerLabel: React.FC<DefaultProps> = (props) => {
  let focusText: string = '';
  const targetRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 0 });
  focusText = props.focus ? 'is-focused' : '';
  useLayoutEffect(() => {
    setDimensions({
      width: targetRef?.current?.offsetWidth,
    });
  }, []);
  const style = `.p-ant-left-${dimensions.width}.ant-picker, .p-ant-left-${dimensions.width} .ant-select-selector { padding-left: ${dimensions.width}px!important }`
  console.log(dimensions)
  return (
    <div className={`form-group ${focusText} p-ant-left-${dimensions.width}`}>
      <style> {style}</style>
      {
        props.title && <div className="title">
          {props.title}
        </div>
      }
      <div className="text-left inline-block" ref={targetRef}>{props.textLeft}</div>
      <div className="datepicker">
        {/* {Children.map(props.children, (children) => {
          return (
            React.isValidElement(children) && cloneElement(children, { className: `p-ant-left-${dimensions.width}` })
          )
        })} */}
        {props.children}
      </div>
    </div>
  )
}

const UDatePicker: React.FC<Omit<props, 'focus'>> = (props) => {
  const [focusDate, setFocusDate] = useState(inputState);
  const [searchText, setsearchText] = useState("");
  const onFocus = () => {
    setFocusDate(prevState => {
      return { ...prevState, focus: true }
    });
  }
  const onBlur = () => {
    setFocusDate(prevState => {
      return { ...prevState, focus: false }
    });
  }
  const onInputSearch = (evt: any) => {
    return setsearchText(evt.target.value)
  }
  return (
    <UDatePickerLabel focus={focusDate.focus} {...props}>
      <Select
        placeholder="Select a person"
        optionFilterProp="children"
        searchValue={searchText}
        dropdownRender={menu => (
          <>
            <Input placeholder="search" onInput={(evt) => onInputSearch(evt)} allowClear></Input>
            {menu}
          </>
        )}
        filterOption={(input, option) =>
          (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
        }
      >
        <Option value="Tùng">Tùng</Option>
        <Option value="Hùng">Hùng</Option>
      </Select>
      <Select
        showSearch={false}
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
      >
        <Option value="Tùng">Tùng</Option>
        <Option value="Hùng">Hùng</Option>
      </Select>
      <DatePicker suffixIcon='' onFocus={onFocus} onBlur={onBlur} {...props} ></DatePicker>
    </UDatePickerLabel>
  )
}

export { UDatePicker, UDatePickerLabel }