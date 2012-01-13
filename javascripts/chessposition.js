(function() {
  function parseFen(fen) {
    var columns      = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ],
        pieces  = { r: 'rook', n: 'knight', b: 'bishop', q: 'queen', k: 'king', p: 'pawn' },
        whitePieces  = [ 'R', 'N', 'B', 'Q', 'K', 'P' ],
        currentRow   = 8,
        currentCol   = 0;

    $.each(fen, function(i, c) {
      if(c == ' ') {
        // Don't support extra information right now
        return;
      } else if(c == '/') {
        currentRow--;
        currentCol = 0;
      } else {
        var asNum = parseInt(c);
        if(isNaN(asNum)) {
          var lower  = c.toLowerCase(),
              piece  = pieces[lower],
              color  = (c === lower) ? 'black' : 'white',
              square = columns[currentCol] + currentRow;


          $('#' + square).
            append('<div class="piece ' + color + ' ' + piece + '"></div>');

          currentCol++;
        } else {
          currentCol += asNum;
        }
      }
    });
  }

  $(document).ready(function (){
    // Use position from query or default to standard starting position
    var fen = $.url().param('fen') || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    parseFen(fen);
  });
})();
