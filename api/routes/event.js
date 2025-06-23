const { userAuthorization } = require("../../middleware/authorization");
const { validateRequest } = require("../../middleware/validateRequest");
const router = require("express").Router();
const { addEvent, getEvent } = require("../controllers");
const multerDiskStorage = require("../../utils/multerDiskStorage");

router
  .post(
    "/add",
    multerDiskStorage.single("banner"),
    userAuthorization,
    validateRequest({
      check_from: "body",
      mustKeys: ["title", "description"],
      validKeys: ["banner"],
    }),
    addEvent
  )
  .get("/all", getEvent);

module.exports = router;
