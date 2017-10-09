import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { dia, shapes } from 'jointjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit() {
    let graph = new dia.Graph();

    let paper = new dia.Paper({
      el: $('#chart'),
      width: 800,
      height: 600,
      gridSize: 1,
      model: graph,
      perpendicularLinks: true,
      restrictTranslate: true
    });

    let member = function(x, y, rank, name, image, background, textColor) {

      textColor = textColor || "#000";

      let cell = new shapes.org.Member({
        position: { x: x, y: y },
        attrs: {
          '.card': { fill: background },
          image: { 'xlink:href': 'images/'+ image, opacity: 0.7 },
          '.rank': { text: rank, fill: textColor, 'word-spacing': '-5px', 'letter-spacing': 0},
          '.name': { text: name, fill: textColor, 'font-size': 13, 'font-family': 'Arial', 'letter-spacing': 0 }
        }
      });
      graph.addCell(cell);
      return cell;
    };

    function link(source, target, breakpoints) {

      let cell = new shapes.org.Arrow({
        source: { id: source.id },
        target: { id: target.id },
        vertices: breakpoints,
        attrs: {
          '.connection': {
            'fill': 'none',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            'stroke': '#4b4a67'
          }
        }

      });
      graph.addCell(cell);
      return cell;
    }

    let bart = member(300, 70, 'CEO', 'Bart Simpson', 'male.png', '#30d0c6' , '#000000');
    let homer = member(90, 200, 'VP Marketing', 'Homer Simpson', 'male.png', '#7c68fd', '#f1f1f1');
    let marge = member(300, 200, 'VP Sales', 'Marge Simpson', 'female.png', '#7c68fd', '#f1f1f1');
    let lisa = member(500, 200, 'VP Production' , 'Lisa Simpson', 'female.png', '#7c68fd', '#f1f1f1');
    let maggie = member(400, 350, 'Manager', 'Maggie Simpson', 'female.png', '#feb563', '#f1f1f1');
    let lenny = member(190, 350, 'Manager', 'Lenny Leonard', 'male.png', '#feb563', '#f1f1f1');
    let carl = member(190, 500, 'Manager', 'Carl Carlson', 'male.png', '#feb563', '#f1f1f1');



    link(bart, marge, [{x: 385, y: 180}]);
    link(bart, homer, [{x: 385, y: 180}, {x: 175, y: 180}]);
    link(bart, lisa, [{x: 385, y: 180}, {x: 585, y: 180}]);
    link(homer, lenny, [{x:175 , y: 380}]);
    link(homer, carl, [{x:175 , y: 530}]);
    link(marge, maggie, [{x:385 , y: 380}]);
  }
}
