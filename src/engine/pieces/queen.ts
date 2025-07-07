import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Queen extends Piece {
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
            [0, 1],   // right
            [0, -1],  // left
            [1, 1],    // up-right
            [-1, -1],   // down-left
            [-1, 1],   // down-right
            [1, -1],  // up-left
        ];

        for (const [rowMove, colMove] of directions) {
            let row = currentPosition.row + rowMove;
            let col = currentPosition.col + colMove;

            while (board.isValidSquare(new Square(row, col))) {
                const nextSquare = new Square(row, col);
                if (board.getPiece(nextSquare) === undefined) {
                    moves.push(nextSquare);
                } else {
                    break;
                }
                row += rowMove;
                col += colMove;
            }
        }
        return moves;
    }
}
