import React, { useEffect, useState } from "react";
import { exchangeActions } from "../../_actions";
import { IExchangeReference } from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { COLORS, Scrollbox } from "../../AlgonexStyles";

interface ISelectIntegrationProps {
  setIntegrationInfo: any;
  showSearch: boolean;
  selectedId: string;
  filter?: string;
}
export const SelectNewIntegration: React.FC<ISelectIntegrationProps> = ({
  setIntegrationInfo,
  selectedId,
  showSearch,
  filter,
}) => {
  const dispatch = useDispatch();

  const exchangeRef = useSelector((state: any) => state.exchanges.exchangeRef);

  const [searchFilter, setSearchFilter] = useState(filter && filter);

  const [selectedIntegration, setSelectedIntegration] = useState(selectedId);

  useEffect(() => {
    dispatch(exchangeActions.getRef());
  }, []);

  const handleClick = (item: IExchangeReference) => {
    if (selectedIntegration == item.id) {
      setSelectedIntegration("");
    } else {
      setSelectedIntegration(item.id);
      setIntegrationInfo(item);
    }
  };

  return (
    <React.Fragment>
      {showSearch && (
        <TextField
          style={{ width: "100%" }}
          name="search"
          autoComplete={"off"}
          placeholder="search"
          value={searchFilter}
          onChange={(e: any) => setSearchFilter(e.target.value)}
          id="outlined-search"
          label="Filter Exchanges"
          type="search"
          variant="outlined"
        />
      )}
      <Scrollbox>
     
          {exchangeRef &&
            exchangeRef
              .filter((item: IExchangeReference) => {
                if (searchFilter) {
                  return item.name
                    .toLowerCase()
                    .startsWith(searchFilter.toLowerCase());
                } else return true;
              })
              .map((item: IExchangeReference) => {
                return (
                  <ListItem
                    style={{
                      boxShadow: `${
                        selectedIntegration == item.id
                          ? `inset 0px 0px 0px 1px grey`
                          : "inset 0px 0px 0px 1px whitesmoke"
                      }`,
                    }}
                    key={item.id}
                    button
                    onClick={() => handleClick(item)}
                    selected={selectedIntegration == item.id}
                  >
                    <Avatar src={item.logoUrl} />
                    <Typography variant={"button"}>{item.name}</Typography>
                  </ListItem>
                );
              })}
       
      </Scrollbox>
    </React.Fragment>
  );
};
