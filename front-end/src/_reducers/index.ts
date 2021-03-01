import { combineReducers } from "redux";
import { IPortfolioState, portfolio } from "./portfolio.reducer";
import { authentication, IAuthenticationState } from "./authentication.reducer";
import { IRegistrationState, registration } from "./registration.reducer";
import { alert } from "./alert.reducer";
import { exchanges, IExchangesState } from "./exchange.reducer";
import { IApplicationViewState, applicationView } from "./applicationView.reducer";

export interface IRootState {
  portfolio: IPortfolioState;
  exchanges: IExchangesState;
  authentication: IAuthenticationState;
  registration: IRegistrationState;
  applicationView: IApplicationViewState;
  alert: any;
}

const rootReducer = combineReducers({
  portfolio,
  exchanges,
  authentication,
  registration,
  alert,
  applicationView,
});

export default rootReducer;
