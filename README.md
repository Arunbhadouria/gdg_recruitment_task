# Club Recruitment App

A simple web application built with React and Firebase to manage recruitment opportunities for university clubs. Clubs can post roles, and students can browse and apply for them.

## Features

-   **Post Opportunities:** Clubs can create new recruitment listings.
-   **Browse & Apply:** Students can view all available opportunities and submit applications.
-   **Real-time Database:** Uses Firebase Firestore to store and retrieve data instantly.

## Tech Stack

-   **Frontend:** React (Create React App)
-   **Routing:** React Router
-   **Database:** Firebase Firestore
-   **Deployment:** Netlify / Firebase Hosting

## Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or later)
-   `npm` or `yarn` package manager

---

## Setup and Installation

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/recruitment-app.git](https://github.com/your-username/recruitment-app.git)
cd recruitment-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase

1.  Create a project on the [Firebase Console](https://console.firebase.google.com/).
2.  In your project, go to **Project Settings** > **General**.
3.  Under "Your apps", click the web icon (`</>`) to create a new web app.
4.  Copy the `firebaseConfig` object provided.
5.  In the root of your project, create a new file named `.env`.
6.  Paste your Firebase config keys into the `.env` file. **Do not commit this file to version control.**

    ```
    # .env
    REACT_APP_FIREBASE_API_KEY="your-api-key"
    REACT_APP_FIREBASE_AUTH_DOMAIN="your-auth-domain"
    REACT_APP_FIREBASE_PROJECT_ID="your-project-id"
    REACT_APP_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
    REACT_APP_FIREBASE_APP_ID="your-app-id"
    ```

### 4. Set Up Firestore Database

1.  In the Firebase console, go to the **Firestore Database** section.
2.  Click **Create database** and start in **test mode** for this demo.
3.  Create two collections: `opportunities` and `applications`.

---

## Running the App Locally

Once the setup is complete, you can run the application locally:

```bash
npm start
```

This will start the development server, and you can view the app at `http://localhost:3000`.

## Building for Production

To create a production-ready build of the app:

```bash
npm run build
```

This command creates a `build` folder with optimized static assets.

## Deployment

You can deploy the `build` folder to any static site hosting service.

### Deploying to Netlify

1.  Drag and drop the `build` folder to the [Netlify drop zone](https://app.netlify.com/drop).
2.  Or, connect your Git repository to Netlify for continuous deployment. Set the build command to `npm run build` and the publish directory to `build`.

### Deploying to Firebase Hosting

1.  Install the Firebase CLI: `npm install -g firebase-tools`.
2.  Login to Firebase: `firebase login`.
3.  Initialize hosting: `firebase init hosting`.
    -   Select your project.
    -   Set your public directory to `build`.
    -   Configure as a single-page app (rewrite all URLs to `/index.html`).
4.  Deploy: `firebase deploy`.