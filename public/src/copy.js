const draw = document.getElementById("draw");
function textData(squadArray, squadNewKRSumAry, killRateAverage, squadMaxKillRate, squadMinKillRate) {
  // 分割されたスクワッドの配列をキルレート順にソート
  for (let i = 0; i < squadArray.length; i++) {
    squadArray[i].sort((first, second) => second.kill_rate - first.kill_rate);
  }
  draw.insertAdjacentHTML("afterend", `
  <div id="copy" class="mt-20">
    <h3 class="text-slate-300 text-center text-2xl">Text data for copying</h3>
    <div id="do-copy" class="flex justify-center relative"><button id="click-copy" class="text-lg bg-blue-700 hover:bg-blue-800 px-5 py-1 mt-5 rounded-lg">Copy</button></div>
  </div>`);
  const copyId = document.getElementById('copy')
  copyId.insertAdjacentHTML(
    "beforeend",
    `<div id="copy-txt" class="flex justify-center text-slate-300 mt-10">Average kill rate for this tournament: ${killRateAverage.toFixed(2)}<br>\nMaximum kill rate difference: ${(squadMaxKillRate.toFixed(2) - squadMinKillRate.toFixed(2)).toFixed(2)}<br><br>\n\n--------------------<br><br>\n\n</div>`
  );

  // squadArray をキルレの高い順にソート
  for (let i = 0; i < squadArray.length; i++) {
    squadArray[i].sort((a, b) => b.kill_rate - a.kill_rate);
  }
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const copyTxt = document.getElementById('copy-txt')
  for (let i = 0; i < squadArray.length; i++) {
    copyTxt.insertAdjacentHTML("beforeend", `Group ${alphabet[i]}<br>\n`);
    for (let j = 0; j < squadArray[i].length; j++) {
      let resultText = `${squadArray[i][j].player_name}: ${squadArray[i][j].kill_rate.toFixed(2)}<br>\n`;
      copyTxt.insertAdjacentHTML("beforeend", resultText);
    }
    copyTxt.insertAdjacentHTML("beforeend", `Average kill rate: ${(squadNewKRSumAry[i] / squadArray[i].length).toFixed(2)}<br>\n`);
    copyTxt.insertAdjacentHTML("beforeend", `Total kill rate: ${squadNewKRSumAry[i].toFixed(2)}<br><br>\n\n--------------------<br><br>\n\n`);
  }

  // コピーができたかどうかの確認メッセージを出力する場所を作る
  const copyResult = document.createElement("div");
  copyResult.setAttribute("id", "copy-result");
  $('#do-copy').append(copyResult);

  // クリップボードにコピーする
  let copyTarget = document.getElementById("click-copy");
  copyTarget.addEventListener(
    "click",
    function () {
      const copyArea = document.getElementById("copy-txt");
      copyTarget = copyArea.textContent;
      const txt = document.createElement("textarea");
      txt.value = copyTarget;
      navigator.clipboard.writeText(copyTarget).then(
        () => {
          copyResult.innerHTML = '<div class="success-copy animate-fadeIn font-bold text-lg text-green-700 absolute top-6 ml-3">Copied.</div>';
        },
        () => {
          copyResult.innerHTML = '<div class="false-copy font-bold text-lg text-red-700 absolute top-6 ml-3">Copy failed.</div>';
        }
      );
      if (!navigator.clipboard) {
        alert("This browser does not support copying.");
      }

      $('#copy-result').empty();
    }
  );
};
export { textData }