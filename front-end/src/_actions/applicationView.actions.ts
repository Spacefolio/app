import { IViewType } from "../../../types";
import { applicationViewConstants } from "../_constants/applicationView.constants";

export const applicationViewActions = {
  toggleSidebar,
  UpdateApplicationWidth,
};

function toggleSidebar(viewType: IViewType, manualToggle?: boolean) {
  return (dispatch: any) => {
    switch (viewType) {
      case "mobile":
        dispatch(mobile(manualToggle));
        break;
      case "desktop":
        dispatch(desktop(manualToggle));
        break;
    }
  };
  function mobile(manualToggle: boolean) {
    return { type: applicationViewConstants.TOGGLE_SIDEBAR_MOBILE, manualToggle };
  }
  function desktop(manualToggle: boolean) {
    return { type: applicationViewConstants.TOGGLE_SIDEBAR_DESKTOP, manualToggle };
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
