const express = require("express");
const videosController = require("../controllers/videosController");
const multer = require("multer")
const path = require("path")

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, path.resolve(__dirname, "../..", "public"))
        },
        filename(req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`)
        }
    })
});

router.get("/", videosController.index);

router.get("/:id", videosController.show);

router.post("/", upload.single("image"), videosController.store);

router.put("/:id", videosController.update);

router.delete("/:id", videosController.delete);

module.exports = router;
