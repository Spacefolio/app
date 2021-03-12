import { Avatar, Typography, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  IIntegrationInfo,
  IExchangeAccountRequest,
  IAsset,
} from "../../../../../types";
import { ScrollBox, StyledFormRow } from "../../../_styles";

import { exchangeActions } from "../../../_actions";

interface IAddTransactionFormProps {}

export const AddTransactionForm: React.FC<IAddTransactionFormProps> = ({}) => {
  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);

  const [asset, setAsset] = useState<IAsset | null>({
    assetId: "Bitcoin",
    symbol: "BTC",
  });
  const [assetInput, setAssetInput] = useState("");

  const [date, setDate] = useState(moment());

  const [time, setTime] = useState(moment());

  const [amount, setAmount] = useState("");

  const [price, setPrice] = useState("");

  const [fee, setFee] = useState("");

  const [feeSymbol, setFeeSymbol] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <ScrollBox>
      <form onSubmit={handleSubmit} autoComplete="off" id="add-exchange-form">
        <StyledFormRow>
          <Autocomplete
            value={asset}
            onChange={(event: any, newValue: any) => {
              setAsset(newValue);
            }}
            inputValue={assetInput}
            onInputChange={(event, newInputValue) => {
              setAssetInput(newInputValue);
            }}
            id="asset"
            options={[{ assetId: "bitcoin", symbol: "BTC" }]}
            getOptionLabel={(option: any) => option.assetId}
            style={{ width: 300 }}
            renderInput={(params: any) => (
              <TextField {...params} label="Asset" variant="outlined" />
            )}
          />
        </StyledFormRow>

        <StyledFormRow>
          <KeyboardDatePicker
            format="MM/DD/yyyy"
            margin="normal"
            id="date"
            label="Date"
            value={date}
            onChange={setDate}
          />

          <KeyboardTimePicker
            margin="normal"
            id="time"
            label="Time"
            value={time}
            onChange={setTime}
          />
        </StyledFormRow>

        <StyledFormRow>
          <TextField
            variant="outlined"
            required
            id="amount"
            fullWidth
            label="Amount"
            value={amount}
            type="text"
            onChange={(e) => setAmount(e.target.value)}
          />
        </StyledFormRow>

        <StyledFormRow>
          <TextField
            variant="outlined"
            required
            id="price"
            fullWidth
            label="Price"
            value={price}
            type="text"
            onChange={(e) => setPrice(e.target.value)}
          />
        </StyledFormRow>

        <StyledFormRow>
          <TextField
            variant="outlined"
            required
            id="fee"
            fullWidth
            label="Fee"
            value={fee}
            type="text"
            onChange={(e) => setFee(e.target.value)}
          />
        </StyledFormRow>

        <StyledFormRow>
          <TextField
            variant="outlined"
            required
            id="feesymbol"
            fullWidth
            label="Fee Symbol"
            value={feeSymbol}
            type="text"
            onChange={(e) => setFeeSymbol(e.target.value)}
          />
        </StyledFormRow>
      </form>
    </ScrollBox>
  );
};
