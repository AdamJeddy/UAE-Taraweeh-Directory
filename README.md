# UAE Taraweeh Directory 🕌

**Discover Quran reciters across UAE mosques — Ramadan 1447H (2026)**

A bilingual mobile-first web app helping UAE Muslims discover imams leading Taraweeh prayers during Ramadan.

![Status](https://img.shields.io/badge/Status-Pre--Launch-blue)
![Ramadan](https://img.shields.io/badge/Ramadan%201447H-March%202026-green)
![Languages](https://img.shields.io/badge/Languages-EN%20%7C%20AR-orange)

---

## ✨ Features

- **🎴 Swipeable Discovery** — Tinder-style cards with audio previews
- **🎵 Audio Player** — Listen to Quran recitation samples
- **📍 Location-Aware** — Find nearest mosques with GPS
- **💛 Favorites** — Save your preferred imams locally
- **🔍 Search & Filter** — By city, recitation style, Taraweeh type
- **⏱️ Countdown Timer** — Days until Ramadan or current day
- **🌙 Dark/Light Mode** — Toggle between Ramadan-themed palettes
- **🌐 Bilingual** — Full English/Arabic support with RTL layout
- **🔗 Shareable Links** — Direct links to specific imams
- **📱 Mobile-First** — Optimized for touch and small screens

---

## 🚀 Quick Start

### View Live (Coming Soon)
**URL**: taraweeh.ae (deploying by Feb 25, 2026)

### Run Locally
```bash
# Clone repository
git clone https://github.com/yourusername/UAE-Taraweeh-Directory.git
cd UAE-Taraweeh-Directory

# Serve locally (choose one)
python -m http.server 8080
# or
npx serve

# Open browser
http://localhost:8080
```

**No build step required** — Edit HTML/CSS/JS and refresh!

---

## 📖 Documentation

- **[DOCUMENTATION.md](DOCUMENTATION.md)** — Complete technical guide, design decisions, user feedback journey, code architecture (55 pages)
- **[ROADMAP.md](ROADMAP.md)** — What's next, Phase 2 plans, pending features, success metrics (30 pages)

---

## 🎨 Design Philosophy

### User Feedback Journey
This project evolved through continuous user feedback:

1. **"Make it Ramadan-themed"** → Complete mobile-first rebuild
2. **"Feels too AI, colors don't match"** → Warm traditional palette (gold, teal, cream)
3. **"Make swipe more intuitive"** → Arrow navigation + card counter + clear instructions
4. **"Arabic users need support"** → Full bilingual system with RTL layout

### Color Palette
**Dark Mode** (Default):
- Deep charcoal (#0f1419) + warm gold (#d4a574) + traditional teal (#3d9a8f)

**Light Mode**:
- Warm cream (#f5ebe0) + dark brown text + consistent gold/teal accents

**Philosophy**: Warm, traditional, respectful — not generic AI-purple.

---

## 🤝 Contributing

### Add Imam Information
**3 Ways to Contribute:**

1. **Google Form** (Coming Soon)
2. **Email**: [dev.adamj@gmail.com](mailto:dev.adamj@gmail.com)
3. **Pull Request**: Edit `imams_data.json` directly

### What We Need
- Imam name and mosque
- GPS coordinates (Google Maps link)
- Audio sample (30-60 seconds)
- Recitation style ("Emotional", "Slow and calm")
- Taraweeh type (8 or 20 rakats)
- Ramadan dates leading (1-30)

**Current Coverage**: 3 imams (2 Dubai, 1 Abu Dhabi) — **Need 25+ for launch!**

---

## 📊 Data Structure

```json
{
  "id": 1,
  "name": "Sheikh Mohammed Al-Hashimi",
  "mosque": "Grand Mosque",
  "location": "Dubai Marina, Dubai",
  "city": "Dubai",
  "area": "Dubai Marina",
  "coordinates": { "lat": 25.0850, "lng": 55.1420 },
  "audioSample": "https://r2.taraweeh.ae/hashimi-sample.mp3",
  "recitationStyle": "Emotional",
  "taraweehType": "20 rakats",
  "recitationStart": 1,
  "recitationEnd": 30,
  "ramadanYear": 1447,
  "verified": true,
  "additionalInfo": "Known for beautiful Qunut prayers"
}
```

---

## 🏗️ Tech Stack

**Frontend**:
- Vanilla HTML5/CSS3/JavaScript (ES6+)
- No frameworks, no build step, < 50KB total
- Mobile-first with progressive enhancement

**Hosting** (Phase 1):
- Static JSON data (3 imams)
- Cloudflare Pages (deploying soon)
- Cloudflare R2 for audio CDN

**Future** (Phase 2 — Post-Ramadan):
- Cloudflare Workers + D1 database
- Admin dashboard for moderation
- Public submission form
- PWA (offline support, home screen install)

---

## 🗓️ Timeline

- **Feb 8, 2026**: Current development (MVP complete)
- **Feb 25, 2026**: Launch target (production deployment)
- **Mar 1, 2026**: Ramadan 1447H begins (3 weeks away!)
- **Mar 30, 2026**: Ramadan ends
- **Apr-May 2026**: Phase 2 backend migration

---

## 📈 Project Status

### ✅ Phase 1 Complete
- [x] Mobile-first UI
- [x] Swipeable discovery
- [x] Audio player
- [x] Location features
- [x] Search & filters
- [x] Favorites system
- [x] Bilingual support (EN/AR with RTL)
- [x] Dark/light themes

### 🎯 Pre-Launch Priorities (Next 3 Weeks)
- [ ] Collect 25+ verified imams
- [ ] Upload audio to Cloudflare R2
- [ ] Deploy to production (taraweeh.ae)
- [ ] Test on 10+ devices
- [ ] Create social media presence

### 🔮 Phase 2 Planned (Post-Ramadan)
- [ ] Backend migration to D1 database
- [ ] Admin moderation dashboard
- [ ] Public submission form
- [ ] PWA features (offline, install)
- [ ] Enhanced analytics

---

## 🧪 Testing

### Browser Support
- ✅ Chrome 120+ (desktop & mobile)
- ✅ Safari 17+ (iOS & macOS)
- ✅ Firefox 120+
- ✅ Samsung Internet

### Device Testing
- ✅ iPhone (375px small screens)
- ✅ Android phones (390px medium)
- ⏳ Tablets (768px) — Needs testing
- ⏳ Desktop (1024px+) — Needs testing

**Help us test!** Try the app on your device and report issues.

---

## 🙏 Acknowledgments

Built with love for the UAE Muslim community through continuous user feedback and iteration.

**Special Thanks**:
- Community members who provided feedback on design
- Early testers who identified UX issues
- Imams and mosques sharing information

---

## 📜 License

**MIT License** — Free to use, modify, and distribute with attribution.

This is a community project for the benefit of Muslims in the UAE during the blessed month of Ramadan.

---

## 📞 Contact

- **Email**: [dev.adamj@gmail.com](mailto:dev.adamj@gmail.com)
- **GitHub Issues**: Bug reports and feature requests
- **Social Media**: Coming soon (@taraweehuae)

---

**Ramadan Kareem | رمضان كريم**

*May Allah accept our fasting and prayers during Ramadan 1447H.*
