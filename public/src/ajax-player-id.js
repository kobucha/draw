import { ajaxPostPlayerName } from "./ajax-player-info.js";

// ajax 通信処理
// Fetch でやりたかったが前の通信処理が終わっていない場合は前の通信を中断する処理が分からなかったので断念
/**
 * Ajax 通信（サーバにプレイヤー名を送り絞り込んだプレイヤー名を返してもらう）
 * @param {object} data API通信用のプレイヤー名 Object {'player': プレイヤー名}
 * @param {Element} target 親要素の ID(#) を取得(プレイヤー名が入力されたDiv)
 */
let jqXHR = null;

function doAjax(data, target) {
  // ajax 通信中の場合 ajax 通信をキャンセル
  if (jqXHR) {
    jqXHR.abort();
  }
  // ajax 通信処理の返り値を jqxhr にセット(↑これで上記の条件分岐ができる)

  // Loading アイコンを表示
  $(`${target} .loading`).css('display', 'flex');

  jqXHR = $.ajax({
    type: 'POST',
    url: '/json-search',
    data: JSON.stringify(data),
    contentType: 'application/json',
    dataType: 'json',
    timeout: 10000,
  }).done(function (json) {
    // 子要素を削除
    if ($(`${target} .player-list`).length) {
      $(`${target} .player-list`).remove();
    }

    // 検索結果のプレイヤー一覧を消す
    if ($(`${target} .player-list`).length) {
      $(document).on('click', () => {
        $('.player-list').remove();
      });
    }

    // プレイヤー候補名を表示
    let dl = '';
    for (let i = 0; i < json.length; i++) {
      dl += `
      <dt><img src="${json[i].avatarUrl}"></dt>
      <dd>${json[i].displayName}</dd>`;
    }
    $(`${target} .player-select`).append(`<dl class="player-list">${dl}</dl>`);
    // プレイヤー候補名一覧からプレイヤーを選択したときの処理
    $('.player-list dt, .player-list dd').on('click', (event) => {
      const clickPlayerName = $(event.target).text();
      $(`${target} .input-player`).val(clickPlayerName);
      $('.player-list').remove();

      // 次の API 通信で使うデータを作成
      let targetObject = { 'id': null }
      for (let i = 0; i < json.length; i++) {
        if (`${json[i].displayName}` == clickPlayerName) {
          targetObject.id = `${json[i].playFabId}`
        }
      }
      // プレイヤー ID から プレイヤー情報を取り出す
      ajaxPostPlayerName(target, targetObject);
    });

    // 絞り込みが1件だった場合は自動でプレイヤー情報を出力
    if (json.length === 1) {
      const targetPlayerName = json[0].displayName; // 配列からプレイヤー名を取得
      const targetPlayerID = json[0].playFabId; // 配列からプレイヤー ID を取得
      $(`${target} .input-player`).val(targetPlayerName);
      $('.player-list').remove();

      // 次の API 通信で使うデータを作成
      let targetObject = { 'id': null }
      targetObject.id = targetPlayerID;
      // プレイヤー ID から プレイヤー情報を取り出す
      ajaxPostPlayerName(target, targetObject);
    }

    // 絞り込み結果が 0 件の場合 No Data と出力
    if (json.length === 0) {
      $(`${target} .player-select`).append(`<div class="player-list">No Data</div>`);
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {
    // console.log(jqXHR, textStatus, errorThrown);
    if (textStatus === "timeout") {
      $('#entry').after(`<div class="entry-error animate-fadeIn"><p class="error">Timeout error.<br>No response from api server.</p></div>`);
    }
  }).always(function () {
    // Loading アイコンを削除
    $(`${target} .loading`).css('display', 'none');
  });
}

export { doAjax };