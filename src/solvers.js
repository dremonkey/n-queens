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

  _.each(_.range(n), function (ind) {
    board.togglePiece(ind,ind);
  });

  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var recursor = function (array, cache, depth) {
    if (depth === n) return 1;

    var count = 0;
    board = new Board(array);
    cache = cache || {};

    _.each(_.range(n), function(row) {
      _.each(_.range(n), function(col) {
        if (!cache[row + ',' + col]) {
          board.togglePiece(row, col);
          cache[row + ',' + col] = true;
          if (!board.hasAnyRooksConflicts()) {
            count += recursor(board.rows(), _.clone(cache), depth + 1);
          }
          board.togglePiece(row, col);
        }
      });
    });

    return count;
  };

  var board = new Board({n:n});
  var solutionCount = recursor(board.rows(), {}, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board;
  var solution = []; // array or arrays

  var recursor = function (array, cache, depth) {
    if (depth === n) {
      solution = array;
      return true;
    };

    var count = 0;
    var board = new Board(array);
    cache = cache || {};

    _.each(_.range(n), function(row) {
      _.each(_.range(n), function(col) {
        if (!cache[row + ',' + col]) {
          board.togglePiece(row, col);
          cache[row + ',' + col] = true;
          if (!board.hasAnyQueensConflicts()) {
            if (recursor(board.rows(), _.clone(cache), depth + 1)) {
              return true;
            }
          }
          board.togglePiece(row, col);
        }
      });
    });
  };

  board = new Board({n:n});
  solution = new Board({n:n});
  solution = solution.rows();
  recursor(board.rows(), {}, 0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var recursor = function (array, cache, depth) {
    if (depth === n) {
      return 1;
    }

    var count = 0;
    var board = new Board(array);
    cache = cache || {};

    _.each(_.range(n), function(row) {
      _.each(_.range(n), function(col) {
        if (!cache[row + ',' + col]) {
          board.togglePiece(row, col);
          cache[row + ',' + col] = true;
          if (!board.hasAnyQueensConflicts()) {
            count += recursor(board.rows(), _.clone(cache), depth + 1);
          }
          board.togglePiece(row, col);
        }
      });
    });

    return count;
  };

  var board = new Board({n:n});
  var solutionCount = recursor(board.rows(), {}, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
