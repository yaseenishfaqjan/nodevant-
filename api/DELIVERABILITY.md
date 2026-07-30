# Nodevant — Email Deliverability & Anti-Spam (P0 sweep)

Everything below is what the code now assumes. Two items (DNS + live test-send)
can only be completed on the deployed VPS / at your DNS registrar — the exact
records and the one-command test are provided so you can finish them there.

---

## 1. What the notification layer now does (code, shipped)

- **One function**, `sendLeadNotification(lead, meta)` in `api/src/notify.js`, is
  called by every intake endpoint. No Nodemailer code lives anywhere else.
- **Internal alert → info@ is FORCED** (`SMTP_USER`). `LEAD_NOTIFY_TO` = extra
  To: recipients; `LEAD_NOTIFY_BCC` = silent backups. info@ can never be omitted.
- **Subjects are source-prefixed:** `[AUDIT] [CONTACT] [SERVICE: x] [BOOKING] [CALL] [NEWSLETTER]`.
- **Triage data** in every internal email: timestamp, source page, IP, user-agent,
  (+ call duration / agent number / 200-char transcript preview for calls),
  a **Reply to lead** mailto button, a **Call** tel: button, and an **Open CRM** link.
- **Confirmation email** to the lead from ONE type-driven template
  (`api/src/emailTemplates.js`) — audit gets the ROI report; contact/service/
  booking/call/newsletter get the branded confirmation.
- **Retry:** each send retries once after 1.5s on a transient SMTP error.

## 2. Anti-spam (code, shipped)

- **Honeypot** on every public form (`company_website` hidden field). Backend
  checks `_hp || company_website || _gotcha`; if filled → responds `200 {success}`
  and silently drops (bots think they won, no lead created, no email).
- **Rate limit:** 5 submissions / IP / hour on `/api/audit`, `/api/contact`,
  `/api/newsletter` (in-memory, per-IP). Machine webhooks (Cal, voice) are not
  limited. `429` returned past the cap.

---

## 3. DNS — SPF, DKIM, DMARC (DO THIS at your registrar)

Sending from `mail.nodevant.com` (cPanel SMTP). Run on the VPS to inspect current state:

```bash
dig +short TXT nodevant.com                 # look for v=spf1
dig +short TXT default._domainkey.nodevant.com   # DKIM (cPanel selector is usually "default")
dig +short TXT _dmarc.nodevant.com          # DMARC
```

Add/confirm these TXT records:

**SPF** (host: `@` / `nodevant.com`) — include your cPanel mail server. If cPanel
already generated one, keep it; otherwise:
```
v=spf1 +a +mx +ip4:<YOUR_MAIL_SERVER_IPv4> include:nodevant.com ~all
```
(Replace the IP with your cPanel server's sending IP — cPanel → Email Deliverability
shows the exact suggested SPF record; copy that one verbatim.)

**DKIM** — cPanel generates this automatically. In cPanel → **Email Deliverability**
→ `nodevant.com` → **Manage**, it shows the DKIM record it wants (`default._domainkey`).
Click **Install the Suggested Record**, or copy the `v=DKIM1; k=rsa; p=…` TXT to your
DNS host if DNS is external.

**DMARC** (host: `_dmarc`) — start in monitor mode, then tighten:
```
v=DMARC1; p=none; rua=mailto:dmarc@nodevant.com; ruf=mailto:dmarc@nodevant.com; fo=1; pct=100
```
After a week of clean reports, raise to `p=quarantine`, then `p=reject`.

> cPanel's **Email Deliverability** page is the fastest path: it flags any of the
> three that are missing/invalid and offers a one-click "Install Suggested Record"
> for SPF + DKIM on domains whose DNS it controls.

---

## 4. Live end-to-end test (run on the VPS after deploy)

With the API container up and `.env` filled, hit each endpoint and confirm the
internal alert lands in info@ and the confirmation lands in a test inbox:

```bash
API=http://localhost:4000/api    # or https://nodevant.com/api from anywhere

# CONTACT
curl -s -X POST $API/contact -H 'Content-Type: application/json' \
  -d '{"name":"Test Contact","email":"YOUR_TEST_INBOX@gmail.com","message":"deliverability test","sourcePage":"/contact"}'

# AUDIT (triggers ROI report confirmation)
curl -s -X POST $API/audit -H 'Content-Type: application/json' \
  -d '{"firstName":"Test Audit","email":"YOUR_TEST_INBOX@gmail.com","industry":"SaaS","team_size":"5","biggest_pain":"lead follow-up","hours_wasted":10,"avg_hourly_rate":"50","automation_goal":"save time"}'

# NEWSLETTER
curl -s -X POST $API/newsletter -H 'Content-Type: application/json' \
  -d '{"email":"YOUR_TEST_INBOX@gmail.com"}'

# CALL (VAPI end-of-call shape)
curl -s -X POST "$API/voice-lead" -H 'Content-Type: application/json' \
  -d '{"message":{"type":"end-of-call-report","durationSeconds":92,"customer":{"number":"+16785551234"},"phoneNumber":{"number":"+16784399321"},"transcript":"Caller asked about pricing for a roofing voice agent.","analysis":{"summary":"Pricing enquiry","structuredData":{"name":"Test Caller","email":"YOUR_TEST_INBOX@gmail.com"}}}}'

# HONEYPOT (should return success but create NO lead / NO email)
curl -s -X POST $API/contact -H 'Content-Type: application/json' \
  -d '{"name":"bot","email":"bot@x.com","message":"spam","company_website":"http://spam"}'

# BOOKING is fired by Cal.com's own webhook (BOOKING_CREATED) — test by booking a real slot.
```

For each: confirm `[PREFIX]` subject arrived at info@ (y/n) and the confirmation
arrived at the test inbox (y/n). Check the DB: `SELECT type,name,email,created_at FROM leads ORDER BY id DESC LIMIT 6;`
