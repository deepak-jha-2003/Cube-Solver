import { CubeMover } from './core/move.js';
import { CubeSolver } from './algorithms/solver.js';
import CubeRenderer from './ui/renderer.js';  // Default import
import { Controls } from './ui/controls.js';
import { Face } from './core/constants.js';

export class RubiksCubeApp {
    constructor() {
        this.cube = new CubeMover();
        this.solver = new CubeSolver(this.cube);
        this.renderer = new CubeRenderer('cube-svg');
        this.controls = new Controls(this);

        this.init();
    }

    init() {
        this.render();
        this.controls.bindEvents();
    }

    render() {
        this.renderer.render(this.cube.getState());
    }

    scramble() {
        const moves = this._generateScramble(20);
        this.cube.clearHistory();
        moves.forEach(move => this.cube.execute(move));
        this.render();
    }

    solve() {
        return this.solver.solve();
    }

    reset() {
        this.cube.reset();
        this.cube.clearHistory();
        this.render();
    }

    _generateScramble(length = 20) {
        const faces = Object.values(Face);
        const modifiers = ['', "'", '2'];
        const scramble = [];
        let lastFace = '';

        for (let i = 0; i < length; i++) {
            let face;
            do {
                face = faces[Math.floor(Math.random() * faces.length)];
            } while (face === lastFace);

            const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
            scramble.push(`${face}${modifier}`);
            lastFace = face;
        }

        return scramble;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RubiksCubeApp();
});