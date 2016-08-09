const html = require('choo/html')

module.exports = (state, prev, send) => html`
  <table class="table-striped">
    <thead>
      <tr>
        <th>Title</th>
        <th>Artist</th>
        <th>Album</th>
      </tr>
    </thead>
    <tbody>${renderList(state)}</tbody>
  </table>
`

function renderList (state) {
  let { files, search} = state.library
  let list = sortList(files)

  if (search) list = filterList(list, search)

  return list.map(meta => {
    return html`
      <tr>
        <td>${meta.title}</td>
        <td>${meta.artist}</td>
        <td>${meta.album}</td>
      </tr>
    `
  })
}

function sortList (files) {
  return files.sort((a, b) => {
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1
    return 0
  })
}

function filterList (list, search) {
  return list.filter(meta => {
    var yep = Object.keys(meta)
      .map(i => (meta[i] + '').toLowerCase())
      .filter(s => s.includes(search.toLowerCase()))
      .length > 0

    if (yep) return meta
    return false
  })
}
