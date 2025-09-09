const { app } = require('./app')
const { PORT } = require('./utils/config')

app.listen(PORT, () => {
  console.log(`Server is listening on port ${ PORT }...`)
})