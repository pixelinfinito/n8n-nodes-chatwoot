# @pixelinfinito/n8n-nodes-chatwoot

[![npm version](https://badge.fury.io/js/@pixelinfinito/n8n-nodes-chatwoot.svg)](https://badge.fury.io/js/@pixelinfinito/n8n-nodes-chatwoot)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive n8n community node for integrating with Chatwoot API. This node provides full access to Chatwoot's Application APIs for managing contacts, conversations, messages, and more.

## 🚀 Features

- **🔄 Custom JSON Mode**: Choose between structured UI fields or raw JSON for maximum flexibility
- **💬 Interactive Messages**: Support for forms, cards, options, and articles
- **📊 Complete API Coverage**: All major Chatwoot Application API endpoints
- **🔧 Debug Logging**: Built-in console logging for troubleshooting
- **✨ Multiple Resources**: Account, Contact, Conversation, Message, Inbox, Canned Response, Webhook, Team, and Label operations
- **🔐 Simplified Authentication**: Streamlined Application API authentication
- **📄 Pagination Support**: Built-in pagination for list operations
- **⚡ Error Handling**: Comprehensive error handling with continue on fail option
- **📝 TypeScript**: Fully typed with TypeScript for better development experience

## 🎯 Send Modes

Each operation that sends data (create/update) offers two modes:

### 🎨 Structured Fields Mode *(Default)*
User-friendly form fields with validation and guidance. Perfect for beginners and simple use cases.

### ⚡ Custom JSON Mode  
Raw JSON input for advanced users who need:
- Full control over API payloads
- Access to any Chatwoot API feature
- Complex nested objects
- Custom attributes not in the UI
- Dynamic workflows with computed JSON

## 📋 Resources & Operations

### 👤 Account
- **Get**: Retrieve account details

### 👥 Contact
- **Get**: Get a contact by ID
- **Get All**: List all contacts with pagination and filtering
- **Create**: Create a new contact (🔄 *Custom JSON supported*)
- **Update**: Update contact information (🔄 *Custom JSON supported*)
- **Delete**: Delete a contact
- **Search**: Search contacts by name, email, or phone

### 💬 Conversation
- **Get**: Get a conversation by ID
- **Get All**: List all conversations with filtering
- **Update Status**: Change conversation status (open, resolved, pending)
- **Add Labels**: Add labels to conversations
- **Update Custom Attributes**: Set custom attributes

### 📨 Message
- **Get**: Get a message by ID
- **Get All**: List all messages in a conversation
- **Create**: Send messages with full interactive support (🔄 *Custom JSON supported*)
  - 💬 **Text Messages**: Simple text content
  - 🎛️ **Interactive Options**: Dropdown/selection menus
  - 📝 **Interactive Forms**: Multi-field forms with validation
  - 🎴 **Interactive Cards**: Rich media cards with actions
  - 📄 **Interactive Articles**: Article links and descriptions

### 📮 Inbox
- **Get**: Get an inbox by ID
- **Get All**: List all inboxes

### 💾 Canned Response
- **Get**: Get a canned response by ID
- **Get All**: List all canned responses

### 🔗 Webhook
- **Get**: Get a webhook by ID
- **Get All**: List all webhooks

### 👨‍💼 Team
- **Get**: Get a team by ID
- **Get All**: List all teams

### 🏷️ Label
- **Get**: Get a label by ID
- **Get All**: List all labels

## 📦 Installation

### Using npm

```bash
npm install @pixelinfinito/n8n-nodes-chatwoot
```

### Using n8n Community Nodes

1. In n8n, go to **Settings** → **Community Nodes**
2. Click **Install a Community Node**
3. Enter: `@pixelinfinito/n8n-nodes-chatwoot`
4. Click **Install**

## ⚙️ Setup

### 1. Get Your Chatwoot API Token

1. Log in to your Chatwoot account
2. Go to **Profile Settings** → **API Access Token**
3. Generate an **API Access Token**
4. Copy the token for use in n8n

### 2. Configure Credentials in n8n

1. In n8n, go to **Settings** → **Credentials**
2. Click **Add Credential**
3. Search for **Chatwoot API**
4. Fill in the following details:
   - **Base URL**: Your Chatwoot instance URL (e.g., `https://app.chatwoot.com`)
   - **Access Token**: Your API access token from step 1
   - **Account ID**: Your numeric account ID (usually `1` for the first account)

### 3. Add the Chatwoot Node

1. In your workflow, click the **+** button
2. Search for **Chatwoot**
3. Select the Chatwoot node
4. Choose your credentials
5. Select the resource and operation you want to perform

## 🛠️ Usage Examples

### 👥 Contact Management

#### Create Contact (Structured Fields)
```
Resource: Contact
Operation: Create
Send: Structured Fields
├─ Name: John Doe
├─ Email: john.doe@example.com
├─ Phone: +1234567890
└─ Identifier: user-001
```

#### Create Contact (Custom JSON)
```
Resource: Contact
Operation: Create
Send: Custom JSON
└─ Custom JSON:
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone_number": "+1234567890",
  "custom_attributes": {
    "company": "Acme Corp",
    "role": "Manager",
    "vip": true
  }
}
```

### 💬 Interactive Messages

#### Text Message (Structured Fields)
```
Resource: Message
Operation: Create
Send: Structured Fields
├─ Conversation ID: 123
├─ Message Type: Text Message
└─ Content: Hello! How can I help you today?
```

#### Interactive Options (Structured Fields)
```
Resource: Message
Operation: Create
Send: Structured Fields
├─ Conversation ID: 123
├─ Message Type: Interactive Options
├─ Message Content: Please select your department:
└─ Select Options:
    ├─ Title: Sales | Value: sales
    ├─ Title: Support | Value: support
    └─ Title: Billing | Value: billing
```

#### Interactive Cards (Custom JSON)
```
Resource: Message
Operation: Create
Send: Custom JSON
└─ Custom JSON:
{
  "content": "Check out our latest products",
  "content_type": "cards",
  "content_attributes": {
    "items": [
      {
        "title": "Premium Plan",
        "description": "Advanced features for power users",
        "media_url": "https://example.com/premium.jpg",
        "actions": [
          {
            "type": "link",
            "text": "Learn More",
            "uri": "https://example.com/premium"
          },
          {
            "type": "postback", 
            "text": "Subscribe",
            "payload": "SUBSCRIBE_PREMIUM"
          }
        ]
      }
    ]
  },
  "message_type": "outgoing",
  "private": false
}
```

#### Interactive Form (Structured Fields)
```
Resource: Message
Operation: Create
Send: Structured Fields
├─ Conversation ID: 123
├─ Message Type: Interactive Form
├─ Form Content: Please fill out your information:
└─ Form Fields:
    ├─ Field: Name | Type: text | Required: true
    ├─ Field: Email | Type: email | Required: true
    └─ Field: Message | Type: text_area | Required: false
```

### 🔍 Search and Filter

#### Search Contacts
```
Resource: Contact
Operation: Search
├─ Search Query: john@example.com
└─ Sort: name
```

#### Get All Conversations with Filtering
```
Resource: Conversation
Operation: Get All
├─ Return All: false
├─ Limit: 50
├─ Status: open
├─ Inbox ID: 1
└─ Labels: urgent,vip
```

## 🧪 Advanced Usage

### Custom JSON Examples

#### Contact with Custom Attributes
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@company.com",
  "phone_number": "+1987654321",
  "custom_attributes": {
    "company": "Tech Corp",
    "department": "Engineering",
    "team_lead": true,
    "onboarding_completed": true,
    "subscription_tier": "enterprise"
  }
}
```

#### Interactive Form with All Field Types
```json
{
  "content": "Complete your profile",
  "content_type": "form",
  "content_attributes": {
    "items": [
      {
        "name": "full_name",
        "label": "Full Name",
        "type": "text",
        "placeholder": "Enter your full name",
        "default": ""
      },
      {
        "name": "email",
        "label": "Email Address", 
        "type": "email",
        "placeholder": "you@example.com"
      },
      {
        "name": "company_size",
        "label": "Company Size",
        "type": "select",
        "options": [
          {"label": "1-10 employees", "value": "small"},
          {"label": "11-50 employees", "value": "medium"},
          {"label": "50+ employees", "value": "large"}
        ]
      },
      {
        "name": "requirements",
        "label": "Special Requirements",
        "type": "text_area",
        "placeholder": "Tell us about your needs..."
      }
    ]
  },
  "message_type": "outgoing",
  "private": false
}
```

## 🐛 Debug Mode

Enable debug logging to see detailed request information:

1. Add **Debug Logging** field to any operation
2. Set to **Yes**
3. Check your n8n logs for detailed output including:
   - Constructed URLs
   - Request headers
   - Request bodies  
   - Response data

Example debug output:
```
[Chatwoot Debug] Resource: contact, Operation: create
[Chatwoot Debug] Final URL: https://app.chatwoot.com/api/v1/accounts/1/contacts
[Chatwoot Debug] Request body: {"name":"John Doe","email":"john@example.com"}
[Chatwoot Debug] Making request to: https://app.chatwoot.com/api/v1/accounts/1/contacts
```

## 🔧 Workflow Examples

### Customer Support Automation

```
1. Webhook Trigger (New Conversation)
   ↓
2. Chatwoot Node (Get Contact Details)
   ↓  
3. Condition Node (Check if VIP Customer)
   ↓
4. Chatwoot Node (Send Automated Response)
   └─ Message Type: Interactive Options
   └─ Options: Urgent Support | Regular Support
   ↓
5. Chatwoot Node (Add VIP Label)
```

### Contact Enrichment

```
1. Schedule Trigger (Daily 9 AM)
   ↓
2. Chatwoot Node (Get All Contacts)
   ↓
3. Function Node (Enrich with External Data)
   ↓
4. Chatwoot Node (Update Contact - Custom JSON)
   └─ Custom JSON: {enriched data}
```

### Interactive Onboarding

```
1. Webhook Trigger (New Contact)
   ↓
2. Chatwoot Node (Create Conversation)
   ↓
3. Chatwoot Node (Send Welcome Form)
   └─ Message Type: Interactive Form
   └─ Fields: Name, Company, Role, Goals
   ↓
4. Chatwoot Node (Send Resource Cards)
   └─ Message Type: Interactive Cards
   └─ Cards: Documentation, Video Tutorials, Support
```

## 📚 API Reference

This node supports the Chatwoot Application API. For detailed API documentation:
- [Chatwoot API Documentation](https://developers.chatwoot.com/api-reference/introduction)
- [Application API Reference](https://developers.chatwoot.com/api-reference/application-api)
- [Interactive Messages Guide](https://www.chatwoot.com/docs/product/others/interactive-messages/)

## 🔐 Authentication

### Application API (Supported)
- **Use Case**: Account-level automation and agent-facing integrations
- **Authentication**: User access token from Profile Settings
- **Availability**: Cloud and Self-hosted installations
- **Required**: Base URL, Access Token, Account ID

## ⚠️ Error Handling

The node includes comprehensive error handling:

- **Continue On Fail**: Option to continue workflow execution even if the node fails
- **HTTP Error Handling**: Proper handling of API errors with meaningful messages
- **JSON Validation**: Custom JSON is validated before sending
- **Input Validation**: Required fields and data types are validated
- **Debug Information**: Detailed logging for troubleshooting

## 🛠️ Development

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
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Building

```bash
# Build TypeScript
npm run build

# Build with watch mode
npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Guidelines

- Follow TypeScript best practices
- Add tests for new features
- Update documentation
- Follow existing code style
- Test thoroughly before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

## 🆘 Support

- **Documentation**: [Chatwoot API Docs](https://developers.chatwoot.com/api-reference/introduction)
- **Issues**: [GitHub Issues](https://github.com/pixelinfinito/n8n-nodes-chatwoot/issues)
- **Discussions**: [GitHub Discussions](https://github.com/pixelinfinito/n8n-nodes-chatwoot/discussions)
- **n8n Community**: [n8n Community Forum](https://community.n8n.io/)

## 📋 Changelog

### v0.1.16 (Latest)
- ✨ **NEW**: Custom JSON mode for create/update operations
- ✨ **NEW**: Interactive messages support (forms, cards, options, articles)
- ✨ **NEW**: Debug logging toggle
- 🔧 **IMPROVED**: Simplified credentials (Application API only)
- 🐛 **FIXED**: URL construction and authentication issues
- 🐛 **FIXED**: Dynamic options loading for labels
- 📝 **DOCS**: Comprehensive documentation update

### v0.1.15
- 🐛 **FIXED**: Message operations with proper headers
- 🐛 **FIXED**: Contact operations stability
- 🔧 **IMPROVED**: Error handling and logging

### v0.1.0 - v0.1.14
- 🎯 **INITIAL**: Core Chatwoot API integration
- 📋 **FEATURES**: All major resources and operations
- 🔐 **AUTH**: Multiple authentication types
- 🧪 **TESTING**: Comprehensive test suite

## 👥 Team

**Pixel Infinito** - Infinite value. Limitless possibilities.

- **Website**: [https://pixel.ao](https://pixel.ao)
- **GitHub**: [https://github.com/pixelinfinito](https://github.com/pixelinfinito)
- **Email**: dev@pixel.ao
- **Location**: Angola 🇦🇴

We are a team dedicated to creating innovative solutions and contributing to the open-source community. This Chatwoot n8n node is part of our commitment to providing valuable integrations for the n8n ecosystem.

## 🙏 Acknowledgments

- [Chatwoot](https://chatwoot.com/) for providing the excellent customer engagement platform
- [n8n](https://n8n.io/) for the amazing workflow automation platform
- The n8n community for inspiration, feedback, and support
- All contributors and users who help improve this integration

---

**Made with ❤️ by Pixel Infinito**
