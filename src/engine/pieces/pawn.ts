import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

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
            const directions = [
                [1, -1],   // up-left
                [1, 1],    // up-right
            ];
            for (const [row, col] of directions) {
                const diagMove :Square = new Square(currentPosition.row + row,
                                                    currentPosition.col + col);
                if (board.isValidSquare(diagMove) && (board.getPiece(diagMove) != undefined)) {
                    const seenPiece :Piece|undefined = board.getPiece(diagMove);
                    if ((seenPiece?.player !== this.player) && !(seenPiece instanceof King)) {
                        moves.push(diagMove);
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
            const directions = [
                [-1, -1],   // "up"-left
                [-1, 1],    // "up"-right
            ];
            for (const [row, col] of directions) {
                const diagMove :Square = new Square(currentPosition.row + row,
                    currentPosition.col + col);
                if (board.isValidSquare(diagMove) && (board.getPiece(diagMove) != undefined)) {
                    const seenPiece :Piece|undefined = board.getPiece(diagMove);
                    if ((seenPiece?.player !== this.player) && !(seenPiece instanceof King)) {
                        moves.push(diagMove);
                    }
                }
            }
        }
        return moves;
    }
}
