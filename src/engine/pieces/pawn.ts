import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";
import MovesHistory from "../history";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const moves :Array<Square> = [];
        const currentPosition :Square = board.findPiece(this);

        if (!board.isValidSquare(currentPosition)) {
            return moves;
        }

        if (this.player == Player.WHITE) {
            const forwardMove :Square = new Square(currentPosition.row + 1, currentPosition.col);
            if (board.isValidSquare(forwardMove) && (board.getPiece(forwardMove) == undefined)) {
                moves.push(forwardMove);

                if (currentPosition.row == 1) {
                    const forwardMove2 :Square = new Square(currentPosition.row + 2, currentPosition.col);
                    if (board.isValidSquare(forwardMove2) && (board.getPiece(forwardMove2) == undefined)) {
                        moves.push(forwardMove2);
                    }
                }
            }
            moves.push(...this.captureDiagonals(board, currentPosition, 1));

            if (currentPosition.row == 4) {
                const lastMove: MovesHistory = board.moveHistory[board.moveHistory.length - 1];
                if (lastMove && lastMove.piece != undefined && lastMove.piece instanceof Pawn) {
                    if (lastMove.FinalPosition.row == 4 &&
                        (lastMove.FinalPosition.col == currentPosition.col + 1 ||
                            lastMove.FinalPosition.col == currentPosition.col - 1) &&
                        lastMove.initialPosition.row == 6) {
                        moves.push(new Square(5, lastMove.FinalPosition.col));
                    }
                }
            }

            return moves;
        }

        if (this.player == Player.BLACK) {
            const forwardMove :Square = new Square(currentPosition.row - 1, currentPosition.col);
            if (board.isValidSquare(forwardMove) && (board.getPiece(forwardMove) == undefined)) {
                moves.push(forwardMove);

                if (currentPosition.row == 6) {
                    const forwardMove2 :Square = new Square(currentPosition.row - 2, currentPosition.col);
                    if (board.isValidSquare(forwardMove2) && (board.getPiece(forwardMove2) == undefined)) {
                        moves.push(forwardMove2);
                    }
                }
            }
            moves.push(...this.captureDiagonals(board, currentPosition, -1));

            if (currentPosition.row == 3) {
                const lastMove: MovesHistory = board.moveHistory[board.moveHistory.length - 1];
                if (lastMove && lastMove.piece != undefined && lastMove.piece instanceof Pawn) {
                    if (lastMove.FinalPosition.row == 3 &&
                        (lastMove.FinalPosition.col == currentPosition.col + 1 ||
                            lastMove.FinalPosition.col == currentPosition.col - 1) &&
                        lastMove.initialPosition.row == 1) {
                        moves.push(new Square(2, lastMove.FinalPosition.col));
                    }
                }
            }
        }
        return moves;
    }

    private captureDiagonals(board: Board, position: Square, direction: number): Square[] {
        const diagonalMoves: Square[] = [];
        const directions = [
            [direction, -1],
            [direction, 1],
        ];

        for (const [rowOffset, colOffset] of directions) {
            const diagMove = new Square(position.row + rowOffset, position.col + colOffset);
            if (board.isValidSquare(diagMove)) {
                const seenPiece = board.getPiece(diagMove);
                if (seenPiece && seenPiece.player !== this.player && !(seenPiece instanceof King)) {
                    diagonalMoves.push(diagMove);
                }
            }
        }

        return diagonalMoves;
    }
}
