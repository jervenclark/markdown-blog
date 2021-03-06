'use strict';

const express = require('express'),
  moment = require('moment'),
  fs = require('fs');

module.exports = function(app) {
  let route = express.Router();

  route
    .get('/api/posts', (req, res) => {
      let posts = fs.readdirSync('static/posts').map((post) => {

        return {
          title: post,
          content: fs
            .readFileSync(`static/posts/${post}`, 'utf-8')
            .split(' ')
            .slice(0, 50)
            .join(' ')
        };
      });
      res.json(posts);
    });

  route
    .get('/api/posts/:title', (req, res) => {
      if (req.params.title) {
        let post = fs
          .readFileSync(`static/posts/${req.params.title}.md`, 'utf-8')
        res.json(post)
      } else {
        res.status(404).json({
          message: 'Not found'
        });
      }
    });

  route
    .get('/api/pages/:title', (req, res) => {
      if (req.params.title) {
        let page = fs
          .readFileSync(`static/pages/${req.params.title}.md`, 'utf-8');
        res.json(page)
      } else {
        res.status(404).json({
          message: 'Not found'
        });
      }
    });

  route
    .get('/*', express.static('dist'));

  app.use(route);

  app.use(function(req, res) {
    res.sendfile('dist/index.html');
  });

};
