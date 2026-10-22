# Happy Events — Firebase + Cloudinary starter

Gujarati/English responsive public website and admin panel for Happy Events, Surat. Includes Firebase Email/Password admin login, Firestore managers for gallery/categories/services/site settings/orders, Cloudinary unsigned image upload, and public gallery with branded download support.

## 1. Firebase setup
1. Open Firebase Console and create/select the Happy Events project on the Spark plan.
2. Register a Web App in Project settings and copy its config into `firebase-config.js`.
3. Authentication → Sign-in method → enable **Email/Password**. Do not enable public signup.
4. Authentication → Users → Add user. Create your admin email and a strong unique password. Copy the user's UID.
5. Firestore Database → create database. Start in production mode.
6. Firestore → Rules: paste `firestore.rules` and Publish.
7. Firestore → Data → Start collection `admins`; document ID must be exactly the admin user's UID; add `role` (string) = `admin` and `active` (boolean) = `true`. Never let public users create admin records.
8. Create `siteSettings` collection and document ID `main`. Fields: `siteName` string `Happy Events`, `logoUrl` string (Cloudinary logo URL), `whatsappNumber` string `918141463007`, `address` string `63, Oculus Residency, Valak, Surat, Gujarat - 395013, India`, `serviceArea` string `Surat`.
9. For orders, the provided rules allow limited public order creation, while reading/updating orders is admin-only.

## 2. Cloudinary setup
1. In Cloudinary Dashboard note your Cloud name.
2. Settings → Upload → Upload presets → Add upload preset.
3. Set Signing Mode to **Unsigned**, preset name (e.g. `happy_events_upload`), folder `happy-events`, allowed formats `jpg,jpeg,png,webp`, and a reasonable max file size (e.g. 8 MB) if the setting is available. Save.
4. Add cloud name and preset name to `firebase-config.js` as `cloudinaryCloudName` and `cloudinaryUploadPreset`.
5. Unsigned presets are public. Restrict file formats and size; do not put API secret in browser code. Monitor usage.

## 3. Run and publish
- Watermarked downloads use the Cloudinary logo URL configured in `firebase-config.js` (and each gallery item can override it with `watermarkUrl`). If a download fails, check Cloudinary CORS settings.
- Run locally from this directory with `python -m http.server 8000`, then open `http://localhost:8000`.
- For static hosting, GitHub Pages can host the website. Settings → Pages → deploy from your main branch/root. Firebase and Cloudinary run separately.
- Before production, test rules and check that public users cannot read orders or modify admin data.

## 4. Collections
- `admins/{uid}`: admin allowlist, provision manually.
- `gallery/{id}`: `title`, `categoryId`, `imageUrl`, `watermarkUrl`, `alt`, `sortOrder`, `active`, timestamps.
- `categories/{id}`: `name`, `slug`, `imageUrl`, `description`, `sortOrder`, `active`.
- `services/{id}`: `name`, `description`, `imageUrl`, `price`, `sortOrder`, `active`.
- `siteSettings/main`: site name, logo, WhatsApp, address, service area, Instagram URL.
- `orders/{id}`: customerName, phone, service, eventDate, message, status, createdAt.

## Notes
- This is a starter implementation, not a security audit. Verify your Firestore rules before public launch.
- Cloudinary unsigned uploads can be abused if the preset is too permissive. Do not use API secrets in client code.
- Watermark download requires `logo.png` in the site root and CORS-compatible image URLs.
- Service area is Surat only. WhatsApp: +91 81414 63007.
