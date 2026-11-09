import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, onSessionExpired, refreshSession } from "../lib/api";

const AuthContext = createContext(null);

const ANONYMOUS = { status: "anonymous", player: null };

/**
 * Session state for the whole app. On load it tries to restore the session
 * from the refresh cookie; `status` is "loading" until that settles so guarded
 * pages don't flash the login screen for returning players.
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState({ status: "loading", player: null });

  useEffect(() => {
    let cancelled = false;
    refreshSession()
      .then(({ player }) => !cancelled && setSession({ status: "authenticated", player }))
      .catch(() => !cancelled && setSession(ANONYMOUS));
    const unsubscribe = onSessionExpired(() => setSession(ANONYMOUS));
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const verifyOtp = useCallback(async (msisdn, code) => {
    const { player } = await api.verifyOtp(msisdn, code);
    setSession({ status: "authenticated", player });
    return player;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } finally {
      setSession(ANONYMOUS);
    }
  }, []);

  const value = useMemo(
    () => ({ ...session, requestOtp: api.requestOtp, verifyOtp, logout }),
    [session, verifyOtp, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
}
