<h1 align="center"><b>bookshelf-api</b></h1>

This is the final project of learning course 'Belajar Membuat Aplikasi Backend Untuk Pemula' at Dicoding.\
Access the class:\
https://www.dicoding.com/academies/261

## Tech Stack

| Technologies       |
| ------------------ |
| NodeJS             |
| Hapi               |
| Eslint: StandardJS |
| Nodemon            |
| Nanoid             |
| Newman             |

## Code Structure
```
├── /src
│ ├── /books
│ │ ├── book-payloads.js      // stored book payloads data that transferred from client (in JSON form)
│ │ ├── book-utils.js         // load book utilities which is the core of bookshelf API logic
│ │ └── books.js              // stored temporary books data, when server got off all data will gone
│ ├── handler.js              // load whole handler functions, return utils success or fail
│ ├── response-data.js        // response data API, success or fail with messages
│ ├── routes.js               // load the routing server configuration
│ ├── server.js               // load the code, running the server
│ └── validation.js           // validate user payloads (type: string, number, boolean)
├── .eslintrc.json
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Run

1. Clone this repository
2. Run `npm install`
3. Run `npm run start` for production mode or `npm run start-dev` for development mode with nodemon

## Automatic Testing

Automatic Testing with Newman or import collection and environment API Test files into Postman. The Bookshelf API Test files has been shared from **Dicoding** in submission instruction page, The files name are:
- `Bookshelf API Test.postman_collection.json`
- `Bookshelf API Test.postman_environment.json`

Using Newman:
1. Install newman globally with `npm install newman --g`
2. Run `newman run 'Bookshelf API Test.postman_collection.json' --environment 'Bookshelf API Test.postman_environment.json'`
3. Then make sure all tests are passed

## Adds-on

Added an handler for **not-found endpoint** request that return status code **404**.
```js
  // handler.js
  const notFoundEndpointHandler = (request, h) => {
  request = null
  const response = h.response(
    responseData('not-found', 'Endpoint tidak tersedia')
  )
  response.code(404)
  return response
}
```