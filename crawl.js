const { JSDOM } = require("jsdom");

async function crawlPage(currentURL) {
  console.log(`crawling ${currentURL}`);
  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(`Got HTTP error, status code: ${resp.status}`);
      return;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`Got non-html response: ${contentType}`);
      return;
    }
    console.log(await resp.text());
  } catch (err) {
    console.log(err.message);
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      urls.push(`${baseURL}${linkElement.href}`);
    } else {
      urls.push(linkElement.href);
    }
  }
  return urls;
}

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
  getURLsFromHTML,
  crawlPage,
};
