export default class CubeRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container element not found: ${containerId}`);
        }
    }

    render(cubeState) {
        if (!cubeState || !cubeState.stringRepresentation) {
            throw new Error('Invalid cube state');
        }

        this.container.innerHTML = '';
        const cubeElement = this._createCubeElement(cubeState);
        this.container.appendChild(cubeElement);
    }

    _createCubeElement(cubeState) {
        const svgString = this._getCubeSvg(cubeState.stringRepresentation);
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString, 'image/svg+xml');
        return doc.documentElement;
    }

    _getCubeSvg(colorString) {
        const faceSize = 60;
        const spacing = 5;
        const width = faceSize * 4 + spacing * 3;
        const height = faceSize * 3 + spacing * 2;

        let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
        svg += `<rect width="${width}" height="${height}" fill="#f0f0f0"/>`;

        // Extract face colors
        const faces = {
            U: colorString.substr(0, 9),
            L: colorString.substr(9, 9),
            F: colorString.substr(18, 9),
            R: colorString.substr(27, 9),
            B: colorString.substr(36, 9),
            D: colorString.substr(45, 9)
        };

        // Draw each face
        svg += this._drawFace(faces.U, faceSize, 0, 'U');
        svg += this._drawFace(faces.L, 0, faceSize, 'L');
        svg += this._drawFace(faces.F, faceSize, faceSize, 'F');
        svg += this._drawFace(faces.R, faceSize * 2, faceSize, 'R');
        svg += this._drawFace(faces.B, faceSize * 3, faceSize, 'B');
        svg += this._drawFace(faces.D, faceSize, faceSize * 2, 'D');

        svg += `</svg>`;
        return svg;
    }

    _drawFace(faceColors, x, y, label) {
        const cellSize = 20;
        const padding = 2;
        const totalSize = cellSize * 3 + padding * 2;

        let faceSvg = `<g transform="translate(${x}, ${y})">`;
        faceSvg += `<rect x="0" y="0" width="${totalSize}" height="${totalSize}" fill="#333" rx="3"/>`;

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const color = faceColors.charAt(row * 3 + col);
                const colorName = this._getColorName(color);
                const cx = col * (cellSize + padding) + padding;
                const cy = row * (cellSize + padding) + padding;

                faceSvg += `<rect x="${cx}" y="${cy}" width="${cellSize}" height="${cellSize}" fill="${colorName}" stroke="#333" stroke-width="1"/>`;
            }
        }

        faceSvg += `<text x="${totalSize / 2}" y="${totalSize + 15}" text-anchor="middle" font-size="12" fill="#333">${label}</text>`;
        faceSvg += `</g>`;

        return faceSvg;
    }

    _getColorName(color) {
        const colors = {
            'w': 'white',
            'y': 'yellow',
            'g': 'green',
            'b': 'blue',
            'o': 'orange',
            'r': 'red'
        };
        return colors[color] || 'gray';
    }
}