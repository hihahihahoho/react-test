import React, { useState } from "react";
import { DatePicker, DatePickerProps, Input, Select } from "antd";
import { useResizeDetector } from "react-resize-detector";
const { Option } = Select;

interface DefaultProps {
  title?: string,
  contentLeft?: any,
  contentRight?: any,
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
  let { width: widthContentLeft, ref: refContentLeft } = useResizeDetector();
  let { width: widthContentRight, ref: refContentRight } = useResizeDetector();
  widthContentLeft = widthContentLeft ? Math.ceil(widthContentLeft) : 0
  widthContentRight = widthContentRight ? Math.ceil(widthContentRight) : 0
  const styleContentLeft = `.p-ant-left-${widthContentLeft}.ant-picker, .p-ant-left-${widthContentLeft} .ant-select-selector { padding-left: ${widthContentLeft}px!important }`;
  const styleContentRight = `.p-ant-left-${widthContentRight}.ant-picker, .p-ant-left-${widthContentRight} .ant-select-selector { padding-right: ${widthContentRight}px!important }`;
  console.log(widthContentLeft)
  return (
    <div className={`form-group ${focusText} p-ant-left-${widthContentLeft}`}>
      {
        props.contentLeft &&
        <style>{styleContentLeft}</style>
      }
      {
        props.contentLeft &&
        <style>{styleContentRight}</style>
      }
      {
        props.title && <div className="form-title">
          {props.title}
        </div>
      }
      <div className="form-inner">
        {
          props.contentLeft &&
          <div className="form-inner-left" ref={refContentLeft}><div className="inner">{props.contentLeft}</div></div>
        }
        <div className="datepicker">
          {props.children}
        </div>
        {
          props.contentRight &&
          <div className="form-inner-right" ref={refContentRight}><div className="inner">{props.contentRight}</div></div>
        }
      </div>
    </div >
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