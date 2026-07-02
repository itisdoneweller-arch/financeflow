# API Documentation - FinanceFlow

## Base URL
```
http://localhost:3001/api/v1
```

## Authentication

All protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register
- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
  ```

#### Login
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "token": "jwt_token",
      "user": {
        "id": "user_id",
        "email": "user@example.com",
        "name": "John Doe"
      }
    }
  }
  ```

### Expenses

#### Create Expense
- **POST** `/expenses`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "description": "Grocery shopping",
    "amount": 45.99,
    "category": "food",
    "date": "2026-06-30T10:00:00Z"
  }
  ```

#### Get Expenses
- **GET** `/expenses?limit=50&offset=0`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "expenses": [...],
      "total": 150
    }
  }
  ```

#### Get Expenses by Category
- **GET** `/expenses/categories`
- **Headers:** `Authorization: Bearer <token>`

### Courses

#### Get All Courses
- **GET** `/courses`
- **Query:** `?level=beginner&category=basics`
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "course_id",
        "title": "Money Basics",
        "description": "...",
        "level": "beginner",
        "duration": 180
      }
    ]
  }
  ```

#### Get Course Details
- **GET** `/courses/:id`

### AI Assistant

#### Chat
- **POST** `/ai/chat`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "message": "How do I start budgeting?",
    "conversationId": "optional_conversation_id"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "response": "Educational response...",
      "tokens": 150
    }
  }
  ```

#### Generate Learning Path
- **POST** `/ai/learning-path`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "age": 25,
    "occupation": "Software Engineer",
    "incomeRange": "50-75k",
    "financialGoals": ["save", "invest"],
    "experienceLevel": "beginner"
  }
  ```

#### Categorize Expense
- **POST** `/ai/categorize`
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
- **Body:** Receipt image file

## Error Responses

```json
{
  "success": false,
  "message": "Error message",
  "error": "error_code"
}
```

## Status Codes

- **200** - OK
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **500** - Internal Server Error

## Rate Limiting

- 100 requests per 15 minutes per IP
- 1000 requests per hour per authenticated user

## WebSocket Events (Socket.io)

### Connection
```javascript
const socket = io('http://localhost:3001');
socket.emit('authenticate', { token: 'jwt_token' });
```

### Events
- `expense:created` - New expense created
- `goal:updated` - Goal progress updated
- `notification:new` - New notification
- `ai:message` - AI response received

## Pagination

All list endpoints support:
- `limit` - Number of results (default: 50, max: 100)
- `offset` - Offset for pagination (default: 0)

## Filtering

Supported filters vary by endpoint. Common ones:
- `category` - Filter by category
- `startDate` - Filter by start date
- `endDate` - Filter by end date
- `status` - Filter by status
