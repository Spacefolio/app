import { IViewType } from "../../../types";
import { applicationViewConstants } from "../_constants/applicationView.constants";

export const applicationViewActions = {
  toggleSidebar,
  UpdateApplicationWidth,
};

function toggleSidebar(manualToggle?: boolean) {
  return (dispatch: any) => {
    dispatch(desktop(manualToggle));
  };
  function desktop(manualToggle: boolean) {
    return {
      type: applicationViewConstants.TOGGLE_SIDEBAR_DESKTOP,
      manualToggle,
    };
  }
}

function UpdateApplicationWidth(width: number) {
  return (dispatch: any) => {
    dispatch(update(width));
  };
  function update(width: number) {
    return { type: applicationViewConstants.UPDATE_APPLICATION_WIDTH, width };
  }
}
