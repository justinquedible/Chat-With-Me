# ChatWithMe

A mobile and webapp to let strangers or people nearby to chat with each other.

---

## Develepment

Run `expo start` in frontend director.

---

## Deployment

#### Web Frontend

Run `npm run deploy-hosting` in frontend directory.

#### Build for Android and iOS

Run `expo publish` in frontend directory.
More info at: https://docs.expo.dev/classic/building-standalone-apps/

#### Backend

1. Run `gcloud builds submit --tag gcr.io/omegle-app-backend/server` in backend directory.
2. Run `gcloud run deploy --image gcr.io/omegle-app-backend/server` in backend directory.
