import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function loadServiceAccount() {
  const encoded = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!encoded) return null;
  try {
    const json = Buffer.from(encoded, "base64").toString("utf-8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function getAdminApp(): App | null {
  const serviceAccount = loadServiceAccount();
  if (!serviceAccount) return null;
  if (getApps().length) return getApps()[0];
  return initializeApp({ credential: cert(serviceAccount) });
}

const app = getAdminApp();

export const adminAuth = app ? getAuth(app) : null;
export const adminDb = app ? getFirestore(app) : null;
