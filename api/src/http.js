// Express 4 does not catch rejected promises from async handlers. On Node 15+
// that unhandled rejection crashes the process, so one bad CRM query takes
// the whole lead API down. guard() forwards those failures to the error
// middleware, which answers the request instead.

function guard(fn) {
  if (typeof fn !== "function" || fn.length > 3) return fn;
  return function guarded(req, res, next) {
    let ret;
    try {
      ret = fn(req, res, next);
    } catch (err) {
      next(err);
      return;
    }
    if (ret && typeof ret.then === "function") {
      ret.then(
        () => {},
        (err) => next(err)
      );
    }
  };
}

function installAsyncGuard(router) {
  for (const method of ["get", "post", "put", "patch", "delete", "all"]) {
    const orig = router[method].bind(router);
    router[method] = (path, ...handlers) => orig(path, ...handlers.map(guard));
  }
  return router;
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  const status = Number(err && (err.status || err.statusCode));
  const code = status >= 400 && status < 500 ? status : 500;
  if (code >= 500) {
    console.error("[api]", req.method, req.originalUrl, err && err.stack ? err.stack : err);
  }
  const message =
    code === 400 ? "Invalid request body" : code === 413 ? "Request too large" : "Request failed";
  res.status(code).json({ error: message });
}

module.exports = { guard, installAsyncGuard, errorHandler };
