import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import closeIcon from "../../assets/closeIcon.svg";

const TAB_COLOR = "#ECEDEC";

const Tabs = styled.div`
  display: flex;
  align-items: center;
  min-height: 40px;
  background-color: ${TAB_COLOR};
  overflow-x: auto;
  overflow-y: hidden;
`;

const CircleButton = styled.div`
  height: ${(props) => props.length || "16"}px;
  width: ${(props) => props.length || "16"}px;
  border-radius: ${(props) => props.length / 2 || "8"}px;
  font-size: ${(props) => props.fontSize || "12"}px;
  background-color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  display: flex;
  justify-content: center;
  align-items: ${(props) => props.alignItems};
  outline: none;
  &:hover {
    background-color: ${(props) => props.hoverColor || "lightgrey"};
  }
`;

const StyledTab = styled.div`
  min-width: 200px;
  max-width: 200px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 12px 0 12px;
  align-items: center;
  box-sizing: border-box;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  outline: none;
  background-color: ${(props) => (props.isActive ? "white" : "initial")};
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  ${(props) =>
    props.isActive &&
    `
    z-index: 3;
    border-style: solid;
    border-width: 0;
    border-color: white;`}
  ${(props) => `
    &:hover {
      background-color: ${!props.isActive && (props.hoverColor || "#F2F3F5")};
      z-index: 1;
      width: calc(100%+2px);
    }
    &:${props.isActive ? "" : "hover:"}before {
      content: "";
      position: absolute;
      background-color: rgba(0,0,0,0);
      left: -16px;
      bottom: 0;
      height: 8px;
      width: 16px;
      border-bottom-right-radius: 16px;
      box-shadow: 8px 0 0 0 ${props.isActive ? "#ffffff" : "#F2F3F5"};
      z-index: 1;
    }
    &:${props.isActive ? "" : "hover:"}after {
      content: "";
      position: absolute;
      background-color: rgba(0,0,0,0);
      right: -16px;
      bottom: 0;
      height: 8px;
      width: 16px;
      border-bottom-left-radius: 16px;
      box-shadow: -8px 0 0 0 ${props.isActive ? "#ffffff" : "#F2F3F5"};
      z-index: 1;
    }
  `}
`;

const Title = styled.span`
  font-size: 12px;
  line-height: 16px;
  margin: 0;
  margin-top: -2px;
  margin: ${(props) => props.margin};
  flex: 1;
  text-align: start;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* Add the additional styles for truncating the text overflow */
  position: relative;
  z-index: 1;
`;

export const Divider = styled.div`
  background-color: #7c7f82;
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  width: 1px;
`;

export const Tab = ({ isActive, title, onClick, onClose }) => {
  return (
    <StyledTab tabIndex={0} isActive={isActive} onClick={onClick}>
      <Title>{title}</Title>
      <CircleButton
        length={"16"}
        tabIndex={0}
        margin={"-2px 0px 0px 4px"}
        alignItems={"center"}
        onClick={onClose}
      >
        <img
          src={closeIcon}
          draggable={false}
          style={{
            width: "8px",
            height: "8px",
            userSelect: "none",
          }}
        />
      </CircleButton>
    </StyledTab>
  );
};

Tab.propTypes = {
  isActive: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
};

Tab.defaultProps = {
  isActive: false,
  title: "",
  onClick: () => {},
  onClose: () => {},
};

const Chrome = ({ tabs }) => {
  return (
    <React.Fragment>
      <Tabs borderDisable={false}>{tabs}</Tabs>
    </React.Fragment>
  );
};

Chrome.propTypes = {
  tabs: PropTypes.node,
  children: PropTypes.node,
  tabEnd: PropTypes.node,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onClose: PropTypes.func,
};

Chrome.defaultProps = {
  style: undefined,
  tabs: <React.Fragment />,
  tabEnd: <React.Fragment />,
  children: <React.Fragment />,
};

Chrome.Divider = Divider;
Chrome.Tab = Tab;

export default Chrome;
