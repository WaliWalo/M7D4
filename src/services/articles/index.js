const express = require("express");
const Article = require("../../db").Article;
const router = express.Router();
const Category = require("../../db").Category;
const User = require("../../db").User;
const { Op } = require("sequelize");
router
  .route("/")
  .get(async (req, res, next) => {
    try {
      //   const data = await Article.findAll({
      //     include: {
      //       model: Category,
      //       where: req.query.category
      //         ? {
      //             name: { [Op.iLike]: `%${req.query.category}%` },
      //           }
      //         : {},
      //   },
      //   where: req.query.head_line
      //     ? { head_line: { [Op.iLike]: `%${req.query.head_line}%` } }
      //     : {},
      //   offset: parseInt(req.query.offset) | 0,
      //   limit: parseInt(req.query.limit) | 10,
      //   });
      const data = await Article.findAll({
        include: {
          model: User,
          where: req.query.author
            ? {
                last_name: { [Op.iLike]: `%${req.query.author}%` },
              }
            : {},
        },
        where: req.query.head_line
          ? { head_line: { [Op.iLike]: `%${req.query.head_line}%` } }
          : {},
        offset: parseInt(req.query.offset) | 0,
        limit: parseInt(req.query.limit) | 10,
      });

      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newArticle = await Article.create(req.body);
      const user = await User.findByPk();
      res.send(newElement);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router.route("/postArticle/:userId").post(async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.userId);
    Article.create(req.body)
      .then((article) => {
        user.addArticles(article);
      })
      .then(() => {
        res.send(`Article added by ${user.last_name}`);
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const article = await Article.findByPk(req.params.id);
      const authors = await article.getUsers();
      const result = {
        ...article.dataValues,
        author: `${authors[0].last_name} ${authors[0].first_name}`,
      };
      res.send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedData = await Article.update(req.body, {
        returning: true,
        plain: true,
        where: {
          id: req.params.id,
        },
      });
      res.send(updatedData[1]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      Article.destroy({
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
      console.log(error);
      next(error);
    }
  });

module.exports = router;
