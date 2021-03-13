import React, { useEffect, useState } from 'react';
import { exchangeActions } from '../../_actions';
import {
	exchangeType,
	IExchangeAccountView,
	IExchangeAccountRequest,
} from '../../../../types';
import { useDispatch, useSelector } from 'react-redux';
import {
	BaseButton,
	BigWideButton,
	ScrollBox,
	StyledFormRow,
} from '../../_styles';
import {
	makeStyles,
	Theme,
	createStyles,
	TextField,
	Avatar,
	Typography,
} from '@material-ui/core';

interface ExchangeFormProps {
	data: IExchangeAccountView;
}

export const EditIntegrationForm: React.FC<ExchangeFormProps> = ({ data }) => {
	const addingExchange = useSelector(
		(state: any) => state.exchanges.addingExchange
	);

	const dispatch = useDispatch();

	const [exchangeType, setExchangeType] = useState(data.exchangeType);

	const [apiKey, setApiKey] = useState(data.apiInfo.apiKey);

	const [apiSecret, setApiSecret] = useState(data.apiInfo.apiSecret);

	const [passphrase, setPassphrase] = useState(data.apiInfo.passphrase);

	const [name, setName] = useState(data.name);

	const [nickname, setNickname] = useState(data.nickname);

	const [submitted, setSubmitted] = useState(false);

	const [exchange, setExchange] = useState<IExchangeAccountRequest>({
		exchangeType,
		apiInfo: {
			apiKey,
			apiSecret,
			passphrase,
		},
		name,
		nickname,
	});

	useEffect(() => {
		setExchange({
			exchangeType,
			apiInfo: {
				apiKey,
				apiSecret,
				passphrase,
			},
			name,
			nickname,
		});
	}, [exchangeType, apiKey, apiSecret, passphrase, name, nickname]);

	const nicknameCharLimit = 20;

	const handleSubmit = (e: any) => {
		e.preventDefault();
		setSubmitted(true);
		if (
			apiKey &&
			apiSecret &&
			passphrase &&
			nickname &&
			nickname.length <= nicknameCharLimit
		) {
			dispatch(exchangeActions.update(exchange, data.id));
		}
	};

	return (
		<ScrollBox>
			<form onSubmit={handleSubmit} autoComplete="off">
				<StyledFormRow
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'start',
					}}
				>
					<Avatar src={data.logoUrl} />
					<Typography variant="h6">{name}</Typography>
				</StyledFormRow>

				<StyledFormRow>
					<TextField
						id="nickname"
						fullWidth
						label="NICKNAME"
						value={nickname}
						type="text"
						onChange={(e) => setNickname(e.target.value)}
						helperText={
							nickname.length > nicknameCharLimit &&
							`${nickname.length - nicknameCharLimit} too many characters`
						}
					/>
				</StyledFormRow>

				<StyledFormRow>
					<TextField
						required
						id="apikey"
						fullWidth
						label="API KEY"
						value={apiKey}
						type="text"
						onChange={(e) => setApiKey(e.target.value)}
						helperText={submitted && !apiKey && 'First Name is Required.'}
					/>
				</StyledFormRow>

				<StyledFormRow>
					<TextField
						required
						id="apisecret"
						fullWidth
						label="API SECRET"
						type="text"
						onChange={(e) => setApiSecret(e.target.value)}
						helperText={submitted && !apiSecret && 'First Name is Required.'}
						value={apiSecret}
					/>
				</StyledFormRow>

				<StyledFormRow>
					<TextField
						required
						id="passphrase"
						fullWidth
						label="PASSPHRASE"
						value={passphrase}
						type="text"
						onChange={(e) => setPassphrase(e.target.value)}
						helperText={submitted && !passphrase && 'First Name is Required.'}
					/>
				</StyledFormRow>

				<BaseButton
					disabled={
						data.nickname == nickname &&
						data.apiInfo.apiKey == apiKey &&
						data.apiInfo.passphrase == passphrase &&
						data.apiInfo.apiSecret == apiSecret
							? true
							: false
					}
					fullWidth
					variant="contained"
					color="primary"
					type="submit"
				>
					<Typography variant="button">
						{addingExchange ? 'Updating...' : 'Update'}
					</Typography>
				</BaseButton>
			</form>
		</ScrollBox>
	);
};
