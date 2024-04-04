# Data Sync - Collaborative Data Visualization Platform

![Made-With-React](https://img.shields.io/badge/MADE%20WITH-NEXT-000000.svg?colorA=111&style=for-the-badge&logoWidth=14&logo=nextdotjs)
![Made-With-React](https://img.shields.io/badge/MADE%20WITH-REACT-00caef.svg?colorA=222222&style=for-the-badge&logoWidth=14&logo=react)
![Made-With-NodeJS](https://img.shields.io/badge/MADE%20WITH-NODE-339933.svg?colorA=222222&style=for-the-badge&logoWidth=14&logo=Node.js)
![Made-With-Mongo](https://img.shields.io/badge/MADE%20WITH-MONGO-47A248.svg?colorA=222222&style=for-the-badge&logoWidth=14&logo=MongoDB)
![Made-With-Express](https://img.shields.io/badge/MADE%20WITH-EXPRESS-000000.svg?colorA=222222&style=for-the-badge&logoWidth=14&logo=Express)
![Made-With-Nodemon](https://img.shields.io/badge/MADE%20WITH-NODEMON-76D04B.svg?colorA=222222&style=for-the-badge&logoWidth=14&logo=Nodemon)
![Made-With-Tailwind](https://img.shields.io/badge/MADE%20WITH-TAILWIND-06B6D4.svg?colorA=222222&style=for-the-badge&logoWidth=14&logo=tailwindcss)
![Made-With-Redux](https://img.shields.io/badge/MADE%20WITH-REDUX-764ABC.svg?colorA=222222&style=for-the-badge&logoWidth=14&logo=Redux)

<img src="https://github.com/Gautam25Raj/data-sync/assets/63155224/89757cf4-da1a-46bc-b4ea-34648a917c4b" alt="Data Sync Logo" width="300" height="300">

Data Sync is a powerful platform designed to revolutionize the way teams collaborate and visualize data. With seamless integration with Tableau, real-time collaboration features, and advanced data visualization tools, Data Sync empowers teams to unlock deeper insights, streamline communication, and drive better decision-making.

## Features

### Live Tableau Collaboration

Experience seamless collaboration with Data Sync's live Tableau integration. Instantly communicate, effortlessly share ideas, and collaboratively visualize insights with ease. With features like group chat and live cursor, you can interact in real-time with your team members, fostering a dynamic and engaging collaborative environment.

<img src="https://github.com/Gautam25Raj/data-sync/assets/63155224/fe203418-c111-4bab-bfc0-4bcf66bc2762" alt="Live Tableau Collaboration Screenshot">

### Real-Time Chats

Engage in real-time conversations with your team members using Data Sync's chat feature. Foster seamless communication and instant collaboration, whether you're brainstorming ideas, discussing insights, or coordinating tasks. Stay connected and productive with real-time messaging that keeps everyone on the same page.

![Group 13](https://github.com/Gautam25Raj/data-sync/assets/63155224/f4450e60-23d8-4ac8-a66f-d2e0c94ece41)


### Embedded Tableau Dashboard

Access and interact with dynamic data visualizations directly within Data Sync using our embedded Tableau Dashboard feature. Seamlessly integrate Tableau dashboards into your workflow, allowing you to analyze data, gain insights, and make informed decisions without ever leaving the platform. With Data Sync, you have all the tools you need to drive collaboration and innovation in one centralized location.

<img src="https://github.com/Gautam25Raj/data-sync/assets/63155224/a6505cd7-909b-463a-b406-cc8ab5306945" alt="Embedded Tableau Dashboard">

## Getting Started

### Client

1. **Clone the Repository**: Clone the client repository to your local machine:

```bash
git clone https://github.com/Gautam25Raj/data-sync
```

2. **Install Dependencies**: Navigate to the client directory and install dependencies using npm or yarn:

```
cd client
npm install
```

3. **Start the Client**: Start the client server by running the following command:

```
npm start
```

**Note:** The client will run at `http://localhost:3000`.

### Server

1. **Clone the Repository**: Clone the server repository to your local machine:

```bash
git clone https://github.com/Gautam25Raj/data-sync
```

2. **Install Dependencies**: Navigate to the server directory and install dependencies using npm or yarn:

```
cd server
npm install
```

3. **Configure Environment Variables**: Set up environment variables required for the server. Refer to the [Environment Variables](##Evironment-Variables) below file for details.

4. **Start the Server**: Start the server by running the following command:

```
npm start
```

**Note:** The server will run at either `http://localhost:5000` or `http://localhost:8080`, as specified in the `.env` file.

Now you have both the client and server components of Data Sync up and running. You can start collaborating and visualizing data seamlessly!

## Project Folder Structure

### Client: frontend

- **app**: Contains Next.js folder routes for the frontend.
- **components**: Houses frontend components used in the application.
- **hooks**: Stores custom React hooks utilized throughout the frontend.
- **providers**: Holds custom provider components such as `AuthProvider`, `ReduxProvider`, etc.
- **public/assets**: Contains images and other static assets used in the frontend.
- **redux**: Houses Redux store configuration and slices for state management.
- **utils**: Contains utility functions used in the frontend code.
- **tailwind.config.js**: Configuration file for Tailwind CSS.

### Server: backend

- **config**: Contains database configuration files.
- **controllers**: Houses backend route controllers for handling requests.
- **middleware**: Stores backend middleware functions.
- **models**: Contains MongoDB models for data schema definition.
- **routes**: Houses all backend route definitions.
- **utils**: Contains utility functions used in the backend code.
- **server.js**: Entry point for the backend server.
- **test.js**: Contains tests for backend functionality.

## Usage Examples

### Onboarding to DataSync
#### User Sign Up
To sign up for Data Sync and access its collaborative data visualization features, follow these steps:

- Navigate to the Data Sync [website](https://data-sync-tableau.vercel.app).
- Fill out the registration form with your desired username, email address, and password.
- Click on the "Sign Up" button to proceed.
- An OTP (One-Time Password) will be sent to the email address you provided.
   <img src="https://github.com/Gautam25Raj/data-sync/assets/63155224/e6df2b29-fc3b-42af-967f-e2202e94cb07" alt="DataSync SighUp Page">
   <img src="https://github.com/Gautam25Raj/data-sync/assets/63155224/e272e5b4-ceec-4aa4-9170-5cf3b53db034" alt="DataSync Login Page">

### Verify Email with OTP
To verify your email address and complete the sign-up process, follow these steps:

- Check your email inbox for the OTP sent by Data Sync.
- Copy the OTP from the email.
- Return to the Data Sync website.
- Paste the OTP into the provided field on the verification page.
   <img src="https://github.com/Gautam25Raj/data-sync/assets/63155224/e7987b37-b601-408f-b296-57bfae969a15" alt="OTP Section">

#### Accessing the Dashboard
Once your email address is verified, you can access the Data Sync dashboard to start collaborating on data visualization projects:

- Upon successful login/sign up, you'll be redirected to the dashboard.
- From the dashboard, you can initiate live collaboration channels, embed Tableau dashboards, and engage in real-time chats with your team members and contacts.
   <img src="https://github.com/Gautam25Raj/data-sync/assets/63155224/27fa6402-33fa-4bcb-bba0-fd1b0c8b6b18" alt="DataSYnc Dashboard">


### Live Tableau Collaboration

To initiate a live collaboration session with Tableau integration, follow these steps:

1. Click on `Create Channel` Button in the lefthand side.
2. Fill details to create channel. Your channel Name, Tableau public url and Add you contacts to channel.
    ![11](https://github.com/Gautam25Raj/data-sync/assets/63155224/7c1ce3f4-aebd-4b98-b4eb-45cc21373653)
3. Click on Create Channel to create ac channel.
4. Click on your new channel. It will open your tableau public and your channel group chat.
     ![6](https://github.com/Gautam25Raj/data-sync/assets/63155224/af2a2d0d-f637-47bc-ae61-af78fa735c1c)
5. Click on `start collab` Button to start collaboration.
6. As team members join the session, you'll see their cursors and chat messages in real-time.
7. Use the live cursor feature to point out insights and discuss visualizations collaboratively.
8. You can also Share the collaboration link with your team members. It can be shown in the channel three dot menu.
      ![image](https://github.com/Gautam25Raj/data-sync/assets/63155224/003bdef9-6b61-4eeb-bdfc-dbf9bf0062c4)


## Adding Tableau Dashboard

To integrate a Tableau dashboard into your Data Sync project, follow these steps:

1. **Navigate to Dashboard**: From the sidebar menu, click on the "Dashboard" option to access the dashboard section of your Data Sync account.
    ![image](https://github.com/Gautam25Raj/data-sync/assets/63155224/e6e453b5-1708-43e5-9e89-987bdb550b06)

2. **Click on "Connect to Tableau"**: Look for the "Add Tableau Dashboard" button and click on it to initiate the process.

3. **Fill in the Form**: A multi-step form will appear where you need to provide the following details:
   - **Name**: Enter a name for the site in Data Sync.
   - **Tableau Username**: Your Tableau username.
   - **Tableau Client ID**: Tableau connected app client ID.
   - **Tableau Secret ID**: Tableau connected app secret ID.
   - **Tableau Secret Value**: Tableau connected app secret value.
   - **Tableau PAT (Personal Access Token) Name**: Name of the Personal Access Token.
   - **Tableau PAT Secret**: Personal Access Token Secret.
   - **Tableau API Base URL**: Base URL of the Tableau dashboard.
   - **Tableau Site Name**: Tableau site name.
     ![image](https://github.com/Gautam25Raj/data-sync/assets/63155224/8c44d192-6383-402f-985b-3e43da577a6e)


4. **Create Site**: After filling in the form, click on the "Create Site" button.

5. **View Created Sites**: Once the site is created, you will see a list of all created sites associated with your account. You can add more sites by clicking on the "Add Site" button.
   ![image](https://github.com/Gautam25Raj/data-sync/assets/63155224/459b637d-e976-4b4d-b02d-08af4e28f0fe)

6. **Click on your site**: Click on your site to connect with Tableau. Data Sync will establish a connection with Tableau and retrieve all existing projects.
7. **Load Project**: From the list of projects, click on any project to load it in Data Sync.
   ![image](https://github.com/Gautam25Raj/data-sync/assets/63155224/c14d979a-4de7-450e-895b-feddaffe4e2e)

9. **Edit Project**: If needed, you can edit the project directly from within Data Sync by clicking on the "Edit" option.
    ![image](https://github.com/Gautam25Raj/data-sync/assets/63155224/7968d77e-e94b-45d3-89fa-77b47af80a21)

By following these steps, you can seamlessly integrate Tableau dashboards into your Data Sync project, allowing for enhanced collaboration and data visualization capabilities.

## Environment-Variables

### Frontend (Client)

- **NEXT_PUBLIC_BACKEND_URL**: The URL of the backend server used by the frontend. Ensure it points to the correct route on the backend.

### Backend (Server)

- **PORT**: The port on which the backend server runs.
- **MONGO_SECRET**: The MongoDB URI used by the backend to connect to the database.
- **ABLY_API_KEY**: The API key for Ably, a real-time messaging platform.
- **ABLY_CIPHER_KEY**: The cipher key for Ably, used for encryption and decryption of messages.
- **JWT_SECRET**: The secret key used for JWT (JSON Web Token) authentication and authorization.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
