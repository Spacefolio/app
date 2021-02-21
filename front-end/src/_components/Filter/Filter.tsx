import React, { useEffect } from "react";
import { FilterSection, FilterWrapper } from "./generalStyle";
import { useState } from "react";

export interface ILabelObject {
  label: string;
  filterName?: string;
  classname?: string;
}

interface IFilterProps {}

export const Filter: React.FC<IFilterProps> = ({}) => {
  return (
    <FilterWrapper>
      <FilterSection>Date</FilterSection>
      <FilterSection>Coin</FilterSection>
      <FilterSection>Type</FilterSection>
    </FilterWrapper>
  );
};
