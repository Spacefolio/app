import { IViewType } from "../../../types";
import { applicationViewConstants } from "../_constants/applicationView.constants";

export const applicationViewActions = {
  toggleSidebar,
  setModal,
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

function setModal(
  modalVisible: boolean,
  modalComponent: any,
  header: string = null
) {
  return {
    type: applicationViewConstants.MODAL,
    header,
    modalVisible,
    modalComponent,
  };
}
