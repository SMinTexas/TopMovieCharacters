const express = require("express");
const router = express.Router();
const db = require("../helpers/database");


router.get("/", async(req, res) => {
    try {
        let data = {};
        data.characters = await db.getCharacters();
        res.render("characters", data);
    } catch (e) {
        res.send(e);
    }
});

router.get("/:id", async(req, res) => {
    try {
        let data = {};
        data.character = await db.getCharacter(req.params.id);
        res.render("character", data);
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;