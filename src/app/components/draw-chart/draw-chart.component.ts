import { Component, OnInit } from '@angular/core';
import {GoogleChartComponent} from "./chart.component";

@Component({
  selector: 'app-draw-chart',
  templateUrl: './draw-chart.component.html',
  styleUrls: ['draw-chart.component.scss']
})
export class DrawChartComponent extends GoogleChartComponent{

    private options_1;
    private data_1;
    private chart_1;

    private options_2;
    private data_2;
    private chart_2;

    private options_3;
    private data_3;
    private chart_3;

    private options;
    private data;
    private chart;
    private view;

    constructor(){
        super();
    }
    drawGraph(){
        /*this.data = this.createDataTable([
            ['Evolution', 'Imports', 'Exports'],
            ['A', 8695000, 6422800],
            ['B', 3792000, 3694000],
            ['C', 8175000, 800800]
        ]);

        this.options = {
            title: 'Evolution, 2014',
            chartArea: {width: '50%'},
            hAxis: {
                title: 'Value in USD',
                minValue: 0
            },
            vAxis: {
                title: 'Members'
            }
        };

        this.chart = this.createBarChart(document.getElementById('khaosat1'));
        this.chart.draw(this.data, this.options);*/

        // ======Pie chart 1===============================================
        this.data_1 = this.createDataTable([
            ['Response', 'Percent'],
            ['Có', 66],
            ['Không', 1]
        ]);

        this.options_1 = {
            title: '',
            height: 250,
            animation: {
                duration: 1000,
                easing: 'inAndOut',
                startup: true,
            }
        };
        this.chart_1 = this.createPieChart(document.getElementById('chart-1'));

        this.chart_1.draw(this.data_1, this.options_1);

        //=====Pie chart 2====================================================

        this.data_2 = this.createDataTable([
            ['Response', 'Percent'],
            ['Có', 14],
            ['Không', 53]
        ]);

        this.options_2 = {
            title: '',
            height: 250,
        };

        this.chart_2 = this.createPieChart(document.getElementById('chart-2'));

        this.chart_2.draw(this.data_2, this.options_2);

        //========Pie chart 3=========================================

        this.data_3 = this.createDataTable([
            ['Contact', 'Via'],
            ['Facebook', 64],
            ['Email', 2],
            ['Điện thoại', 0],
            ['Khác', 1]
        ]);

        this.options_3 = {
            title: '',
            height: 250,
        };

        this.chart_3 =this.createPieChart(document.getElementById('chart-3'));

        this.chart_3.draw(this.data_3, this.options_3);

        //=======Column chart=================================================

        this.data = this.createDataTable([
            ['', 'People', {role: 'style'}],
            ['Google', 44, 'rgb(17, 18, 50)'],
            ['Bạn bè', 42, 'rgb(17, 18, 50)'],
            ['Giảng viên', 11, 'rgb(17, 18, 50)'],
            ['Nhóm Facebook', 27, 'rgb(17, 18, 50)'],
            ['Khác', 8, 'rgb(17, 18, 50)'],
        ]);

        this.view = this.createDataView(this.data);
        this.view.setColumns([0, 1,
            {
                calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation"
            },
            2]);

        this.options = {
            title: "",
            height: 300,
            bar: {groupWidth: "40%"},
            legend: {position: "none"},
            animation: {
                duration: 1000,
                easing: 'inAndOut',
                startup: true,
            },
        };
        this.chart = this.createBarChart(document.getElementById("chart-4"));
        this.chart.draw(this.view, this.options);
    }
}
