import { Chatwoot } from '../nodes/Chatwoot/Chatwoot.node';

describe('Chatwoot Node', () => {
	describe('Node Description', () => {
		const node = new Chatwoot();

		it('should have correct display name', () => {
			expect(node.description.displayName).toBe('Chatwoot');
		});

		it('should have correct name', () => {
			expect(node.description.name).toBe('chatwoot');
		});

		it('should have correct group', () => {
			expect(node.description.group).toEqual(['transform']);
		});

		it('should have correct version', () => {
			expect(node.description.version).toBe(1);
		});

		it('should have correct description', () => {
			expect(node.description.description).toBe('Interact with Chatwoot API');
		});

		it('should have correct icon', () => {
			expect(node.description.icon).toEqual({
				light: 'file:chatwoot.svg',
				dark: 'file:chatwoot.svg',
			});
		});

		it('should have correct subtitle', () => {
			expect(node.description.subtitle).toBe('={{$parameter["operation"] + ": " + $parameter["resource"]}}');
		});

		it('should have correct defaults', () => {
			expect(node.description.defaults).toEqual({
				name: 'Chatwoot',
			});
		});

		it('should have correct inputs and outputs', () => {
			expect(node.description.inputs).toEqual(['main']);
			expect(node.description.outputs).toEqual(['main']);
		});

		it('should have correct credentials', () => {
			expect(node.description.credentials).toEqual([
				{
					name: 'chatwootApi',
					required: true,
				},
			]);
		});

		it('should have correct request defaults', () => {
			expect(node.description.requestDefaults).toEqual({
				baseURL: '={{ $credentials.baseUrl.replace(//$/, "") }}',
				url: '',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
		});

		it('should have resource property', () => {
			const resourceProperty = node.description.properties.find(
				(prop) => prop.name === 'resource',
			);
			expect(resourceProperty).toBeDefined();
			expect(resourceProperty?.type).toBe('options');
		});

		it('should have all required resources', () => {
			const resourceProperty = node.description.properties.find(
				(prop) => prop.name === 'resource',
			);
			const resourceOptions = resourceProperty?.options || [];
			const resourceValues = resourceOptions.map((option: any) => option.value);

			expect(resourceValues).toContain('account');
			expect(resourceValues).toContain('contact');
			expect(resourceValues).toContain('conversation');
			expect(resourceValues).toContain('message');
			expect(resourceValues).toContain('inbox');
			expect(resourceValues).toContain('cannedResponse');
			expect(resourceValues).toContain('webhook');
			expect(resourceValues).toContain('team');
			expect(resourceValues).toContain('label');
		});
	});

	describe('Resource Operations', () => {
		const node = new Chatwoot();

		it('should have account operations', () => {
			const accountOperations = node.description.properties.filter(
				(prop) => prop.displayOptions?.show?.resource?.includes('account'),
			);
			expect(accountOperations.length).toBeGreaterThan(0);
		});

		it('should have contact operations', () => {
			const contactOperations = node.description.properties.filter(
				(prop) => prop.displayOptions?.show?.resource?.includes('contact'),
			);
			expect(contactOperations.length).toBeGreaterThan(0);
		});

		it('should have conversation operations', () => {
			const conversationOperations = node.description.properties.filter(
				(prop) => prop.displayOptions?.show?.resource?.includes('conversation'),
			);
			expect(conversationOperations.length).toBeGreaterThan(0);
		});

		it('should have message operations', () => {
			const messageOperations = node.description.properties.filter(
				(prop) => prop.displayOptions?.show?.resource?.includes('message'),
			);
			expect(messageOperations.length).toBeGreaterThan(0);
		});

		it('should have inbox operations', () => {
			const inboxOperations = node.description.properties.filter(
				(prop) => prop.displayOptions?.show?.resource?.includes('inbox'),
			);
			expect(inboxOperations.length).toBeGreaterThan(0);
		});

		it('should have canned response operations', () => {
			const cannedResponseOperations = node.description.properties.filter(
				(prop) => prop.displayOptions?.show?.resource?.includes('cannedResponse'),
			);
			expect(cannedResponseOperations.length).toBeGreaterThan(0);
		});

		it('should have webhook operations', () => {
			const webhookOperations = node.description.properties.filter(
				(prop) => prop.displayOptions?.show?.resource?.includes('webhook'),
			);
			expect(webhookOperations.length).toBeGreaterThan(0);
		});

		it('should have team operations', () => {
			const teamOperations = node.description.properties.filter(
				(prop) => prop.displayOptions?.show?.resource?.includes('team'),
			);
			expect(teamOperations.length).toBeGreaterThan(0);
		});

		it('should have label operations', () => {
			const labelOperations = node.description.properties.filter(
				(prop) => prop.displayOptions?.show?.resource?.includes('label'),
			);
			expect(labelOperations.length).toBeGreaterThan(0);
		});
	});

	describe('Required Fields', () => {
		const node = new Chatwoot();

		it('should have account ID field for all operations', () => {
			const accountIdFields = node.description.properties.filter(
				(prop) => prop.name === 'accountId' && prop.required === true,
			);
			expect(accountIdFields.length).toBeGreaterThan(0);
		});

		it('should have required fields for contact operations', () => {
			const contactIdFields = node.description.properties.filter(
				(prop) => prop.name === 'contactId' && prop.required === true,
			);
			expect(contactIdFields.length).toBeGreaterThan(0);
		});

		it('should have required fields for conversation operations', () => {
			const conversationIdFields = node.description.properties.filter(
				(prop) => prop.name === 'conversationId' && prop.required === true,
			);
			expect(conversationIdFields.length).toBeGreaterThan(0);
		});

		it('should have required fields for message operations', () => {
			const messageIdFields = node.description.properties.filter(
				(prop) => prop.name === 'messageId' && prop.required === true,
			);
			expect(messageIdFields.length).toBeGreaterThan(0);
		});
	});

	describe('Field Descriptions', () => {
		const node = new Chatwoot();

		it('should have descriptions for all fields', () => {
			const fieldsWithDescriptions = node.description.properties.filter(
				(prop) => prop.description && prop.description.length > 0,
			);
			expect(fieldsWithDescriptions.length).toBeGreaterThan(0);
		});

		it('should have placeholders for string fields', () => {
			const stringFields = node.description.properties.filter(
				(prop) => prop.type === 'string' && prop.placeholder,
			);
			expect(stringFields.length).toBeGreaterThan(0);
		});
	});

	describe('Operation Options', () => {
		const node = new Chatwoot();

		it('should have operation property for each resource', () => {
			const operationProperties = node.description.properties.filter(
				(prop) => prop.name === 'operation',
			);
			expect(operationProperties.length).toBeGreaterThan(0);
		});

		it('should have correct operation options for contact resource', () => {
			const contactOperationProperty = node.description.properties.find(
				(prop) => prop.name === 'operation' && prop.displayOptions?.show?.resource?.includes('contact'),
			);
			expect(contactOperationProperty).toBeDefined();

			const options = contactOperationProperty?.options || [];
			const operationValues = options.map((option: any) => option.value);

			expect(operationValues).toContain('get');
			expect(operationValues).toContain('getAll');
			expect(operationValues).toContain('create');
			expect(operationValues).toContain('update');
			expect(operationValues).toContain('delete');
			expect(operationValues).toContain('search');
			expect(operationValues).toContain('filter');
		});

		it('should have correct operation options for conversation resource', () => {
			const conversationOperationProperty = node.description.properties.find(
				(prop) => prop.name === 'operation' && prop.displayOptions?.show?.resource?.includes('conversation'),
			);
			expect(conversationOperationProperty).toBeDefined();

			const options = conversationOperationProperty?.options || [];
			const operationValues = options.map((option: any) => option.value);

			expect(operationValues).toContain('get');
			expect(operationValues).toContain('getAll');
			expect(operationValues).toContain('create');
			expect(operationValues).toContain('updateStatus');
			expect(operationValues).toContain('addLabels');
			expect(operationValues).toContain('updateCustomAttributes');
		});
	});
});
