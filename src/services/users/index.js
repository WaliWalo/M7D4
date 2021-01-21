const express = require("express");
const User = require("../../db").User;
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await User.findAll();
      res.send(data);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newElement = await User.create(req.body);
      res.send(newElement);
    } catch (error) {
      next(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await User.findByPk(req.params.id);
      if (data) {
        res.send(data);
      } else {
        let error = new Error("NOT FOUND");
        error.httpStatusCode = 404;
        next(error);
      }
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedData = await User.update(req.body, {
        returning: true,
        plain: true,
        where: {
          id: req.params.id,
        },
      });
      res.send(updatedData[1]);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      User.destroy({
        where: {
          id: req.params.id,
        },
      }).then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          res.send("Deleted");
        } else {
          res.send("No match");
        }
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
