export function initAnalytics() {
  // Placeholder init: attach a global dataLayer for future analytics integrations
  try {
    (window as any).dataLayer = (window as any).dataLayer || [];
  } catch {}
}

export function trackEvent(name: string, props: Record<string, any> = {}) {
  try {
    const payload = { event: name, ...props, ts: Date.now() };
    // Push to dataLayer (for GTM) and console for local dev
    try { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push(payload); } catch {}
    // Minimal remote: send to /analytics endpoint if available (no-op in this repo)
    if (typeof fetch === "function") {
      fetch("/analytics", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) }).catch(()=>{});
    }
    // console log for developer visibility
    // eslint-disable-next-line no-console
    console.log("analytics:", payload);
  } catch (e) { }
}

export default { initAnalytics, trackEvent };
