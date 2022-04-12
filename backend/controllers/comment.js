const router = require("express").Router();
const Sequelize = require("sequelize");
const CommentModel = require("../models/comment");

const sequelize = new Sequelize("bd_groupo", "root", "1029!rieN", {
  //require('../config/db.config)
  host: "localhost",
  dialect: "mysql",
});

const comment = CommentModel(sequelize, Sequelize);

exports.published = async (req, res, next) => {
  const allComment = await comment.findAll()
  res.json(allComment);
};

exports.publish = async (req, res, next) => {
  console.log("req.body", req.body);

  const publish = await comment.create({
    commentTxt: req.body.content,
    image: "",
  });
  res.json(publish)
};
