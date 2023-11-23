const responseData = (status, message, data = null) => {
  if (!message) {
    return { status, data }
  }
  if (!data) {
    return { status, message }
  }
  return { status, message, data }
}

module.exports = responseData
