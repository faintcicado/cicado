# Deployment Instructions

This document provides step-by-step instructions for deploying the CICADO application to a production environment. We will deploy the backend server to [Heroku](https://www.heroku.com/) and the frontend client to [Vercel](https://vercel.com/).

## Prerequisites

- A [GitHub](https://github.com/) account with the `cicado` repository.
- A [Heroku](https://heroku.com/) account.
- A [Vercel](https://vercel.com/) account.

---

## Part 1: Deploying the Backend to Heroku

1.  **Create a New Heroku App:**
    - Go to your Heroku dashboard and click "New" -> "Create new app".
    - Choose an app name (e.g., `cicado-backend`).
    - Select a region and click "Create app".

2.  **Connect to GitHub:**
    - In your Heroku app's dashboard, go to the "Deploy" tab.
    - Under "Deployment method", click "GitHub".
    - Connect your GitHub account and search for the `cicado` repository.
    - Click "Connect".

3.  **Configure for a Monorepo:**
    - Go to the "Settings" tab in your Heroku app's dashboard.
    - Scroll down to the "Buildpacks" section.
    - Add the following buildpack: `https://github.com/timanovsky/subdir-heroku-buildpack.git`
    - This buildpack allows you to specify a subdirectory for deployment.

4.  **Set Environment Variables:**
    - Still in the "Settings" tab, scroll to the "Config Vars" section and click "Reveal Config Vars".
    - Add the following variables:
        - `PROJECT_PATH`: Set this to `server`. This tells the buildpack to use the `/server` directory.
        - `DB_HOST`: Your PostgreSQL database host.
        - `DB_PORT`: Your PostgreSQL database port.
        - `DB_USER`: Your PostgreSQL database username.
        - `DB_PASSWORD`: Your PostgreSQL database password.
        - `DB_DATABASE`: Your PostgreSQL database name.

5.  **Deploy:**
    - Go back to the "Deploy" tab.
    - At the bottom of the page, under "Manual deploy", select the `main` branch and click "Deploy Branch".
    - Heroku will now build and deploy your backend.
    - Once the deployment is complete, you can find your backend's URL in the "Settings" tab under the "Domains" section. It will be something like `https://cicado-backend.herokuapp.com`. **Save this URL.**

---

## Part 2: Deploying the Frontend to Vercel

1.  **Create a New Vercel Project:**
    - Go to your Vercel dashboard and click "Add New..." -> "Project".
    - Under "Import Git Repository", select your `cicado` repository.

2.  **Configure Project:**
    - **Root Directory:** Set the root directory to `client`. This tells Vercel to look for the React app in the `/client` subdirectory.
    - **Environment Variables:**
        - Expand the "Environment Variables" section.
        - Add a new variable:
            - **Name:** `REACT_APP_API_URL`
            - **Value:** The URL of your deployed Heroku backend (from Part 1, step 5).

3.  **Deploy:**
    - Click the "Deploy" button.
    - Vercel will now build and deploy your frontend.
    - Once complete, Vercel will provide you with the URL for your live application.

---

## Part 3: Final Configuration (CORS)

For security, you should update the backend's CORS configuration to only allow requests from your deployed frontend.

1.  **Get your frontend URL** from Vercel (e.g., `https://cicado-frontend.vercel.app`).
2.  **Update `server/src/index.ts`:**
    - Open `server/src/index.ts`.
    - Find the `app.use(cors());` line.
    - Change it to:
      ```typescript
      const corsOptions = {
        origin: 'https://<your-frontend-url>.vercel.app', // Replace with your Vercel URL
        optionsSuccessStatus: 200
      };
      app.use(cors(corsOptions));
      ```
3.  **Commit and push** this change to your GitHub repository. Heroku will automatically redeploy the backend with the updated configuration.

You have now successfully deployed the CICADO application!
