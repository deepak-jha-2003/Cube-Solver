export class Controls {
    constructor(app) {
        this.app = app;
        this.manualMoveButtons = document.querySelectorAll('.rotation-buttons button');
        this.stepsContainer = document.getElementById('steps');
    }

    bindEvents() {
        document.getElementById('scramble').addEventListener('click', () => {
            this.app.scramble();
            this.updateSolutionSteps([]);
        });

        document.getElementById('solve').addEventListener('click', () => {
            const result = this.app.solve();
            this.updateSolutionSteps(result.steps, result.message);
        });

        document.getElementById('reset').addEventListener('click', () => {
            this.app.reset();
            this.updateSolutionSteps([], 'Cube reset to solved state');
        });

        this.manualMoveButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const move = e.target.dataset.move;
                this.app.cube.execute(move);
                this.app.render();
                this.updateSolutionSteps(this.app.cube.getMoveHistory());
            });
        });
    }

    updateSolutionSteps(steps, message = '') {
        this.stepsContainer.innerHTML = '';

        if (message) {
            const messageEl = document.createElement('div');
            messageEl.className = 'solution-message';
            messageEl.textContent = message;
            this.stepsContainer.appendChild(messageEl);
        }

        if (steps.length > 0) {
            const stepsTitle = document.createElement('div');
            stepsTitle.className = 'steps-title';
            stepsTitle.textContent = `Steps (${steps.length}):`;
            this.stepsContainer.appendChild(stepsTitle);

            const stepsList = document.createElement('div');
            stepsList.className = 'steps-list';
            stepsList.textContent = steps.join(' ');
            this.stepsContainer.appendChild(stepsList);
        }
    }
}