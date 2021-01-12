import React, { useEffect, useState } from "react";
import "./OrderPanel.scss";

export const OrderPanel = () => {
  const [sellOrBuy, setSellOrBuy] = useState("BUY");

  const [orderType, setOrderType] = useState("MARKET");

  const [orderAmount, setOrderAmount] = useState();
  const [orderingTicker, setOrderingTicker] = useState("BTC");

  const [limitPrice, setLimitPrice] = useState();
  const [baseTicker, setBaseTicker] = useState("USD");

  const [stopPrice, setStopPrice] = useState();

  const [orderFees, setorderFees] = useState("0.00");
  const [orderTotal, setOrderTotal] = useState("0.00");

  useEffect(() => {
    console.log("orderPanel rendering");
  }, []);

  const handleSubmit = (e) => {};

  const buttonColors = {
    BUY: "#2eae34",
    SELL: "#f9672d",
  };

  const buySellStyler = (selectorName) => {
    return {
      backgroundColor:
        sellOrBuy == selectorName ? buttonColors[selectorName] : "",
      color: sellOrBuy == selectorName ? "white" : "",
    };
  };

  const orderTypeSelector = (selectorName) => {
    return {
      borderBottom: orderType == selectorName ? "2px solid white" : "",
      color: orderType == selectorName ? "white" : "",
    };
  };

  return (
    <div className="trade-panel-container order-panel-container">
      <div className="trade-panel-header-bar">
        <div>Order Form</div>
      </div>
      <div className="order-form-container center-my-children-column">
        <div className="order-form-inner-container">
          <form>
            <div className="order-form-buysell-toggle-container">
              <div
                className="order-form-buy-selector"
                style={buySellStyler("BUY")}
                onClick={() => setSellOrBuy("BUY")}
              >
                BUY
              </div>
              <div
                className="order-form-sell-selector"
                style={buySellStyler("SELL")}
                onClick={() => setSellOrBuy("SELL")}
              >
                SELL
              </div>
            </div>
            <div className="order-type-selector-container">
              <div
                style={orderTypeSelector("MARKET")}
                onClick={() => setOrderType("MARKET")}
              >
                MARKET
              </div>
              <div
                style={orderTypeSelector("LIMIT")}
                onClick={() => setOrderType("LIMIT")}
              >
                LIMIT
              </div>
              <div
                style={orderTypeSelector("STOP")}
                onClick={() => setOrderType("STOP")}
              >
                STOP
              </div>
            </div>
            <div className="order-form-amount-inputs-container">
              <div>
                <div className="input-section-label">Stop Price</div>
                <div className="order-form-input-container">
                  <input
                    placeholder="0.00"
                    className="order-form-input-textbox"
                    value={stopPrice}
                  ></input>
                  <div className="order-form-input-ticker">{baseTicker}</div>
                </div>
              </div>
              <div>
                <div className="input-section-label">Amount</div>
                <div className="order-form-input-container">
                  <input
                    placeholder="0.00"
                    className="order-form-input-textbox"
                    value={stopPrice}
                  ></input>
                  <div className="order-form-input-ticker">
                    {orderingTicker}
                  </div>
                </div>
              </div>
              <div>
                <div className="input-section-label">Limit Price</div>
                <div className="order-form-input-container">
                  <input
                    placeholder="0.00"
                    className="order-form-input-textbox"
                    value={stopPrice}
                  ></input>
                  <div className="order-form-input-ticker">{baseTicker}</div>
                </div>
              </div>
              <div className="order-form-terms-text">
                By placing an order you agree to our{" "}
                <a href="/terms">Terms of Service</a>
              </div>
              <div className="order-form-divider"></div>
              <div className="order-form-calculations-container">
                <div className="order-form-calculation-section-container">
                  <div>Fee *</div>
                  <div>
                    {orderFees} {baseTicker}
                  </div>
                </div>
                <div className="order-form-calculation-section-container">
                  <div>Total *</div>
                  <div>
                    {orderTotal} {baseTicker}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={buySellStyler(sellOrBuy)}
              className="order-form-submit-btn center-my-children"
            >
              PLACE {sellOrBuy} ORDER
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
