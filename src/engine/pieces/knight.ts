import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Knight extends Piece {
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
            [2, 1],    // up 2, right 1
            [1, 2],    // up 1, right 2
            [-1, 2],   // down 1, right 2
            [-2, 1],   // down 2, right 1
            [-2, -1],  // down 2, left 1
            [-1, -2],  // down 1, left 2
            [1, -2],   // up 1, left 2
            [2, -1],   // up 2, left 1
        ];

        for (const [rowMove, colMove] of directions) {
            const newMove :Square = new Square(currentPosition.row + rowMove,
                                               currentPosition.col + colMove);
            if (board.isValidSquare(newMove) && (board.getPiece(newMove) == undefined)) {
                moves.push(newMove);
            }
        }
        return moves;
    }
}
