# Fairytale AI

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `page.tsx`. The page auto-updates as you edit the file.

This project uses `next/font` to automatically optimize and load Geist, a new font family for Vercel.

---

## Project Structure

```plaintext
.DS_Store
.env
.eslintrc.json
.github/
  └── workflows/
.gitignore
.next/
  ├── .DS_Store
  ├── app-build-manifest.json
  ├── build/
  ├── build-manifest.json
  ├── cache/
  └── fallback-build-manifest.json
.vscode/
  └── settings.json
a.json
app/
client_actions/
components/
components.json
contexts/
middleware.ts
next-env.d.ts
next.config.ts
package.json
playwright-report/
playwright.config.ts
postcss.config.mjs
public/
README.md
server_actions/
tailwind.config.ts
test-results/
tests/
tests-examples/
tsconfig.json
```

### Key Directories and Files

- **`app/`**: Contains the main application pages and components.
  - **`page.tsx`**: The main page component that renders the homepage.
- **`client_actions/`**: Contains client-side actions and utilities.
  - **`utils/checkSignIn.ts`**: Utility function to check if a user is signed in.
  - **`getProjectData.ts`**: Function to fetch project data from the server.
- **`components/`**: Contains reusable UI components.
  - **`ui/sections/largeSectionIR.tsx`**: A component that renders a large section with an image on the right.
  - **`ui/sections/timeline.tsx`**: A component that renders a timeline.
  - **`ui/video/video.tsx`**: A component that renders a video.
  - **`ui/footer/footer.tsx`**: A component that renders the footer.
- **`contexts/`**: Contains React context providers.
- **`server_actions/`**: Contains server-side actions and utilities.
  - **`database/firebaseSetup.ts`**: Sets up Firebase for the project.
- **`public/`**: Contains static assets like images and videos.
- **`tests/`**: Contains test files.
- **`.next/`**: Contains Next.js build output.
- **`package.json`**: Contains project dependencies and scripts.
- **`README.md`**: This file.

---

## Components

### **LargeSectionImgR**

- **Location**: `largeSectionIR.tsx`
- This component renders a large section with an image on the right. It is used to display prominent content with a visual emphasis.

### **Timeline**

- **Location**: `timeline.tsx`
- This component renders a timeline. It is used to display a sequence of events or steps in a process.

### **Video**

- **Location**: `video.tsx`
- This component renders a video. It is used to display video content within the application.

### **Footer**

- **Location**: `footer.tsx`
- This component renders the footer of the application. It typically contains links and information about the application.

---

## Utilities

### **checkSignIn**

- **Location**: `checkSignIn.ts`
- This utility function checks if a user is signed in. It is used to manage user authentication state within the application.

---

## API Endpoints

### **getUserData**

- **Endpoint**: `/api/getuserdata`
- **Method**: `GET`
- **Description**: Fetches user data from the server. It is used to retrieve information about the currently signed-in user.

### **getProjectImages**

- **Endpoint**: `/api/getprojectimages/[id]`
- **Method**: `GET`
- **Description**: Fetches project images from the server. It is used to retrieve images associated with a project.

### **getProjectData**

- **Endpoint**: `/api/getprojectdata/[id]`
- **Method**: `GET`
- **Description**: Fetches project data from the server. It is used to retrieve information about a specific project.

### **generateStoryboard**

- **Endpoint**: `/api/generatestoryboard`
- **Method**: `POST`
- **Description**: Generates a storyboard based on the provided prompt and other parameters.

### **generateCardImages**

- **Endpoint**: `/api/generatecardimages/[id]`
- **Method**: `POST`
- **Description**: Generates card images for a project based on the provided data.

### **checkSignedIn**

- **Endpoint**: `/api/checksignedin`
- **Method**: `GET`
- **Description**: Checks if the user is signed in by validating the access token.

### **signup**

- **Endpoint**: `/api/signup`
- **Method**: `POST`
- **Description**: Registers a new user and creates a session.

### **login**

- **Endpoint**: `/api/login`
- **Method**: `POST`
- **Description**: Authenticates a user and creates a session.

---

## Firebase Setup

- **Location**: `firebaseSetup.ts`
- This file sets up Firebase for the project. It initializes Firebase services and configures the connection to the Firebase database.

---

## Data Storage

### **User Data**

- User data is stored in Firebase Firestore.
- The data includes user profiles, authentication details, and user-specific settings.

### **Project Data**

- Project data, including project details, images, and videos, is stored in Firebase Firestore.
- Each project has a unique identifier and contains metadata about the project.

### **Image Generation and Storage**

#### **Image Generation**

- Images are generated using a custom image generation service.
- The service takes user inputs and generates images based on predefined templates and styles.

#### **Image Storage**

- Generated images are stored in Firebase Storage.
- Each image is associated with a project and has a unique URL that is used to retrieve the image.

#### **Image Display**

- Images are displayed in the application using the `LargeSectionImgR` component.
- The component fetches the image URL from Firebase Storage and renders the image in the appropriate section of the application.

---

## Deployment

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - Your feedback and contributions are welcome!