const entryArray = []; // エントリープレイヤーの配列初期値
const maxPlayer = 100; // 対応人数
const entryPlayerNum = 18; // 初期エントリープレイヤー人数

/**
 *  初期値のエントリーフォームを作成
 */
(function () {
  for (let i = 0; i < entryPlayerNum; i++) {
    newPlayerCreate();
  }
  // 通し番号を振る
  serialNumber();
}());

// 入力しているフォームを判別するための連番を振る
function serialNumber() {
  // ラベルに連番を振る
  $('.entry-player .entry-number').each(function (i) {
    $(this).text(`No.${i + 1}`);
  });
  // ID に連番を振る
  $('.entry-player').each(function (i) {
    $(this).attr('id', 'player' + (i + 1));
  });
  // data-id に連番を振る (.entry-player)
  $('.entry-player').each(function (i) {
    $(this).data('id', i + 1)
  });
  // data-id に連番を振る (input)
  $('.input-player').each(function (i) {
    $(this).data('id', i + 1)
  });
  // data-id に連番を振る (delete)
  $('.delete').each(function (i) {
    $(this).data('id', i + 1)
  });
}

/**
 * 新しいエントリーフォームを追加
 */
function newPlayerCreate() {
  // エラーメッセージの子要素があれば削除
  $('.entry-error').remove();
  $('.entry-errore').removeClass("animate-fadeIn");

  $("#add-button").remove();
  const newEntryDiv = document.createElement("div");
  const newLabel = document.createElement("label");
  const newEntry = document.createElement("input");
  const playerSelect = document.createElement("div");
  const loadingIcon = document.createElement('div')
  const closeBtn = document.createElement("div");

  // プレイヤー数
  const playerSum = document.getElementsByClassName("entry-player").length;
  // プレイヤー名入力の親Div作成
  if (playerSum < maxPlayer) {
    newEntryDiv.className = "entry-player relative";
    $('#entry').append(newEntryDiv);

    newLabel.className = "entry-number block mb-0.5 text-lg text-gray-300 font-caveat"
    newEntryDiv.appendChild(newLabel);

    // プレイヤー名入力 <input> 作成
    newEntry.setAttribute("type", "text");
    newEntry.className = "input-player form-input border-0 bg-gray-700 placeholder-gray-500 text-white focus:ring-2 rounded-lg block w-full p-2.5 placeholder:font-caveat placeholder:text-xl";
    newEntry.setAttribute("placeholder", "player name");
    newEntry.setAttribute("required", "");
    newEntry.setAttribute("autocomplete", "off");
    newEntryDiv.appendChild(newEntry);

    // プレイヤー候補出力用の空 Div
    playerSelect.className = "player-select";
    newEntryDiv.append(playerSelect);

    // Close ボタン
    closeBtn.className = "delete z-10";
    newEntryDiv.append(closeBtn);

    // Loading アイコン
    loadingIcon.className = "justify-center space-x-1 absolute top-1 right-7 z-10 hidden loading";
    loadingIcon.insertAdjacentHTML("beforeend",
      `<div class="animate-ping  h-3 w-0.5 bg-blue-600 rounded-full"></div>
      <div class="animate-ping  h-3 w-0.5 bg-blue-600 rounded-full animation-delay-100"></div>
      <div class="animate-ping  h-3 w-0.5 bg-blue-600 rounded-full animation-delay-200"></div>
      <div class="animate-ping  h-3 w-0.5 bg-blue-600 rounded-full animation-delay-300"></div>
      <div class="animate-ping  h-3 w-0.5 bg-blue-600 rounded-full animation-delay-400"></div>`
    );
    newEntryDiv.append(loadingIcon);

    // 通し番号を振る
    serialNumber();

    // エントリー追加アイコンを設置
    $('#entry').append('<div id="add-button" class="hover:opacity-50 hover:cursor-pointer"><img src="./images/plus-icon.png" alt="メンバー追加">');

    // エントリープレイヤーの配列にプッシュ
    entryArray.push(undefined);
  }

  // 人数超過のエラーメッセージ
  if (playerSum >= maxPlayer) {
    $('#entry').after(`<div class="entry-error animate-fadeIn"><p class="error">Up to ${maxPlayer} players can participate.</p></div>`);
    // エントリー追加アイコンを設置
    $('#entry').append('<div id="add-button" class="hover:opacity-50 hover:cursor-pointer"><img src="./images/plus-icon.png" alt="メンバー追加">');
  }
}

// 任意のエントリープレイヤーを削除する関数
function deletePlayer(event) {
  // エラーメッセージの子要素があれば削除
  $('.entry-error').empty();
  $('.csv-import-message').remove();

  const deleteTarget = `#player${$(event.currentTarget).data("id")}`; // 親要素の ID を設定

  // エントリープレイヤーの配列から指定プレイヤーを削除
  const indexAry = $(`${deleteTarget}`).data("id");
  entryArray.splice(indexAry - 1, 1)

  $(deleteTarget).remove();
  // data-id に連番を振りなおす (.entry-player)
  $('.entry-player').each(function (i) {
    $(this).data('id', i + 1)
  });
  // ラベルに連番を振りなおす
  $('.entry-player .entry-number').each(function (i) {
    $(this).text(`No.${i + 1}`);
  });
};

// エラー表示の input に forcs したらエラー表示用の class を削除
$('.input-player').on('focus', () => {
  $('input').removeClass('error-empty')
});

export { newPlayerCreate, deletePlayer, entryArray };