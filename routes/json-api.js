'use strict';
const express = require('express');
const router = express.Router();
const axios = require('axios');
let playerInfo = { playerName: null, seasonKillRate: null, careerKillRate: null, avatarUrl: null };

// API のデータ処理
router.post('/', (req, res, next) => {
  // API から返ってきたプレイヤー ID
  const playerId = req.body.id;
  // プレイヤー情報の JSON
  const playerJson = `https://nykloo.com/api/PlayerStats/Stats/${playerId}`;
  // プレイヤー情報を JSON で返す
  axios.get(playerJson).then(res1 => {
    const playerName = res1.data.accountInfo.titleInfo.displayName;

    // キャリアゲーム数
    const careerGamesPlayedObj = res1.data.playerStatistics.filter(target => {
      if (target.statisticName.indexOf('CareerGamesPlayed') !== -1) {
        return target;
      }
    });
    // 上記オブジェクトからキャリアゲーム数を取り出す
    let careerGamesPlayed = undefined;
    if (careerGamesPlayedObj.length) {
      careerGamesPlayed = careerGamesPlayedObj[0].value;
    }
    else {
      careerGamesPlayed = 0;
    }

    // キャリア Kill数
    const careerKillsObj = res1.data.playerStatistics.filter(target => {
      if (target.statisticName.indexOf('CareerKills') !== -1) {
        return target;
      }
    });
    // 上記オブジェクトからキャリア Kill数を取り出す
    let careerKills = undefined;
    if (careerKillsObj.length) {
      careerKills = careerKillsObj[0].value;
    }
    else {
      careerKills = 0;
    }

    // シーズンゲーム数
    const seasonGamesPlayedObj = res1.data.playerStatistics.filter(target => {
      if (target.statisticName.indexOf('SeasonGamesPlayed') !== -1) {
        return target;
      }
    });
    // 上記オブジェクトからシーズンゲーム数を取り出す
    let seasonGamesPlayed = undefined;
    if (seasonGamesPlayedObj.length) {
      seasonGamesPlayed = seasonGamesPlayedObj[0].value;
    }
    else {
      seasonGamesPlayed = 0;
    }

    // シーズン Kill数
    const seasonKillsObj = res1.data.playerStatistics.filter(target => {
      if (target.statisticName.indexOf('SeasonKills') !== -1) {
        return target;
      }
    });
    // 上記オブジェクトからシーズン Kill数を取り出す
    let seasonKills = undefined;
    if (seasonKillsObj.length) {
      seasonKills = seasonKillsObj[0].value;
    }
    else {
      seasonKills = 0;
    }

    // const careerDamage = res1.data.playerStatistics[2].value;
    // const seasonDamage = res1.data.playerStatistics[8].value;
    // const weeklyWinsTotal = res1.data.playerStatistics[0].value;
    // const weeklyKillsTotal = res1.data.playerStatistics[9].value;
    playerInfo.playerName = playerName;
    playerInfo.careerGamesPlayed = careerGamesPlayed;
    playerInfo.careerKillRate = (careerKills / careerGamesPlayed).toFixed(2);
    playerInfo.seasonKillRate = (seasonKills / seasonGamesPlayed).toFixed(2);
    playerInfo.avatarUrl = res1.data.accountInfo.titleInfo.avatarUrl; // プレイヤー画像
    return res.json(playerInfo);
  });
});

module.exports = router;