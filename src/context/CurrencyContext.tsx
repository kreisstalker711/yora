"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { CurrencyCode } from "@/src/lib/currency";

export type Region = "IN" | "INTL";

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  region: Region;
  setRegion: (region: Region) => void;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

const CURRENCY_KEY = "yora_currency";
const REGION_KEY = "yora_region";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("INR");
  const [region, setRegionState] = useState<Region>("IN");

  useEffect(() => {
    const storedCurrency = localStorage.getItem(CURRENCY_KEY) as CurrencyCode | null;
    if (storedCurrency === "INR" || storedCurrency === "USD") setCurrencyState(storedCurrency);

    const storedRegion = localStorage.getItem(REGION_KEY) as Region | null;
    if (storedRegion === "IN" || storedRegion === "INTL") setRegionState(storedRegion);

    const onStorage = (e: StorageEvent) => {
      if (e.key === CURRENCY_KEY && (e.newValue === "INR" || e.newValue === "USD")) {
        setCurrencyState(e.newValue);
      }
      if (e.key === REGION_KEY && (e.newValue === "IN" || e.newValue === "INTL")) {
        setRegionState(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setCurrency = (next: CurrencyCode) => {
    setCurrencyState(next);
    localStorage.setItem(CURRENCY_KEY, next);
  };

  const setRegion = (next: Region) => {
    setRegionState(next);
    localStorage.setItem(REGION_KEY, next);
    setCurrency(next === "IN" ? "INR" : "USD");
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, region, setRegion }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
