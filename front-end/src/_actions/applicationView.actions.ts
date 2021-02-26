import { applicationViewConstants } from "../_constants/applicationView.constants";

export const applicationViewActions = {
  toggleSidebar,
  UpdateApplicationWidth
};

function toggleSidebar() {
  return (dispatch: any) => {
    dispatch(toggle());
  };
  function toggle() {
    return { type: applicationViewConstants.TOGGLE_SIDEBAR };
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
