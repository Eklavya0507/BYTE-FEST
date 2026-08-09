# ByteFest 2026 Registration Website — V2

Open `index.html` in a browser.

## Added in V2
- Registration moved to a separate `register.html` page.
- Separate event detail page (`event.html?event=...`).
- Event details include format, team size, timing, mode, rounds, rules and fee/payment instructions.
- Animated 3D-style moving event names in the background.
- Participant login using email + registration ID.
- Participant dashboard to view their own registration.
- Organizer demo admin page (`admin.html`) with event filter and CSV export.
- Payment method/reference captured per registration.

## Payment
The site currently supports UPI or cash selection, but the official UPI ID/QR is intentionally not hard-coded because the organizer must provide the real payment account.

Recommended production flow:
1. Show the correct fee for the selected sub-event.
2. Show official UPI QR/UPI ID.
3. Participant pays.
4. Participant enters UTR/transaction reference.
5. Admin verifies payment.
6. Registration becomes `Payment Verified`.

## Important security note
This is still a front-end prototype using browser localStorage. The demo admin page is NOT secure and must not be used as a real public admin system.

For the real deployment, use:
- Backend API
- Database (MySQL/PostgreSQL/Firebase)
- Admin authentication
- Password hashing
- Server-side validation
- Payment gateway/verified UPI workflow
- Role-based admin access
- HTTPS
