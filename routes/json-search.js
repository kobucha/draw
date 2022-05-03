'use strict';
const express = require('express');
const router = express.Router();
const axios = require('axios');
const controller = new AbortController();
const signal = controller.signal;

// API のデータ処理
router.post('/', (req, res, next) => {
  // 入力されたプレイヤー名
  const playerName = `${req.body.player}`;

  // API の URL にプレイヤー名を入力
  const apiRequest = `https://nykloo.com/api/PlayerInfos/Search?usernameQuery=${playerName}&page=0&pageSize=7`;

  // JSON ファイルを返す
  axios.get(apiRequest, { signal })
    .then((res1) => {
      res.json(res1.data);
    })
    .catch((error) => {
      if (error.name === 'AbortError') {
        console.error('プレイヤー情報取得でタイムアウトエラーです:', error);
      } else {
        console.error('プレイヤー情報取得でエラーです:', error);
      }
    });
});

module.exports = router;