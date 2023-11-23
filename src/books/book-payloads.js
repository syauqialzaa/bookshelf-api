const bookPayloads = payload => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = payload

  return {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  }
}

module.exports = bookPayloads
