# React Forum Project

This is a React-based forum application that utilizes Firebase for backend services, including user authentication, data storage, and real-time updates. The project supports user roles, post creation, categorization, and more.

## Installation Guide

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/react-forum-project.git
cd react-forum-project
```

### 2. Install Dependencies

Install the necessary dependencies using npm or yarn:

```bash
npm install
```

Or

```bash
yarn install
```

### 3. Set Up Firebase

#### a. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click on "Add Project" and follow the prompts to create a new Firebase project.
3. Once the project is created, navigate to the "Project Settings" and under the "General" tab, add a new web app.

#### b. Set Up Realtime Database

1. In the Firebase Console, navigate to the "Realtime Database" section.
2. Click on "Create Database" and start in test mode (you can adjust rules later as needed).

#### c. Set Up Firebase Authentication

1. In the Firebase Console, go to the "Authentication" section.
2. Click on "Get Started" and choose the authentication methods you want to support (e.g., Email/Password, Google Sign-In).
3. Configure any required settings for each authentication provider.

#### d. Configure Firebase in Your Project

1. Copy the Firebase configuration keys provided in the Firebase Console after setting up your web app.
2. Create a file named `config.js` inside the `src/firebase/` folder in your project directory.
3. Paste the configuration keys into `config.js` as follows:

```javascript
// src/firebase/config.js

const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id",
    databaseURL: "your-database-url"
};

export default firebaseConfig;
```

### 4. Build the Database Structure

Using the Firebase Realtime Database, create the following structure to support your forum application:

#### 1. Category

Each category contains an `id`, `description`, `imgUrl`, and a list of subcategory IDs. Example:

```json
"Category": {
    "-049akbq3HlUXRyUe1hL": {
        "description": "Half-Life 2, WoW and Portal are awesome games!!!!",
        "id": "-049akbq3HlUXRyUe1hL",
        "imgUrl": "https://example.com/image.png",
        "isHidden": false,
        "name": "PC Gaming",
        "subcategory_ids": {
            "-049doV5P01UgETmXSxK": {
                "id": "-049doV5P01UgETmXSxK",
                "name": "PC Current News"
            }
        }
    }
}
```

#### 2. Subcategory

Each subcategory is associated with a category and contains its own properties:

```json
"Subcategory": {
    "-049akbq3HlUXRyUe1hL": {
        "-049doV5P01UgETmXSxK": {
            "id": "-049doV5P01UgETmXSxK",
            "imgUrl": "https://example.com/image.png",
            "isHidden": false,
            "isLocked": false,
            "name": "PC Current News"
        }
    }
}
```

#### 3. Posts

Posts are linked to specific subcategories and include information about the content, author, and reactions:

```json
"Posts": {
    "-049doV5P01UgETmXSxK": {
        "-049duxmGTZL5nUUhssV": {
            "-04CMRDcilEWlI_XcLMI": {
                "Content": "Need reliable PC software? Start with CCleaner...",
                "CreatedOn": "Tue Aug 13 2024 23:11:15 GMT+0300",
                "Title": "Recommendations for PC software",
                "createdBy": {
                    "ID": "tX3yrfIhXUctb4RcxdBUBD6fJ6j1",
                    "username": "WoWFan3000"
                },
                "id": "-04CMRDcilEWlI_XcLMI",
                "isHidden": false,
                "isLocked": false,
                "likedBy": {
                    "tX3yrfIhXUctb4RcxdBUBD6fJ6j1": true
                }
            }
        }
    }
}
```

#### 4. Replies

Replies are linked to specific posts and include the content, author, and reactions:

```json
"Reply": {
    "-04CLK6cq6J5cttNk1PK": {
        "-04CLzs2_4JrN3kzj82J": {
            "Content": "Well, classic WoW is clearly a way better version of the game...",
            "CreatedOn": "Tue Aug 13 2024 23:09:19 GMT+0300",
            "createdBy": {
                "ID": "tX3yrfIhXUctb4RcxdBUBD6fJ6j1",
                "username": "WoWFan3000"
            },
            "id": "-04CLzs2_4JrN3kzj82J",
            "isHidden": false,
            "isLocked": false
        }
    }
}
```

#### 5. Users

Each user profile includes personal details, their posts, roles, and preferences:

```json
"Users": {
    "13Astcj954SXbvqPtWUgSBzTCr1": {
        "Posts": {
            "-04CLK6cq6J5cttNk1PK": {
                "id": "-04CLK6cq6J5cttNk1PK",
                "subId": "-049doV5P01UgETmXSxK",
                "avatarUrl": "https://example.com/avatar.png",
                "createdOn": "Tue Aug 13 2024 11:19:27 GMT+0300",
                "customInfo": "",
                "email": "mail1@mail.com",
                "firstName": "Special",
                "isBlocked": false,
                "lastName": "Cookie",
                "likedPosts": {},
                "role": "Admin",
                "uid": "13Astcj954SXbvqPtWUgSBzTCr1",
                "username": "SpecialCookie"
            }
        }
    }
}
```

### 5. Running the Project

Once everything is set up, start the development server:

```bash
npm run dev
```

Your React forum should now be running locally at ` http://127.0.0.1:5173/`.

## Forum Functionality

### User Capabilities

1. **Create, Edit, and Delete Posts**: Users can create new posts, edit their existing posts, and delete them.
2. **Like Posts and Replies**: Users can like other users' posts and replies.

### Admin Capabilities

1. **Manage Categories**: Admins can create, edit, and manage categories within the forum.
2. **Manage Subcategories**: Admins have the ability to create, edit, and manage subcategories within categories.
3. **Manage Posts and Replies**: Admins can manage all posts and replies, including editing and deleting them.
4. **Manage Users**: Admins can manage users, including assigning roles and moderating user activity.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
