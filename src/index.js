const app = require("./app/app")
const port = process.env.PORT || 3020
app.listen(port, () => {
    console.log(`--------- Server Running on port: ${port} -----------`)
})
