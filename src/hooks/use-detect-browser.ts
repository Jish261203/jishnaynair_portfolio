import { useState, useEffect } from "react";

export default function useDetectBrowser() {
  const [browserName, setBrowserName] = useState("");

  useEffect(() => {

    const ua = navigator.userAgent;
    let detected = "unknown";

    if (ua.includes("Firefox")) {
      detected = "Firefox";
    } else if (ua.includes("SamsungBrowser")) {
      detected = "Samsung Internet";
    } else if (ua.includes("Opera") || ua.includes("OPR")) {
      detected = "Opera";
    } else if (ua.includes("Trident")) {
      detected = "IE";
    } else if (ua.includes("Edg")) {
      // Modern Chromium-based Edge uses "Edg/"
      detected = "Edge";
    } else if (ua.includes("Chrome")) {
      detected = "Chrome";
    } else if (ua.includes("Safari")) {
      detected = "Safari";
    }

    setBrowserName(detected);
  }, []);

  return browserName;
}