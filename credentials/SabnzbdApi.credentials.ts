import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SabnzbdApi implements ICredentialType {
	name = 'sabnzbdApi';

	displayName = 'SABnzbd API';

	icon = 'file:sabnzbdApi.svg' as const;

	documentationUrl = 'https://sabnzbd.org/wiki/advanced/api';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'http://sabnzbd:8080',
			required: true,
			description:
				'Base URL of the SABnzbd instance (e.g. http://sabnzbd:8080). No trailing slash.',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'SABnzbd API key (Config → General → API Key)',
		},
	];

	// SABnzbd expects the key as the "apikey" query parameter.
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				apikey: '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api',
			qs: {
				mode: 'version',
				output: 'json',
			},
		},
	};
}
