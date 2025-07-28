# @pixelinfinito/n8n-nodes-chatwoot

[![npm version](https://badge.fury.io/js/@pixelinfinito/n8n-nodes-chatwoot.svg)](https://badge.fury.io/js/@pixelinfinito/n8n-nodes-chatwoot)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive n8n community node for integrating with Chatwoot API. This node provides full access to Chatwoot's Application APIs for managing contacts, conversations, messages, and more.

## Features

- **Complete API Coverage**: Support for all major Chatwoot Application API endpoints
- **Multiple Resources**: Account, Contact, Conversation, Message, Inbox, Canned Response, Webhook, Team, and Label operations
- **Flexible Authentication**: Support for both Application API and Platform API authentication
- **Pagination Support**: Built-in pagination for list operations
- **Error Handling**: Comprehensive error handling with continue on fail option
- **TypeScript**: Fully typed with TypeScript for better development experience

## Resources & Operations

### Account
- **Get**: Retrieve account details

### Contact
- **Get**: Get a contact by ID
- **Get All**: List all contacts with pagination and filtering
- **Create**: Create a new contact
- **Update**: Update contact information
- **Delete**: Delete a contact
- **Search**: Search contacts by name, email, or phone
- **Filter**: Filter contacts using custom rules

### Conversation
- **Get**: Get a conversation by ID
- **Get All**: List all conversations with filtering
- **Create**: Create a new conversation
- **Update Status**: Change conversation status (open, resolved, pending)
- **Add Labels**: Add labels to conversations
- **Update Custom Attributes**: Set custom attributes

### Message
- **Get**: Get a message by ID
- **Get All**: List all messages in a conversation
- **Create**: Send a new message
- **Update**: Edit a message
- **Delete**: Delete a message

### Inbox
- **Get**: Get an inbox by ID
- **Get All**: List all inboxes

### Canned Response
- **Get**: Get a canned response by ID
- **Get All**: List all canned responses
- **Create**: Create a new canned response
- **Update**: Update a canned response
- **Delete**: Delete a canned response

### Webhook
- **Get**: Get a webhook by ID
- **Get All**: List all webhooks
- **Create**: Create a new webhook
- **Update**: Update webhook settings
- **Delete**: Delete a webhook

### Team
- **Get**: Get a team by ID
- **Get All**: List all teams

### Label
- **Get**: Get a label by ID
- **Get All**: List all labels

## Installation

### Using npm

```bash
npm install @pixelinfinito/n8n-nodes-chatwoot
```

### Using n8n-node-dev (Development)

```bash
n8n-node-dev build
```

## Setup

### 1. Get Your Chatwoot API Token

1. Log in to your Chatwoot account
2. Go to **Profile Settings**
3. Generate an **API Access Token**
4. Copy the token for use in n8n

### 2. Configure Credentials in n8n

1. In n8n, go to **Settings** → **Credentials**
2. Click **Add Credential**
3. Search for **Chatwoot API**
4. Fill in the following details:
   - **API Type**: Application API (for most use cases)
   - **Base URL**: Your Chatwoot instance URL (e.g., `https://app.chatwoot.com`)
   - **Access Token**: Your API access token from step 1

### 3. Add the Chatwoot Node

1. In your workflow, click the **+** button
2. Search for **Chatwoot**
3. Select the Chatwoot node
4. Choose your credentials
5. Select the resource and operation you want to perform

## Usage Examples

### Get All Contacts

```json
{
  "resource": "contact",
  "operation": "getAll",
  "accountId": 1,
  "returnAll": false,
  "limit": 50,
  "sort": "name"
}
```

### Create a New Contact

```json
{
  "resource": "contact",
  "operation": "create",
  "accountId": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+1234567890",
  "identifier": "user-001"
}
```

### Create a Conversation

```json
{
  "resource": "conversation",
  "operation": "create",
  "accountId": 1,
  "sourceId": "ch-123-xyz",
  "inboxId": 1,
  "additionalFields": {
    "fields": {
      "status": "open",
      "message": "Hello! How can I help you today?"
    }
  }
}
```

### Send a Message

```json
{
  "resource": "message",
  "operation": "create",
  "accountId": 1,
  "conversationId": 1,
  "content": "Thank you for contacting us!",
  "messageType": "outgoing"
}
```

### Search Contacts

```json
{
  "resource": "contact",
  "operation": "search",
  "accountId": 1,
  "query": "john",
  "sort": "name"
}
```

### Update Conversation Status

```json
{
  "resource": "conversation",
  "operation": "updateStatus",
  "accountId": 1,
  "conversationId": 1,
  "status": "resolved"
}
```

## Workflow Examples

### Customer Support Automation

1. **Webhook Trigger**: Receive new conversation webhook
2. **Chatwoot Node**: Get conversation details
3. **Chatwoot Node**: Get contact information
4. **Condition Node**: Check if VIP customer
5. **Chatwoot Node**: Send automated response
6. **Chatwoot Node**: Assign to appropriate team

### Contact Management

1. **Schedule Trigger**: Run daily at 9 AM
2. **Chatwoot Node**: Get all contacts
3. **Filter Node**: Filter inactive contacts
4. **Chatwoot Node**: Update contact attributes
5. **Email Node**: Send summary report

## API Reference

This node supports the Chatwoot Application API. For detailed API documentation, visit:
- [Chatwoot API Documentation](https://developers.chatwoot.com/api-reference/introduction)
- [Application API Reference](https://developers.chatwoot.com/api-reference/application-api)

## Authentication

### Application API (Recommended)
- **Use Case**: Account-level automation and agent-facing integrations
- **Authentication**: User access token from Profile Settings
- **Availability**: Cloud and Self-hosted installations

### Platform API
- **Use Case**: Administrative management of installations
- **Authentication**: Platform App access token
- **Availability**: Self-hosted installations only

## Error Handling

The node includes comprehensive error handling:

- **Continue On Fail**: Option to continue workflow execution even if the node fails
- **HTTP Error Handling**: Proper handling of API errors with meaningful messages
- **Validation**: Input validation for required fields and data types

## Development

### Prerequisites

- Node.js >= 20.15
- npm or yarn
- n8n development environment

### Setup

```bash
# Clone the repository
git clone https://github.com/pixelinfinito/n8n-nodes-chatwoot.git
cd n8n-nodes-chatwoot

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run linting
npm run lint

# Format code
npm run format
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: [Chatwoot API Docs](https://developers.chatwoot.com/api-reference/introduction)
- **Issues**: [GitHub Issues](https://github.com/pixelinfinito/n8n-nodes-chatwoot/issues)
- **Discussions**: [GitHub Discussions](https://github.com/pixelinfinito/n8n-nodes-chatwoot/discussions)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

## Team

**Pixel Infinito** - Infinite value. Limitless possibilities.

- **Website**: [https://pixel.ao](https://pixel.ao)
- **GitHub**: [https://github.com/pixelinfinito](https://github.com/pixelinfinito)
- **Email**: dev@pixel.ao
- **Location**: Angola

We are a team dedicated to creating innovative solutions and contributing to the open-source community. This Chatwoot n8n node is part of our commitment to providing valuable integrations for the n8n ecosystem.

## Acknowledgments

- [Chatwoot](https://chatwoot.com/) for providing the excellent API
- [n8n](https://n8n.io/) for the amazing workflow automation platform
- The n8n community for inspiration and support
