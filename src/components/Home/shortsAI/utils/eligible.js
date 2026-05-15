// Put these near top of your component file (below imports)
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { safeLocalStorage } from "../../../../utils/localStorage";

const IP_CACHE_KEY = "cached_user_ip"; // { ip, fetchedAt }
const IP_LOGS_KEY = "user_ip_logs"; // { [ip]: [timestamp, ...] }
const MAX_PER_24H = 3;
const MS_24H = 24 * 60 * 60 * 1000;

// --- Helpers ---
async function fetchPublicIP() {
  // Try cached IP first (valid for 24 hours)
  try {
    const cached = localStorage.getItem(IP_CACHE_KEY);

    // const cached = safeLocalStorage.get(IP_CACHE_KEY);
    if (cached) {
      const obj = JSON.parse(cached);
      if (obj.ip && obj.fetchedAt && Date.now() - obj.fetchedAt < MS_24H) {
        return obj.ip;
      }
    }
  } catch (e) {
    // ignore cache parse errors
  }

  // Fetch remote IP (free API). You can replace with another service if you prefer.
  const res = await fetch("https://api.ipify.org?format=json");
  if (!res.ok) throw new Error("Failed to fetch IP");
  const data = await res.json();
  const ip = data.ip;

  try {
    localStorage.setItem(
      IP_CACHE_KEY,
      JSON.stringify({ ip, fetchedAt: Date.now() }),
    );
  } catch (e) {
    // ignore storage errors
  }

  return ip;
}

function getIPLogs() {
  try {
    const raw = localStorage.getItem(IP_LOGS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveIPLogs(logs) {
  // console.log(logs);
  try {
    localStorage.setItem(IP_LOGS_KEY, JSON.stringify(logs));
  } catch (e) {
    // ignore
  }
}

function pruneRecent(logsForIp = []) {
  const now = Date.now();
  return logsForIp.filter((ts) => now - ts < MS_24H);
}

function canGenerateForIp(ip) {
  const logs = getIPLogs();
  const recent = pruneRecent(logs[ip] || []);
  return recent.length < MAX_PER_24H;
}

function recordGenerateForIp(ip) {
  const logs = getIPLogs();
  const now = Date.now();
  const existing = pruneRecent(logs[ip] || []);
  existing.push(now);
  logs[ip] = existing;
  saveIPLogs(logs);
}
export async function getNextResetTime() {
  const ip = await fetchPublicIP();
  const logs = getIPLogs();
  const recent = pruneRecent(logs[ip] || []);

  if (recent.length < MAX_PER_24H) return null;

  // सबसे पुराना टाइमस्टैम्प लें और उसमें 24 घंटे जोड़ दें
  const oldestAllowed = recent[0];
  return oldestAllowed + MS_24H;
}
export async function getUsageCount() {
  try {
    const ip = await fetchPublicIP();
    const logs = getIPLogs();
    const recent = pruneRecent(logs[ip] || []);
    return recent.length; // यह 0, 1, 2, या 3 वापस करेगा
  } catch (e) {
    // console.error("Error fetching usage count:", e);
    return 0;
  }
}
// --- Use this function instead of directly calling handleGenerate ---
// Pass in your existing handleGenerate (the one that actually creates the Short).
async function handleGenerateClick(handleGenerate, setLoading) {
  try {
    setLoading?.(true);

    // 1) get public ip (cached if possible)
    let ip;
    try {
      ip = await fetchPublicIP();
    } catch (e) {
      // If IP fetch fails, we can either block or be lenient.
      // I choose to warn user and block to avoid bypassing restriction.
      toast.error("Unable to verify IP. Try again in a moment.");
      setLoading?.(false);
      return;
    }

    // 2) check limit
    if (!canGenerateForIp(ip)) {
      toast.error(
        "Oops — you’ve hit the daily limit. This tool can be used 3 times every 24 hours and you’ve used them up. Want unlimited use right now? Upgrade to our paid plan",
      );
      setLoading?.(false);
      return;
    }

    // 3) allowed -> record and call generation
    recordGenerateForIp(ip);

    // call the actual generate (your existing function)
    // If your handleGenerate is async & handles loading states itself, adapt accordingly.
    await handleGenerate();

    // success toast (optional)
    setLoading?.(false);
  } catch (err) {
    // console.error(err);
    toast.error("Something went wrong. Try again.");
    setLoading?.(false);
  }
}
export default handleGenerateClick;
