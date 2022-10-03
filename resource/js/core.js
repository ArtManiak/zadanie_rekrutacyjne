function fetchData() {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "Yg18iKlY0Fc5svXosSP3NY8YA2O0fLe6");

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  return fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=&base=PLN", requestOptions)
    .then(response => response.json())
    .then(x => {
      printData(x);
    })
    .catch(error => function () {
      console.log('error', error)
    });
}

function printData(x) {
  var table = document.getElementById("exchangeRates");

  var myHeaders = new Headers();
  myHeaders.append("apikey", "Yg18iKlY0Fc5svXosSP3NY8YA2O0fLe6");

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
    .then(response => response.json())
    .then(result => {
      var html = '<table><tr><td class="exchangeRates__block--title">Waluta:</td><td class="exchangeRates__block--title">Kurs:</td></tr>';
      for (var data in x.rates) {
        html += '<tr><td class="exchangeRates__block--row" data-symbol="' + data + '">' + result.symbols[data] + '</td> <td class="exchangeRates__block--value">' + x.rates[data] + '</td></tr>';

      }
      html += "</table>";
      table.innerHTML = html;
      tableListener();
    })
    .catch(error => function () {
      console.log('error', error)
    });

}

function tableListener() {
  const btn = document.querySelectorAll('.exchangeRates__block--row');
  for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function (event) {
      var date = Date.now();
      var sevenDays = 604800000;
      var endDate = new Date(date).toISOString().substring(0, 10);
      var startDate = new Date(date - sevenDays).toISOString().substring(0, 10);
      displayTimeseries(startDate, endDate, event.target.getAttribute("data-symbol"));
    });
  }

}

function displayTimeseries(startDate, endDate, symbol) {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "Yg18iKlY0Fc5svXosSP3NY8YA2O0fLe6");

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  fetch("https://api.apilayer.com/exchangerates_data/timeseries?start_date=" + startDate + "&end_date=" + endDate + "&base=PLN&symbols=" + symbol, requestOptions)
    .then(response => response.json())
    .then(result => {
      var timeseriesModule = document.getElementById("timeseries");
      var html = '<table><tr><td class="exchangeRates__block--title">Data:</td><td class="exchangeRates__block--title">Kurs:</td></tr>';
      for (var data in result.rates) {
        html += "<tr><td>" + data + "</td>"
        var z = result.rates[data];
        html += '<td class="exchangeRates__block--value">' + z[symbol] + '</td></tr>'


      }
      html += "</table>";
      timeseriesModule.innerHTML = html;

    })
    .catch(error => function () {
      console.log('error', error)
    });

}
fetchData();