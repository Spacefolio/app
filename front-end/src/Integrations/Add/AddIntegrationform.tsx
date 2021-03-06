import React, { useEffect, useState } from 'react';
import { exchangeActions } from '../../_actions';
import {
	IExchangeAccountCredentials,
	IExchangeAccountRequest,
	IIntegrationInfo,
} from '../../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { StyledFormRow } from '../../_styles';
import { Avatar, TextField, Typography } from '@material-ui/core';

interface ExchangeFormProps {
	integrationInfo: IIntegrationInfo;
}

export const AddIntegrationForm: React.FC<ExchangeFormProps> = ({
	integrationInfo,
}) => {
	const dispatch = useDispatch();

	const [submitted, setSubmitted] = useState(false);

	const [integrationId, setExchangeType] = useState(integrationInfo.id);

	const [apiKey, setApiKey] = useState('');

	const [secret, setSecret] = useState('');

	const [password, setPassword] = useState('');

	const [privateKey, setPrivateKey] = useState('');

	const [login, setLogin] = useState('');

	const [token, setToken] = useState('');

	const [uid, setUid] = useState('');

	const [walletAddress, setWalletAddress] = useState('');

	const [name, setName] = useState(integrationInfo.name);

	const [nickname, setNickname] = useState(integrationInfo.name);

	const [exchange, setExchange] = useState<IExchangeAccountRequest>({
		exchangeType: integrationId,
		apiInfo: {
			apiKey,
			secret,
			password,
			privateKey,
			login,
			token,
			uid,
			walletAddress,
		},
		logoUrl: integrationInfo.logoUrl,
		name,
		nickname,
	});

	useEffect(() => {
		setExchange({
			exchangeType: integrationId,
			apiInfo: {
				apiKey,
				secret,
				password,
				privateKey,
				login,
				token,
				uid,
				walletAddress
			},
			name,
			logoUrl: integrationInfo.logoUrl,
			nickname,
		});
	}, [integrationId, apiKey, secret, password, privateKey, login, token, uid, walletAddress, name, nickname]);

	const nicknameCharLimit = 20;

	const handleSubmit = (e: any) => {
		e.preventDefault();
		setSubmitted(true);

		if (providedRequiredCredentials(integrationInfo, exchange.apiInfo) &&
			nickname.length <= nicknameCharLimit
		) {
			dispatch(exchangeActions.addNew(exchange));
		}
	};

	return (
		<form onSubmit={handleSubmit} autoComplete="on" id="add-exchange-form">
			<StyledFormRow
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'start',
				}}
			>
				<Avatar src={integrationInfo.logoUrl} />
				<Typography>{name}</Typography>
			</StyledFormRow>
			<StyledFormRow>
				<TextField
					variant="outlined"
					id="nickname"
					fullWidth
					label="Nickname"
					value={nickname}
					type="text"
					onChange={(e) => setNickname(e.target.value)}
					helperText={
						nickname.length > nicknameCharLimit &&
						`${nickname.length - nicknameCharLimit} too many characters`
					}
				/>
			</StyledFormRow>
			{integrationInfo.requiredCredentials.apiKey && (
				<StyledFormRow>
					<TextField
						variant="outlined"
						required
						id="apikey"
						fullWidth
						label="API Key"
						value={apiKey}
						type="text"
						onChange={(e) => setApiKey(e.target.value)}
					/>
				</StyledFormRow>
			)}
			{integrationInfo.requiredCredentials.secret && (
				<StyledFormRow>
					<TextField
						variant="outlined"
						required
						id="apisecret"
						fullWidth
						label="API Secret"
						type="text"
						onChange={(e) => setSecret(e.target.value)}
						value={secret}
					/>
				</StyledFormRow>
			)}
			{integrationInfo.requiredCredentials.password && (
				<StyledFormRow>
					<TextField
						variant="outlined"
						required
						id="password"
						fullWidth
						label="Password"
						value={password}
						type="text"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</StyledFormRow>
			)}
			{integrationInfo.requiredCredentials.privateKey && (
				<StyledFormRow>
					<TextField
						variant="outlined"
						required
						id="privateKey"
						fullWidth
						label="Private Key"
						value={privateKey}
						type="text"
						onChange={(e) => setPrivateKey(e.target.value)}
					/>
				</StyledFormRow>
			)}
			{integrationInfo.requiredCredentials.login && (
				<StyledFormRow>
					<TextField
						variant="outlined"
						required
						id="login"
						fullWidth
						label="Login"
						value={login}
						type="text"
						onChange={(e) => setLogin(e.target.value)}
					/>
				</StyledFormRow>
			)}
			{integrationInfo.requiredCredentials.token && (
				<StyledFormRow>
					<TextField
						variant="outlined"
						required
						id="token"
						fullWidth
						label="Token"
						value={token}
						type="text"
						onChange={(e) => setToken(e.target.value)}
					/>
				</StyledFormRow>
			)}
			{integrationInfo.requiredCredentials.uid && (
				<StyledFormRow>
					<TextField
						variant="outlined"
						required
						id="uid"
						fullWidth
						label="User ID"
						value={uid}
						type="text"
						onChange={(e) => setUid(e.target.value)}
					/>
				</StyledFormRow>
			)}
			{integrationInfo.requiredCredentials.walletAddress && (
				<StyledFormRow>
					<TextField
						variant="outlined"
						required
						id="walletAddress"
						fullWidth
						label="WalletAddress"
						value={walletAddress}
						type="text"
						onChange={(e) => setWalletAddress(e.target.value)}
					/>
				</StyledFormRow>
			)}
		</form>
	);
};

function providedRequiredCredentials(integrationInfo: IIntegrationInfo, credentials: IExchangeAccountCredentials): boolean {
	for (const [prop, required] of Object.entries(integrationInfo.requiredCredentials)) {
		if (required) {
			const credential = prop as keyof IExchangeAccountCredentials;
			if (!credentials.hasOwnProperty(prop) || !credentials[credential]) {
				return false;
			}
		}
	}

	return true;
}