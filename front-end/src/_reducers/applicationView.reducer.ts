import { RD } from "../GlobalStyles/ResponsiveDesign";
import { applicationViewConstants } from "../_constants/applicationView.constants";
import { IViewType } from "../../../types";

interface IApplicationViewAcion {
  type: string;
  width: number;
  manualToggle: boolean;
}

export interface IApplicationViewState {
  isSidebarCollapsed: boolean;
  isSidebarVisible: boolean;
  currentViewType: IViewType;
  applicationContainerWidth?: number;
}

export function applicationView(
  state: IApplicationViewState = {
    currentViewType: "desktop",
    isSidebarCollapsed: false,
    isSidebarVisible: false,
  },
  action: IApplicationViewAcion
) {
  switch (action.type) {
    case applicationViewConstants.TOGGLE_SIDEBAR_DESKTOP:
      return {
        ...state,
        isSidebarCollapsed: action.manualToggle
          ? true
          : !state.isSidebarCollapsed,
      };
    case applicationViewConstants.TOGGLE_SIDEBAR_MOBILE:
      return {
        ...state,
        isSidebarVisible: action.manualToggle ? true : !state.isSidebarVisible,
      };
    case applicationViewConstants.UPDATE_APPLICATION_WIDTH:
      return {
        ...state,
        applicationContainerWidth: action.width,
        currentViewType:
          window.innerWidth > parseInt(RD.breakpointsmartphone)
            ? "desktop"
            : "mobile",
      };

    default:
      return state;
  }
}
