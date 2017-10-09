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
          image: { 'xlink:href': 'assets/images/'+ image, opacity: 0.8 },
          '.rank': { text: rank, fill: textColor, 'word-spacing': '-2px', 'letter-spacing': 0, 'font-size' : 14 },
          '.name': { text: name, fill: textColor, 'font-size': 9, 'font-family': 'Arial', 'letter-spacing': 0 }
        }
      });
      graph.addCell(cell);
      return cell;
    };

    function link(source, target, breakpoints) {

      let cell = new shapes.org.Arrow({
        source: { id: source.id },
        target: { id: target.id },
        // vertices: breakpoints,
        attrs: {
          '.connection': {
            'fill': 'none',
            'stroke-linejoin': '1',
            // 'stroke-width': '4',
            'stroke': '#4b4a67'
          },
        },
      });
      graph.addCell(cell);
      return cell;
    }

    let owner = member(300, 20, 'Product Owner', 'Krzysztof Wieczorkowski', 'male.png', '#30d0c6' , '#000000');
    let teamlead1 = member(90, 200, 'Team Leader', 'Kamil Janicki', 'male.png', '#7c68fd', '#f1f1f1');
    let teamlead2 = member(300, 200, 'Team Leader', 'Anna Nowacka', 'female.png', '#7c68fd', '#f1f1f1');
    let teamlead3 = member(500, 200, 'Team Leader' , 'Joanna Rychter-Koźba', 'female.png', '#7c68fd', '#f1f1f1');
    let front1 = member(295, 350, 'Developer', 'Urszula Torbicka', 'female.png', '#feb533', '#f1f1f1');
    let front2 = member(85, 350, 'Developer', 'Michał Piotrowski', 'male.png', '#feb533', '#f1f1f1');
    let front3 = member(500, 350, 'Developer', 'Adam Milski', 'male.png', '#feb533', '#f1f1f1');



    link(owner, teamlead2, [{x: 385, y: 180}]);
    link(owner, teamlead1, [{x: 385, y: 180}, {x: 175, y: 180}]);
    link(owner, teamlead3, [{x: 385, y: 180}, {x: 585, y: 180}]);
    link(teamlead1, front2, [{x:175 , y: 380}]);
    link(front3, teamlead3, [{x:625, y: 380}]);
    link(teamlead2, front1, [{x:385 , y: 380}]);
  }
}
