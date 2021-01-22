const mongoose = require(`mongoose`)

console.log(process.env.MONGODB_URL)
const url = process.env.MONGODB_URL

mongoose.connect("mongodb://127.0.0.1:27017/LingSnip-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// })