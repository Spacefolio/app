import React, { useEffect, useState } from 'react';
import { portfolioActions } from '../../_actions';

import { IExchangeAccountView, IIntegrationInfo } from '../../../../types';

import {
	Button,
	CircularProgress,
	createStyles,
	Step,
	StepLabel,
	Stepper,
	Theme,
	Typography,
} from '@material-ui/core';
import { ActionButton, ScrollBox } from '../../_styles';
import { SelectNewIntegration } from './IntegrationSelector';
import { ButtonSection } from './_style';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../_reducers';
import { applicationViewActions } from '../../_actions/applicationView.actions';
import { AddIntegrationForm } from './AddIntegrationform';

interface IAddExchangeProps {}

export const AddIntegrationPopup: React.FC<IAddExchangeProps> = ({}) => {
	function getSteps() {
		return ['Choose an Integration', 'Enter Credentials', 'Finished'];
	}

	const [integrationInfo, setIntegrationInfo] = useState<IIntegrationInfo>(
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
				return <AddIntegrationForm integrationInfo={integrationInfo} />;
			case 2:
				return (
					<Typography>
						Done! Your account was successfully added! We are now syncing your
						data from {integrationInfo.name}
					</Typography>
				);
			default:
				return 'Unknown stepIndex';
		}
	}

	const dispatch = useDispatch();

	const [activeStep, setActiveStep] = React.useState(0);

	const [buttonText, setButtonText] = React.useState('');

	const addingExchange = useSelector(
		(state: any) => state.exchanges.addingExchange
	);

	const addExchangeSuccess = useSelector(
		(state: IRootState) => state.exchanges.addExchangeSuccess
	);

	const steps = getSteps();

	const handleClick = () => {
		switch (activeStep) {
			case 0:
				console.log(activeStep)
				setActiveStep((prevActiveStep) => prevActiveStep + 1);
				break;
			case 1:
				console.log(activeStep)
				break;
			case 2:
				console.log(activeStep);
				dispatch(applicationViewActions.setModal(false, null, null));
				break;
		}
	};

	useEffect(() => {
		switch (activeStep) {
			case 0:
				setButtonText('Next');
				break;
			case 1:
				setButtonText('Submit');
				break;
			case 2:
				setButtonText('Finish');
				break;
		}
	}, [activeStep]);

	useEffect(() => {
		if (activeStep == 1 && addExchangeSuccess) {
			setActiveStep(2);
		}
	}, [addExchangeSuccess]);

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<React.Fragment>
			<Stepper style={{ width: '100%' }} activeStep={activeStep}>
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel>
							<Typography>{index == activeStep && label}</Typography>
						</StepLabel>
					</Step>
				))}
			</Stepper>

			{activeStep === steps.length ? (
				<React.Fragment>
					<Typography>All steps completed</Typography>
					<Button onClick={handleReset}>Reset</Button>
				</React.Fragment>
			) : (
				<React.Fragment>
					{getStepContent(activeStep)}

					<ButtonSection>
						<ActionButton disabled={activeStep === 0} onClick={handleBack}>
							Back
						</ActionButton>
						<ActionButton
							type={activeStep === 1 ? 'submit' : 'button'}
							form={activeStep === 1 ? 'add-exchange-form' : ''}
							disabled={integrationInfo == null}
							variant="contained"
							color="primary"
							onClick={handleClick}
						>
							{addingExchange ? 'Submitting' : buttonText}
						</ActionButton>
					</ButtonSection>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};
