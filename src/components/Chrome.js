import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import closeIcon from "./xmark.svg";
import plusIcon from "./plus.svg";

const TAB_COLOR = "#ECEDEC";

const Tabs = styled.div`
  display: flex;
  height: ${(props) => props.height || "42px"};
  background-color: ${TAB_COLOR};
`;

const Content = styled.div`
  height: 100%;
`;
const StyledTab = styled.div`
  min-width: ${(props) => props.maxWidth || "50px"};
  max-width: ${(props) => props.minWidth || "200px"};
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 0 8px 0 8px;
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
      width: calc(100% + 2px);
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
export const Divider = styled.div`
  background-color: #7c7f82;
  height: 21px;
  width: 1px;
  margin-left: 4px;
  margin-top: 14px;
`;
const CircleButton = styled.div`
  height: ${(props) => props.length || "16"}px;
  width: ${(props) => props.length || "16"}px;
  border-radius: ${(props) => props.length / 2 || "8"}px;
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

const Title = styled.span`
  font-size: 14px;
  margin: 0;
  margin-top: -2px;
  margin: ${(props) => props.margin};
  flex: 1;
  text-align: start;
  white-space: nowrap;
  overflow: hidden;
`;

export const Tab = ({
  isActive,
  imageUrl,
  imageAlt,
  title,
  onClick,
  onClose,
}) => {
  return (
    <StyledTab
      tabIndex={0}
      isActive={isActive}
      onClick={onClick}
      onKeyPress={onClick}
    >
      {imageUrl && (
        <img height={"16px"} width={"16px"} src={imageUrl} alt={imageAlt} />
      )}
      <Title margin={"0 6px 0 6px"}>{title}</Title>

      <div></div>
      <CircleButton
        length={"8"}
        tabIndex={0}
        alignItems={"center"}
        margin={"0px 4px 0px 0px"}
        onClick={onClose}
      >
        <img
          src={closeIcon}
          draggable={false}
          style={{
            userSelect: "none",
            width: "8px",
            height: "8px",
          }}
        />
      </CircleButton>
    </StyledTab>
  );
};

Tab.propTypes = {
  isActive: PropTypes.bool,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
};

Tab.defaultProps = {
  isActive: false,
  imageUrl: null,
  imageAlt: "",
  title: "",
  onClick: () => {},
  onClose: () => {},
};

export const AddButton = (props) => {
  return (
    <CircleButton
      tabIndex={0}
      length={"12"}
      margin={"0px 0 0 12px"}
      alignItems={"center"}
      {...props}
    >
      <img
        src={plusIcon}
        draggable={false}
        style={{
          userSelect: "none",
          width: "12px",
          height: "12px",
        }}
      />
    </CircleButton>
  );
};

const Chrome = ({ showHeader, tabs, children, tabEnd, style }) => {
  return (
    <React.Fragment>
      <Tabs borderDisable={showHeader} style={style}>
        {tabs}
        {tabEnd}
      </Tabs>
      <Content>{children}</Content>
    </React.Fragment>
  );
};

Chrome.propTypes = {
  showHeader: PropTypes.bool,
  tabs: PropTypes.node,
  children: PropTypes.node,
  tabEnd: PropTypes.node,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onClose: PropTypes.func,
};

Chrome.defaultProps = {
  showHeader: false,
  style: undefined,
  tabs: <React.Fragment />,
  tabEnd: <React.Fragment />,
  children: <React.Fragment />,
};

Chrome.Divider = Divider;
Chrome.Tab = Tab;
Chrome.AddButton = AddButton;

export default Chrome;
