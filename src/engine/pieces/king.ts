import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const moves :Array<Square> = [];
        const currentPosition :Square = board.findPiece(this);

        if (!board.isValidSquare(currentPosition)) {
            return moves;
        }

        const directions = [
            [1, 0],    // up
            [-1, 0],   // down
            [0, 1],    // right
            [0, -1],   // left
            [1, 1],    // up-right
            [-1, -1],  // down-left
            [-1, 1],   // down-right
            [1, -1],   // up-left
        ];

        for (const [rowMove, colMove] of directions) {
            const newMove :Square = new Square(currentPosition.row + rowMove,
                                               currentPosition.col + colMove);
            if (!board.isValidSquare(newMove)) {
                continue;
            }
            if (board.getPiece(newMove) == undefined) {
                moves.push(newMove);
            } else {
                const seenPiece :Piece|undefined = board.getPiece(newMove);
                if (seenPiece?.player !== this.player) {
                    if (!(seenPiece instanceof King)) {
                        moves.push(newMove);
                    }
                }
            }
        }
        return moves;
    }
}
