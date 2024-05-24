import PropTypes from "prop-types";

import "./Input.css";
import { useEffect, useReducer } from "react";
import { validate } from "../../util/validators";
const inputReducer = (State, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...State,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...State,
        isTouched: true,
      };
    default:
      return State;
  }
};
export default function Input({
  label,
  id,
  el,
  validators,
  rows,
  placeholder,
  type,
  errorText,
  onInput,
  inputValue,
  valid,
}) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: inputValue || "",
    isTouched: false,
    isValid: valid || false,
  });
  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);
  const changeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      val: e.target.value,
      validators: validators,
    });
  };
  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
      isTouched: false,
    });
  };
  const element =
    el === "input" ? (
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={id}> {label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p> {errorText}</p>}
    </div>
  );
}
Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  el: PropTypes.string,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  errorText: PropTypes.string,
  validators: PropTypes.array,
  onInput: PropTypes.any,
  inputValue: PropTypes.string,
  valid: PropTypes.bool,
};
