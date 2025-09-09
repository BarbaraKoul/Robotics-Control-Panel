const { PORT } = require('./utils/config')
const { server } = require('./app')

server.listen(PORT, () => {
  console.log(`Server is listening on port ${ PORT }...`)
})