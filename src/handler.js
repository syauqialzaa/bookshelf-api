const books = require('./books/books')
const responseData = require('./response-data')

const {
  validateStringProperties,
  validateNumberProperties,
  validateBooleanProperties
} = require('./validation')

const {
  createNewBook,
  filterBooksByName,
  filterBooksByReading,
  filterBooksByFinished,
  mainDataBooks,
  updateBookById,
  destroyBookById
} = require('./books/book-utils')

const addBookHandler = (request, h) => {
  const payload = request.payload

  // error user tidak menginputkan nama buku
  if (!payload.name) {
    const response = h.response(
      responseData('fail', 'Gagal menambahkan buku. Mohon isi nama buku')
    )
    response.code(400)
    return response
  }

  // cek string properties
  const stringValidationResult = validateStringProperties(['name', 'author', 'summary', 'publisher'], payload, h)
  if (stringValidationResult) {
    return stringValidationResult
  }

  // cek number properties
  const numberValidationResult = validateNumberProperties(['year', 'pageCount', 'readPage'], payload, h)
  if (numberValidationResult) {
    return numberValidationResult
  }

  // cek boolean properties
  const booleanValidationResult = validateBooleanProperties(['reading'], payload, h)
  if (booleanValidationResult) {
    return booleanValidationResult
  }

  // error ketika readPage lebih besar dari pageCount
  if (payload.readPage > payload.pageCount) {
    const response = h.response(
      responseData('fail', 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount')
    )
    response.code(400)
    return response
  }

  const createBookResult = createNewBook(payload, books)
  if (createBookResult.isSuccess) {
    const response = h.response(
      responseData('success', 'Buku berhasil ditambahkan', { bookId: createBookResult.bookId })
    )
    response.code(201)
    return response
  }

  const response = h.response(
    responseData('fail', 'Buku gagal ditambahkan')
  )
  response.code(500)
  return response
}

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query

  // return success meskipun data buku 0
  if (books.length === 0) {
    const response = h.response(
      responseData('success', null, { books })
    )
    response.code(200)
    return response
  }

  // get data buku berdasarkan query user (by name, by reading, by finished)
  let filteredBooks = books

  if (name) {
    filteredBooks = filterBooksByName(filteredBooks, name)
  }
  if (reading !== undefined) {
    filteredBooks = filterBooksByReading(filteredBooks, reading)
  }
  if (finished !== undefined) {
    filteredBooks = filterBooksByFinished(filteredBooks, finished)
  }

  // ambil data buku hanya dengan properti id, name, publihser
  const fetchMainDataBook = mainDataBooks(filteredBooks)

  const response = h.response(
    responseData('success', null, { books: fetchMainDataBook })
  )
  response.code(200)
  return response
}

const getBookByIdHandler = (request, h) => {
  // cek data buku dengan id request.params
  const { id } = request.params
  const book = books.filter((b) => b.id === id)[0]

  if (book !== undefined) {
    return responseData('success', null, { book })
  }

  const response = h.response(
    responseData('fail', 'Buku tidak ditemukan')
  )
  response.code(404)
  return response
}

const editBookByIdHandler = (request, h) => {
  // cek data buku dengan id request.params
  const { id } = request.params
  const payload = request.payload

  // error user edit nama buku dengan data kosong
  if (!payload.name) {
    const response = h.response(
      responseData('fail', 'Gagal memperbarui buku. Mohon isi nama buku')
    )
    response.code(400)
    return response
  }

  // cek string properties
  const stringValidationResult = validateStringProperties(['name', 'author', 'summary', 'publisher'], payload, h)
  if (stringValidationResult) {
    return stringValidationResult
  }

  // cek number properties
  const numberValidationResult = validateNumberProperties(['year', 'pageCount', 'readPage'], payload, h)
  if (numberValidationResult) {
    return numberValidationResult
  }

  // cek boolean properties
  const booleanValidationResult = validateBooleanProperties(['reading'], payload, h)
  if (booleanValidationResult) {
    return booleanValidationResult
  }

  // error ketika readPage lebih besar dari pageCount
  if (payload.readPage > payload.pageCount) {
    const response = h.response(
      responseData('fail', 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount')
    )
    response.code(400)
    return response
  }

  if (updateBookById(payload, books, id)) {
    const response = h.response(
      responseData('success', 'Buku berhasil diperbarui')
    )
    response.code(200)
    return response
  }

  const response = h.response(
    responseData('fail', 'Gagal memperbarui buku. Id tidak ditemukan')
  )
  response.code(404)
  return response
}

const deleteBookByIdHandler = (request, h) => {
  //  cek data buku dengan id request.params
  const { id } = request.params

  if (destroyBookById(books, id)) {
    const response = h.response(
      responseData('success', 'Buku berhasil dihapus')
    )
    response.code(200)
    return response
  }

  const response = h.response(
    responseData('fail', 'Buku gagal dihapus. Id tidak ditemukan')
  )
  response.code(404)
  return response
}

const notFoundEndpointHandler = (request, h) => {
  request = null
  const response = h.response(
    responseData('not-found', 'Endpoint tidak tersedia')
  )
  response.code(404)
  return response
}

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
  notFoundEndpointHandler
}
