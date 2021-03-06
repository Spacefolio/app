import { IViewType } from "../../../types";
import { applicationViewConstants } from "../_constants/applicationView.constants";

export const applicationViewActions = {
  toggleSidebar,
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
