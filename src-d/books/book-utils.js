const { nanoid } = require('nanoid')
const bookPayloads = require('./book-payloads')

//  POST
const createNewBook = (payload, books) => {
  const getPayload = bookPayloads(payload)

  const id = nanoid(16)
  const finished = getPayload.pageCount === getPayload.readPage
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const newBook = {
    id,
    name: getPayload.name,
    year: getPayload.year,
    author: getPayload.author,
    summary: getPayload.summary,
    publisher: getPayload.publisher,
    pageCount: getPayload.pageCount,
    readPage: getPayload.readPage,
    finished,
    reading: getPayload.reading,
    insertedAt,
    updatedAt
  }

  books.push(newBook)
  const isSuccess = books.filter((book) => book.id === newBook.id).length > 0

  return { isSuccess, bookId: newBook.id }
}

// GET ALL
const filterBooksByName = (books, name) => {
  const lowercaseName = name.toLowerCase()
  return books.filter((book) => book.name.toLowerCase().includes(lowercaseName))
}

const filterBooksByReading = (books, reading) => {
  return books.filter((book) => Number(book.reading) === Number(reading))
}

const filterBooksByFinished = (books, finished) => {
  return books.filter((book) => Number(book.finished) === Number(finished))
}

const mainDataBooks = books => {
  return books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher
  }))
}

// PUT
const updateBookById = (payload, books, id) => {
  const getPayload = bookPayloads(payload)

  const updatedAt = new Date().toISOString()
  const index = books.findIndex((book) => book.id === id)

  // cek apakah data buku ada sesuai dengan id
  if (index !== -1) {
    books[index] = {
      ...books[index],
      ...getPayload,
      updatedAt
    }
    return true
  }

  return false
}

// DELETE
const destroyBookById = (books, id) => {
  const index = books.findIndex((book) => book.id === id)

  // cek apakah data buku ada sesuai dengan id
  if (index !== -1) {
    books.splice(index, 1)
    return true
  }

  return false
}

module.exports = {
  createNewBook,
  filterBooksByName,
  filterBooksByReading,
  filterBooksByFinished,
  mainDataBooks,
  updateBookById,
  destroyBookById
}
