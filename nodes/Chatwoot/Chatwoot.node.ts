import type {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';

export class Chatwoot implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Chatwoot',
		name: 'chatwoot',
		icon: { light: 'file:chatwoot.svg', dark: 'file:chatwoot.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Chatwoot API',
		defaults: {
			name: 'Chatwoot',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'chatwootApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Account', value: 'account' },
					{ name: 'Canned Response', value: 'cannedResponse' },
					{ name: 'Contact', value: 'contact' },
					{ name: 'Conversation', value: 'conversation' },
					{ name: 'Inbox', value: 'inbox' },
					{ name: 'Label', value: 'label' },
					{ name: 'Message', value: 'message' },
					{ name: 'Team', value: 'team' },
					{ name: 'Webhook', value: 'webhook' },
				],
				default: 'contact',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['account'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get account details',
						action: 'Get account details',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contact'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new contact',
						action: 'Create a contact',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a contact',
						action: 'Delete a contact',
					},
					{
						name: 'Filter',
						value: 'filter',
						description: 'Filter contacts using custom rules',
						action: 'Filter contacts',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a contact by ID',
						action: 'Get a contact',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many contacts',
						action: 'Get many contacts',
					},
					{
						name: 'Search',
						value: 'search',
						description: 'Search contacts',
						action: 'Search contacts',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a contact',
						action: 'Update a contact',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['conversation'],
					},
				},
				options: [
					{
						name: 'Add Labels',
						value: 'addLabels',
						description: 'Add labels to conversation',
						action: 'Add labels to conversation',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new conversation',
						action: 'Create a conversation',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a conversation by ID',
						action: 'Get a conversation',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many conversations',
						action: 'Get many conversations',
					},
					{
						name: 'Update Custom Attributes',
						value: 'updateCustomAttributes',
						action: 'Update custom attributes',
					},
					{
						name: 'Update Status',
						value: 'updateStatus',
						description: 'Update conversation status',
						action: 'Update conversation status',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['message'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new message',
						action: 'Create a message',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a message',
						action: 'Delete a message',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a message by ID',
						action: 'Get a message',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many messages in a conversation',
						action: 'Get many messages',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a message',
						action: 'Update a message',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['inbox'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get an inbox by ID',
						action: 'Get an inbox',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many inboxes',
						action: 'Get many inboxes',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['cannedResponse'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new canned response',
						action: 'Create a canned response',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a canned response',
						action: 'Delete a canned response',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a canned response by ID',
						action: 'Get a canned response',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many canned responses',
						action: 'Get many canned responses',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a canned response',
						action: 'Update a canned response',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new webhook',
						action: 'Create a webhook',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a webhook',
						action: 'Delete a webhook',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a webhook by ID',
						action: 'Get a webhook',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many webhooks',
						action: 'Get many webhooks',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a webhook',
						action: 'Update a webhook',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['team'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a team by ID',
						action: 'Get a team',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many teams',
						action: 'Get many teams',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['label'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a label by ID',
						action: 'Get a label',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many labels',
						action: 'Get many labels',
					},
				],
				default: 'get',
			},
			// Contact fields
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'number',
				default: '',
				required: true,
				description: 'The numeric ID of the contact',
				placeholder: '1',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['get', 'update', 'delete'],
					},
				},
			},
			// Send mode for operations that create/update data
			{
				displayName: 'Send',
				name: 'sendMode',
				type: 'options',
				options: [
					{
						name: 'Structured Fields',
						value: 'fields',
						description: 'Use the structured form fields below',
					},
					{
						name: 'Custom JSON',
						value: 'json',
						description: 'Provide custom JSON for full control over the request',
					},
				],
				default: 'fields',
				description: 'How to send the data',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create', 'update'],
					},
				},
			},
			{
				displayName: 'Custom JSON',
				name: 'customJson',
				type: 'json',
				default: '{\n  "name": "John Doe",\n  "email": "john@example.com",\n  "phone_number": "+1234567890"\n}',
				description: 'Custom JSON payload to send with the request. This will override all structured fields.',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create', 'update'],
						sendMode: ['json'],
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				description: 'The name of the contact',
				placeholder: 'John Doe',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create'],
						sendMode: ['fields'],
					},
				},
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'The email address of the contact',
				placeholder: 'john@example.com',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create'],
						sendMode: ['fields'],
					},
				},
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				description: 'The phone number of the contact',
				placeholder: '+1234567890',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create'],
						sendMode: ['fields'],
					},
				},
			},
			{
				displayName: 'Identifier',
				name: 'identifier',
				type: 'string',
				default: '',
				description: 'A unique identifier for the contact',
				placeholder: 'unique_id_123',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create'],
						sendMode: ['fields'],
					},
				},
			},
			// Conversation fields
			{
				displayName: 'Conversation ID',
				name: 'conversationId',
				type: 'number',
				default: '',
				required: true,
				description: 'The numeric ID of the conversation',
				placeholder: '1',
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['get', 'updateStatus', 'addLabels', 'updateCustomAttributes'],
					},
				},
			},
			{
				displayName: 'Source ID',
				name: 'sourceId',
				type: 'string',
				default: '',
				required: true,
				description: 'The source ID for the conversation',
				placeholder: 'source_123',
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Inbox ID',
				name: 'inboxId',
				type: 'number',
				default: '',
				required: true,
				description: 'The numeric ID of the inbox',
				placeholder: '1',
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'number',
				default: '',
				description: 'The ID of an existing contact',
				placeholder: '1',
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Assignee ID',
				name: 'assigneeId',
				type: 'number',
				default: '',
				description: 'ID of the agent to assign the conversation to',
				placeholder: '1',
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Team ID',
				name: 'teamId',
				type: 'number',
				default: '',
				description: 'ID of the team to assign the conversation to',
				placeholder: '1',
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Initial Message',
				name: 'initialMessage',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Content of the initial message',
				placeholder: 'Hello! How can I help you?',
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['create'],
					},
				},
			},
			// Message fields
			{
				displayName: 'Conversation ID',
				name: 'conversationId',
				type: 'number',
				default: '',
				required: true,
				description: 'The numeric ID of the conversation',
				placeholder: '1',
				displayOptions: {
					show: {
						resource: ['message'],
					},
				},
			},
			{
				displayName: 'Message ID',
				name: 'messageId',
				type: 'number',
				default: '',
				required: true,
				description: 'The numeric ID of the message',
				placeholder: '1',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['get', 'update', 'delete'],
					},
				},
			},
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				required: true,
				description: 'The content of the message',
				placeholder: 'Hello, how can I help you?',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['update'],
					},
				},
			},
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				required: true,
				description: 'The content of the message',
				placeholder: 'Hello, how can I help you?',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['create'],
						messageType: ['text'],
					},
				},
			},
			{
				displayName: 'Message Type',
				name: 'messageType',
				type: 'options',
				options: [
					{ name: 'Text Message', value: 'text' },
					{ name: 'Interactive Options', value: 'input_select' },
					{ name: 'Interactive Form', value: 'form' },
					{ name: 'Interactive Cards', value: 'cards' },
					{ name: 'Interactive Articles', value: 'article' },
				],
				default: 'text',
				description: 'Type of message to send',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['create'],
						sendMode: ['fields'],
					},
				},
			},
			{
				displayName: 'Send',
				name: 'sendMode',
				type: 'options',
				options: [
					{
						name: 'Structured Fields',
						value: 'fields',
						description: 'Use the structured form fields below',
					},
					{
						name: 'Custom JSON',
						value: 'json',
						description: 'Provide custom JSON for full control over the request',
					},
				],
				default: 'fields',
				description: 'How to send the data',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Custom JSON',
				name: 'customJson',
				type: 'json',
				default: '{\n  "content": "Hello! How can I help you?",\n  "message_type": "outgoing",\n  "private": false\n}',
				description: 'Custom JSON payload to send with the request. This will override all structured fields.',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['create'],
						sendMode: ['json'],
					},
				},
			},
			// Interactive Options Message
			{
				displayName: 'Message Content',
				name: 'interactiveContent',
				type: 'string',
				default: 'Select one of the items below',
				required: true,
				description: 'The message text to display with the options',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['create'],
						messageType: ['input_select'],
						sendMode: ['fields'],
					},
				},
			},
			{
				displayName: 'Options',
				name: 'selectOptions',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
					sortable: true,
				},
				description: 'Options for the user to select from',
				default: { items: [{ title: 'Option 1', value: 'option1' }] },
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['create'],
						messageType: ['input_select'],
					},
				},
				options: [
					{
						name: 'items',
						displayName: 'Option',
						values: [
							{
								displayName: 'Title',
								name: 'title',
								type: 'string',
								default: '',
								description: 'Display text for the option',
								placeholder: 'Option 1',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value returned when option is selected',
								placeholder: 'option1',
							},
						],
					},
				],
			},
			// Interactive Form Message
			{
				displayName: 'Form Content',
				name: 'formContent',
				type: 'string',
				default: 'Please fill out the form',
				required: true,
				description: 'The message text to display with the form',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['create'],
						messageType: ['form'],
					},
				},
			},
			{
				displayName: 'Form Fields',
				name: 'formFields',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
					sortable: true,
				},
				description: 'Form fields to display',
				default: { items: [{ name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email' }] },
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['create'],
						messageType: ['form'],
					},
				},
				options: [
					{
						name: 'items',
						displayName: 'Form Field',
						values: [
							{
								displayName: 'Field Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Internal name for the field',
								placeholder: 'email',
							},
							{
								displayName: 'Field Type',
								name: 'type',
								type: 'options',
								options: [
									{ name: 'Text', value: 'text' },
									{ name: 'Email', value: 'email' },
									{ name: 'Text Area', value: 'text_area' },
									{ name: 'Select', value: 'select' },
								],
								default: 'text',
								description: 'Type of form field',
							},
							{
								displayName: 'Label',
								name: 'label',
								type: 'string',
								default: '',
								description: 'Display label for the field',
								placeholder: 'Email Address',
							},
							{
								displayName: 'Placeholder',
								name: 'placeholder',
								type: 'string',
								default: '',
								description: 'Placeholder text for the field',
								placeholder: 'Enter your email',
							},
							{
								displayName: 'Default Value',
								name: 'default',
								type: 'string',
								default: '',
								description: 'Default value for the field',
							},
							{
								displayName: 'Select Options',
								name: 'options',
								type: 'fixedCollection',
								typeOptions: {
									multipleValues: true,
								},
								displayOptions: {
									show: {
										type: ['select'],
									},
								},
								default: { items: [{ label: '🌯 Option 1', value: 'option1' }] },
								options: [
									{
										name: 'items',
										displayName: 'Option',
										values: [
											{
												displayName: 'Label',
												name: 'label',
												type: 'string',
												default: '',
												placeholder: '🌯 Burrito',
											},
											{
												displayName: 'Value',
												name: 'value',
												type: 'string',
												default: '',
												placeholder: 'burrito',
											},
										],
									},
								],
							},
						],
					},
				],
			},
			// Interactive Cards Message
			{
				displayName: 'Cards Content',
				name: 'cardsContent',
				type: 'string',
				default: 'Check out these items',
				required: true,
				description: 'The message text to display with the cards',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['create'],
						messageType: ['cards'],
					},
				},
			},
			{
				displayName: 'Cards',
				name: 'cards',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
					sortable: true,
				},
				description: 'Cards to display',
				default: { items: [{ title: 'Sample Card', description: 'This is a sample card' }] },
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['create'],
						messageType: ['cards'],
					},
				},
				options: [
					{
						name: 'items',
						displayName: 'Card',
						values: [
							{
								displayName: 'Title',
								name: 'title',
								type: 'string',
								default: '',
								description: 'Title of the card',
								placeholder: 'Nike Shoes 2.0',
							},
							{
								displayName: 'Description',
								name: 'description',
								type: 'string',
								default: '',
								description: 'Description of the card',
								placeholder: 'Running with Nike Shoe 2.0',
							},
							{
								displayName: 'Media URL',
								name: 'media_url',
								type: 'string',
								default: '',
								description: 'URL of the image to display',
								placeholder: 'https://example.com/image.jpg',
							},
							{
								displayName: 'Actions',
								name: 'actions',
								type: 'fixedCollection',
								typeOptions: {
									multipleValues: true,
								},
								default: { items: [{ type: 'link', text: 'View More', uri: 'https://example.com' }] },
								options: [
									{
										name: 'items',
										displayName: 'Action',
										values: [
											{
												displayName: 'Action Type',
												name: 'type',
												type: 'options',
												options: [
													{ name: 'Link', value: 'link' },
													{ name: 'Postback', value: 'postback' },
												],
												default: 'link',
											},
											{
												displayName: 'Button Text',
												name: 'text',
												type: 'string',
												default: '',
												placeholder: 'View More',
											},
											{
												displayName: 'URL',
												name: 'uri',
												type: 'string',
												default: '',
												placeholder: 'https://example.com',
												displayOptions: {
													show: {
														type: ['link'],
													},
												},
											},
											{
												displayName: 'Payload',
												name: 'payload',
												type: 'string',
												default: '',
												placeholder: 'ITEM_SELECTED',
												displayOptions: {
													show: {
														type: ['postback'],
													},
												},
											},
										],
									},
								],
							},
						],
					},
				],
			},
			// Interactive Articles Message
			{
				displayName: 'Articles Content',
				name: 'articlesContent',
				type: 'string',
				default: 'Here are some helpful articles',
				required: true,
				description: 'The message text to display with the articles',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['create'],
						messageType: ['article'],
					},
				},
			},
			{
				displayName: 'Articles',
				name: 'articles',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
					sortable: true,
				},
				description: 'Articles to display',
				default: { items: [{ title: 'API Guide', description: 'Learn how to use our API', link: 'https://example.com' }] },
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['create'],
						messageType: ['article'],
					},
				},
				options: [
					{
						name: 'items',
						displayName: 'Article',
						values: [
							{
								displayName: 'Title',
								name: 'title',
								type: 'string',
								default: '',
								description: 'Title of the article',
								placeholder: 'API start guide',
							},
							{
								displayName: 'Description',
								name: 'description',
								type: 'string',
								default: '',
								description: 'Description of the article',
								placeholder: 'A comprehensive guide to get started',
							},
							{
								displayName: 'Link',
								name: 'link',
								type: 'string',
								default: '',
								description: 'URL link to the article',
								placeholder: 'https://example.com/guide',
							},
						],
					},
				],
			},
			// Inbox fields
			{
				displayName: 'Inbox ID',
				name: 'inboxId',
				type: 'number',
				default: '',
				required: true,
				description: 'The numeric ID of the inbox',
				placeholder: '1',
				displayOptions: {
					show: {
						resource: ['inbox'],
						operation: ['get'],
					},
				},
			},
			// Canned Response fields
			{
				displayName: 'Canned Response ID',
				name: 'cannedResponseId',
				type: 'number',
				default: '',
				required: true,
				description: 'The numeric ID of the canned response',
				placeholder: '1',
				displayOptions: {
					show: {
						resource: ['cannedResponse'],
						operation: ['get', 'update', 'delete'],
					},
				},
			},
			{
				displayName: 'Short Code',
				name: 'shortCode',
				type: 'string',
				default: '',
				required: true,
				description: 'The short code for the canned response',
				placeholder: 'greeting',
				displayOptions: {
					show: {
						resource: ['cannedResponse'],
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				required: true,
				description: 'The content of the canned response',
				placeholder: 'Hello! How can I assist you today?',
				displayOptions: {
					show: {
						resource: ['cannedResponse'],
						operation: ['create'],
					},
				},
			},
			// Webhook fields
			{
				displayName: 'Webhook ID',
				name: 'webhookId',
				type: 'number',
				default: '',
				required: true,
				description: 'The numeric ID of the webhook',
				placeholder: '1',
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['get', 'update', 'delete'],
					},
				},
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				required: true,
				description: 'The URL where webhook events will be sent',
				placeholder: 'https://example.com/webhook',
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{ name: 'Contact Created', value: 'contact_created' },
					{ name: 'Contact Updated', value: 'contact_updated' },
					{ name: 'Conversation Created', value: 'conversation_created' },
					{ name: 'Conversation Updated', value: 'conversation_updated' },
					{ name: 'Message Created', value: 'message_created' },
				],
				default: [],
				description: 'Events to listen for',
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create'],
					},
				},
			},
			// Team fields
			{
				displayName: 'Team ID',
				name: 'teamId',
				type: 'number',
				default: '',
				required: true,
				description: 'The numeric ID of the team',
				placeholder: '1',
				displayOptions: {
					show: {
						resource: ['team'],
						operation: ['get'],
					},
				},
			},
			// Label fields
			{
				displayName: 'Label ID',
				name: 'labelId',
				type: 'number',
				default: '',
				required: true,
				description: 'The numeric ID of the label',
				placeholder: '1',
				displayOptions: {
					show: {
						resource: ['label'],
						operation: ['get'],
					},
				},
			},
			// Contact search field
			{
				displayName: 'Search Query',
				name: 'searchQuery',
				type: 'string',
				default: '',
				required: true,
				description: 'Query string to search contacts',
				placeholder: 'john@example.com',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['search'],
					},
				},
			},
			// Conversation status field
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Open', value: 'open' },
					{ name: 'Resolved', value: 'resolved' },
					{ name: 'Pending', value: 'pending' },
				],
				default: 'open',
				required: true,
				description: 'Status of the conversation',
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['updateStatus'],
					},
				},
			},
			// Conversation labels field
			{
				displayName: 'Label Names or IDs',
				name: 'labels',
				type: 'multiOptions',
				typeOptions: {
					loadOptionsMethod: 'getLabels',
				},
				default: [],
				description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['addLabels'],
					},
				},
			},
			// Conversation custom attributes field
			{
				displayName: 'Custom Attributes',
				name: 'customAttributes',
				type: 'json',
				default: '{}',
				description: 'Custom attributes for the conversation (JSON format)',
				displayOptions: {
					show: {
						resource: ['conversation'],
						operation: ['updateCustomAttributes'],
					},
				},
			},
			// Update fields for contact
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the contact',
				placeholder: 'John Doe',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['update'],
					},
				},
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'The email address of the contact',
				placeholder: 'john@example.com',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['update'],
					},
				},
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				description: 'The phone number of the contact',
				placeholder: '+1234567890',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['update'],
					},
				},
			},
			{
				displayName: 'Identifier',
				name: 'identifier',
				type: 'string',
				default: '',
				description: 'A unique identifier for the contact',
				placeholder: 'unique_id_123',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['update'],
					},
				},
			},
			// Update fields for canned response
			{
				displayName: 'Short Code',
				name: 'shortCode',
				type: 'string',
				default: '',
				description: 'The short code for the canned response',
				placeholder: 'greeting',
				displayOptions: {
					show: {
						resource: ['cannedResponse'],
						operation: ['update'],
					},
				},
			},
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'The content of the canned response',
				placeholder: 'Hello! How can I assist you today?',
				displayOptions: {
					show: {
						resource: ['cannedResponse'],
						operation: ['update'],
					},
				},
			},
			// Update fields for webhook
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'The URL where webhook events will be sent',
				placeholder: 'https://example.com/webhook',
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['update'],
					},
				},
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{ name: 'Contact Created', value: 'contact_created' },
					{ name: 'Contact Updated', value: 'contact_updated' },
					{ name: 'Conversation Created', value: 'conversation_created' },
					{ name: 'Conversation Updated', value: 'conversation_updated' },
					{ name: 'Message Created', value: 'message_created' },
				],
				default: [],
				description: 'Events to listen for',
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['update'],
					},
				},
			},
			// Common fields
			{
				displayName: 'Continue on Fail',
				name: 'continueOnFail',
				type: 'boolean',
				default: false,
				description: 'Do not stop if this operation fails',
			},
			{
				displayName: 'Debug Logging',
				name: 'debugLogging',
				type: 'boolean',
				default: false,
				description: 'Show request details in console',
			},
		],
	};

	async loadOptions(this: ILoadOptionsFunctions) {
		const returnData: Array<{ name: string; value: string | number }> = [];

		// Load labels for conversation operations
		const credentials = await this.getCredentials('chatwootApi');
		const accountId = credentials.accountId as number;
		const url = `/api/v1/accounts/${accountId}/labels`;

		// Construct the base URL properly
		const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
		const fullUrl = `${baseUrlExpression}${url}`;

		try {
			const response = await this.helpers.httpRequest({
				method: 'GET',
				url: fullUrl,
				headers: {
					'api_access_token': credentials.accessToken as string,
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
			});
			for (const label of response.payload) {
				returnData.push({
					name: label.title,
					value: label.id,
				});
			}
		} catch (error) {
			// If labels can't be loaded, return empty array
			return returnData;
		}

		return returnData;
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const continueOnFail = this.getNodeParameter('continueOnFail', 0, false) as boolean;
		const debugLogging = this.getNodeParameter('debugLogging', 0, false) as boolean;

		let responseData: any;

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				if (resource === 'account') {
					if (operation === 'get') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const url = `/api/v1/accounts/${accountId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] BaseURL after replace: ${baseUrlExpression}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] URL type: ${typeof fullUrl}`);
							console.log(`[Chatwoot Debug] URL length: ${fullUrl.length}`);
							console.log(`[Chatwoot Debug] Access token present: ${!!credentials.accessToken}`);
							console.log(`[Chatwoot Debug] About to make HTTP request...`);
						}

						try {
							if (debugLogging) {
								console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
							}

							const response = await this.helpers.httpRequest({
								method: 'GET',
								url: fullUrl,
								headers: {
									'api_access_token': credentials.accessToken as string,
									'Accept': 'application/json',
									'Content-Type': 'application/json',
								},
							});

							if (debugLogging) {
								console.log(`[Chatwoot Debug] HTTP request successful!`);
								console.log(`[Chatwoot Debug] Response status: ${response.status || 'unknown'}`);
							}

							responseData = { json: response };
						} catch (error) {
							if (debugLogging) {
								console.log(`[Chatwoot Debug] HTTP Request Error: ${error.message}`);
								console.log(`[Chatwoot Debug] Error name: ${error.name}`);
								console.log(`[Chatwoot Debug] Error stack: ${error.stack}`);
								console.log(`[Chatwoot Debug] Full error object: ${JSON.stringify(error, Object.getOwnPropertyNames(error), 2)}`);
							}
							throw error;
						}
					}
				} else if (resource === 'contact') {
					if (operation === 'get') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const contactId = this.getNodeParameter('contactId', itemIndex) as number;
						const url = `/api/v1/accounts/${accountId}/contacts/${contactId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Contact ID: ${contactId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] BaseURL after replace: ${baseUrlExpression}`);
							console.log(`[Chatwoot Debug] Final URL: ${baseUrlExpression}${url}`);
						}

						try {
							const fullUrl = `${baseUrlExpression}${url}`;
							if (debugLogging) {
								console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
							}

							const response = await this.helpers.httpRequest({
								method: 'GET',
								url: fullUrl,
								headers: {
									'api_access_token': credentials.accessToken as string,
									'Accept': 'application/json',
									'Content-Type': 'application/json',
								},
							});
							responseData = { json: response };
						} catch (error) {
							if (debugLogging) {
								console.log(`[Chatwoot Debug] HTTP Request Error: ${error.message}`);
								console.log(`[Chatwoot Debug] Error details: ${JSON.stringify(error, null, 2)}`);
							}
							throw error;
						}
					} else if (operation === 'getAll') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const url = `/api/v1/accounts/${accountId}/contacts`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'GET',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = response.payload.map((contact: any) => ({ json: contact }));
					} else if (operation === 'create') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const sendMode = this.getNodeParameter('sendMode', itemIndex, 'fields') as string;

						let body: any;

						if (sendMode === 'json') {
							// Use custom JSON
							const customJson = this.getNodeParameter('customJson', itemIndex) as string;
							try {
								body = JSON.parse(customJson);
							} catch (error) {
								throw new NodeOperationError(this.getNode(), `Invalid JSON in Custom JSON field: ${error.message}`);
							}
						} else {
							// Use structured fields
							const name = this.getNodeParameter('name', itemIndex) as string;
							const email = this.getNodeParameter('email', itemIndex, '') as string;
							const phoneNumber = this.getNodeParameter('phoneNumber', itemIndex, '') as string;
							const identifier = this.getNodeParameter('identifier', itemIndex, '') as string;

							body = {
								name,
							};

							if (email) body.email = email;
							if (phoneNumber) body.phone_number = phoneNumber;
							if (identifier) body.identifier = identifier;
						}

						const url = `/api/v1/accounts/${accountId}/contacts`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Request body: ${JSON.stringify(body)}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'POST',
							url: fullUrl,
							body,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'update') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const contactId = this.getNodeParameter('contactId', itemIndex) as number;
						const sendMode = this.getNodeParameter('sendMode', itemIndex, 'fields') as string;

						let body: any;

						if (sendMode === 'json') {
							// Use custom JSON
							const customJson = this.getNodeParameter('customJson', itemIndex) as string;
							try {
								body = JSON.parse(customJson);
							} catch (error) {
								throw new NodeOperationError(this.getNode(), `Invalid JSON in Custom JSON field: ${error.message}`);
							}
						} else {
							// Use structured fields
							const name = this.getNodeParameter('name', itemIndex, '') as string;
							const email = this.getNodeParameter('email', itemIndex, '') as string;
							const phoneNumber = this.getNodeParameter('phoneNumber', itemIndex, '') as string;
							const identifier = this.getNodeParameter('identifier', itemIndex, '') as string;

							body = {};

							if (name) body.name = name;
							if (email) body.email = email;
							if (phoneNumber) body.phone_number = phoneNumber;
							if (identifier) body.identifier = identifier;
						}

						const url = `/api/v1/accounts/${accountId}/contacts/${contactId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Contact ID: ${contactId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Request body: ${JSON.stringify(body)}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'PUT',
							url: fullUrl,
							body,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'delete') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const contactId = this.getNodeParameter('contactId', itemIndex) as number;
						const url = `/api/v1/accounts/${accountId}/contacts/${contactId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Contact ID: ${contactId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						await this.helpers.httpRequest({
							method: 'DELETE',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: { success: true } };
					} else if (operation === 'search') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const searchQuery = this.getNodeParameter('searchQuery', itemIndex) as string;

						const qs: any = {
							q: searchQuery,
						};

						const url = `/api/v1/accounts/${accountId}/contacts/search`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}`);
							console.log(`[Chatwoot Debug] Search query: ${searchQuery}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Query string: ${JSON.stringify(qs)}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'GET',
							url: fullUrl,
							qs,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = response.payload.map((contact: any) => ({ json: contact }));
					}
				} else if (resource === 'conversation') {
					if (operation === 'get') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const conversationId = this.getNodeParameter('conversationId', itemIndex) as number;
						const url = `/api/v1/accounts/${accountId}/conversations/${conversationId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Conversation ID: ${conversationId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'GET',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'getAll') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const url = `/api/v1/accounts/${accountId}/conversations`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'GET',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = response.payload.map((conversation: any) => ({ json: conversation }));
					} else if (operation === 'create') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const sourceId = this.getNodeParameter('sourceId', itemIndex) as string;
						const inboxId = this.getNodeParameter('inboxId', itemIndex) as number;
						const contactId = this.getNodeParameter('contactId', itemIndex, '') as string;
						const assigneeId = this.getNodeParameter('assigneeId', itemIndex, '') as string;
						const teamId = this.getNodeParameter('teamId', itemIndex, '') as string;
						const initialMessage = this.getNodeParameter('initialMessage', itemIndex, '') as string;

						const body: any = {
							source_id: sourceId,
							inbox_id: inboxId,
						};

						if (contactId) body.contact_id = contactId;
						if (assigneeId) body.assignee_id = assigneeId;
						if (teamId) body.team_id = teamId;
						if (initialMessage) {
							body.message = {
								content: initialMessage,
							};
						}

						const url = `/api/v1/accounts/${accountId}/conversations`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Request body: ${JSON.stringify(body)}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'POST',
							url: fullUrl,
							body,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'updateStatus') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const conversationId = this.getNodeParameter('conversationId', itemIndex) as number;
						const status = this.getNodeParameter('status', itemIndex) as string;

						const body = {
							status,
						};

						const url = `/api/v1/accounts/${accountId}/conversations/${conversationId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Conversation ID: ${conversationId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Request body: ${JSON.stringify(body)}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'PUT',
							url: fullUrl,
							body,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'addLabels') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const conversationId = this.getNodeParameter('conversationId', itemIndex) as number;
						const labels = this.getNodeParameter('labels', itemIndex, []) as number[];

						const body = {
							labels,
						};

						const url = `/api/v1/accounts/${accountId}/conversations/${conversationId}/labels`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Conversation ID: ${conversationId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Request body: ${JSON.stringify(body)}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'POST',
							url: fullUrl,
							body,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'updateCustomAttributes') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const conversationId = this.getNodeParameter('conversationId', itemIndex) as number;
						const customAttributes = this.getNodeParameter('customAttributes', itemIndex) as string;

						let parsedAttributes: any = {};
						try {
							parsedAttributes = JSON.parse(customAttributes);
						} catch (error) {
							throw new NodeOperationError(this.getNode(), 'Custom attributes must be valid JSON');
						}

						const body = {
							custom_attributes: parsedAttributes,
						};

						const url = `/api/v1/accounts/${accountId}/conversations/${conversationId}/custom_attributes`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Conversation ID: ${conversationId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Request body: ${JSON.stringify(body)}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'POST',
							url: fullUrl,
							body,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					}
				} else if (resource === 'message') {
					if (operation === 'get') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const conversationId = this.getNodeParameter('conversationId', itemIndex) as number;
						const messageId = this.getNodeParameter('messageId', itemIndex) as number;
						const url = `/api/v1/accounts/${accountId}/conversations/${conversationId}/messages/${messageId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Conversation ID: ${conversationId}, Message ID: ${messageId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'GET',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'getAll') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const conversationId = this.getNodeParameter('conversationId', itemIndex) as number;
						const url = `/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Conversation ID: ${conversationId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'GET',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = response.payload.map((message: any) => ({ json: message }));
					} else if (operation === 'create') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const conversationId = this.getNodeParameter('conversationId', itemIndex) as number;
						const sendMode = this.getNodeParameter('sendMode', itemIndex, 'fields') as string;

						let body: any;

						if (sendMode === 'json') {
							// Use custom JSON
							const customJson = this.getNodeParameter('customJson', itemIndex) as string;
							try {
								body = JSON.parse(customJson);
							} catch (error) {
								throw new NodeOperationError(this.getNode(), `Invalid JSON in Custom JSON field: ${error.message}`);
							}
						} else {
							// Use structured fields
							const messageType = this.getNodeParameter('messageType', itemIndex, 'text') as string;

							body = {
								message_type: 'outgoing',
								private: false,
							};

							if (messageType === 'text') {
								// Regular text message
								const content = this.getNodeParameter('content', itemIndex) as string;
								body.content = content;
							} else if (messageType === 'input_select') {
								// Interactive Options
								const interactiveContent = this.getNodeParameter('interactiveContent', itemIndex) as string;
								const selectOptions = this.getNodeParameter('selectOptions', itemIndex, { items: [] }) as any;

								body.content = interactiveContent;
								body.content_type = 'input_select';
								body.content_attributes = {
									items: selectOptions.items || []
								};
							} else if (messageType === 'form') {
								// Interactive Form
								const formContent = this.getNodeParameter('formContent', itemIndex) as string;
								const formFields = this.getNodeParameter('formFields', itemIndex, { items: [] }) as any;

								body.content = formContent;
								body.content_type = 'form';
								body.content_attributes = {
									items: formFields.items || []
								};
							} else if (messageType === 'cards') {
								// Interactive Cards
								const cardsContent = this.getNodeParameter('cardsContent', itemIndex) as string;
								const cards = this.getNodeParameter('cards', itemIndex, { items: [] }) as any;

								body.content = cardsContent;
								body.content_type = 'cards';
								body.content_attributes = {
									items: cards.items || []
								};
							} else if (messageType === 'article') {
								// Interactive Articles
								const articlesContent = this.getNodeParameter('articlesContent', itemIndex) as string;
								const articles = this.getNodeParameter('articles', itemIndex, { items: [] }) as any;

								body.content = articlesContent;
								body.content_type = 'article';
								body.content_attributes = {
									items: articles.items || []
								};
							}
						}

						const url = `/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Request body: ${JSON.stringify(body)}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'POST',
							url: fullUrl,
							body,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'update') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const conversationId = this.getNodeParameter('conversationId', itemIndex) as number;
						const messageId = this.getNodeParameter('messageId', itemIndex) as number;
						const content = this.getNodeParameter('content', itemIndex) as string;

						const body = {
							content,
						};

						const url = `/api/v1/accounts/${accountId}/conversations/${conversationId}/messages/${messageId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Conversation ID: ${conversationId}, Message ID: ${messageId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Request body: ${JSON.stringify(body)}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'PUT',
							url: fullUrl,
							body,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'delete') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const conversationId = this.getNodeParameter('conversationId', itemIndex) as number;
						const messageId = this.getNodeParameter('messageId', itemIndex) as number;
						const url = `/api/v1/accounts/${accountId}/conversations/${conversationId}/messages/${messageId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Conversation ID: ${conversationId}, Message ID: ${messageId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						await this.helpers.httpRequest({
							method: 'DELETE',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: { success: true } };
					}
				} else if (resource === 'inbox') {
					if (operation === 'get') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const inboxId = this.getNodeParameter('inboxId', itemIndex) as number;
						const url = `/api/v1/accounts/${accountId}/inboxes/${inboxId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Inbox ID: ${inboxId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'GET',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'getAll') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const url = `/api/v1/accounts/${accountId}/inboxes`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'GET',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = response.payload.map((inbox: any) => ({ json: inbox }));
					}
				} else if (resource === 'cannedResponse') {
					if (operation === 'get') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const cannedResponseId = this.getNodeParameter('cannedResponseId', itemIndex) as number;
						const url = `/api/v1/accounts/${accountId}/canned_responses/${cannedResponseId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Canned Response ID: ${cannedResponseId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'GET',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'getAll') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const url = `/api/v1/accounts/${accountId}/canned_responses`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'GET',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = response.payload.map((cannedResponse: any) => ({ json: cannedResponse }));
					} else if (operation === 'create') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const shortCode = this.getNodeParameter('shortCode', itemIndex) as string;
						const content = this.getNodeParameter('content', itemIndex) as string;

						const body = {
							short_code: shortCode,
							content,
						};

						const url = `/api/v1/accounts/${accountId}/canned_responses`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Request body: ${JSON.stringify(body)}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'POST',
							url: fullUrl,
							body,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'update') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const cannedResponseId = this.getNodeParameter('cannedResponseId', itemIndex) as number;
						const shortCode = this.getNodeParameter('shortCode', itemIndex, '') as string;
						const content = this.getNodeParameter('content', itemIndex, '') as string;

						const body: any = {};
						if (shortCode) body.short_code = shortCode;
						if (content) body.content = content;

						const url = `/api/v1/accounts/${accountId}/canned_responses/${cannedResponseId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Canned Response ID: ${cannedResponseId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Request body: ${JSON.stringify(body)}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'PUT',
							url: fullUrl,
							body,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'delete') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const cannedResponseId = this.getNodeParameter('cannedResponseId', itemIndex) as number;
						const url = `/api/v1/accounts/${accountId}/canned_responses/${cannedResponseId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Canned Response ID: ${cannedResponseId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						await this.helpers.httpRequest({
							method: 'DELETE',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: { success: true } };
					}
				} else if (resource === 'webhook') {
					if (operation === 'get') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const webhookId = this.getNodeParameter('webhookId', itemIndex) as number;
						const url = `/api/v1/accounts/${accountId}/webhooks/${webhookId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Webhook ID: ${webhookId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'GET',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'getAll') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const url = `/api/v1/accounts/${accountId}/webhooks`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'GET',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = response.payload.map((webhook: any) => ({ json: webhook }));
					} else if (operation === 'create') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const webhookUrl = this.getNodeParameter('url', itemIndex) as string;
						const events = this.getNodeParameter('events', itemIndex, []) as string[];

						const body = {
							url: webhookUrl,
							events,
						};

						const url = `/api/v1/accounts/${accountId}/webhooks`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Request body: ${JSON.stringify(body)}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'POST',
							url: fullUrl,
							body,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'update') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const webhookId = this.getNodeParameter('webhookId', itemIndex) as number;
						const webhookUrl = this.getNodeParameter('url', itemIndex, '') as string;
						const events = this.getNodeParameter('events', itemIndex, []) as string[];

						const body: any = {};
						if (webhookUrl) body.url = webhookUrl;
						if (events.length > 0) body.events = events;

						const url = `/api/v1/accounts/${accountId}/webhooks/${webhookId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Webhook ID: ${webhookId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Request body: ${JSON.stringify(body)}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'PUT',
							url: fullUrl,
							body,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'delete') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const webhookId = this.getNodeParameter('webhookId', itemIndex) as number;
						const url = `/api/v1/accounts/${accountId}/webhooks/${webhookId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Webhook ID: ${webhookId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						await this.helpers.httpRequest({
							method: 'DELETE',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: { success: true } };
					}
				} else if (resource === 'team') {
					if (operation === 'get') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const teamId = this.getNodeParameter('teamId', itemIndex) as number;
						const url = `/api/v1/accounts/${accountId}/teams/${teamId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Team ID: ${teamId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'GET',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'getAll') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const url = `/api/v1/accounts/${accountId}/teams`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'GET',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = response.payload.map((team: any) => ({ json: team }));
					}
				} else if (resource === 'label') {
					if (operation === 'get') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const labelId = this.getNodeParameter('labelId', itemIndex) as number;
						const url = `/api/v1/accounts/${accountId}/labels/${labelId}`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}, Label ID: ${labelId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'GET',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = { json: response };
					} else if (operation === 'getAll') {
						const credentials = await this.getCredentials('chatwootApi');
						const accountId = credentials.accountId as number;
						const url = `/api/v1/accounts/${accountId}/labels`;

						// Construct the base URL properly
						const baseUrlExpression = (credentials.baseUrl as string).replace(/\/$/, "");
						const fullUrl = `${baseUrlExpression}${url}`;

						if (debugLogging) {
							console.log(`[Chatwoot Debug] Resource: ${resource}, Operation: ${operation}`);
							console.log(`[Chatwoot Debug] Credentials baseUrl: ${credentials.baseUrl}`);
							console.log(`[Chatwoot Debug] Account ID: ${accountId}`);
							console.log(`[Chatwoot Debug] Constructed URL path: ${url}`);
							console.log(`[Chatwoot Debug] Full URL would be: ${credentials.baseUrl}${url}`);
							console.log(`[Chatwoot Debug] Final constructed URL: ${fullUrl}`);
							console.log(`[Chatwoot Debug] Making request to: ${fullUrl}`);
						}

						const response = await this.helpers.httpRequest({
							method: 'GET',
							url: fullUrl,
							headers: {
								'api_access_token': credentials.accessToken as string,
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							},
						});
						responseData = response.payload.map((label: any) => ({ json: label }));
					}
				}

				if (Array.isArray(responseData)) {
					returnData.push(...responseData);
				} else if (responseData !== undefined) {
					returnData.push(responseData);
				}
			} catch (error) {
				if (continueOnFail) {
					returnData.push({
						json: {
							error: error.message,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
