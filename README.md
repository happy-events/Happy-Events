# Happy Events — free starter website

Responsive Happy Events starter for Parth Balar. Golden yellow/black branding, motion effects, Surat-only service area, WhatsApp inquiry links, Firebase-powered gallery and a basic admin login/gallery manager.

## What is included
- `index.html`, `styles.css`: responsive animated public website.
- `app.js`: scroll reveals, WhatsApp messages and Firestore gallery loading with canvas watermark download.
- `admin.html`, `admin.js`: Firebase email/password login and basic gallery metadata CRUD.
- `firebase-config.js`: template. Fill it with your Firebase Web App config. This file is ignored by Git.
- `firestore.rules`, `storage.rules`: starter security rules.

## Free hosting route
1. Install Git and create a free GitHub account.
2. Create a new **private** repository first while configuring; upload these files. Do not commit passwords or service-account JSON files.
3. GitHub Pages can host the static public site for free. In repository Settings → Pages, select the branch and root folder. Note: GitHub Pages serves static files only; Firebase supplies auth/database/storage.
4. Create a Firebase project at https://console.firebase.google.com (Spark/free plan where available), register a Web App, and copy its config into `firebase-config.js`.
5. In Firebase Authentication → Sign-in method, enable Email/Password. Do not enable public user registration in this site.
6. In Authentication → Users, manually create your admin email and a strong unique password.
7. Copy that user's UID. In Firestore, create collection `admins` and a document whose ID is exactly the UID. The document can contain `{ "role": "admin" }`. Never let a public user create their own admin record.
8. Create Firestore database and Storage bucket. Paste rules from `firestore.rules` and `storage.rules` into the respective Rules tabs and publish.
9. Upload your logo image as `logo.png` in the website root (or change the path in `app.js`). Also upload it to Firebase Storage under `brand/` for future admin enhancements.
10. To add a gallery image, upload it to Storage under `gallery/`, copy its download URL, sign in at `/admin.html`, and add the title/URL/alt text/order. For branded downloads, images must be served with compatible CORS headers. If canvas export fails, host images in Firebase Storage and configure CORS for your site origin.
11. Test admin access and rules using a second non-admin account before publishing.

## Firebase collections
- `admins/{uid}`: admin allowlist document; provision manually in Firebase Console.
- `gallery/{id}`: `title`, `imageUrl`, `alt`, `sortOrder`, `active`, `createdAt`, `updatedAt`.
- `categories/{id}`, `services/{id}`, `testimonials/{id}`: intended editable content collections.
- `siteSettings/{docId}`: intended site content/settings.

## Important limitations of this starter
- The admin UI currently manages gallery metadata only. It is a foundation, not a finished full CMS for every section.
- Uploading a file directly from admin is not implemented yet; this version expects the file to be uploaded in Firebase Storage first and its URL pasted in.
- For a truly production-ready system, test all rules, image CORS settings, mobile browsers and accessibility before taking customer orders.
- Demo service copy is generic; update it to match actual packages. Reviews are intentionally not fabricated.
- Keep the Firebase client config limited to normal web-app values. Never place private service-account credentials in client files.
- Service area: Surat only. WhatsApp: +91 8141463007.
- Business address: 63, Oculus Residency, Valak, Surat, Gujarat - 395013, India.

## Local preview
Because JavaScript modules import Firebase from a CDN, run a local web server rather than opening `index.html` as a file. For example, with Python installed: `python -m http.server 8000`, then visit `http://localhost:8000`.
