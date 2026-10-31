// Fixed-window counter stored in memory. prune() drops expired keys so a
// long-lived process can't accumulate one entry per client IP forever.

function pruneHits(map, windowMs, now = Date.now()) {
  for (const [key, hits] of map) {
    const live = hits.filter((t) => now - t < windowMs);
    if (live.length) map.set(key, live);
    else map.delete(key);
  }
  return map;
}

function createLimiter({ windowMs, max }) {
  const hits = new Map();

  function check(key, now = Date.now()) {
    const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      hits.set(key, recent);
      const resetAt = recent[0] + windowMs;
      return {
        limited: true,
        retryAfterSeconds: Math.max(1, Math.ceil((resetAt - now) / 1000)),
        reset: Math.ceil(resetAt / 1000),
      };
    }
    recent.push(now);
    hits.set(key, recent);
    return { limited: false };
  }

  function prune(now = Date.now()) {
    return pruneHits(hits, windowMs, now);
  }

  return { hits, check, prune };
}

module.exports = { pruneHits, createLimiter };
