import Player from "./player";
import Piece from "./pieces/piece";
import Square from "./square";

export default class MovesHistory {
    private _currentPlayer: Player;
    private _piece: Piece|undefined;
    private _initialPosition :Square;
    private _FinalPosition :Square;

    public constructor(currentPlayer: Player, piece: Piece|undefined, initialPosition :Square, FinalPosition :Square) {
        this._initialPosition = initialPosition;
        this._FinalPosition = FinalPosition;
        this._currentPlayer = currentPlayer;
        this._piece = piece;
    }

    get currentPlayer(): Player {
        return this._currentPlayer;
    }

    set currentPlayer(value: Player) {
        this._currentPlayer = value;
    }

    get piece(): Piece|undefined {
        return this._piece;
    }

    set piece(value: Piece|undefined) {
        this._piece = value;
    }

    get initialPosition(): Square {
        return this._initialPosition;
    }

    set initialPosition(value: Square) {
        this._initialPosition = value;
    }

    get FinalPosition(): Square {
        return this._FinalPosition;
    }

    set FinalPosition(value: Square) {
        this._FinalPosition = value;
    }
}
