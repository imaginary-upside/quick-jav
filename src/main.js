"use strict";

async function search(code) {
  const res = await fetch("https://sukebei.nyaa.si/?q=" + code);
  const body = await res.text();
  const frag = document.createRange().createContextualFragment(body);

  return Array
    .from(frag.querySelectorAll(".torrent-list tbody tr"))
    .map(n => {
      return {
        name: n.querySelector("td:nth-child(2)").innerText.trim(),
        magnet: n.querySelector("td:nth-child(3) a:nth-child(2)").getAttribute("href"),
        size: n.querySelector("td:nth-child(4)").innerText,
        date: n.querySelector("td:nth-child(5)").innerText,
        seeders: n.querySelector("td:nth-child(6)").innerText,
        leechers: n.querySelector("td:nth-child(7)").innerText,
        completed: parseInt(n.querySelector("td:nth-child(8)").innerText)
      };
    })
    .sort((l, r) => l["completed"] < r["completed"]);
}

function createElement(str, parent) {
  const frag = document.createRange().createContextualFragment(str);
  parent.appendChild(frag);
  return parent.lastElementChild;
}

function addTorrent(torrentsDoc, torrent) {
  const tbody = torrentsDoc.querySelector("tbody")
  const range = document.createRange();
  range.selectNodeContents(tbody);

  const torrentStr = `
    <tr>
      <td>${torrent["name"].substring(0, 25)}</td>
      <td><a href="${torrent["magnet"]}">Link</a></td>
      <td>${torrent["size"]}</td>
      <td>${torrent["date"]}</td>
      <td>${torrent["seeders"]}</td>
      <td>${torrent["leechers"]}</td>
      <td>${torrent["completed"]}</td>
    </tr>
  `;
  const row = range.createContextualFragment(torrentStr);
  tbody.appendChild(row);
}

(async function() {
  const code = document
    .querySelector(".product-details dl:nth-child(2) dd:nth-of-type(3)")
    .innerText;

  const torrentsStr = `
    <table class="qj-torrents">
      <thead>
        <tr>
          <th>Name</th>
          <th>Magnet</th>
          <th>Size</th>
          <th>Date</th>
          <th>Seeders</th>
          <th>Leechers</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;
  let torrentsDoc = createElement(
    torrentsStr,
    document.querySelector(".product-gallery")
  );

  search(code).then(torrents => {
    torrents.forEach(torrent => {
      addTorrent(torrentsDoc, torrent);
    })
  });
})();
