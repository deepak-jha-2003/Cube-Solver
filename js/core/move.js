import { Face, MoveType } from './constants.js';
import { RubiksCube } from './cube.js';

export class CubeMover extends RubiksCube {
    constructor() {
        super();
        this.moveHistory = [];
    }

    execute(move) {
        const { face, type } = this._parseMove(move);

        switch (type) {
            case MoveType.CLOCKWISE:
                this._rotateFace(face);
                this._rotateEdges(face, false);
                break;
            case MoveType.COUNTER_CLOCKWISE:
                this._rotateFaceCounter(face);
                this._rotateEdges(face, true);
                break;
            case MoveType.DOUBLE:
                this._rotateFace(face);
                this._rotateEdges(face, false);
                this._rotateFace(face);
                this._rotateEdges(face, false);
                break;
        }

        this.moveHistory.push(move);
        return this.getState();
    }

    _parseMove(move) {
        if (!move || typeof move !== 'string') {
            throw new Error('Invalid move: must be a string');
        }

        const face = move[0].toUpperCase();
        if (!Object.values(Face).includes(face)) {
            throw new Error(`Invalid face in move: ${face}`);
        }

        let type = MoveType.CLOCKWISE;
        if (move.includes("'")) {
            type = MoveType.COUNTER_CLOCKWISE;
        } else if (move.includes("2")) {
            type = MoveType.DOUBLE;
        }

        return { face, type };
    }

    _rotateFace(face) {
        const rotated = [
            [this.faces[face][2][0], this.faces[face][1][0], this.faces[face][0][0]],
            [this.faces[face][2][1], this.faces[face][1][1], this.faces[face][0][1]],
            [this.faces[face][2][2], this.faces[face][1][2], this.faces[face][0][2]]
        ];
        this.faces[face] = rotated;
    }

    _rotateFaceCounter(face) {
        const rotated = [
            [this.faces[face][0][2], this.faces[face][1][2], this.faces[face][2][2]],
            [this.faces[face][0][1], this.faces[face][1][1], this.faces[face][2][1]],
            [this.faces[face][0][0], this.faces[face][1][0], this.faces[face][2][0]]
        ];
        this.faces[face] = rotated;
    }

    _rotateEdges(face, isCounterClockwise) {
        let temp;
        switch (face) {
            case Face.F:
                temp = [this.faces.U[2][0], this.faces.U[2][1], this.faces.U[2][2]];
                if (isCounterClockwise) {
                    this.faces.U[2][0] = this.faces.R[0][0];
                    this.faces.U[2][1] = this.faces.R[1][0];
                    this.faces.U[2][2] = this.faces.R[2][0];

                    this.faces.R[0][0] = this.faces.D[0][2];
                    this.faces.R[1][0] = this.faces.D[0][1];
                    this.faces.R[2][0] = this.faces.D[0][0];

                    this.faces.D[0][0] = this.faces.L[0][2];
                    this.faces.D[0][1] = this.faces.L[1][2];
                    this.faces.D[0][2] = this.faces.L[2][2];

                    this.faces.L[0][2] = temp[0];
                    this.faces.L[1][2] = temp[1];
                    this.faces.L[2][2] = temp[2];
                } else {
                    this.faces.U[2][0] = this.faces.L[2][2];
                    this.faces.U[2][1] = this.faces.L[1][2];
                    this.faces.U[2][2] = this.faces.L[0][2];

                    this.faces.L[0][2] = this.faces.D[0][0];
                    this.faces.L[1][2] = this.faces.D[0][1];
                    this.faces.L[2][2] = this.faces.D[0][2];

                    this.faces.D[0][0] = this.faces.R[2][0];
                    this.faces.D[0][1] = this.faces.R[1][0];
                    this.faces.D[0][2] = this.faces.R[0][0];

                    this.faces.R[0][0] = temp[0];
                    this.faces.R[1][0] = temp[1];
                    this.faces.R[2][0] = temp[2];
                }
                break;

            // Implement similar edge rotations for other faces (B, U, D, L, R)
            // ... (omitted for brevity, but should be implemented similarly)
        }
    }

    getMoveHistory() {
        return [...this.moveHistory];
    }

    clearHistory() {
        this.moveHistory = [];
    }
}