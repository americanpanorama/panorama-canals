#canals{
  [zoom<=7] {
    line-simplify: 5;
  }
  line-color: #4c395e;
  line-width: 1.5;
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

  [name = 'Erie Canal'] {
    line-width: 5;
  }

  [zoom<=7] { line-simplify: 5; }
  [zoom<=6] { line-simplify: 10;}
  [zoom<=5] { line-simplify: 15;}
}
