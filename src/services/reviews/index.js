const express = require("express");
const Review = require("../../db").Review;
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Review.findAll();
      res.send(data);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newElement = await Review.create(req.body);
      res.send(newElement);
    } catch (error) {
      next(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const Review = await Review.findByPk(req.params.id);
      res.send(Review);
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedData = await Review.update(req.body, {
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
      await Review.destroy({ where: { id: req.params.id } }).then(
        (rowsDeleted) => {
          if (rowsDeleted > 0) {
            res.send("Deleted");
          } else {
            res.send("No match");
          }
        }
      );
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
