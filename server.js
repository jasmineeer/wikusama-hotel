const express = require(`express`)
const app = express()
const PORT = 8080 
const cors = require(`cors`)

app.use(cors())
app.use(express.static(__dirname))

let routes = [
    { prefix: `/user`, route: require(`./routes/user`) },
    { prefix: `/tipeKamar`, route: require(`./routes/tipe_kamar`) },
    { prefix: `/kamar`, route: require(`./routes/kamar`) }
]

for (let i = 0; i < routes.length; i++) {
    app.use(routes[i].prefix, routes[i].route)
}

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
})