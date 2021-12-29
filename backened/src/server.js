
const app = require("./index.js");
const connect = require("./configs/db.js");




app.listen(2233, async () => {
    await connect();

    console.log("Listening on port 2233")
})