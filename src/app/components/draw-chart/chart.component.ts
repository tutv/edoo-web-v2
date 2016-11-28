/**
 * Created by Thaibm on 11/21/2016.
 */
import { Component, OnInit} from '@angular/core';
declare var google:any;
@Component({
    selector: 'chart'
})
export class GoogleChartComponent implements OnInit {
    private static googleLoaded:any;

    constructor(){
        console.log("Here is GoogleChartComponent")
    }

    getGoogle() {
        return google;
    }
    ngOnInit() {
        console.log('ngOnInit');
        if(!GoogleChartComponent.googleLoaded) {
            GoogleChartComponent.googleLoaded = true;
            google.charts.load('current',  {packages: ['corechart', 'bar']});
        }
        google.charts.setOnLoadCallback(() => this.drawGraph());
    }

    drawGraph(){
        console.log("DrawGraph base class!!!! ");
    }

    createBarChart(element:any):any {
        return new google.visualization.BarChart(element);
    }

    createDataTable(array:any[]):any {
        return google.visualization.arrayToDataTable(array);
    }
    createPieChart(element:any):any {
        return new google.visualization.PieChart(element);
    }
    createDataView(element:any):any {
        return new google.visualization.DataView(element);
    }
}
