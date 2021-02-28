import { RD } from "../GlobalStyles/ResponsiveDesign";
import { applicationViewConstants } from "../_constants/applicationView.constants";

interface IApplicationViewAcion {
  type: string;
  width: number;
}

export interface IApplicationViewState {
  isSidebarCollapsed: boolean;
  isSidebarVisible: boolean;
  currentViewType: "mobile" | "desktop";
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
    case applicationViewConstants.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarCollapsed: !state.isSidebarCollapsed,
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
