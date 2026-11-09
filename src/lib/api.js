/**
 * Game Evo API client.
 *
 * Session model: the short-lived access token lives only in memory (never in
 * localStorage, where any injected script could read it). The refresh token is
 * an httpOnly cookie set by the API, so a page reload restores the session via
 * refreshSession().
 */

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(status, body) {
    super(body?.message && typeof body.message === "string" ? body.message : "Something went wrong. Please try again.");
    this.name = "ApiError";
    this.status = status;
    this.code = body?.code ?? null;
    this.details = body?.details ?? null;
    this.requestId = body?.requestId ?? null;
  }
}

let accessToken = null;
let refreshInFlight = null;
const sessionExpiredListeners = new Set();

export function onSessionExpired(listener) {
  sessionExpiredListeners.add(listener);
  return () => sessionExpiredListeners.delete(listener);
}

async function send(path, { method = "GET", body, auth = true } = {}) {
  const headers = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth && accessToken) headers.Authorization = `Bearer ${accessToken}`;

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: "include", // carries the refresh cookie on /v1/auth/* calls
    });
  } catch {
    throw new ApiError(0, {
      code: "NETWORK_ERROR",
      message: "Unable to reach Game Evo. Check your connection and try again.",
    });
  }

  if (response.status === 204) return null;
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new ApiError(response.status, data);
  return data;
}

/**
 * Single-flight: refresh tokens are single-use and rotate, so concurrent 401s
 * must share one refresh call or the API will treat the second as token theft.
 */
export function refreshSession() {
  if (!refreshInFlight) {
    refreshInFlight = send("/v1/auth/refresh", { method: "POST", auth: false })
      .then((session) => {
        accessToken = session.accessToken;
        return session;
      })
      .catch((err) => {
        accessToken = null;
        throw err;
      })
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

async function request(path, options = {}) {
  try {
    return await send(path, options);
  } catch (err) {
    const canRetry = err instanceof ApiError && err.status === 401 && options.auth !== false;
    if (!canRetry) throw err;
    try {
      await refreshSession();
    } catch {
      sessionExpiredListeners.forEach((listener) => listener());
      throw err;
    }
    // Safe to replay: game answers are idempotent per position on the server.
    return send(path, options);
  }
}

export const api = {
  requestOtp: (msisdn) => request("/v1/auth/otp/request", { method: "POST", body: { msisdn }, auth: false }),

  async verifyOtp(msisdn, code) {
    const session = await request("/v1/auth/otp/verify", { method: "POST", body: { msisdn, code }, auth: false });
    accessToken = session.accessToken;
    return session;
  },

  async logout() {
    try {
      await request("/v1/auth/logout", { method: "POST", auth: false });
    } finally {
      accessToken = null;
    }
  },

  me: () => request("/v1/me"),
  entitlement: () => request("/v1/me/entitlement"),

  gameModes: () => request("/v1/game-modes", { auth: false }),
  startGame: (modeCode) => request("/v1/games", { method: "POST", body: modeCode ? { modeCode } : {} }),
  activeGame: () => request("/v1/games/active"),
  getGame: (gameId) => request(`/v1/games/${encodeURIComponent(gameId)}`),
  submitAnswer: (gameId, position, optionId) =>
    request(`/v1/games/${encodeURIComponent(gameId)}/answers`, {
      method: "POST",
      body: optionId ? { position, optionId } : { position },
    }),

  leaderboard: (period, limit = 50) =>
    request(`/v1/leaderboards/${encodeURIComponent(period)}?limit=${limit}`, { auth: false }),
  myStanding: (period) => request(`/v1/leaderboards/${encodeURIComponent(period)}/me`),
};
