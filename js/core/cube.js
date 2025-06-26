import { Face, FaceColors } from './constants.js';

export class RubiksCube {
    constructor() {
        this.reset();
    }

    reset() {
        this.faces = {};
        for (const face in Face) {
            this.faces[Face[face]] = this._createFace(Face[face]);
        }
    }

    _createFace(face) {
        const color = FaceColors[face];
        return Array(3).fill().map(() => Array(3).fill(color));
    }

    getFace(face) {
        if (!this.faces[face]) {
            throw new Error(`Invalid face: ${face}`);
        }
        return JSON.parse(JSON.stringify(this.faces[face]));
    }

    getState() {
        return {
            faces: JSON.parse(JSON.stringify(this.faces)),
            stringRepresentation: this.toString()
        };
    }

    toString() {
        return Object.values(Face)
            .map(face => this.faces[face].flat().join(''))
            .join('');
    }

    isSolved() {
        for (const face in this.faces) {
            const color = this.faces[face][0][0];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (this.faces[face][i][j] !== color) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}