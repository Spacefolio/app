import React, { useEffect } from "react";
import { ArrowIcon } from "../../../_components/Icons";
import {
  LinkText,
  LinkWrapper,
  SidebarTab,
  SidebarIconContainer,
  TabSubContentContainer,
  SidebarSubTab,
} from "./Styles";
import { Route, useHistory, useLocation, useRouteMatch } from "react-router";
import { useState } from "react";
import { link } from "fs/promises";
import { useSelector } from "react-redux";
import { IRootState } from "../../../_reducers";
import { SvgWrapperButton, ScrollBox, SPACING } from "../../../AlgonexStyles";
import { useCheckCurrentLocation } from "../../../Hooks/useCheckCurrentLocation";

interface ISidebarActionItemProps {
  text: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  linkUri: string;
  Branding?: boolean;
}

export const SidebarActionItem: React.FC<ISidebarActionItemProps> = ({
  text,
  children,
  icon,
  linkUri,
  Branding,
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
        <SidebarTab
          Branding={Branding}
          isActiveTab={isCurrentPage}
          onClick={() => handleClick()}
        >
          <SidebarIconContainer>{icon}</SidebarIconContainer>
          <LinkText>{text}</LinkText>
          {children && (
            <SvgWrapperButton
              style={{ height: "100%" }}
              onClick={() => setSubIsVisible(!subIsVisible)}
            >
              <ArrowIcon
                style={{ fill: "white" }}
                direction={subIsVisible ? "up" : "down"}
              />
            </SvgWrapperButton>
          )}
        </SidebarTab>
      </LinkWrapper>
      {children && (
        <TabSubContentContainer isActiveTab={subIsVisible}>
          {children}
        </TabSubContentContainer>
      )}
    </React.Fragment>
  );
};

export const SidebarSubActionItem: React.FC<ISidebarActionItemProps> = ({
  text,
  children,
  icon,
  linkUri,
  Branding,
}) => {
  const { path } = useRouteMatch();

  const truePath = path + linkUri;

  const history = useHistory();

  const isCurrentPage = useCheckCurrentLocation(truePath);

  const handleClick = () => {
    if (!isCurrentPage) {
      history.push(truePath);
    }
  };

  return (
    <LinkWrapper>
      <SidebarSubTab
        Branding={Branding}
        isActiveTab={isCurrentPage}
        onClick={() => handleClick()}
      >
        <SidebarIconContainer>{icon}</SidebarIconContainer>
        <LinkText>{text}</LinkText>
      </SidebarSubTab>
    </LinkWrapper>
  );
};
