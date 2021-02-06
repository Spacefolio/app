import React, {useState} from "react";
import {DeleteButton, EditButton} from '../_components'
import {exchangeData} from '../types/exchangeInterface'
import {Modal} from '../_components'
import {AddExchangeForm} from './AddExchangeForm'

interface ExchangeItemProps {
  data: exchangeData
}

export const ExchangeItem: React.FC<ExchangeItemProps> = ({data}) => {
  const [editExchangeVisible, setEditExchangeVisible] = useState(false);
  const [DeleteExchangeVisible, setDeleteExchangeVisible] = useState(false);

  return (
    <div
      style={{
        padding: "0 20px",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img height="25px" width="25px" src={data.imageURL}></img>
      <div>{data.nickname}</div>
      <DeleteButton
        right="-30px"
        clickAction={() => {
          console.log("delete ", data.name);
        }}
      />
      <Modal visible={editExchangeVisible} dismiss={() => setEditExchangeVisible(false)} children={<AddExchangeForm data={data}/>}/>
      <EditButton
        right="-60px"
        clickAction={() => {
          setEditExchangeVisible(true);
        }}
      />
    </div>
  );
};
