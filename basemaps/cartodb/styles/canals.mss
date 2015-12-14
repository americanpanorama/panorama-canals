#canals{
  [zoom<=7] {
    line-simplify: 5;
  }
  line-color: #AF83D9;
  line-width: 0;        /* suppress canals in basemaps, in favor of GeoJSON layer */
  line-cap: round;
  line-join: round;

  [zoom<=7] { line-simplify: 5; }
  [zoom<=6] { line-simplify: 10;}
  [zoom<=5] { line-simplify: 15;}
}
