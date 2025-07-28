This document provides a comprehensive and structured overview of the Chatwoot APIs, optimized for clarity and machine readability.

# Chatwoot API Documentation

## 1. Introduction to Chatwoot APIs

Chatwoot offers three distinct API categories tailored for different use cases: Application APIs for internal automation, Client APIs for building custom user-facing chat experiences, and Platform APIs for administrative management of Chatwoot installations.

### 1.1. Application APIs

Designed for interacting with a Chatwoot account from an agent or administrator's perspective. Ideal for building internal tools, automating workflows, or performing bulk data operations.

*   **Use Cases:** Account-level automation, agent-facing integrations, data import/export.
*   **Authentication:** Requires a user `access_token` generated from the **Profile Settings** page in your Chatwoot account.
*   **Availability:** Supported on both **Cloud** and **Self-hosted** installations.
*   **Example:** [Google Cloud Functions Demo](https://github.com/chatwoot/google-cloud-functions-demo)

### 1.2. Client APIs

Intended for creating custom messaging interfaces for your end-users. Use these APIs if you are not using the standard website widget and want to embed chat functionalities into your own web or mobile applications.

*   **Use Cases:** Building custom chat widgets, embedding chat in mobile apps.
*   **Authentication:** Uses `inbox_identifier` (found in API inbox settings) and `contact_identifier` (returned upon contact creation).
*   **Availability:** Supported on both **Cloud** and **Self-hosted** installations.
*   **Examples:** [Client API Demo](https://github.com/chatwoot/client-api-demo), [Flutter SDK](https://github.com/chatwoot/chatwoot-flutter-sdk)

### 1.3. Platform APIs

Used for high-level administrative management of a Chatwoot installation. These APIs allow for programmatic control over users, accounts, and roles, often for syncing with external authentication systems.

*   **Note:** Platform APIs have a strict permission model. They can only access objects (like accounts or users) created by the same API key, unless permissions are explicitly granted via the Rails console.
*   **Use Cases:** Managing users and accounts at scale, syncing with external systems.
*   **Authentication:** Requires an `access_token` from a **Platform App**, which is created in the **Super Admin Console**.
*   **Availability:** **Self-hosted** / **Managed Hosting** installations only.

---

## 2. Application API Reference

Endpoints for managing account resources like contacts and conversations from an agent/admin perspective.

### 2.1. Contacts

#### `GET /api/v1/accounts/{account_id}/contacts` - List Contacts
Retrieves a paginated list of all contacts in the account.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `account_id` | integer | Yes | The numeric ID of the account. |

**Query Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `sort` | enum | No | Attribute to sort the list by. Options: `name`, `email`, `phone_number`, `last_activity_at`, and their descending counterparts (e.g., `-name`). |
| `page` | integer | No | The page number for pagination. Default: `1`. |

**Example Request**
```bash
curl --request GET \
  --url https://app.chatwoot.com/api/v1/accounts/{account_id}/contacts \
  --header 'api_access_token: <your_api_key>'
```

**Example Response**
```json
{
  "meta": {
    "count": 1,
    "current_page": 1
  },
  "payload": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone_number": "+123456789",
      "identifier": "user-001",
      "blocked": false,
      "availability_status": "online",
      "thumbnail": "https://example.com/thumbnail.png",
      "custom_attributes": {},
      "last_activity_at": 1678886400,
      "created_at": 1678880000,
      "additional_attributes": {
        "city": "San Francisco",
        "country": "United States",
        "country_code": "US"
      },
      "contact_inboxes": [
        {
          "source_id": "ch-123-xyz",
          "inbox": {
            "id": 1,
            "name": "Website Support",
            "channel_type": "Channel::WebWidget"
          }
        }
      ]
    }
  ]
}
```

#### `GET /api/v1/accounts/{account_id}/contacts/{id}` - Show Contact
Retrieves the details of a specific contact by their ID.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `account_id` | integer | Yes | The numeric ID of the account. |
| `id` | integer | Yes | The numeric ID of the contact. |

#### `PUT /api/v1/accounts/{account_id}/contacts/{id}` - Update Contact
Updates the attributes of a specific contact.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `account_id` | integer | Yes | The numeric ID of the account. |
| `id` | integer | Yes | The numeric ID of the contact. |

**Request Body** (`application/json`)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | string | No | Name of the contact. |
| `email` | string | No | Email address of the contact. |
| `blocked` | boolean | No | Whether the contact is blocked. |
| `phone_number`| string | No | Phone number of the contact. |
| `avatar_url` | string | No | URL to a JPG or PNG avatar image. |
| `identifier` | string | No | A unique identifier from an external system. |
| `additional_attributes` | object | No | Key-value pairs for additional contact attributes. |
| `custom_attributes` | object | No | Key-value pairs for predefined custom attributes. |

#### `DELETE /api/v1/accounts/{account_id}/contacts/{id}` - Delete Contact
Deletes a contact from the account.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `account_id` | integer | Yes | The numeric ID of the account. |
| `id` | integer | Yes | The numeric ID of the contact. |

#### `GET /api/v1/accounts/{account_id}/contacts/search` - Search Contacts
Searches for contacts by name, identifier, email, or phone number.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `account_id` | integer | Yes | The numeric ID of the account. |

**Query Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `q` | string | Yes | The search term. |
| `sort` | enum | No | Attribute to sort the results by. |
| `page` | integer | No | The page number for pagination. Default: `1`. |

#### `POST /api/v1/accounts/{account_id}/contacts/filter` - Filter Contacts
Filters contacts using a set of custom rules.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `account_id` | integer | Yes | The numeric ID of the account. |

**Request Body** (`application/json`)
*   An array of filter rule objects. Each object contains:
    *   `attribute_key` (string): The attribute to filter on (e.g., `name`, `country_code`).
    *   `filter_operator` (enum): The comparison operator (e.g., `equal_to`, `contains`).
    *   `values` (array of strings): The values to compare against.
    *   `query_operator` (enum): The logical operator to chain rules (`AND`, `OR`).

**Example Request Body**
```json
{
  "payload": [
    {
      "attribute_key": "country_code",
      "filter_operator": "equal_to",
      "values": ["US"],
      "query_operator": "AND"
    },
    {
      "attribute_key": "name",
      "filter_operator": "contains",
      "values": ["Smith"],
      "query_operator": null
    }
  ]
}
```

#### `GET /api/v1/accounts/{account_id}/contacts/{id}/conversations` - Get Contact Conversations
Retrieves all conversations associated with a specific contact.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `account_id` | integer | Yes | The numeric ID of the account. |
| `id` | integer | Yes | The numeric ID of the contact. |

---

### 2.2. Conversations

#### `GET /api/v1/accounts/{account_id}/conversations` - List Conversations
Retrieves a paginated list of conversations, with various filtering options.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `account_id` | integer | Yes | The numeric ID of the account. |

**Query Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `assignee_type` | enum | No | Filter by assignee: `me`, `unassigned`, `all`, `assigned`. Default: `all`. |
| `status` | enum | No | Filter by status: `open`, `resolved`, `pending`, `snoozed`, `all`. Default: `open`. |
| `q` | string | No | Search term to find in message content. |
| `inbox_id` | integer | No | Filter by a specific inbox ID. |
| `team_id` | integer | No | Filter by a specific team ID. |
| `labels[]` | array | No | Filter by one or more labels. |
| `page` | integer | No | The page number for pagination. Default: `1`. |

#### `POST /api/v1/accounts/{account_id}/conversations` - Create New Conversation
Creates a new conversation. This requires a `source_id` which is a unique identifier for a contact within a specific API channel inbox.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `account_id` | integer | Yes | The numeric ID of the account. |

**Request Body** (`application/json`)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `source_id` | string | Yes | Unique contact identifier for the API inbox. |
| `inbox_id` | integer | Yes | ID of the API inbox to create the conversation in. |
| `contact_id` | integer | No | The ID of an existing contact. |
| `status` | enum | No | `open`, `resolved`, or `pending`. |
| `assignee_id` | integer | No | ID of the agent to assign the conversation to. |
| `team_id` | integer | No | ID of the team to assign the conversation to. |
| `message` | object | No | An initial message object with a `content` field. |
| `custom_attributes`| object | No | Key-value pairs for custom conversation attributes. |

#### `GET /api/v1/accounts/{account_id}/conversations/{conversation_id}` - Get Conversation Details
Retrieves full details of a single conversation, including all its messages.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `account_id` | integer | Yes | The numeric ID of the account. |
| `conversation_id` | integer | Yes | The numeric ID of the conversation. |

#### `POST /api/v1/accounts/{account_id}/conversations/{conversation_id}/toggle_status` - Toggle Conversation Status
Changes the status of a conversation (e.g., from `open` to `resolved`).

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `account_id` | integer | Yes | The numeric ID of the account. |
| `conversation_id` | integer | Yes | The numeric ID of the conversation. |

**Request Body** (`application/json`)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `status` | enum | Yes | The new status: `open`, `resolved`, or `pending`. |

#### `POST /api/v1/accounts/{account_id}/conversations/{conversation_id}/labels` - Add/Update Labels
Adds a list of labels to a conversation. This overwrites any existing labels.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `account_id` | integer | Yes | The numeric ID of the account. |
| `conversation_id` | integer | Yes | The numeric ID of the conversation. |

**Request Body** (`application/json`)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `labels` | array of strings | Yes | An array of label names (e.g., `["support", "billing"]`). |

#### `POST /api/v1/accounts/{account_id}/conversations/{conversation_id}/custom_attributes` - Update Custom Attributes
Sets or updates the custom attributes for a conversation.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `account_id` | integer | Yes | The numeric ID of the account. |
| `conversation_id` | integer | Yes | The numeric ID of the conversation. |

**Request Body** (`application/json`)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `custom_attributes` | object | Yes | An object of key-value pairs. |

---

## 3. Client API Reference

Public endpoints for building custom, end-user-facing chat applications.

### 3.1. Client Contacts

#### `POST /public/api/v1/inboxes/{inbox_identifier}/contacts` - Create a Contact
Creates a new contact session for a given API inbox. The response includes a `pubsub_token` required for websocket connections.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `inbox_identifier` | string | Yes | The unique identifier for the API inbox. |

**Request Body** (`application/json`)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | string | No | Name of the contact. |
| `email` | string | No | Email address of the contact. |
| `identifier` | string | No | A unique external identifier for the contact. |
| `identifier_hash` | string | No | HMAC-SHA256 hash of the identifier for secure identification. |
| `phone_number`| string | No | Phone number of the contact. |
| `custom_attributes` | object | No | Key-value pairs for custom attributes. |

**Example Response**
```json
{
  "id": 123,
  "source_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "name": "Alice",
  "email": "alice@acme.inc",
  "pubsub_token": "PUBSUB_TOKEN_FOR_WEBSOCKET"
}
```

#### `PATCH /public/api/v1/inboxes/{inbox_identifier}/contacts/{contact_identifier}` - Update a Contact
Updates the attributes of an existing contact.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `inbox_identifier` | string | Yes | The unique identifier for the API inbox. |
| `contact_identifier` | string | Yes | The `source_id` of the contact returned on creation. |

**Request Body** (`application/json`)
*   Same as the create endpoint.

---

### 3.2. Client Conversations

#### `GET /public/api/v1/inboxes/{inbox_identifier}/contacts/{contact_identifier}/conversations` - List all conversations
Retrieves a list of all conversations for a specific contact.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `inbox_identifier` | string | Yes | The unique identifier for the API inbox. |
| `contact_identifier` | string | Yes | The `source_id` of the contact. |

#### `POST /public/api/v1/inboxes/{inbox_identifier}/contacts/{contact_identifier}/conversations` - Create a conversation
Creates a new conversation for the contact.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `inbox_identifier` | string | Yes | The unique identifier for the API inbox. |
| `contact_identifier` | string | Yes | The `source_id` of the contact. |

**Request Body** (`application/json`)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `custom_attributes`| object | No | Key-value pairs for custom conversation attributes. |

#### `POST /public/api/v1/inboxes/{inbox_identifier}/contacts/{contact_identifier}/conversations/{conversation_id}/toggle_typing` - Toggle typing status
Notifies the system that the contact is typing.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `inbox_identifier` | string | Yes | The unique identifier for the API inbox. |
| `contact_identifier` | string | Yes | The `source_id` of the contact. |
| `conversation_id` | integer | Yes | The numeric ID of the conversation. |

**Request Body** (`application/json`)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `typing_status` | enum | Yes | The typing status: `on` or `off`. |

#### `POST /public/api/v1/inboxes/{inbox_identifier}/contacts/{contact_identifier}/conversations/{conversation_id}/update_last_seen` - Update last seen
Updates the timestamp to indicate that the contact has seen the latest messages in the conversation.

**Path Parameters**
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `inbox_identifier` | string | Yes | The unique identifier for the API inbox. |
| `contact_identifier` | string | Yes | The `source_id` of the contact. |
| `conversation_id` | integer | Yes | The numeric ID of the conversation. |

---

## 4. FAQ

### Why do I get a 401 ‘Non permissible resource’ error when using Platform API tokens?
Platform APIs are sandboxed by default. They can only access accounts, users, and other objects created by that specific API key. To grant a Platform App access to an existing object (like an Account), you must manually create a permission record in the Rails console.

**Example Rails Command:**
```ruby
# Grant PlatformApp with ID 1 access to Account with ID 1
PlatformAppPermissible.create!(platform_app: PlatformApp.find(1), permissible: Account.find(1))
```
