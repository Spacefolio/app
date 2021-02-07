import React, { useEffect, useState } from "react";
import { exchangeService } from "../_services";
import "./ExchangesPopup.scss";
import { ExchangeForm } from "../Exchanges";
import { ExchangeItem } from "../Exchanges";
import { exchangeData } from "../types";

interface ExchangesPopupProps {}

export const ExchangesPopup: React.FC<ExchangesPopupProps> = ({}) => {
  const [exchangeData, setExchangeData] = useState([
    {
      id: "2",
      name: "Coinbase Pro",
      nickname: "Personal",
      apiKey: "imakey",
      apiSecret: "imasecret",
      passphrase: "imapassphrase",
      imageURL:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAAAXNSR0IArs4c6QAABNdJREFUaAXtWmtoHFUU/s7Mxia21JQ+IhER4qOBCIriA2PcjQX9URQsEmjxT/5YKxhQEdomobVpLEGs0D+CYAVBKluxIgg+qJsXqUaxiAgmtbUGgmBtrTZBs5md47luF2XdnTtzZ3YSZc6f4c79zuM7586dO/cOkEiSgSQDSQaSDMSXAYrPlXgaGN8IcjaD0SGtZoCbwNQE4oK0LwL0i1xn5P7ngDWJq1aMo+fu3+ReaKk90Re/WomFC0/DpW4h0BIoYqLfBX8MlnUYvfcdD6RbBq4d0ew3V2Dq3HapXp8Q3FDmN3iT6BPY9g7s7pgOrizjw0RJqzM03oxvf5oA86FISCqHzPfDdR/W+q4CiJ7o4OhtyC9Oir/bq/g0u02Q59g5YqYMpEwVK+q9MNwBx/1A+q6s2B/qJh1D36ZZUxPRVXTw0yY4yMoYqwFJoWfjoClJpRdNRbNsY2rkLSF5te9giM7JRCUzKn8tr5VipVxeK9NGm7xu7hE7d8hzeXmypBPYnTnh23YFYDREp0d6JahMBfv/vkX0IwjP4qZ0Fl2k3p+V5cBYCxbdHZK8Hnm9vFQZ5P9u+NfLy7lGXKIfJKDVPty+j8aGbYEWAQdyN2Bn5gyIXB/2q0LCP6Pz9KQvkkTvoXXDlkAkVdi7Or8LS1KZCVfRgxMNmMufFaKaBQGdRcOam/HcLfPK6VJIuIrOL27TkxRaNh5fSpIqseGIgh/0UZ3j6M187ANXU0g4ooy0PjrrVT2m9ghzovvG27TDlnAereverT0NvQdzolTIaM0zTaCrLa/FxQAIQZRv1cZn8aQWExPAnChjnTZGll2CZSJhiMq6VCO2O6NBxNZtTpR8VDSl9oGWh5gTZegruv7/QJSwxrtW5KC78w9vTHy9YSqqWbdyCmqDbJmIOVHgZy2HU5c0VddaiAwQgiif10bhOo1aTEwAc6JEeqIoXBMTD60bc6J+hi65d2ojiAlgTpRwWhsj011aTEwAc6KgYR8xtkPtEC4DMSe6uvkz2ctRh0DVhXk9poYfqg6Ir8ecaM+NCxKmfq+V8UR8dKp7MieqbBLnqpu+3EP0APaPqA3pJZVwRFN1b8jwXfRkoHbbXX4Nh06t8MTVuDMc0Z33zkh8R/Qxcit+nX3l7yMGvUbUiHBEVTS2NSRVZW1gzN0YHDkceBZ+PVevte0DEG4Du+Rg3/A7slH2SKnpeSU6KUdb27ErI/8peEgul8IYHpWJYAgWbUVfesIDre2Khqg64V5wTmp3BUvhFEfAmJDIwuYvYaVm4RQY5K4Fy2kac7vY2iKnbU1/qRAdRX+mq6Ruco2GqPI8OLoJBfcjCTD841DORJ1219W1oDgnlPf6akcXlPprxMLzvrwGBbEcauQLTwVV+yc+uoqWrA7k9sqQ21NqRneli1h1fTOeudZ7NVbFYXQVLTno79wrB7ePyTmdWjlFKNyIuTPGy8noiSpqfek3YafSMtl4z6xB0qASZ5v/ihD90C0PfiAnrwjsl+G8sbzLV7v44fC2JG0P+tPf+9KpAKo9UeVUfapNj7bLUnCzrI/Vv4ByQOUhRIrQF0LuQ/kf8GjgU/IKpuMhWu5YrXsvnF6JVF0DuL5enmcHVMiD8nmsum4OxS+jcq2knWQgyUCSgSQD/5kM/AkF2TZEiqtrJAAAAABJRU5ErkJggg==",
    },
    {
      id: "1",
      name: "Binance",
      nickname: "Client account",
      apiKey: "imakey",
      apiSecret: "imasecret",
      passphrase: "imapassphrase",
      imageURL:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAAAXNSR0IArs4c6QAABOdJREFUaAXtmk+PGzUUwO1JK7WbRGIltB8AblySbeHUHlo2CRSKhPgAiM9B/7BLSw98CdQzlwJtl+YPLVJ7gnZ3Ja4gce2lSJlZVtpsjJ+bt3Vm/HdiD6qUXOyx/d7zz++N/WYyhCx/yxVYrsByBaQVGPdbX2eD1lWpqZIqrcTKzAhA8uo1uEwouVbv7t2cdUUvKgOVIZGqStgEjcYsx8PWFtcvPCnbmTJyo6owju5RATkl12XAfL0Kz0YFdYFE6Niw0UB9IKuAjQJaBjI2bHDQRSBjwgYFDQEZCzYYaEjIGLBBzlEfSErpI0LJY4QxlSHP2YVBfSHrq7WPGydWL/nBtq+YFsSlb6HQLQNJ3326DxNjDy800smLbcLIeZeJJpRerXd3v3EZqxpT2qPjQXuTWDIeNAjhCp5ESGinFx+lfp5lN7NBec+W8ujB8L23JuzwD8bYaYTRlSpIeayPZymh+7Uafef0xs7fsg6XeimPnur89hdh9BMO8a/JiA0SZF09C5AsYZfLQAo7pona+tL++gah7CeVZ10gZf0mzyJks7P3UJbxqZcKXdmAEpbSXxurtY/ke1KW0dVVsCEgwZ5T6Kaj9hdsr1dXTbDR2xnNhTFArq3NbTyyXDo484FYHLlxVs+HsQ1SLMxg/XOFqkKTFRR2V3bEvkufP79nhSV0W0C2+lnBEm8ASEKO7kC422A5ZB/uSV24ovcZm97O+u0vVfbkNmPoiiOEsa+OBdBbGpDjcYoKQjJGTkG32Mj4hiYiQjHe1ISQ8hmcEHql3tu9pZPTghYgUUMJ2DzkK1V81/aEVUGiPhOsElQLiRo9YHWQr1S5w5ogUZ8OtgBqhUSNDrDpqNXj2dMPGK4omi8hjFmSXG5uPPsl34fXLpA4VgVb2Ix4A0OBhctprbCQOp30iJnHnjykPMzNY1A538mwimUBlCfOWzyB3sQBytLBmyDX6D57QEjtUz69A6Ue3ui6KdHzT8aNk298yCWe6HRBuy75L4DCYIDlM9iCeuHnCIlyJlhXSNQlzlkDrA4S5AsuRqVQFu5XT0hZV35T8oWUdbHH55rpfrbN77Jz2G6ChDFKj6Jws7u7eexZC2Q6XO+k/fZ9bVIhhbENUmw8/fYD/rx7EecilyKMV+qXMIxtkCBr9CgqhxSw/uba91STKAAkYexHkdzDghjyXOFZxia6REFAHv7zM3jLmgJyz2YH2WeNzu5tnKuudALVCUP7HORsIPdY4UHbpAP7VEeIDRZlbeVCoOmw3eWHET8niw/gvrAqSJx8CFjjPYqGVOVLyFm4KgZw+AvZi6N77PezK4ruuSYTJAxkhK3QKb07Hp15f07Q46KURw9GZ9+eTCf8VcrLBN1kz+ZZG6SsGzxb7auUjad/8jzmW3kSurrJsz6QoJ8nHrf+l1cp1b7uXOxTgFKhK3uvDCwZNxO/d7qLQYpokCddtu4LyzeXE/JDs8muSzJgkse+hT2KinxgUcZWhvwXPBgoTDokbEhImFtQ0FCwoSFhXqUTBhBW/fhbO3iZdkPV59IWAxLsBvcowqg+oMI+XRkLEuxFAwXlPrAxIaODusLGhqwE1AZbBSTMIfhmBErzv2ZvDz6RK2xQSZJcr+oLz6j3aB5YvmcFZGenAJ+XeW2vATYbrhe+9HxtgZYTX67AcgWCrMB/E0TfnsoHXksAAAAASUVORK5CYII=",
    },
  ]);

  const { getAll } = exchangeService;

  const getExchangeData = () => {
    getAll().then((res) => {
      console.log(res);
    })
  };

  useEffect(() => getExchangeData(), []);

  return (
    <div className="exchange-popup-wrapper">
      <div className="exchange-popup-inner-wrapper">
        <div className="my-exchanges-wrapper">
          <div>
            <h1 className="my-exchanges-label">My Exchanges</h1>
          </div>
          <div className="my-exchanges-list-container">
            {
              //loop though all of the users linked exchanges and display them with an exchange component
              exchangeData.length != 0
                ? exchangeData.map((item) => {
                    return (
                      <ExchangeItem
                        data={item}
                      />
                    );
                  })
                : "Add a test exchange below"
            }
          </div>
        </div>
        <div className="add-exchange-wrapper">
          <ExchangeForm formType={"add"} />
        </div>
      </div>
    </div>
  );
};
