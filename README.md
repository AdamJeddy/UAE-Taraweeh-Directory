# UAE Taraweeh Directory 🕌

**Discover Quran reciters across UAE mosques — Ramadan 1447H (2026)**

A community-driven, mobile-first web app to discover imams leading Taraweeh prayers in the UAE during Ramadan 2026.

## Features

- **Swipeable Imam Discovery** — Tinder-style cards to discover imams with audio previews
- **Audio Player** — Listen to Quran recitation samples with a persistent bottom bar player
- **Location-Aware** — Find the nearest mosques with geolocation support
- **Search & Filter** — Search by imam name, mosque, city, recitation style, or Taraweeh type
- **Favorites** — Save your favorite imams (stored locally)
- **Ramadan Countdown** — Countdown timer before Ramadan, daily tracker during Ramadan
- **Dark/Light Mode** — Toggle between nighttime and daytime themes
- **Google Maps Integration** — Open any mosque directly in Google Maps
- **Deep Links** — Share specific imams via `#imam-{id}` URL hash
- **Fully Static** — No backend required, hosted on Cloudflare Pages

## Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript (no frameworks)
- **Hosting**: Cloudflare Pages
- **Audio Storage**: Cloudflare R2
- **Data**: Static JSON (migrating to Cloudflare Workers + D1)

## Contributing

Help us grow! Submit imam information via:

1. **Google Form**: [forms.gle/jReWReoKQyH9W3HF8](https://forms.gle/jReWReoKQyH9W3HF8)
2. **Email**: [dev.adamj@gmail.com](mailto:dev.adamj@gmail.com)
3. **GitHub**: Open an issue or submit a PR

### Data Structure

Each imam entry in `imams_data.json` includes:

```json
{
    "id": 1,
    "name": "Imam Name",
    "mosque": "Mosque Name",
    "location": "Area, City",
    "city": "City",
    "area": "Area",
    "coordinates": { "lat": 25.0, "lng": 55.0 },
    "audioSample": "https://...",
    "recitationStyle": "Emotional",
    "taraweehType": "8 rakats",
    "recitationStart": 1,
    "recitationEnd": 30,
    "verified": true,
    "ramadanYear": "1447H"
}
```

## License

Open source — community project for the benefit of the Muslim community in the UAE.

---

Ramadan Kareem! 🌙
