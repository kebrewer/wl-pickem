import couplesData from "../../json/couples.json";

const SESSION_KEY = "couples_data";

let memoryCache = null;
let inFlightPromise = null;

export async function getCouplesData() {
  // 1️⃣ Return from in-memory cache (fastest)
  if (memoryCache) {
    return memoryCache;
  }

  // 2️⃣ Attempt to read from sessionStorage
  const stored = sessionStorage.getItem(SESSION_KEY);
  if (stored) {
    try {
      memoryCache = JSON.parse(stored);
      return memoryCache;
    } catch (e) {
      console.warn("Invalid session cache, clearing...");
      sessionStorage.removeItem(SESSION_KEY);
    }
  }

  // 3️⃣ If a fetch is already running, await it
  if (inFlightPromise) {
    return inFlightPromise;
  }

  // 4️⃣ Load the build-bundled data and store the result
  inFlightPromise = Promise.resolve(couplesData)
    .then(data => {
      memoryCache = data;
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
      return data;
    })
    .finally(() => {
      inFlightPromise = null;
    });

  return inFlightPromise;
}


