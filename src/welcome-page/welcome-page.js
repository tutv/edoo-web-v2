/**
 * Created by Thaibm on 11/1/2016.
 */

google.charts.load('current', {'packages': ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {

    // ======Pie chart 1===============================================
    var data_1 = google.visualization.arrayToDataTable([
        ['Response', 'Percent'],
        ['Có', 985],
        ['Không', 15]
    ]);

    var options_1 = {
        title: '',
        height: 250,
        animation: {
            duration: 1000,
            easing: 'inAndOut',
            startup: true,
        }
    };
    var chart_1 = new google.visualization.PieChart(document.getElementById('pie-chart-1'));

    chart_1.draw(data_1, options_1);

    //=====Pie chart 2====================================================

    var data_2 = google.visualization.arrayToDataTable([
        ['Response', 'Percent'],
        ['Có', 209],
        ['Không', 791]
    ]);

    var options_2 = {
        title: '',
        height: 250,
    };

    var chart_2 = new google.visualization.PieChart(document.getElementById('pie-chart-2'));

    chart_2.draw(data_2, options_2);

    //========Pie chart 3=========================================

    var data_3 = google.visualization.arrayToDataTable([
        ['Contact', 'Via'],
        ['Facebook', 955],
        ['Email', 30],
        ['Phone', 5],
        ['Other', 10]
    ]);

    var options_3 = {
        title: '',
        height: 250,
    };

    var chart_3 = new google.visualization.PieChart(document.getElementById('pie-chart-3'));

    chart_3.draw(data_3, options_3);

    //=======Column chart=================================================

    var data = google.visualization.arrayToDataTable([
        ['', 'People', { role: 'style' }],
        ['Google', 44, '#26ae90'],
        ['Friends', 42, '#26ae90'],
        ['Teachers', 11, '#26ae90'],
        ['Facebook group', 27, '#26ae90' ],
        ['Other', 8, '#26ae90' ],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
        { calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation" },
        2]);

    var options = {
        title: "",
        height: 300,
        bar: {groupWidth: "60%"},
        legend: { position: "none" },
        animation: {
            duration: 1000,
            easing: 'inAndOut',
            startup: true,
        }
    };
    var chart = new google.visualization.BarChart(document.getElementById("bar-chart"));
    chart.draw(view, options);
}

$(window).resize(function(){
    drawChart();
});
