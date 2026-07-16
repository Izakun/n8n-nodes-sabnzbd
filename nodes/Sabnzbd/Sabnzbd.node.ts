import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeApiError,
	NodeConnectionTypes,
} from 'n8n-workflow';

export class Sabnzbd implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SABnzbd',
		name: 'sabnzbd',
		icon: { light: 'file:sabnzbd.svg', dark: 'file:sabnzbd.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Control your SABnzbd usenet downloader through its HTTP API',
		defaults: {
			name: 'SABnzbd',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'sabnzbdApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Add URL', value: 'addUrl', action: 'Add an NZB by URL' },
					{ name: 'Get History', value: 'getHistory', action: 'Get the download history' },
					{ name: 'Get Queue', value: 'getQueue', action: 'Get the download queue' },
					{ name: 'Get Server Stats', value: 'getServerStats', action: 'Get server statistics' },
					{ name: 'Get Version', value: 'getVersion', action: 'Get the SABnzbd version' },
					{ name: 'Pause Queue', value: 'pauseQueue', action: 'Pause the queue' },
					{ name: 'Resume Queue', value: 'resumeQueue', action: 'Resume the queue' },
				],
				default: 'getQueue',
			},
			{
				displayName: 'NZB URL',
				name: 'url',
				type: 'string',
				default: '',
				required: true,
				description: 'URL of the NZB to add',
				displayOptions: { show: { operation: ['addUrl'] } },
			},
			{
				displayName: 'Options',
				name: 'addOptions',
				type: 'collection',
				placeholder: 'Add option',
				default: {},
				displayOptions: { show: { operation: ['addUrl'] } },
				options: [
					{ displayName: 'Category', name: 'cat', type: 'string', default: '' },
					{ displayName: 'Name (rename)', name: 'nzbname', type: 'string', default: '' },
					{
						displayName: 'Priority',
						name: 'priority',
						type: 'options',
						options: [
							{ name: 'Default', value: '-100' },
							{ name: 'Low', value: '-1' },
							{ name: 'Normal', value: '0' },
							{ name: 'High', value: '1' },
							{ name: 'Force', value: '2' },
						],
						default: '-100',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const modeByOperation: Record<string, string> = {
			getVersion: 'version',
			getQueue: 'queue',
			getHistory: 'history',
			getServerStats: 'server_stats',
			pauseQueue: 'pause',
			resumeQueue: 'resume',
			addUrl: 'addurl',
		};

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('sabnzbdApi', i);
				const baseURL = (credentials.baseUrl as string).replace(/\/+$/, '');
				const operation = this.getNodeParameter('operation', i) as string;

				const qs: IDataObject = { mode: modeByOperation[operation], output: 'json' };

				if (operation === 'addUrl') {
					qs.name = this.getNodeParameter('url', i) as string;
					const opts = this.getNodeParameter('addOptions', i, {}) as IDataObject;
					if (opts.cat) qs.cat = opts.cat;
					if (opts.nzbname) qs.nzbname = opts.nzbname;
					if (opts.priority !== undefined && opts.priority !== '-100') qs.priority = opts.priority;
				}

				const options: IHttpRequestOptions = {
					method: 'GET' as IHttpRequestMethods,
					baseURL,
					url: '/api',
					qs,
					json: true,
				};

				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'sabnzbdApi',
					options,
				);

				returnData.push({
					json: (typeof response === 'object' && response !== null
						? response
						: { result: response }) as IDataObject,
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
