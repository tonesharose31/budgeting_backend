const app = require("./app")


require("dotenv").config();
const PORT= process.env.PORT || 3039;

// app.use((req, res, next) => {
//     res.status(404).json({ message: 'Not Found' });
//   });


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})