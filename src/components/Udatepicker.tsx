import React, { useState } from "react";
import { DatePicker, DatePickerProps, Input, Select } from "antd";
import { useResizeDetector } from "react-resize-detector";
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
  focusText = props.focus ? 'is-focused' : '';
  let { width, ref } = useResizeDetector();
  if (width) (
    width = Math.ceil(width)
  )
  const style = `.p-ant-left-${width}.ant-picker, .p-ant-left-${width} .ant-select-selector { padding-left: ${width}px!important }`;
  console.log(width)
  return (
    <div className={`form-group ${focusText} p-ant-left-${width}`}>
      <style> {style}</style>
      {
        props.title && <div className="title">
          {props.title}
        </div>
      }
      <div className="text-left inline-block" ref={ref}><div className="inner">{props.textLeft}</div></div>
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
    </UDatePickerLabel>
  )
}

export { UDatePicker, UDatePickerLabel }