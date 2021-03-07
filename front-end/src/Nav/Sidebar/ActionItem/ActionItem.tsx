import React, { useEffect } from "react";
import { ArrowIcon } from "../../../_components/Icons";
import {
  LinkText,
  LinkWrapper,
  SidebarTab,
  SidebarDetailsButton,
  SidebarIconContainer,
  TabSubContentContainer,
} from "../Styles";
import { Route, useHistory, useLocation, useRouteMatch } from "react-router";
import { useState } from "react";
import { link } from "fs/promises";
import { useSelector } from "react-redux";
import { IRootState } from "../../../_reducers";
import { SvgWrapperButton, Scrollbox } from "../../../AlgonexStyles";
import { useCheckCurrentLocation } from "../../../Hooks/useCheckCurrentLocation";

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

  const isCurrentPage = useCheckCurrentLocation(linkUri);

  useEffect(() => {
    if (isSidebarCollapsed) {
      setSubIsVisible(false);
    } else {
      if (isCurrentPage) {
      } else {
        setSubIsVisible(false);
      }
    }
  }, [isSidebarCollapsed]);

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
          <SidebarIconContainer isActiveTab={isCurrentPage}>
            {icon}
          </SidebarIconContainer>
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
