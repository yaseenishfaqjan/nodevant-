// Counts background work (lead emails) so a SIGTERM can wait for it to
// finish instead of cutting the socket mid-send.

function createTracker() {
  let pending = 0;

  function track(promise) {
    pending += 1;
    return Promise.resolve(promise).finally(() => {
      pending -= 1;
    });
  }

  function count() {
    return pending;
  }

  async function whenIdle(timeoutMs = 8000) {
    const start = Date.now();
    while (pending > 0 && Date.now() - start < timeoutMs) {
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    return pending === 0;
  }

  return { track, count, whenIdle };
}

const inflight = createTracker();

module.exports = inflight;
module.exports.createTracker = createTracker;
