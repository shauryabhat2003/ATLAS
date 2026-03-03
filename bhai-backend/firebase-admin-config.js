import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase Admin using environment variable
// The FIREBASE_SERVICE_ACCOUNT env var should contain the JSON string of the service account key
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;
