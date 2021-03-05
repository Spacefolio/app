import React, { useEffect } from "react";
import { ArrowIcon } from "../../_components/Icons";
import {
  LinkText,
  LinkWrapper,
  SidebarTab,
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
import { SvgWrapperButton, Scrollbox } from "../../GlobalStyles";

interface ISidebarActionItemProps {
  text: string;
  children?: React.ReactNode;
  icon: React.ReactNode;
  linkUri: string;
  bottom?: string;
}
export const SidebarActionItem: React.FC<ISidebarActionItemProps> = ({
  text,
  children,
  icon,
  linkUri,
  bottom,
}) => {
  const isSidebarCollapsed = useSelector(
    (state: IRootState) => state.applicationView.isSidebarCollapsed
  );
  const history = useHistory();
  const [subIsVisible, setSubIsVisible] = useState(false);
  const location = useLocation();
  const [isCurrentPage, setIsCurrentPage] = useState(
    CheckCurrentPage(location, linkUri)
  );

  useEffect(() => {
    if (isSidebarCollapsed) {
      setSubIsVisible(false);
      setIsCurrentPage(CheckCurrentPage(location, linkUri));
    } else {
      setIsCurrentPage(CheckCurrentPage(location, linkUri));
      if (isCurrentPage) {
      } else {
        setSubIsVisible(false);
      }
    }
  }, [isSidebarCollapsed, location]);

  const handleClick = () => {
    if (!isCurrentPage) {
      history.push(linkUri);
      
    } else {
      !isSidebarCollapsed && setSubIsVisible(!subIsVisible);
    }
  };

  return (
    <React.Fragment>
      <LinkWrapper>
        <SidebarTab onClick={() => handleClick()}>
          <SidebarIconContainer isActiveTab={isCurrentPage}>{icon}</SidebarIconContainer>
          <LinkText>{text}</LinkText>
        </SidebarTab>
        {children && (
          <SvgWrapperButton onClick={() => setSubIsVisible(!subIsVisible)}>
            <ArrowIcon direction={subIsVisible ? "up" : "down"} />
          </SvgWrapperButton>
        )}
      </LinkWrapper>
      {children && (
        <TabSubContentContainer isActiveTab={subIsVisible}>
          <Scrollbox>{children}</Scrollbox>
        </TabSubContentContainer>
      )}
    </React.Fragment>
  );
};
