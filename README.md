# SWStarter

**SWStarter** is a fullstack Star Wars search app powered by Expo Router and Node.js. It allows users to search for characters and films using the [https://swapi.tech](https://swapi.tech) API. The app includes a fully designed mobile interface and a backend that computes usage statistics every 5 minutes.

---

## 🚀 Technologies

- **Frontend**: Expo Router (React Native)
- **Backend**: Node.js + Express
- **Stats Engine**: in-memory counter with `setInterval`
- **UI Style**: Matches Zeplin designs

---

## 📦 Project Structure

```
SWStarter/
├── backend/             # Express server + search logic + stats engine
│   ├── src/
│   │   ├── index.js     # Main backend entry
│   │   ├── search.js    # Query handlers for people/films
│   │   └── stats.js     # Stats collection & periodic refresh
│   ├── Dockerfile
│   └── package.json
│
├── mobile-app/          # Expo app with routing and views
│   ├── app/
│   │   ├── index.tsx
│   │   ├── results.tsx
│   │   ├── details.tsx
│   │   └── _layout.tsx
│   └── package.json
└── README.md
```

---

## 🧪 How to Run

### Requirements
- Node.js 18+
- Docker
- Expo CLI (`npm install -g expo-cli`)

### 1. Start Backend

```bash
docker-compose up --build
```

This launches the API server on `http://localhost:3001`.

### 2. Start Mobile App

In a separate terminal:

```bash
cd mobile-app
npm install
npm run start
```

Then press `i` for iOS simulator or `a` for Android.

> 💡 If the mobile app runs on a simulator, ensure `localhost` resolves correctly. Replace `localhost` with your local IP if needed in `results.tsx`.

---

## 🔁 `/search` Endpoint

```
GET /search?name=Yoda&type=people
```

- `type` can be `people` or `movies`
- Internally proxies to `https://swapi.tech/api/{type}?name={name}`
- Returns results in a flattened format under `properties`

---

## 📊 `/stats` Endpoint

```
GET /stats
```

Example:

```json
{
  "topQueries": [
    { "term": "Yoda", "count": 8, "percentage": 26.7 },
    ...
  ],
  "averageDurationMs": 512,
  "hourlyDistribution": {
    "14": 5,
    "15": 8,
    ...
  }
}
```

- Stats update every 5 minutes
- Uses in-memory queue (no persistent DB)

---

## ✅ Features

- Search people and movies
- View character or film details
- Navigate with Expo Router
- Backend stats with top queries, average time, hourly hits

---

## 🧪 QA Checklist

✔️ Mobile app runs on simulator  
✔️ Backend served via Docker  
✔️ `/stats` endpoint verified  
✔️ Ready for manual test on other devices

---

## 📬 Contact

Built as a technical take-home challenge for LawnStarter.