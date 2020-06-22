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
        if (weatherName === "Thunderstorm") {
          patternTextTarget.innerHTML = '雷雨';
          patternImgTarget.innerHTML = '<img src="asset/img/clouds.png" alt="雷雨">';
        } else if (weatherName === "Drizzle") {
          patternTextTarget.innerHTML = '霧雨';
          patternImgTarget.innerHTML = '<img src="asset/img/rains.png" alt="霧雨">';
        } else if (weatherName === "Rain") {
          patternTextTarget.innerHTML = '雨';
          patternImgTarget.innerHTML = '<img src="asset/img/rains.png" alt="雨">';
        } else if (weatherName === "Snow") {
          patternTextTarget.innerHTML = '雪';
          patternImgTarget.innerHTML = '<img src="asset/img/snow.png" alt="雪">';
        } else if (weatherName === "Atmosphere") {
          patternTextTarget.innerHTML = '濃霧';
          patternImgTarget.innerHTML = '<img src="asset/img/clouds.png" alt="濃霧">';
        } else if (weatherName === "Clear") {
          patternTextTarget.innerHTML = '晴れ';
          patternImgTarget.innerHTML = '<img src="asset/img/clear.png" alt="晴れ">';
        } else if (weatherName === "Clouds") {
          patternTextTarget.innerHTML = '曇り';
          patternImgTarget.innerHTML = '<img src="asset/img/clouds.png" alt="曇り">';
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

        // 特定の時間の天気情報を取得
        const nextWEather_6 = data.list[7].weather[0].main; // 翌日の6時
        const nextWEather_9 = data.list[8].weather[0].main; // 翌日の9時
        const nextWEather_12 = data.list[9].weather[0].main; // 翌日の12時
        const nextWEather_15 = data.list[10].weather[0].main; // 翌日の15時
        const nextWEather_18 = data.list[11].weather[0].main; // 翌日の18時

        // 取得した天気によって「天気の画像を」を挿入
        if (nextWEather_6 === "Thunderstorm") {
          document.getElementById('nextWEather_6').innerHTML = '<img src="asset/img/clouds.png" alt="雷雨">';
        } else if (nextWEather_6 === "Drizzle") {
          document.getElementById('nextWEather_6').innerHTML = '<img src="asset/img/rains.png" alt="霧雨">';
        } else if (nextWEather_6 === "Rain") {
          document.getElementById('nextWEather_6').innerHTML = '<img src="asset/img/rains.png" alt="雨">';
        } else if (nextWEather_6 === "Snow") {
          document.getElementById('nextWEather_6').innerHTML = '<img src="asset/img/snow.png" alt="雪">';
        } else if (nextWEather_6 === "Atmosphere") {
          document.getElementById('nextWEather_6').innerHTML = '<img src="asset/img/clouds.png" alt="濃霧">';
        } else if (nextWEather_6 === "Clear") {
          document.getElementById('nextWEather_6').innerHTML = '<img src="asset/img/clear.png" alt="晴れ">';
        } else if (nextWEather_6 === "Clouds") {
          document.getElementById('nextWEather_6').innerHTML = '<img src="asset/img/clouds.png" alt="曇り">';
        } else {
          return false;
        }
        if (nextWEather_9 === "Thunderstorm") {
          document.getElementById('nextWEather_9').innerHTML = '<img src="asset/img/clouds.png" alt="雷雨">';
        } else if (nextWEather_9 === "Drizzle") {
          document.getElementById('nextWEather_9').innerHTML = '<img src="asset/img/rains.png" alt="霧雨">';
        } else if (nextWEather_9 === "Rain") {
          document.getElementById('nextWEather_9').innerHTML = '<img src="asset/img/rains.png" alt="雨">';
        } else if (nextWEather_9 === "Snow") {
          document.getElementById('nextWEather_9').innerHTML = '<img src="asset/img/snow.png" alt="雪">';
        } else if (nextWEather_9 === "Atmosphere") {
          document.getElementById('nextWEather_9').innerHTML = '<img src="asset/img/clouds.png" alt="濃霧">';
        } else if (nextWEather_9 === "Clear") {
          document.getElementById('nextWEather_9').innerHTML = '<img src="asset/img/clear.png" alt="晴れ">';
        } else if (nextWEather_9 === "Clouds") {
          document.getElementById('nextWEather_9').innerHTML = '<img src="asset/img/clouds.png" alt="曇り">';
        } else {
          return false;
        }
        if (nextWEather_12 === "Thunderstorm") {
          document.getElementById('nextWEather_12').innerHTML = '<img src="asset/img/clouds.png" alt="雷雨">';
        } else if (nextWEather_12 === "Drizzle") {
          document.getElementById('nextWEather_12').innerHTML = '<img src="asset/img/rains.png" alt="霧雨">';
        } else if (nextWEather_12 === "Rain") {
          document.getElementById('nextWEather_12').innerHTML = '<img src="asset/img/rains.png" alt="雨">';
        } else if (nextWEather_12 === "Snow") {
          document.getElementById('nextWEather_12').innerHTML = '<img src="asset/img/snow.png" alt="雪">';
        } else if (nextWEather_12 === "Atmosphere") {
          document.getElementById('nextWEather_12').innerHTML = '<img src="asset/img/clouds.png" alt="濃霧">';
        } else if (nextWEather_12 === "Clear") {
          document.getElementById('nextWEather_12').innerHTML = '<img src="asset/img/clear.png" alt="晴れ">';
        } else if (nextWEather_12 === "Clouds") {
          document.getElementById('nextWEather_12').innerHTML = '<img src="asset/img/clouds.png" alt="曇り">';
        } else {
          return false;
        }
        if (nextWEather_15 === "Thunderstorm") {
          document.getElementById('nextWEather_15').innerHTML = '<img src="asset/img/clouds.png" alt="雷雨">';
        } else if (nextWEather_15 === "Drizzle") {
          document.getElementById('nextWEather_15').innerHTML = '<img src="asset/img/rains.png" alt="霧雨">';
        } else if (nextWEather_15 === "Rain") {
          document.getElementById('nextWEather_15').innerHTML = '<img src="asset/img/rains.png" alt="雨">';
        } else if (nextWEather_15 === "Snow") {
          document.getElementById('nextWEather_15').innerHTML = '<img src="asset/img/snow.png" alt="雪">';
        } else if (nextWEather_15 === "Atmosphere") {
          document.getElementById('nextWEather_15').innerHTML = '<img src="asset/img/clouds.png" alt="濃霧">';
        } else if (nextWEather_15 === "Clear") {
          document.getElementById('nextWEather_15').innerHTML = '<img src="asset/img/clear.png" alt="晴れ">';
        } else if (nextWEather_15 === "Clouds") {
          document.getElementById('nextWEather_15').innerHTML = '<img src="asset/img/clouds.png" alt="曇り">';
        } else {
          return false;
        }
        if (nextWEather_18 === "Thunderstorm") {
          document.getElementById('nextWEather_18').innerHTML = '<img src="asset/img/clouds.png" alt="雷雨">';
        } else if (nextWEather_18 === "Drizzle") {
          document.getElementById('nextWEather_18').innerHTML = '<img src="asset/img/rains.png" alt="霧雨">';
        } else if (nextWEather_18 === "Rain") {
          document.getElementById('nextWEather_18').innerHTML = '<img src="asset/img/rains.png" alt="雨">';
        } else if (nextWEather_18 === "Snow") {
          document.getElementById('nextWEather_18').innerHTML = '<img src="asset/img/snow.png" alt="雪">';
        } else if (nextWEather_18 === "Atmosphere") {
          document.getElementById('nextWEather_18').innerHTML = '<img src="asset/img/clouds.png" alt="濃霧">';
        } else if (nextWEather_18 === "Clear") {
          document.getElementById('nextWEather_18').innerHTML = '<img src="asset/img/clear.png" alt="晴れ">';
        } else if (nextWEather_18 === "Clouds") {
          document.getElementById('nextWEather_18').innerHTML = '<img src="asset/img/clouds.png" alt="曇り">';
        } else {
          return false;
        }

        // 特定の時間の天気情報を取得
        const nextTemp_6 = Math.round(data.list[7].main.temp); // 翌日の6時の気温
        const nextTemp_9 = Math.round(data.list[8].main.temp); // 翌日の9時の気温
        const nextTemp_12 = Math.round(data.list[9].main.temp); // 翌日の12時の気温
        const nextTemp_15 = Math.round(data.list[10].main.temp); // 翌日の15時の気温
        const nextTemp_18 = Math.round(data.list[11].main.temp); // 翌日の18時の気温

        // 特定の時間に気温を代入
        document.getElementById('nextTemp_6').innerHTML = nextTemp_6 + '℃';
        document.getElementById('nextTemp_9').innerHTML = nextTemp_9 + '℃';
        document.getElementById('nextTemp_12').innerHTML = nextTemp_12 + '℃';
        document.getElementById('nextTemp_15').innerHTML = nextTemp_15 + '℃';
        document.getElementById('nextTemp_18').innerHTML = nextTemp_18 + '℃';

        // 特定の時間の天気情報を取得
        const afNextWEather_6 = data.list[15].weather[0].main; // 翌翌日の6時
        const afNextWEather_9 = data.list[16].weather[0].main; // 翌翌日の9時
        const afNextWEather_12 = data.list[17].weather[0].main; // 翌翌日の12時
        const afNextWEather_15 = data.list[18].weather[0].main; // 翌翌日の15時
        const afNextWEather_18 = data.list[19].weather[0].main; // 翌翌日の18時

        // 取得した天気によって「天気の画像を」を挿入
        if (afNextWEather_6 === "Thunderstorm") {
          document.getElementById('afNextWEather_6').innerHTML = '<img src="asset/img/clouds.png" alt="雷雨">';
        } else if (afNextWEather_6 === "Drizzle") {
          document.getElementById('afNextWEather_6').innerHTML = '<img src="asset/img/rains.png" alt="霧雨">';
        } else if (afNextWEather_6 === "Rain") {
          document.getElementById('afNextWEather_6').innerHTML = '<img src="asset/img/rains.png" alt="雨">';
        } else if (afNextWEather_6 === "Snow") {
          document.getElementById('afNextWEather_6').innerHTML = '<img src="asset/img/snow.png" alt="雪">';
        } else if (afNextWEather_6 === "Atmosphere") {
          document.getElementById('afNextWEather_6').innerHTML = '<img src="asset/img/clouds.png" alt="濃霧">';
        } else if (afNextWEather_6 === "Clear") {
          document.getElementById('afNextWEather_6').innerHTML = '<img src="asset/img/clear.png" alt="晴れ">';
        } else if (afNextWEather_6 === "Clouds") {
          document.getElementById('afNextWEather_6').innerHTML = '<img src="asset/img/clouds.png" alt="曇り">';
        } else {
          return false;
        }
        if (afNextWEather_9 === "Thunderstorm") {
          document.getElementById('afNextWEather_9').innerHTML = '<img src="asset/img/clouds.png" alt="雷雨">';
        } else if (afNextWEather_9 === "Drizzle") {
          document.getElementById('afNextWEather_9').innerHTML = '<img src="asset/img/rains.png" alt="霧雨">';
        } else if (afNextWEather_9 === "Rain") {
          document.getElementById('afNextWEather_9').innerHTML = '<img src="asset/img/rains.png" alt="雨">';
        } else if (afNextWEather_9 === "Snow") {
          document.getElementById('afNextWEather_9').innerHTML = '<img src="asset/img/snow.png" alt="雪">';
        } else if (afNextWEather_9 === "Atmosphere") {
          document.getElementById('afNextWEather_9').innerHTML = '<img src="asset/img/clouds.png" alt="濃霧">';
        } else if (afNextWEather_9 === "Clear") {
          document.getElementById('afNextWEather_9').innerHTML = '<img src="asset/img/clear.png" alt="晴れ">';
        } else if (afNextWEather_9 === "Clouds") {
          document.getElementById('afNextWEather_9').innerHTML = '<img src="asset/img/clouds.png" alt="曇り">';
        } else {
          return false;
        }
        if (afNextWEather_12 === "Thunderstorm") {
          document.getElementById('afNextWEather_12').innerHTML = '<img src="asset/img/clouds.png" alt="雷雨">';
        } else if (afNextWEather_12 === "Drizzle") {
          document.getElementById('afNextWEather_12').innerHTML = '<img src="asset/img/rains.png" alt="霧雨">';
        } else if (afNextWEather_12 === "Rain") {
          document.getElementById('afNextWEather_12').innerHTML = '<img src="asset/img/rains.png" alt="雨">';
        } else if (afNextWEather_12 === "Snow") {
          document.getElementById('afNextWEather_12').innerHTML = '<img src="asset/img/snow.png" alt="雪">';
        } else if (afNextWEather_12 === "Atmosphere") {
          document.getElementById('afNextWEather_12').innerHTML = '<img src="asset/img/clouds.png" alt="濃霧">';
        } else if (afNextWEather_12 === "Clear") {
          document.getElementById('afNextWEather_12').innerHTML = '<img src="asset/img/clear.png" alt="晴れ">';
        } else if (afNextWEather_12 === "Clouds") {
          document.getElementById('afNextWEather_12').innerHTML = '<img src="asset/img/clouds.png" alt="曇り">';
        } else {
          return false;
        }
        if (afNextWEather_15 === "Thunderstorm") {
          document.getElementById('afNextWEather_15').innerHTML = '<img src="asset/img/clouds.png" alt="雷雨">';
        } else if (afNextWEather_15 === "Drizzle") {
          document.getElementById('afNextWEather_15').innerHTML = '<img src="asset/img/rains.png" alt="霧雨">';
        } else if (afNextWEather_15 === "Rain") {
          document.getElementById('afNextWEather_15').innerHTML = '<img src="asset/img/rains.png" alt="雨">';
        } else if (afNextWEather_15 === "Snow") {
          document.getElementById('afNextWEather_15').innerHTML = '<img src="asset/img/snow.png" alt="雪">';
        } else if (afNextWEather_15 === "Atmosphere") {
          document.getElementById('afNextWEather_15').innerHTML = '<img src="asset/img/clouds.png" alt="濃霧">';
        } else if (afNextWEather_15 === "Clear") {
          document.getElementById('afNextWEather_15').innerHTML = '<img src="asset/img/clear.png" alt="晴れ">';
        } else if (afNextWEather_15 === "Clouds") {
          document.getElementById('afNextWEather_15').innerHTML = '<img src="asset/img/clouds.png" alt="曇り">';
        } else {
          return false;
        }
        if (afNextWEather_18 === "Thunderstorm") {
          document.getElementById('afNextWEather_18').innerHTML = '<img src="asset/img/clouds.png" alt="雷雨">';
        } else if (afNextWEather_18 === "Drizzle") {
          document.getElementById('afNextWEather_18').innerHTML = '<img src="asset/img/rains.png" alt="霧雨">';
        } else if (afNextWEather_18 === "Rain") {
          document.getElementById('afNextWEather_18').innerHTML = '<img src="asset/img/rains.png" alt="雨">';
        } else if (afNextWEather_18 === "Snow") {
          document.getElementById('afNextWEather_18').innerHTML = '<img src="asset/img/snow.png" alt="雪">';
        } else if (afNextWEather_18 === "Atmosphere") {
          document.getElementById('afNextWEather_18').innerHTML = '<img src="asset/img/clouds.png" alt="濃霧">';
        } else if (afNextWEather_18 === "Clear") {
          document.getElementById('afNextWEather_18').innerHTML = '<img src="asset/img/clear.png" alt="晴れ">';
        } else if (afNextWEather_18 === "Clouds") {
          document.getElementById('afNextWEather_18').innerHTML = '<img src="asset/img/clouds.png" alt="曇り">';
        } else {
          return false;
        }

        // 特定の時間の気温を取得
        const afNextTemp_6 = Math.round(data.list[15].main.temp); // 翌翌日の6時の気温
        const afNextTemp_9 = Math.round(data.list[16].main.temp); // 翌翌日の9時の気温
        const afNextTemp_12 = Math.round(data.list[17].main.temp); // 翌翌日の12時の気温
        const afNextTemp_15 = Math.round(data.list[18].main.temp); // 翌翌日の15時の気温
        const afNextTemp_18 = Math.round(data.list[19].main.temp); // 翌翌日の18時の気温

        // 特定の時間に気温を代入
        document.getElementById('afNextTemp_6').innerHTML = afNextTemp_6 + '℃';
        document.getElementById('afNextTemp_9').innerHTML = afNextTemp_9 + '℃';
        document.getElementById('afNextTemp_12').innerHTML = afNextTemp_12 + '℃';
        document.getElementById('afNextTemp_15').innerHTML = afNextTemp_15 + '℃';
        document.getElementById('afNextTemp_18').innerHTML = afNextTemp_18 + '℃';
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
