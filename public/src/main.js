import { doAjax } from "./ajax-player-id.js";
import { newPlayerCreate, deletePlayer } from "./entry.js";
import { draw } from "./draw.js";


/**
 * プレイヤー名のインプットに文字を入力した時の処理
 */
$('#entry').on('keyup', '.input-player', (event) => {
  // setTimeoutが実行中だったらカウントダウンをストップする
  ajaxClearTimeoutId();
  const target = `#player${$(event.currentTarget).data("id")}`; // 親要素の ID を設定
  const playerName = $(`${target} .input-player`).val(); // 入力されたユーザー名
  const data = { 'player': playerName };
  // 3文字以上の入力があれば ajax 通信処理を実行
  if (playerName.length > 2) {
    ajaxSetTimeoutId(data, target);
  }
});

let timeoutId = null;

/**
 * ajax通信を時間差で実行する
 */
function ajaxSetTimeoutId(data, target) {
  // setTimeoutの返り値のidをtimeoutIdにセット
  timeoutId = setTimeout(function () {
    // ajax通信を実行
    doAjax(data, target);
  }, 500);// 指定秒後に実行
}

/**
 * ajax通信をするためのsetTimeoutが実行中の場合、ストップする
 */
function ajaxClearTimeoutId() {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
    // timeoutIdをリセット
    timeoutId = null;
  }
}

// メンバー入力欄追加
$("#entry").on("click", "#add-button", newPlayerCreate);

// 任意のエントリープレイヤーを削除
$('#entry').on('click', '.delete', deletePlayer);

// 抽選処理
$('#draw-btn button').on('click', draw);


