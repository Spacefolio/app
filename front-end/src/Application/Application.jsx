import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './Application.scss';
import {Dashboard} from '../Dashboard';
import {Nav} from '../Nav';
1
export const Application = () => {
  const dispatch = useDispatch();
  
  //pull in the current page of the redux state and render the cooresponding page under the nav

  

  return(
    <div>
      <Nav />
      
      <Dashboard />

    </div>
  );
}