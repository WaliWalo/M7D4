const express = require("express");
const Review = require("../../db").Review;
const router = express.Router();
const User = require("../../db").User;
const Article = require("../../db").Article;

router.route("/:articleId").get(async (req, res, next) => {
  try {
    const data = await Review.findAll({
      include: [User, Article],
    });
    // const result = await {
    //   ...data.values,
    //   user: `${data.user.last_name} ${data.user.first_name}`,
    //   article_head_line: data.article.head_line,
    // };
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.route("/:articleId/:userId").post(async (req, res, next) => {
  try {
    const newElement = await Review.create({
      ...req.body,
      userId: req.params.articleId,
      articleId: req.params.articleId,
    });
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
