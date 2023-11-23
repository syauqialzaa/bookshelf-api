const responseData = require('./response-data')

const validateStringProperties = (properties, payload, h) => {
  for (const property of properties) {
    if (typeof payload[property] !== 'string') {
      const response = h.response(
        responseData('fail', `${property} harus bertipe data string`)
      )
      response.code(400)
      return response
    }
  }
  return null
}

const validateNumberProperties = (properties, payload, h) => {
  for (const property of properties) {
    if (typeof payload[property] !== 'number') {
      const response = h.response(
        responseData('fail', `${property} harus bertipe data number`)
      )
      response.code(400)
      return response
    }
  }
  return null
}

const validateBooleanProperties = (properties, payload, h) => {
  for (const property of properties) {
    if (typeof payload[property] !== 'boolean') {
      const response = h.response(
        responseData('fail', `${property} harus bertipe data boolean`)
      )
      response.code(400)
      return response
    }
  }
  return null
}

module.exports = {
  validateStringProperties,
  validateNumberProperties,
  validateBooleanProperties
}
