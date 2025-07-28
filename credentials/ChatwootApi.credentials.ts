import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ChatwootApi implements ICredentialType {
	name = 'chatwootApi';
	displayName = 'Chatwoot API';
	documentationUrl = 'https://developers.chatwoot.com/api-reference/introduction';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://app.chatwoot.com',
			description: 'The base URL of your Chatwoot instance (e.g., https://app.chatwoot.com or https://your-instance.com)',
			placeholder: 'https://app.chatwoot.com',
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Your Chatwoot API access token (get from Profile Settings > API Access Token)',
		},
		{
			displayName: 'Account ID',
			name: 'accountId',
			type: 'number',
			default: 1,
			description: 'The numeric ID of your Chatwoot account',
			placeholder: '1',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'api_access_token': '={{ $credentials.accessToken }}',
				'Content-Type': 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{ $credentials.baseUrl }}',
			url: '/api/v1/profile',
			method: 'GET',
		},
	};
}
