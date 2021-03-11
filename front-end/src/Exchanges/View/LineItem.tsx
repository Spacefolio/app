
import {
  ModifyContainer,
  MyExchangeNameWrapper,
  MyExchangesLineItemContainer,
} from "./Styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Avatar,
  ListItemAvatar,
  MenuItem,
  Portal,
} from "@material-ui/core";

import { Delete, Edit, Work } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IExchangeAccountView } from "../../../../types";
import { exchangeActions, portfolioActions } from "../../_actions";
import { IRootState } from "../../_reducers";
import { SvgWrapperButton } from "../../AlgonexStyles";

interface ExchangeItemProps {
  data: IExchangeAccountView;
  enableEditing: boolean;
}

export const ExchangeItem: React.FC<ExchangeItemProps> = ({
  data,
  enableEditing,
}) => {
  const dispatch = useDispatch();

  const [editExchangeVisible, setEditExchangeVisible] = useState(false);

  const portfolioFilterID = useSelector(
    (state: IRootState) => state.portfolio.filterId
  );

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const filterId = useSelector((state: IRootState) => state.portfolio.filterId);

  function handleClose(shouldDelete: boolean) {
    if (shouldDelete) {
      dispatch(exchangeActions.delete(data.id, filterId));
    } else {
      setIsDeleteOpen(false);
    }
  }
  const DeleteButtonSection = (
    <React.Fragment>
      <SvgWrapperButton onClick={() => setIsDeleteOpen(true)}>
        <Delete />
      </SvgWrapperButton>

      {isDeleteOpen && (
        <Portal>
          <Dialog
            open={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{`Unlink ${data.name} from your account`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Removing an integration from Algonex is permanent. Restoring it
                to your account will require you to re-enter your API keys. Do
                you wish to continue?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose(false)} color="secondary">
                Cancel
              </Button>
              <Button onClick={() => handleClose(true)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </Dialog>
        </Portal>
      )}
    </React.Fragment>
  );

  const EditButtonSection = (
    <SvgWrapperButton
      onClick={() => {
        setEditExchangeVisible(true);
      }}
    >
      <Edit />
    </SvgWrapperButton>
  );

  return (
    <React.Fragment>
      <MenuItem
        button={true}
        key={data.id}
        selected={portfolioFilterID == data.id}
        onClick={() => dispatch(portfolioActions.FilterPortfolio(data.id))}
      >
        <ListItemAvatar>
          <Avatar src={data.logoUrl} />
        </ListItemAvatar>
        <MyExchangeNameWrapper>{data.nickname}</MyExchangeNameWrapper>

        {enableEditing && (
          <ModifyContainer>
            {EditButtonSection}
            {DeleteButtonSection}
          </ModifyContainer>
        )}
      </MenuItem>
    </React.Fragment>
  );
};
