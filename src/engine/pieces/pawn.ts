import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";
import PlayerMove from "../history";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Array<Square> {
        const moves: Array<Square> = [];
        const currentPosition: Square = board.findPiece(this);

        if (!board.isValidSquare(currentPosition)) {
            return moves;
        }

        const direction = this.player === Player.WHITE ? 1 : -1;
        const startRow = this.player === Player.WHITE ? 1 : 6;
        const enPassantRow = this.player === Player.WHITE ? 4 : 3;
        const enemyStartRow = this.player === Player.WHITE ? 6 : 1;
        const enPassantCaptureRow = currentPosition.row + direction;

        const forwardMove = new Square(currentPosition.row + direction, currentPosition.col);
        if (board.isValidSquare(forwardMove) && board.getPiece(forwardMove) === undefined) {
            moves.push(forwardMove);

            if (currentPosition.row === startRow) {
                const forwardMove2 = new Square(currentPosition.row + 2 * direction, currentPosition.col);
                if (board.isValidSquare(forwardMove2) && board.getPiece(forwardMove2) === undefined) {
                    moves.push(forwardMove2);
                }
            }
        }

        moves.push(...this.captureDiagonals(board, currentPosition, direction));

        if (currentPosition.row === enPassantRow) {
            const lastMove: PlayerMove = board.moveHistory[board.moveHistory.length - 1];
            if (lastMove?.piece instanceof Pawn) {
                const colDiff = Math.abs(lastMove.finalPosition.col - currentPosition.col);
                if (
                    colDiff === 1 &&
                    lastMove.initialPosition.row === enemyStartRow &&
                    lastMove.finalPosition.row === enPassantRow
                ) {
                    moves.push(new Square(enPassantCaptureRow, lastMove.finalPosition.col));
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
