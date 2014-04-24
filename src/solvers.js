/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({n:n});
  var row = 0;
  var col = 0;
  
  while (row < n) {
    while (col < n) {
      board.togglePiece(row, col);
      col++;
      row++;
    };
  };

  return board.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  var recursor = function (matrix, row, depth) {
    var count = 0;

    // if depth is n, count ++
    if (depth === n) {
      return 1;
    }

    var board = new Board(matrix);
    var cache = {};

    for (; row < n; row++) {
      for (var col=0; col < n; col++) {

        if (cache['col'+col]) continue;
        cache['col'+col] = true;

        // place a piece
        board.togglePiece(row, col);

        // check if the piece conflicts with an existing piece
        if (!board.hasAnyRooksConflicts()) {
          // cache['row'+row] = true;
          var matrix = _.clone(board.rows());
          count += recursor(matrix, row + 1, depth + 1);
        }

        // remove the piece
        board.togglePiece(row, col);
      }
    };

    return count;    
  };

  var board = new Board({n: n});
  var count = recursor(board.rows(), 0, 0);

  console.log('Number of solutions for ' + n + ' rooks:', count);
  return count;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = null;
  return board;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  
  var recursor = function (matrix, row, depth) {
    var count = 0;

    // if depth is n, count ++
    if (depth === n) {
      return 1;
    }

    var board = new Board(matrix);
    var cache = {};

    for (; row < n; row++) {
      for (var col=0; col < n; col++) {

        var diMajor = col - row;
        var diMinor = col + row;

        if (cache['col'+col]) continue;
        if (cache['diMajor'+diMajor]) continue;
        if (cache['diMinor'+diMinor]) continue;
        
        cache['col'+col] = true;
        cache['diMajor'+diMajor] = true;
        cache['diMinor'+diMinor] = true;

        // place a piece
        board.togglePiece(row, col);

        // check if the piece conflicts with an existing piece
        if (!board.hasAnyQueensConflicts()) {
          var matrix = _.clone(board.rows());
          count += recursor(matrix, row + 1, depth + 1);
        }

        // remove the piece
        board.togglePiece(row, col);
      }
    };

    return count;    
  };

  var board = new Board({n: n});
  var count = recursor(board.rows(), 0, 0);

  console.log('Number of solutions for ' + n + ' queens:', count);
  return count;
};
