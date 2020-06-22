// 天気の表示文字列および画像ファイル名
const WEATHERS = {
  Thunderstorm: { label: '雷雨', img: 'clouds' },
  Drizzle: { label: '霧雨', img: 'rains' },
  Rain: { label: '雨', img: 'rains' },
  Snow: { label: '雪', img: 'snow' },
  Atmosphere: { label: '濃霧', img: 'snow' },
  Clear: { label: '晴れ', img: 'clear' },
  Clouds: { label: '曇り', img: 'clouds' }
};

// 日にちを入れるターゲットを定義する
const nowTimeTarget = document.getElementById('nowData');
const nextTimeTarget = document.getElementById('nextData');
const afNextTimeTarget = document.getElementById('afNextData');

// 現在の日時を取得
const now = new Date();

// 取得した日時をターゲットに代入
nowTimeTarget.innerHTML = (now.getMonth() + 1) + '月' + now.getDate() + '日　' + now.getHours() + '時' + now.getMinutes() + '分';
nextTimeTarget.innerHTML = (now.getDate() + 1);
afNextTimeTarget.innerHTML = (now.getDate() + 2);

// 位置情報を取得開始
if (navigator.geolocation) {
  // 位置情報が取得成功した時
  navigator.geolocation.getCurrentPosition(function (position) {

      // 緯度経度を取得
      const basePosition = position.coords;
      const lat = basePosition.latitude;
      const lng = basePosition.longitude;

      // WEB API を使用し、現在地の現在の天気を取得
      const API_KEY = "????????????????????????????????";
      const url = "https://api.openweathermap.org/data/2.5/weather" + "?lat=" + lat + "&lon=" + lng + "&units=metric&APPID=" + API_KEY;
      const request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "json";

      // 現在の天気に関する関数
      request.onload = function () {
        const nowData = this.response;

        // 「現在の天気」「現在の気温」「現在地」を取得
        const weatherName = nowData.weather[0].main;
        const weatherTemp = nowData.main.temp;
        const cityName = nowData.name;

        // 取得した現在地が「Suguri」の時の処置
        if (cityName === 'Suguri') {
          alert('現在位置をうまく取得することができませんでした。\nしばらくお待ちいただき、再度アクセスいただけますでしょうか？\n「Suguri」の天気を表示させていただきます。どこかは知りません。')
        }
        // 取得したもの入れるターゲットを定義
        const geoTarget = document.getElementById('cityName');
        const patternTextTarget = document.getElementById('pattern');
        const patternImgTarget = document.getElementById('picture');
        const patternTempTarget = document.getElementById('temp');

        // 現在地、気温をターゲットに代入
        geoTarget.innerHTML = cityName;
        patternTempTarget.innerHTML = weatherTemp + '<span class="unit">℃</span>';

        /*取得した天気によって
        「天気の名前」「天気の画像を」を挿入*/
        const weather = WEATHERS[weatherName];
        if (weather) {
          const { label, img } = weather;
          patternTextTarget.innerHTML = label;
          patternImgTarget.innerHTML = `<img src="asset/img/${img}.png" alt="${label}">`;
        } else {
          return false;
        }
      };
      request.send();

      // WEB API を使用し、現在地の翌日以降の天気を取得
      const nextUrl = "https://api.openweathermap.org/data/2.5/forecast" + "?lat=" + lat + "&lon=" + lng + "&units=metric&APPID=" + API_KEY;
      const nextRequest = new XMLHttpRequest();
      nextRequest.open("GET", nextUrl, true);
      nextRequest.responseType = "json";

      // 現在、翌日以降の天気に関する関数
      nextRequest.onload = function () {
        const data = this.response;

        // 翌日および翌々日の6,9,12,15,18時の天気情報を取得し、対応する画像と気温を設定
        const cells = document.querySelectorAll('.weather-dot-cell');
        [...data.list.slice(7, 12), ...data.list.slice(15, 20)].forEach((e, i) => {
          const weather = WEATHERS[e.weather[0].main];
          if (weather) {
            const { label, img } = weather;
            cells[i].querySelector('.weather-dot').innerHTML = `<img src="asset/img/${img}.png" alt="${label}">`;
            cells[i].querySelector('.weather-temp').textContent = `${e.main.temp}℃`;
          }
        });
      };
      nextRequest.send();
    },

    // 位置情報の取得失敗した時
    function () {
      alert('位置情報の取得に失敗しました。');
    });
} else {
  alert("位置情報を取得できませんでした……");
}
