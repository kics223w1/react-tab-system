import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import Chrome, { Tab, Divider, AddButton } from "./components/Chrome.js";

const BROWSER_TYPES = {
  CHROME: "chrome",
};

const BROWSER_COMPONENTS = {
  [BROWSER_TYPES.CHROME]: Chrome,
};

const Browser = ({ type, activeTabKey, children, onChange, ...rest }) => {
  const [activeTab, setActiveTab] = useState(null);
  useEffect(() => {
    setActiveTab(activeTabKey);
  }, [activeTabKey]);
  const onClick = (newActiveTab) => {
    setActiveTab(newActiveTab);
  };
  const BrowserComponent = BROWSER_COMPONENTS[type] ? (
    BROWSER_COMPONENTS[type]
  ) : (
    <React.Fragment>{`${type} is currently not supported`}</React.Fragment>
  );
  const childrenWithProps =
    children != null
      ? Children.map(children, (child, index) => {
          if (isValidElement(child)) {
            const childrenOnClick =
              typeof onChange === "function"
                ? () => onChange(child.key)
                : () => onClick(child.key);
            const modifiedChildren = [
              cloneElement(child, {
                ...child.props,
                isActive: child.key === activeTab,
                onClick: childrenOnClick,
              }),
            ];
            if (index !== children.length - 1) {
              modifiedChildren.push(<BrowserComponent.Divider />);
            }
            return modifiedChildren;
          }

          return child;
        })
      : null;
  const activeChild = Children.map(children, (child) => {
    if (child.key === activeTab) {
      return child.props.children;
    }
    return null;
  });
  return (
    <BrowserComponent {...rest} tabs={childrenWithProps}>
      {activeChild}
    </BrowserComponent>
  );
};

Browser.propTypes = {
  type: PropTypes.oneOf(Object.values(BROWSER_TYPES)),
  activeTabKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  onChange: PropTypes.func,
};

Browser.defaultProps = {
  type: BROWSER_TYPES.CHROME,
  activeTabKey: undefined,
  children: undefined,
  onChange: undefined,
};

export { Tab, Divider, AddButton, Chrome, Browser };
