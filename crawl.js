function normalizeURL(urlString) {
  const urlobj = new URL(urlString);
  const hostPath = `${urlobj.hostname}${urlobj.pathname}`;

  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeURL,
};
