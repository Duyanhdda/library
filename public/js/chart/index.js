$(document).ready(function () {
  var Monday = 0;
  var Tuesday = 0;
  var Wednesday = 0;
  var Thursday = 0;
  var Friday = 0;
  var Saturday = 0;
  var Sunday = 0;
  var datalastweek = [0, 0, 0, 0, 0, 0, 0];
  var monthofyear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
  var x = getMonday(new Date());
  var xx = getMonday(
    new Date(x.getFullYear(), x.getMonth(), x.getDate(), 0, 0, 0, 0),
  );
  //new Date(year, month, date, hours, minutes, seconds, ms)

  $.post('/turn/getall', {}, function (turnOfStudent) {
    for (let item of turnOfStudent.turnOfStudent) {
      var d = new Date(item.createAt);
      // var monday = getMonday(new Date());
      if (d.getTime() >= xx.getTime()) {
        if (d.getDay() == 0) Sunday++;
        if (d.getDay() == 1) Monday++;
        if (d.getDay() == 2) Tuesday++;
        if (d.getDay() == 3) Wednesday++;
        if (d.getDay() == 4) Thursday++;
        if (d.getDay() == 5) Friday++;
        if (d.getDay() == 6) Saturday++;
      }
      if (
        d.getTime() >= (xx.getTime() - 604, 800) &&
        d.getTime() < xx.getTime()
      ) {
        if (d.getDay() == 0) datalastweek[0]++;
        if (d.getDay() == 1) datalastweek[1]++;
        if (d.getDay() == 2) datalastweek[2]++;
        if (d.getDay() == 3) datalastweek[3]++;
        if (d.getDay() == 4) datalastweek[4]++;
        if (d.getDay() == 5) datalastweek[5]++;
        if (d.getDay() == 6) datalastweek[6]++;
      }

      switch (d.getMonth()) {
        case 0:
          monthofyear[0]++;
          break;
        case 1:
          monthofyear[1]++;
          break;
        case 2:
          monthofyear[2]++;
          break;
        case 3:
          monthofyear[3]++;
          break;
        case 4:
          monthofyear[4]++;
          break;
        case 5:
          monthofyear[5]++;
          break;
        case 6:
          monthofyear[6]++;
          break;
        case 7:
          monthofyear[7]++;
          break;
        case 8:
          monthofyear[8]++;
          break;
        case 9:
          monthofyear[9]++;
          break;
        case 10:
          monthofyear[10]++;
          break;
        case 11:
          monthofyear[11]++;
          break;
        case 12:
          monthofyear[12]++;
          break;
      }
    }

    /* ChartJS
     * -------
     * Here we will create a few charts using ChartJS
     */

    //--------------
    //- AREA CHART -
    //--------------

    // Get context with jQuery - using jQuery's .get() method.
    var areaChartCanvas = $('#areaChart').get(0).getContext('2d');

    var areaChartData = {
      labels: [
        'January',
        'Ferbuary',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'Digital Goods',
          backgroundColor: 'rgba(60,141,188,0.9)',
          borderColor: 'rgba(60,141,188,0.8)',
          pointRadius: false,
          pointColor: '#3b8bba',
          pointStrokeColor: 'rgba(60,141,188,1)',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          data: [
            monthofyear[0],
            monthofyear[1],
            monthofyear[2],
            monthofyear[3],
            monthofyear[4],
            monthofyear[5],
            monthofyear[6],
            monthofyear[7],
            monthofyear[8],
            monthofyear[9],
            monthofyear[10],
            monthofyear[11],
            monthofyear[12],
          ],
        },
      ],
    };

    var areaChartOptions = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
      },
    };

    // This will get the first returned node in the jQuery collection.
    new Chart(areaChartCanvas, {
      type: 'line',
      data: areaChartData,
      options: areaChartOptions,
    });

    var areaChartData = {
      labels: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      datasets: [
        {
          label: 'Current week',
          backgroundColor: 'rgba(60,141,188,0.9)',
          borderColor: 'rgba(60,141,188,0.8)',
          pointRadius: false,
          pointColor: '#3b8bba',
          pointStrokeColor: 'rgba(60,141,188,1)',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          data: [
            Monday,
            Tuesday,
            Wednesday,
            Thursday,
            Friday,
            Saturday,
            Sunday,
          ],
        },
        {
          label: 'Last week',
          backgroundColor: 'rgba(210, 214, 222, 1)',
          borderColor: 'rgba(210, 214, 222, 1)',
          pointRadius: false,
          pointColor: 'rgba(210, 214, 222, 1)',
          pointStrokeColor: '#c1c7d1',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: [
            datalastweek[1],
            datalastweek[2],
            datalastweek[3],
            datalastweek[4],
            datalastweek[5],
            datalastweek[6],
            datalastweek[0],
          ],
        },
      ],
    };
    //-------------
    //- BAR CHART -
    //-------------
    var barChartCanvas = $('#barChart').get(0).getContext('2d');
    var barChartData = $.extend(true, {}, areaChartData);
    var temp0 = areaChartData.datasets[0];
    var temp1 = areaChartData.datasets[1];
    barChartData.datasets[0] = temp1;
    barChartData.datasets[1] = temp0;

    var barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      datasetFill: false,
    };

    new Chart(barChartCanvas, {
      type: 'bar',
      data: barChartData,
      options: barChartOptions,
    });

    $('.knob').knob({
      /*change : function (value) {
     //console.log("change : " + value);
     },
     release : function (value) {
     console.log("release : " + value);
     },
     cancel : function () {
     console.log("cancel : " + this.value);
     },*/
      draw: function () {
        // "tron" case
        if (this.$.data('skin') == 'tron') {
          var a = this.angle(this.cv), // Angle
            sa = this.startAngle, // Previous start angle
            sat = this.startAngle, // Start angle
            ea, // Previous end angle
            eat = sat + a, // End angle
            r = true;

          this.g.lineWidth = this.lineWidth;

          this.o.cursor && (sat = eat - 0.3) && (eat = eat + 0.3);

          if (this.o.displayPrevious) {
            ea = this.startAngle + this.angle(this.value);
            this.o.cursor && (sa = ea - 0.3) && (ea = ea + 0.3);
            this.g.beginPath();
            this.g.strokeStyle = this.previousColor;
            this.g.arc(
              this.xy,
              this.xy,
              this.radius - this.lineWidth,sa, ea,false,
            );
            this.g.stroke();
          }

          this.g.beginPath();
          this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
          this.g.arc(
            this.xy,
            this.xy,
            this.radius - this.lineWidth,
            sat,
            eat,
            false,
          );
          this.g.stroke();

          this.g.lineWidth = 2;
          this.g.beginPath();
          this.g.strokeStyle = this.o.fgColor;
          this.g.arc(
            this.xy,
            this.xy,
            this.radius - this.lineWidth + 1 + (this.lineWidth * 2) / 3,
            0,
            2 * Math.PI,
            false,
          );
          this.g.stroke();

          return false;
        }
      },
    });
  });
});
var start = performance.now();

// code being timed...

var duration = performance.now() - start;
console.log(duration);