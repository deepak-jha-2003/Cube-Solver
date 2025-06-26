import { Face } from '../core/constants.js';

export class CubeSolver {
    constructor(cube) {
        if (!cube) {
            throw new Error('Cube instance is required');
        }
        this.cube = cube;
        this.solutionSteps = [];
    }

    solve() {
        this.solutionSteps = [];

        if (this.cube.isSolved()) {
            return {
                steps: [],
                success: true,
                message: 'Cube is already solved'
            };
        }

        try {
            this._solveCross();
            this._solveF2L();
            this._solveOLL();
            this._solvePLL();

            return {
                steps: [...this.solutionSteps],
                success: this.cube.isSolved(),
                message: this.cube.isSolved() ? 'Cube solved successfully' : 'Failed to solve cube'
            };
        } catch (error) {
            return {
                steps: [...this.solutionSteps],
                success: false,
                message: `Error during solving: ${error.message}`
            };
        }
    }

    _solveCross() {
        this._executeMoveSequence(["F", "R", "U", "R'", "U'", "F'"]);
    }

    _solveF2L() {
        this._executeMoveSequence(["U", "R", "U'", "R'", "U'", "F'", "U", "F"]);
    }

    _solveOLL() {
        this._executeMoveSequence(["F", "R", "U", "R'", "U'", "F'"]);
    }

    _solvePLL() {
        this._executeMoveSequence(["R", "U", "R'", "U'", "R'", "F", "R", "R", "U'", "R'", "U'", "R", "U", "R'", "F'"]);
    }

    _executeMoveSequence(moves) {
        moves.forEach(move => {
            this.cube.execute(move);
            this.solutionSteps.push(move);
        });
    }
}