import React, { useEffect } from "react";
import {
  BotsIcon,
  PortfolioIcon,
  DashboardIcon,
  ArrowIcon,
} from "../../_components/Icons";
import {
  LinkText,
  LinkWrapper,
  NavTab,
  SidebarDetailsButton,
  SidebarIconContainer,
  TabSubContentContainer,
} from "./SidebarStyles";
import { Route, useHistory, useLocation, useRouteMatch } from "react-router";
import { useState } from "react";
import { link } from "fs/promises";
import { useSelector } from "react-redux";
import { IRootState } from "../../_reducers";
import { CheckCurrentPage } from "../../_helpers/navigation";
import { SvgWrapperButton } from "../../GlobalStyles";

interface ISidebarActionItemProps {
  text: string;
  children?: React.ReactNode;
  icon: React.ReactNode;
  linkUri: string;
}
export const SidebarActionItem: React.FC<ISidebarActionItemProps> = ({
  text,
  children,
  icon,
  linkUri,
}) => {
  const isSidebarCollapsed = useSelector(
    (state: IRootState) => state.applicationView.isSidebarCollapsed
  );
  const history = useHistory();
  const [subIsVisible, setSubIsVisible] = useState(false);
  const location = useLocation();

  var lastLink: any = location;

  useEffect(() => {
    if (isSidebarCollapsed) {
      setSubIsVisible(false);
    } else {
      if (CheckCurrentPage(location, linkUri)) {
        setSubIsVisible(true);
      } else {
        setSubIsVisible(false);
      }
    }
    lastLink = location;
  }, [isSidebarCollapsed, location]);

  const handleClick = () => {
    if (!CheckCurrentPage(lastLink, linkUri)) {
      history.push(linkUri);
      setSubIsVisible(true);
    } else {
      !isSidebarCollapsed && setSubIsVisible(!subIsVisible);
    }
  };

  return (
    <React.Fragment>
      <LinkWrapper>
        <NavTab onClick={() => handleClick()}>
          <SidebarIconContainer>{icon}</SidebarIconContainer>
          <LinkText>{text}</LinkText>
        </NavTab>
        {children && (
          <SvgWrapperButton onClick={() => setSubIsVisible(!subIsVisible)}>
            <ArrowIcon direction={subIsVisible ? "up" : "down"} />
          </SvgWrapperButton>
        )}
      </LinkWrapper>
      {children && (
        <TabSubContentContainer isActiveTab={subIsVisible}>
          {children}
        </TabSubContentContainer>
      )}
    </React.Fragment>
  );
};
