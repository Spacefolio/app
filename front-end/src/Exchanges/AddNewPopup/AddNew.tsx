import React, { useEffect, useState } from "react";
import { portfolioActions } from "../../_actions";

import { IExchangeAccountView, IExchangeReference } from "../../../../types";

import {
  Button,
  CircularProgress,
  createStyles,
  Step,
  StepLabel,
  Stepper,
  Theme,
  Typography,
} from "@material-ui/core";
import { BaseButton, Scrollbox } from "../../AlgonexStyles";
import { AddExchangeForm } from "..";
import { SelectNewIntegration } from "./AddNewSelector";
import { ButtonSection } from "./Style";
import { useSelector } from "react-redux";
import { IRootState } from "../../_reducers";

interface IAddExchangeProps {}

export const AddExchangePopup: React.FC<IAddExchangeProps> = ({}) => {
  function getSteps() {
    return ["Choose an Integration", "Enter Credentials", "Finished"];
  }

  const [integrationInfo, setIntegrationInfo] = useState<IExchangeReference>(
    null
  );

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <SelectNewIntegration
            showSearch={true}
            selectedId={integrationInfo && integrationInfo.id}
            setIntegrationInfo={setIntegrationInfo}
          />
        );
      case 1:
        return <AddExchangeForm integrationInfo={integrationInfo} />;
      case 2:
        return (
          <Typography>
            Done! Your account was successfully added! We are now syncing your
            data from {integrationInfo.name}
          </Typography>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);

  const [buttonText, setButtonText] = React.useState("");

  const addingExchange = useSelector(
    (state: any) => state.exchanges.addingExchange
  );

  const addExchangeSuccess = useSelector(
    (state: IRootState) => state.exchanges.addExchangeSuccess
  );

  const steps = getSteps();

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
      case 1:
        setButtonText("Submit");
        break;
      case 2:
        setButtonText("Finish");
        break;
    }
  };

  useEffect(() => {
    if (addExchangeSuccess && activeStep == 1) {
      setActiveStep(2);
    }
  }, [addExchangeSuccess]);

  useEffect(() => {
    switch (activeStep) {
      case 0:
        setButtonText("Next");
        break;
      case 1:
        setButtonText("Submit");
        break;
      case 2:
        setButtonText("Finish");
        break;
    }
  }, [activeStep]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <React.Fragment>
      <Stepper style={{ width: "100%" }} activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              <Typography>{index == activeStep && label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography>{getStepContent(activeStep)}</Typography>

            <ButtonSection>
              <BaseButton disabled={activeStep === 0} onClick={handleBack}>
                Back
              </BaseButton>
              <BaseButton
                type={activeStep === 1 ? "submit" : "button"}
                form={activeStep === 1 && "add-exchange-form"}
                disabled={integrationInfo == null}
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {addingExchange ? "Submitting" : buttonText}
              </BaseButton>
            </ButtonSection>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};