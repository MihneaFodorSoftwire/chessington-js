import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';
import history from "./history";
import MovesHistory from "./history";
import Pawn from "./pieces/pawn";

export default class Board {
    public currentPlayer: Player;
    private readonly board: (Piece | undefined)[][];
    public moveHistory: MovesHistory[] = [];

    constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    public setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    public getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    public findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    public isValidSquare(square: Square) {
        return !(square.row > 7 || square.row < 0
            || square.col < 0 || square.col > 7);

    }

    public movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.moveHistory.push(new MovesHistory(this.currentPlayer, movingPiece, fromSquare, toSquare));
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.enPassant();
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        }
    }

    private createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    private enPassant() {
        const lastMove: MovesHistory = this.moveHistory[this.moveHistory.length - 1];
        if (lastMove && lastMove.piece != undefined && lastMove.piece instanceof Pawn) {
            const lastOtherPlayerMove: MovesHistory = this.moveHistory[this.moveHistory.length - 2];
            if (lastOtherPlayerMove && lastOtherPlayerMove.piece != undefined &&
                lastOtherPlayerMove.piece instanceof Pawn) {
                if (this.currentPlayer === Player.WHITE) {
                    if (lastOtherPlayerMove.initialPosition.row == 6 &&
                        lastOtherPlayerMove.FinalPosition.row == 4 &&
                        lastMove.FinalPosition.row == 5 &&
                        lastMove.FinalPosition.col == lastOtherPlayerMove.FinalPosition.col) {
                        this.setPiece(lastOtherPlayerMove.FinalPosition, undefined);
                    }
                } else {
                    if (lastOtherPlayerMove.initialPosition.row == 1 &&
                        lastOtherPlayerMove.FinalPosition.row == 3 &&
                        lastMove.FinalPosition.row == 2 &&
                        lastMove.FinalPosition.col == lastOtherPlayerMove.FinalPosition.col) {
                        this.setPiece(lastOtherPlayerMove.FinalPosition, undefined);
                    }
                }
            }
        }
    }

}
