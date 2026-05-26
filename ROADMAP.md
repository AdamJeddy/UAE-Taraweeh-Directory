# 🗺️ UAE Taraweeh Directory - Roadmap

**What's next for the project: planned features, improvements, and Phase 2 migration**

---

## 📅 Timeline Overview

### ✅ Phase 1: MVP Mobile App (Completed - Feb 2026)
**Status**: Complete and functional
- Mobile-first UI with swipeable discovery
- Audio player integration
- Location-based sorting
- Favorites system
- Search and filters
- Bilingual support (EN/AR with RTL)
- Dark/light theme toggle
- Static JSON data (3 imams)

### 🚧 Phase 1.5: Pre-Ramadan Polish (Feb 8-28, 2026)
**Status**: In progress
**Timeline**: 3 weeks before Ramadan

**Critical Priorities**:
1. **Data Collection** 🔴 URGENT
   - Recruit 20-50 imams across UAE
   - Verify recitation schedules for Ramadan 1447H
   - Collect audio samples (30-60 seconds)
   - Get GPS coordinates for all mosques
   - **Goal**: Launch with minimum 25 verified imams

2. **Audio Hosting** 🔴 URGENT
   - Set up Cloudflare R2 bucket
   - Upload and optimize audio files
   - Configure CDN URLs
   - Test playback performance
   - **Goal**: < 3s audio load time

3. **Deployment** 🟡 HIGH
   - Deploy to Cloudflare Pages
   - Configure custom domain (taraweeh.ae or similar)
   - Set up HTTPS
   - Test production build
   - **Goal**: Live URL by Feb 25, 2026

4. **Testing & QA** 🟡 HIGH
   - Test on 10+ devices (iPhone, Android, tablets)
   - Test in both languages (EN/AR)
   - Test with real UAE internet speeds
   - Accessibility audit (WCAG AA)
   - **Goal**: Zero critical bugs

5. **Marketing Content** 🟢 MEDIUM
   - Social media graphics (Instagram, Twitter/X)
   - Shareable link previews (Open Graph tags)
   - Google Form for community submissions
   - Email templates for mosque outreach
   - **Goal**: Reach 1000+ users during Ramadan

### 🔮 Phase 2: Backend & Community Features (April-May 2026)
**Status**: Planned for post-Ramadan
**Timeline**: After Ramadan 1447H ends (April 2026)

---

## 🎯 Phase 1.5 Detailed Tasks

### Data Collection & Content
**Goal**: Rich, accurate directory of UAE imams

#### 1. Imam Recruitment (0 of 50 target)
- [ ] Create Google Form for submissions
- [ ] Reach out to major mosques in Dubai
- [ ] Reach out to major mosques in Abu Dhabi
- [ ] Reach out to major mosques in Sharjah
- [ ] Reach out to major mosques in Ajman
- [ ] Reach out to major mosques in RAK
- [ ] Reach out to major mosques in Fujairah
- [ ] Reach out to major mosques in UAQ
- [ ] Post on UAE mosque WhatsApp groups
- [ ] Post on UAE Muslim Facebook groups
- [ ] Contact Islamic centers and community leaders

**Current Coverage**:
- ✅ Dubai: 2 imams
- ✅ Abu Dhabi: 1 imam
- ⏳ Sharjah: 0 imams (NEEDED)
- ⏳ Ajman: 0 imams (NEEDED)
- ⏳ RAK: 0 imams (NEEDED)
- ⏳ Fujairah: 0 imams (NEEDED)
- ⏳ UAQ: 0 imams (NEEDED)

#### 2. Audio Sample Collection (3 of 50 collected)
- [ ] Source from YouTube/SoundCloud
- [ ] Record from live broadcasts (with permission)
- [ ] Request from mosques directly
- [ ] Convert to MP3 (128kbps, mono)
- [ ] Trim to 30-60 seconds
- [ ] Normalize audio levels
- [ ] Upload to Cloudflare R2

**Audio Quality Standards**:
- Format: MP3
- Bitrate: 128kbps (good quality, reasonable size)
- Channels: Mono (smaller file size)
- Duration: 30-60 seconds
- Content: Clear Quran recitation (not lectures/khutbas)
- Size target: < 1MB per file

#### 3. Data Verification (3 of 3 verified)
- [ ] Confirm imam availability for Ramadan 1447H
- [ ] Verify GPS coordinates (Google Maps)
- [ ] Check mosque contact information
- [ ] Verify Taraweeh type (8 vs 20 rakats)
- [ ] Confirm recitation schedule (which nights)
- [ ] Get permission for audio sample usage

#### 4. Metadata Enhancement
- [ ] Add mosque photos (exterior/interior)
- [ ] Add imam profile photos (optional, with permission)
- [ ] Add parking information
- [ ] Add accessibility notes (wheelchair access, etc.)
- [ ] Add women's prayer area information
- [ ] Add contact phone numbers
- [ ] Add mosque website/social media links

---

### Technical Improvements

#### 1. Audio Infrastructure
- [ ] Set up Cloudflare R2 bucket
- [ ] Configure R2 public access
- [ ] Set up custom domain for R2 (cdn.taraweeh.ae)
- [ ] Upload audio files
- [ ] Implement audio caching headers
- [ ] Add audio loading states (spinner)
- [ ] Add audio error fallbacks
- [ ] Test on slow networks (3G simulation)

**R2 Configuration**:
```javascript
// Example R2 URL structure
https://cdn.taraweeh.ae/audio/1447/imam-1-hashimi.mp3
https://cdn.taraweeh.ae/audio/1447/imam-2-mansouri.mp3
```

#### 2. PWA Features (Progressive Web App)
- [ ] Add service worker for offline support
- [ ] Add manifest.json for "Add to Home Screen"
- [ ] Configure app icon (512x512 PNG)
- [ ] Set up offline fallback page
- [ ] Cache static assets (HTML/CSS/JS)
- [ ] Cache audio files (on play)
- [ ] Show offline indicator

**Why PWA?**
- Works offline after first visit
- Installable on home screen
- Full-screen experience
- Push notifications (Phase 2)
- 90% of native app feel

#### 3. Performance Optimizations
- [ ] Minify CSS (styles.min.css)
- [ ] Minify JavaScript (script.min.js)
- [ ] Add lazy loading for images (Phase 2)
- [ ] Optimize audio preloading strategy
- [ ] Add loading skeletons for cards
- [ ] Reduce initial JavaScript parse time
- [ ] Implement virtual scrolling for long lists

**Target Metrics**:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: 95+ (mobile)
- Audio play latency: < 2s

#### 4. SEO & Metadata
- [ ] Add Open Graph tags for social sharing
- [ ] Add Twitter Card metadata
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Implement structured data (JSON-LD)
- [ ] Optimize meta descriptions
- [ ] Add Arabic language alternate tags

**Example Open Graph**:
```html
<meta property="og:title" content="UAE Taraweeh Directory - Ramadan 1447H">
<meta property="og:description" content="Discover Quran reciters across UAE mosques">
<meta property="og:image" content="https://taraweeh.ae/og-image.jpg">
<meta property="og:url" content="https://taraweeh.ae">
```

#### 5. Analytics & Monitoring (Privacy-Friendly)
- [ ] Set up Cloudflare Web Analytics (no cookies)
- [ ] Track page views (no personal data)
- [ ] Track audio play events
- [ ] Track favorite actions
- [ ] Track search queries (aggregated)
- [ ] Track geolocation opt-in rate
- [ ] Set up error logging (Sentry or similar)

**Privacy-First Analytics**:
- No cookies or localStorage for tracking
- No personal data collection
- No third-party analytics (Google Analytics, etc.)
- Aggregate metrics only
- GDPR/PDPA compliant

---

### Testing & Quality Assurance

#### 1. Browser Testing
- [ ] Chrome 120+ (desktop & mobile)
- [ ] Safari 17+ (iOS & macOS)
- [ ] Firefox 120+ (desktop)
- [ ] Edge 120+ (desktop)
- [ ] Samsung Internet (Android)
- [ ] Opera (mobile)

#### 2. Device Testing
- [ ] iPhone 14/15 (iOS 17+)
- [ ] iPhone SE (small screen 375px)
- [ ] Samsung Galaxy S23 (Android 14)
- [ ] Google Pixel 8 (Android 14)
- [ ] iPad (tablet view)
- [ ] Samsung Galaxy Tab (tablet view)
- [ ] Desktop (1920x1080)
- [ ] Desktop (2560x1440)

#### 3. Network Testing
- [ ] Fast 5G (UAE typical)
- [ ] 4G LTE
- [ ] Slow 3G simulation
- [ ] Offline mode (PWA)
- [ ] VPN/restricted networks

#### 4. Accessibility Audit
- [ ] WCAG 2.1 Level AA compliance
- [ ] Screen reader testing (VoiceOver, TalkBack)
- [ ] Keyboard navigation
- [ ] Focus indicators
- [ ] Color contrast (4.5:1 minimum)
- [ ] Text scaling (up to 200%)
- [ ] Motion preferences (reduce-motion)

#### 5. Localization Testing
- [ ] All English text renders correctly
- [ ] All Arabic text renders correctly
- [ ] RTL layout works perfectly
- [ ] Mixed LTR/RTL content (names, addresses)
- [ ] Number formatting (English vs Arabic numerals)
- [ ] Date formatting (Gregorian vs Hijri)

---

### Marketing & Community Building

#### 1. Launch Preparation
- [ ] Create Instagram account (@taraweehuae)
- [ ] Create Twitter/X account (@taraweehuae)
- [ ] Create TikTok account (short video clips)
- [ ] Design social media graphics (Canva templates)
- [ ] Write launch announcement post
- [ ] Create video demo (1-2 minutes)
- [ ] Register domain (taraweeh.ae or taraweehuae.com)

#### 2. Community Outreach
- [ ] Email mosques with submission form
- [ ] Post in UAE Muslim WhatsApp groups
- [ ] Post in UAE Reddit (r/dubai, r/abudhabi)
- [ ] Share on UAE Muslim Facebook groups
- [ ] Partner with Islamic influencers
- [ ] Reach out to UAE Islamic podcasts
- [ ] Contact UAE Muslim YouTubers

#### 3. Content Creation
- [ ] Write blog post: "How to Find the Best Taraweeh in UAE"
- [ ] Create infographic: "UAE Taraweeh Map"
- [ ] Design shareable cards for each imam
- [ ] Create Instagram Stories template
- [ ] Write email template for mosque partners
- [ ] Create press release for local media

#### 4. Contribution System
- [ ] Google Form for submissions (public)
- [ ] Automated email confirmations
- [ ] Manual verification workflow (spreadsheet)
- [ ] Thank you emails for contributors
- [ ] Monthly contributor recognition

**Google Form Fields**:
- Imam name
- Mosque name
- Mosque address (auto GPS lookup)
- City dropdown
- Audio sample link (YouTube, SoundCloud, etc.)
- Recitation style (dropdown)
- Taraweeh type (dropdown)
- Ramadan dates leading (start-end)
- Submitter email (for follow-up)
- How did you hear about us?

---

## 🚀 Phase 2: Backend & Advanced Features

**Timeline**: Post-Ramadan (April-June 2026)
**Goal**: Scalable backend, community moderation, enhanced features

### Architecture Migration

#### 1. Cloudflare Workers + D1 Database
**Why migrate from static JSON?**
- **Scalability**: Handle 100+ imams easily
- **Real-time updates**: No redeployment for new data
- **Advanced queries**: Filter by multiple criteria efficiently
- **User submissions**: Store pending entries
- **Moderation workflow**: Approve/reject submissions

**D1 Database Schema**:
```sql
-- Imams table
CREATE TABLE imams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  mosque TEXT NOT NULL,
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  area TEXT,
  lat REAL NOT NULL,
  lng REAL NOT NULL,
  audio_url TEXT NOT NULL,
  recitation_style TEXT,
  taraweeh_type TEXT,
  recitation_start INTEGER,
  recitation_end INTEGER,
  ramadan_year INTEGER NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  additional_info TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Submissions table (pending verification)
CREATE TABLE submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  imam_name TEXT NOT NULL,
  mosque_name TEXT NOT NULL,
  city TEXT NOT NULL,
  submitter_email TEXT,
  audio_link TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  reviewed_at DATETIME,
  reviewed_by TEXT
);

-- Users table (Phase 2.5 - accounts)
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'user', -- user, moderator, admin
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Favorites table (sync across devices)
CREATE TABLE favorites (
  user_id INTEGER,
  imam_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, imam_id)
);
```

**Cloudflare Workers API**:
```javascript
// GET /api/imams - List all verified imams
// GET /api/imams/:id - Get single imam
// GET /api/imams?city=Dubai - Filter by city
// POST /api/submissions - Submit new imam
// GET /api/stats - Get coverage statistics

// Admin endpoints (Cloudflare Access protected)
// GET /api/admin/submissions - List pending submissions
// POST /api/admin/submissions/:id/approve - Approve submission
// POST /api/admin/submissions/:id/reject - Reject submission
```

#### 2. Admin Dashboard
**Features**:
- View pending submissions
- Approve/reject with one click
- Edit imam details
- Upload audio files directly
- View submission statistics
- Export data to CSV
- Bulk operations

**Tech Stack**:
- Cloudflare Pages (same domain, /admin route)
- Vanilla JS (stay consistent) or React if complexity requires
- Cloudflare Access (authentication)
- D1 database backend

**Access Control**:
- Cloudflare Access (email-based auth)
- Authorized emails only (dev.adamj@gmail.com + mods)
- No public signup
- Audit log for all actions

#### 3. Public Submission Form
**Embedded on Frontend**:
- Modern form UI matching site design
- Client-side validation
- File upload for audio (up to 5MB)
- GPS picker (map widget)
- Success confirmation page
- Email notification to submitter

**Backend Processing**:
```javascript
// Workers endpoint
async function handleSubmission(request) {
  // 1. Validate input
  // 2. Upload audio to R2
  // 3. Insert into submissions table
  // 4. Send confirmation email
  // 5. Notify admins (email/Slack)
  // 6. Return success response
}
```

---

### Enhanced Features

#### 1. Favorites Sync (Accounts)
**Problem**: Favorites lost on new device
**Solution**: Optional user accounts

**Implementation**:
- Email magic link authentication (no passwords)
- Sync favorites across devices
- Private profile (no public profile)
- Opt-in only (localStorage still works)

**Tech**:
- Cloudflare Workers
- D1 database
- Email API (Resend or SendGrid)

#### 2. Reviews & Ratings (Controversial - Consider Carefully)
**Potential Feature**: Let users rate recitations

**Arguments For**:
- Helps others find quality reciters
- Community feedback valuable

**Arguments Against**:
- Disrespectful to imams (religious sensitivity)
- Can become popularity contest
- Negative reviews may hurt feelings
- Not aligned with Islamic adab (etiquette)

**Decision**: ❌ **Not implementing**
- Alternative: "Verified by community" badge
- Let favorites count serve as indicator

#### 3. Notifications (Phase 2.5)
**Features**:
- Push notifications (PWA)
- Reminder: "Taraweeh starts in 30 mins"
- New imam near your location
- Favorite imam available tonight
- Laylat al-Qadr special notifications (27th night)

**Tech**:
- Web Push API
- Service Worker
- Cloudflare Workers (send notifications)
- Opt-in only (request permission)

#### 4. Iftar Times Integration
**Feature**: Show maghrib time alongside Taraweeh

**Implementation**:
- Integrate with prayer times API (Aladhan.com or IslamicFinder)
- City-based automatic lookup
- Countdown to iftar
- Link to full prayer times

#### 5. Mosque Photos (Phase 2.5)
**Feature**: Show mosque exterior/interior photos

**Implementation**:
- Upload to Cloudflare Images (R2 + Image Resizing)
- Automatic optimization
- Multiple sizes (thumbnail, card, full)
- Lazy loading
- Lightbox viewer

**Schema Addition**:
```sql
ALTER TABLE imams ADD COLUMN mosque_photo_url TEXT;
```

#### 6. Map View (Phase 2.5)
**Feature**: Interactive map of mosques

**Tech Stack Options**:
- Mapbox GL JS (paid, beautiful)
- Leaflet + OpenStreetMap (free, good)
- Google Maps (expensive, familiar)

**Recommendation**: Mapbox GL JS
- $5/month for 100K loads (sustainable)
- Beautiful Islamic map styles
- Fast performance in UAE region

**Features**:
- Cluster markers (multiple mosques nearby)
- Click marker → show imam card
- Filter by recitation style
- Show user location
- Navigate to mosque

---

### Content Expansion

#### 1. Ramadan 1448H (2027) Preparation
**Timeline**: January 2027
**Tasks**:
- Archive Ramadan 1447H data
- Request updated schedules from mosques
- Refresh audio samples (new recordings)
- Update verified status
- Keep historical data for reference

#### 2. Year-Round Content (Phase 3)
**Expand Beyond Taraweeh**:
- **Friday Khutbahs**: Weekly sermon schedules
- **Quran Classes**: Tajweed and memorization
- **Islamic Lectures**: Regular events at mosques
- **Qiyam al-Layl**: Late-night prayers (year-round)
- **Eid Prayers**: Eid al-Fitr and Eid al-Adha locations

**New Features Required**:
- Calendar view
- Event categories
- Recurring events
- Registration/RSVP system

---

## 🐛 Known Issues & Technical Debt

### Current Bugs (Minor)
1. **Audio player progress bar**: Slightly jerky on some devices
   - Fix: Use requestAnimationFrame instead of setInterval
2. **Countdown timer**: Shows 00:00:00 for split second on load
   - Fix: Hide until calculated
3. **Swipe gesture**: Occasionally triggers double-swipe
   - Fix: Add cooldown period (300ms)
4. **RTL layout**: Some margins not perfect in Arabic
   - Fix: Audit all directional properties

### Technical Debt
1. **No test suite**: All testing is manual
   - Solution: Add Jest unit tests (Phase 2)
   - Solution: Add Playwright E2E tests (Phase 2)
2. **Hard-coded constants**: Ramadan dates, cities, colors
   - Solution: Move to config file
3. **No build process**: Raw files deployed
   - Solution: Add Vite or esbuild (minification, bundling)
4. **Large script.js**: 1199 lines in one file
   - Solution: Split into modules (Phase 2)
5. **No error boundaries**: App crashes on JS error
   - Solution: Add global error handler with fallback UI

### Performance Bottlenecks (Future)
1. **Directory rendering**: Slow with 100+ imams
   - Solution: Virtual scrolling or pagination
2. **Audio preloading**: Can spike bandwidth
   - Solution: Smart preloading (next card only)
3. **Distance calculation**: O(n) on every location change
   - Solution: Cache calculations, incremental updates

---

## 📊 Success Metrics

### Phase 1.5 Goals (Before Ramadan)
- [ ] **Imams**: 25+ verified entries
- [ ] **Cities**: All 7 UAE emirates represented
- [ ] **Audio**: All samples < 3s load time
- [ ] **Performance**: Lighthouse score 95+
- [ ] **Accessibility**: WCAG AA compliance
- [ ] **Languages**: 100% UI translated (EN/AR)

### Phase 2 Goals (Post-Ramadan)
- [ ] **Users**: 5,000+ unique visitors during Ramadan
- [ ] **Engagement**: 50%+ listen to at least one audio sample
- [ ] **Favorites**: 30%+ save at least one imam
- [ ] **Submissions**: 20+ community submissions
- [ ] **Coverage**: 50+ verified imams
- [ ] **Retention**: 500+ users add to home screen (PWA)

### Phase 3 Goals (2027)
- [ ] **Users**: 25,000+ during Ramadan 1448H
- [ ] **Imams**: 200+ verified entries
- [ ] **Year-round**: Expand to Friday prayers and events
- [ ] **Mobile App**: Native iOS/Android (if justified)
- [ ] **Revenue**: Sustainable (donations or ethical sponsorships)

---

## 💰 Cost Estimation (Phase 2)

### Cloudflare Services (Free Tier Generally Sufficient)

**Cloudflare Pages**:
- Free: 500 builds/month, unlimited requests
- Paid: $20/month for 5,000 builds (not needed initially)

**Cloudflare R2** (Audio Storage):
- Free: 10GB storage, 10M reads/month
- Estimation: 100 imams × 1MB audio = 100MB (well within free tier)
- Paid: $0.015/GB/month (negligible)

**Cloudflare D1** (Database):
- Free: 5GB storage, 5M reads/day
- Estimation: 100 imams + 1,000 users = < 1MB (well within free tier)
- Paid: $5/month for 10GB (not needed initially)

**Cloudflare Workers**:
- Free: 100,000 requests/day
- Estimation: 5,000 users × 10 requests = 50,000/day during Ramadan peak
- Paid: $5/month for 10M requests (may need during Ramadan)

**Total Cloudflare**: **$0-10/month** (likely free tier sufficient)

### Third-Party Services

**Domain Name** (taraweeh.ae):
- .ae domain: ~$50/year (one-time + annual renewal)
- Alternative: taraweehuae.com (~$15/year)

**Email Service** (Resend or SendGrid):
- Free: 100 emails/day
- Paid: $20/month for 50,000 emails (if needed for notifications)

**Error Monitoring** (Sentry):
- Free: 5,000 events/month
- Paid: $26/month for 50,000 events (optional)

**Total Monthly Cost**: **$5-30/month** (mostly optional services)

### Sustainability
- **Donations**: Add "Buy me a coffee" button
- **Sponsorships**: Ethical mosque/Islamic business sponsors (no ads)
- **Grants**: Apply for Islamic tech/community grants

---

## 🎯 Priority Matrix

### Critical (Must Have Before Launch)
1. ✅ Bilingual support (EN/AR) - COMPLETE
2. 🟡 25+ verified imams - IN PROGRESS (3/25)
3. 🔴 Audio hosting on R2 - NOT STARTED
4. 🔴 Deploy to Cloudflare Pages - NOT STARTED
5. 🔴 Mobile device testing - NOT STARTED

### High Priority (Should Have)
1. 🔴 PWA manifest and service worker
2. 🔴 SEO metadata (Open Graph)
3. 🔴 Google Form for submissions
4. 🔴 Analytics setup (privacy-friendly)
5. 🟡 Performance optimizations

### Medium Priority (Nice to Have)
1. Admin dashboard (Phase 2)
2. Map view (Phase 2)
3. Iftar times integration
4. Mosque photos
5. Push notifications

### Low Priority (Future)
1. User accounts
2. Favorites sync
3. Year-round content
4. Native mobile apps
5. Internationalization (beyond EN/AR)

---

## 🚦 Current Status Summary

### ✅ Completed
- Mobile-first responsive design
- Swipeable card discovery
- Audio player with controls
- Location-based sorting
- Search and advanced filters
- Favorites system (localStorage)
- Dark/light theme toggle
- Ramadan countdown timer
- Bilingual support (EN/AR with RTL)
- Deep linking
- Semantic HTML & accessibility basics

### 🟡 In Progress
- Data collection (3/25 imams)
- Testing on various devices
- SEO optimization
- Marketing preparation

### 🔴 Not Started
- Audio hosting on CDN
- Production deployment
- PWA implementation
- Admin dashboard
- Backend migration to D1
- Community submission system
- Marketing launch

---

## 📞 Questions & Decisions Needed

### Open Questions
1. **Domain name**: taraweeh.ae (pricey) or taraweehuae.com (cheaper)?
2. **Moderation**: Manual review or automated approval for submissions?
3. **Scope**: Keep Taraweeh-only or expand to year-round prayers?
4. **Revenue**: Free forever or sustainable funding model?
5. **Branding**: Logo and visual identity needed?

### Pending Decisions
- [ ] Choose hosting domain
- [ ] Define submission approval workflow
- [ ] Set up social media accounts
- [ ] Create content calendar for launch
- [ ] Decide on analytics tool (Cloudflare Web Analytics vs alternatives)

---

## 🙌 How You Can Help

### For Contributors
- Submit imam information for your local mosque
- Share audio samples (with permission)
- Test the app on your device
- Translate additional languages (Urdu, Hindi, Malayalam)
- Report bugs or suggest features

### For Mosques
- Provide official Taraweeh schedules
- Share imam audio samples
- Promote the directory to your community
- Verify accuracy of your mosque's information

### For Developers
- Review code and suggest improvements
- Help with Phase 2 backend implementation
- Contribute to testing and QA
- Build integrations (prayer times, maps, etc.)

---

*This roadmap is a living document and will be updated as the project evolves.*

**Last Updated**: February 8, 2026
**Next Review**: Post-Ramadan (April 2026)
