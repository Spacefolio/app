import { RD } from "../AlgonexStyles/ResponsiveDesign";
import { applicationViewConstants } from "../_constants/applicationView.constants";
import { IViewType } from "../../../types";

interface IApplicationViewAcion {
  type: string;
  width: number;
  manualToggle: boolean;
  modalVisible: boolean;
  modalComponent: Element;
  header: string;
}

export interface IApplicationViewState {
  isSidebarCollapsed: boolean;
  currentViewType: IViewType;
  modal: {
    isVisible: boolean;
    component: any;
    header: string;
  };
}

export function applicationView(
  state: IApplicationViewState = {
    currentViewType: "desktop",
    isSidebarCollapsed: false,
    modal: { isVisible: false, component: null, header: null },
  },
  action: IApplicationViewAcion
) {
  switch (action.type) {
    case applicationViewConstants.TOGGLE_SIDEBAR_DESKTOP:
      return {
        ...state,
        isSidebarCollapsed:
          action.manualToggle != undefined
            ? action.manualToggle
            : !state.isSidebarCollapsed,
      };
    case applicationViewConstants.MODAL:
      return {
        ...state,
        modal: {
          isVisible: action.modalVisible,
          component: action.modalComponent,
          header: action.header,
        },
      };

    default:
      return state;
  }
}
