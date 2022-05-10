import { newPlayerCreate, entryArray } from './entry.js';

const fileInput = document.getElementById("file-input");
const fileReader = new FileReader();

// ファイル変更時のイベント
fileInput.onchange = () => {
  const file = fileInput.files[0];
  const fileSize = file.size; // ファイルサイズ
  const maxFileSize = 1024 * 100; // 制限サイズ
  // メッセージ表示用の Div を作成
  $('.csv-import-message').remove();
  $('#header').after('<div class="csv-import-message animate-fadeIn text-center p-5"></div>');

  if (file.type !== "text/csv" && file.type !== "application/vnd.ms-excel" && file.type !== "application/octet-stream") {
    alert("Only CSV files can be uploaded."); // エラーメッセージを表示
    fileInput.value = ""; // inputの中身をリセット
    return; // この時点で処理を終了する
  } else if (fileSize > maxFileSize) {
    // ファイルサイズが制限以上の場合
    alert("File size should be less than 100KB."); // エラーメッセージを表示
    fileInput.value = ""; // inputの中身をリセット
    return; // この時点で処理を終了する
  } else {
    $('.csv-import-message').html("Now Loading...");
    fileReader.readAsText(file);

    // ファイル名を出力
    const fileName = file.name;
    const label = fileInput.nextElementSibling;
    if (!label.classList.contains("changed")) {
      $('.csv-import-message').empty();
      $('.csv-import-message').append(`<p>${fileName}</p>`);
    }
  }
};

// ファイル読み込み時
let csvEntryArray = [];
fileReader.onload = () => {
  // ファイル読み込み
  let fileResult = fileReader.result.split("\r\n");

  // 先頭行をヘッダとして格納
  let header = fileResult[0].split(",");
  // 先頭行の削除
  fileResult.shift();

  // CSVからエントリープレイヤーの配列を作る
  csvEntryArray = fileResult.map((player) => {
    let datas = player.split(",");
    let result = {};
    for (const index in datas) {
      let key = header[index];
      result[key] = datas[index];
    }
    return result;
  });

  // entryArray を初期化
  entryArray.splice(0);

  // 子要素を削除（エントリープレイヤー）
  $('#entry').empty();
  $('.csv-import-message').append(`<p class="text-green-600 text-xl">${csvEntryArray.length} players loaded.</p>`);
  for (let i = 0; i < csvEntryArray.length; i++) {
    newPlayerCreate();
    $(`#player${i + 1} .input-player`).val(csvEntryArray[i].player_name);
  }
};

// ファイル読み取り失敗時
fileReader.onerror = () => {
  $('.csv-import-message').append("Failed to read file.");
};

// 同じファイルをアップロードできるようにする
fileInput.addEventListener("click", (e) => {
  e.target.value = "";
});
