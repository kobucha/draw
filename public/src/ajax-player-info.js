import { entryArray } from './entry.js';

/**
 * プレイヤー ID から プレイヤー情報を取り出す
 * @param {*} target 親要素の ID(#) を取得
 * @param {*} targetObject 検索したいプレイヤーのオブジェクト {id: "xxxxxx"}
 */

function ajaxPostPlayerName(target, targetObject) {
  // Loading アイコンを表示
  $(`${target} .loading`).css('display', 'flex');

  // 2つ目の API の処理
  fetch("/json-api",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(targetObject)
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Fetch: ${res.status} ${res.statusText}`); // 例外を投げるとcatch()へ行く
      }
      return res.json();
    })
    .then((json) => {
      $(`${target} .entry`).remove();
      const playerName = json.playerName;
      const careerKillRate = json.careerKillRate;
      const seasonKillRate = json.seasonKillRate;
      const avatar = json.avatarUrl;
      const result = `
      <div class="entry border-4 border-slate-800 mt-3 p-3">
        <h2 class="font-barlow_condensed text-xl text-center player-name">${playerName}</h2>
        <dl class="flex flex-wrap justify-between mt-2">
          <dt class="w-[110px] font-caveat text-xl text-gray-300">career kill rate</dt>
          <dd class="text-green-500 font-bebas_neue text-xl text-right career-kill-rate w-[calc(100%_-_110px)]">${careerKillRate}</dd>
          <dt class="w-[110px] font-caveat text-xl text-gray-300">season kill rate</dt>
          <dd class="text-amber-400 font-bebas_neue text-xl text text-right season-kill-rate w-[calc(100%_-_110px)]">${seasonKillRate}</dd>
        </dl>
        <div class="mt-1 p-3 avatar"><img class="rounded-md" src="${avatar}"></div>
      </div>`
      $(`${target}`).append(result);

      // エントリープレイヤーの配列に stats のオブジェクトを追加
      const indexAry = $(`${target}`).data("id");
      entryArray[indexAry - 1] =
      {
        player_name: playerName,
        career: Number(careerKillRate),
        season: Number(seasonKillRate),
        avatar: avatar
      };
      $('#success-message').empty();
      $('#error-message').empty();
      $('#draw').empty();
      $('#copy').remove();
      console.log(entryArray);
      console.log("成功しました");
    })
    .catch((error) => {
      if (error.name === 'AbortError') {
        console.error('プレイヤー情報取得でタイムアウトエラーです:', error);
      } else {
        console.error('プレイヤー情報取得でエラーです:', error);
      }
    })
    .finally(() => {
      // Loading アイコンを削除
      $(`${target} .loading`).css('display', 'none');
    });
}



export { ajaxPostPlayerName };