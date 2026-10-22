// Firebase Console > Project settings > Your apps > SDK setup.
// These are public web-app config values, not private credentials.
export const firebaseConfig = {
  apiKey: "AIzaSyBjGuBDmq6jdsfsPQXkpLI39WxzfcyDJeY",
  authDomain: "happy-events-2004.firebaseapp.com",
  projectId: "happy-events-2004",
  storageBucket: "happy-events-2004.firebasestorage.app",
  messagingSenderId: "606680470191",
  appId: "1:606680470191:web:22c5e7a290a1e222433a5a",
  measurementId: "G-BMCCHQ29HC"
};
// Cloudinary Dashboard: cloud name + Settings > Upload > Upload presets.
// Use an UNSIGNED preset with allowed formats and an 8 MB max file size.
export const cloudinaryCloudName = "us61zrjw";
export const cloudinaryUploadPreset = "happy_events_upload";
// Happy Events logo already uploaded to Cloudinary.
export const cloudinaryLogoUrl = "https://res.cloudinary.com/us61zrjw/image/upload/v1792646181/logo.jpg";
export const firebaseReady = !Object.values(firebaseConfig).some(v => String(v).startsWith("YOUR_"));
