import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Input, Select, SelectProps } from "antd";
import { useResizeDetector } from "react-resize-detector";
import { createPortal } from "react-dom";
//@ts-ignore
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion"

interface LabelProp {
  title?: string,
  contentLeft?: any,
  contentRight?: any,
  focus?: boolean,
  hasValue?: boolean,
  backdropShow?: boolean,
}

type props = SelectProps & LabelProp;

const ULabel: React.FC<LabelProp> = (props) => {
  let focusText: string = '';
  let hasValueText: string = '';
  focusText = props.focus ? 'is-focused' : '';
  hasValueText = props.hasValue ? 'is-has-value' : '';
  let { width: widthContentLeft, ref: refContentLeft } = useResizeDetector();
  let { width: widthContentRight, ref: refContentRight } = useResizeDetector();
  widthContentLeft = widthContentLeft ? Math.ceil(widthContentLeft) : 0
  widthContentRight = widthContentRight ? Math.ceil(widthContentRight) : 0
  const styleContentLeft = `.p-ant-left-${widthContentLeft}.ant-picker, .p-ant-left-${widthContentLeft} .ant-select-selector { padding-left: ${widthContentLeft}px!important }`;
  const styleContentRight = `.p-ant-left-${widthContentRight}.ant-picker, .p-ant-left-${widthContentRight} .ant-select-selector { padding-right: ${widthContentRight}px!important }`;
  return (
    <div className={`form-group ${focusText} ${hasValueText} p-ant-left-${widthContentLeft}`}>
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
        <AnimatePresence>
          {
            props.backdropShow &&
            <Modal>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.2, },
                }}
                className={`backdrop`}></motion.div>
            </Modal>
          }
        </AnimatePresence>
      </div>
    </div >
  )
}
interface ModalProps {
  children?: ReactNode;
}

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

const Modal = ({ children }: ModalProps) => {
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    // Use this in case CRA throws an error about react-hooks/exhaustive-deps
    const current = el.current;

    // We assume `modalRoot` exists with '!'
    modalRoot!.appendChild(current);
    return () => void modalRoot!.removeChild(current);
  }, []);

  return createPortal(children, el.current);
};

const CustomAntdSelect: React.FC<props> = (props) => {
  const [focusSelect, setFocusSelect] = useState(false);
  const [hasValue, sethasValue] = useState(false);
  const [searchText, setsearchText] = useState("");
  const [backdrop, setbackdrop] = useState(false);
  const inputRef = useRef<Input>(null);
  const onDropdownVisibleChange = (open: boolean) => {
    open ? setFocusSelect(true) : setFocusSelect(false);
    open ? setbackdrop(true) : setbackdrop(false);
  }
  const onClick = (evt: any) => {
    inputRef?.current?.focus();
    if (props.onClick) {
      props.onClick(evt)
    }
  }
  const onInputSearch = (evt: any) => {
    return setsearchText(evt.target.value)
  }
  const handleChange = (value: { value: string; label: React.ReactNode }, option: any) => {
    value ? sethasValue(true) : sethasValue(false);
    if (props.onChange) {
      props.onChange(value, option)
    }
  };
  return (
    <ULabel focus={focusSelect} backdropShow={backdrop} hasValue={hasValue} {...props}>
      <Select
        labelInValue
        placeholder="Chọn"
        searchValue={searchText}
        showSearch={false}
        onDropdownVisibleChange={onDropdownVisibleChange}
        dropdownRender={menu => (
          <>
            <Input placeholder="Tìm kiếm" onChange={(evt) => onInputSearch(evt)} allowClear ref={inputRef}></Input>
            {menu}
          </>
        )}
        filterOption={(input, option) =>
          (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
        }
        {...props}
        onClick={onClick}
        onChange={handleChange}
      >
      </Select>
    </ULabel>
  )
}

export { CustomAntdSelect, ULabel }