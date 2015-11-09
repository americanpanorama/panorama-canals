#canals{
  [zoom<=7] {
    line-simplify: 5;
  }
  line-color: #AF83D9;
  line-width: 1;
  line-cap: round;
  line-join: round;
  /*
  [opened > 1840] {
    line-color: #f09;
  }
  */

/*
  [name = 'Erie Canal']::highlight {
    line-color: yellow;
    line-width: 10;
    opacity: 0.2;
    line-cap: round;
    line-join: round;
  }
*/

  [zoom<=7] { line-simplify: 5; }
  [zoom<=6] { line-simplify: 10;}
  [zoom<=5] { line-simplify: 15;}
}
