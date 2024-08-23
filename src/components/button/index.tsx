import React, { CSSProperties } from "react";

import "./style.css";

interface ButtonPropType {
  actionFn?: () => void;
  children?: React.JSX.Element | string;
  style?: CSSProperties;
}

export function ButtonMain({
  actionFn,
  children,
  style = {},
}: ButtonPropType): React.JSX.Element {
  return (
    <div className="d-button-container">
      <button
        className="text-p text-medium white"
        onClick={actionFn}
        style={style}
      >
        {children}
      </button>
    </div>
  );
}

export function ButtonGradientMain({
  actionFn,
  children,
}: ButtonPropType): React.JSX.Element {
  return (
    <div className="d-button-gradient-1">
      <button
        className="gradient-main-bg text-p text-medium white"
        onClick={actionFn}
      >
        {children}
      </button>
    </div>
  );
}

interface SocialButtonPropType {
  actionFn: () => void;
  icon: React.JSX.Element;
  text: string;
}

export function SocialButton({
  actionFn,
  icon,
  text,
}: SocialButtonPropType): React.JSX.Element {
  return (
    <div className="d-button-social">
      <button onClick={actionFn} className="gray-9">
        <div className="row no-space align-items-center text-p text-medium">
          <div className="w-max-content no-space d-s-button">{icon}</div>
          <div className="col no-space text-left">
            <span style={{ paddingLeft: 7 }}>{text}</span>
          </div>
        </div>
      </button>
    </div>
  );
}
