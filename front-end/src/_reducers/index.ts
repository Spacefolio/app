import { combineReducers } from "redux";
import { portfolio } from "./portfolio.reducer";
import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { alert } from "./alert.reducer";
import { exchanges } from "./exchange.reducer";

interface IRootState {
  portfolio: object;
  exchanges: object;
  authentication: object;
  registration: object;
  alert: object;
}

const rootReducer = combineReducers({
  portfolio,
  exchanges,
  authentication,
  registration,
  alert,
});

export default rootReducer;
