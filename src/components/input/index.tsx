import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
let lock = <FontAwesomeIcon icon={faLock} />;
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

import "./style.css";

interface InputPropType {
  type?: string;
  placeholder?: string;
  leftIcon?: React.JSX.Element | null;
  rightIcon?: React.JSX.Element | null;
  feedbackText?: string;
  valid?: boolean | null;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  onFocus?: () => void;
  onBlur?: () => void;
  dark?: boolean;
}

export function D_TextInput({
  type = "text",
  placeholder = "Enter Text",
  leftIcon = null,
  rightIcon = null,
  feedbackText = "",
  valid = null,
  onChange,
  onFocus,
  onBlur,
  dark = true,
}: InputPropType): React.JSX.Element {
  let additionalInputStyle = { paddingLeft: "", paddingRight: "" };
  let [secure, setSecure] = useState(true);
  type == "password" ? (leftIcon = lock) : false;
  type == "password" || rightIcon
    ? (additionalInputStyle.paddingRight = "40px")
    : false;
  type == "password" ? (rightIcon = null) : false;
  leftIcon ? (additionalInputStyle.paddingLeft = "30px") : false;
  let darkStyle = dark ? "dark-input" : "light-input";

  return (
    <div className="d-input-container-main type-1 gray-5 text-p">
      <span className="d-input-left-icon">{leftIcon}</span>
      <input
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        style={additionalInputStyle}
        className={`${darkStyle}`}
        placeholder={placeholder}
        type={type !== "password" ? "text" : secure ? "password" : "text"}
      />
      <span className="d-input-right-icon" onClick={() => setSecure(!secure)}>
        {type == "password" && secure ? eye : null}
        {type == "password" && !secure ? eyeSlash : null}
        {rightIcon}
      </span>
      <FeedbackComponent
        text={feedbackText}
        valid={valid == null ? "default" : valid ? "true" : "false"}
      />
    </div>
  );
}

export function D_MultilineInput({
  onChange,
  dark,
}: InputPropType): React.JSX.Element {
  let darkStyle = dark ? "dark-textarea" : "light-textarea";

  return (
    <div className="d-textarea-container">
      <textarea
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className={`${darkStyle}`}
      ></textarea>
    </div>
  );
}

export function D_PasswordInput({}: InputPropType): React.JSX.Element {
  return (
    <div>
      <p></p>
    </div>
  );
}

export function D_ValidateInput({}: InputPropType): React.JSX.Element {
  return (
    <div>
      <p></p>
    </div>
  );
}

const FeedbackComponent = ({ text = "", valid = "" }) => {
  const [feedback, setFeedback] = useState<React.ReactElement | null>();

  useEffect(() => {
    if (valid === "true") {
      setFeedback(<small className="text-medium valid-true">{text}</small>);
    } else if (valid === "false") {
      setFeedback(<small className="text-medium valid-false">{text}</small>);
    } else {
      setFeedback(null);
    }
  }, [text, valid]);

  return feedback;
};
