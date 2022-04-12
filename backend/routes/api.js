const router = require('express').Router();

app.get("/", (req, res) => {
      res.json({ message: "Welcome application. api" });
    });


module.exports= router;