/*
 * Orchestra.js
 * Logic for the Orchestra Canvas simulation
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('.orchestra-canvas');
    if (!canvas) return;

    // --- Node Dragging Logic ---
    let activeNode = null;
    let offsetX = 0;
    let offsetY = 0;

    const startDrag = (e) => {
        activeNode = e.target.closest('.canvas-node');
        if (activeNode) {
            e.preventDefault();
            activeNode.style.cursor = 'grabbing';
            offsetX = e.clientX - activeNode.offsetLeft;
            offsetY = e.clientY - activeNode.offsetTop;
            document.addEventListener('mousemove', dragNode);
            document.addEventListener('mouseup', endDrag);
        }
    };

    const dragNode = (e) => {
        if (activeNode) {
            e.preventDefault();
            activeNode.style.left = `${e.clientX - offsetX}px`;
            activeNode.style.top = `${e.clientY - offsetY}px`;
            updateConnections();
        }
    };

    const endDrag = () => {
        if (activeNode) {
            activeNode.style.cursor = 'grab';
            activeNode = null;
            document.removeEventListener('mousemove', dragNode);
            document.removeEventListener('mouseup', endDrag);
        }
    };

    canvas.addEventListener('mousedown', startDrag);

    // --- SVG Line Connection Logic ---
    const updateConnections = () => {
        connectNodes('node-world', 'node-plot', 'line1');
        connectNodes('node-plot', 'node-write', 'line2');
        connectNodes('node-write', 'node-critique', 'line3');
    };

    const connectNodes = (fromId, toId, lineId) => {
        const fromNode = document.getElementById(fromId);
        const toNode = document.getElementById(toId);
        const line = document.getElementById(lineId);

        if (fromNode && toNode && line) {
            const fromRect = fromNode.getBoundingClientRect();
            const toRect = toNode.getBoundingClientRect();
            const canvasRect = canvas.getBoundingClientRect();

            // Calculate center points relative to the canvas
            const fromX = fromRect.left + fromRect.width / 2 - canvasRect.left;
            const fromY = fromRect.top + fromRect.height / 2 - canvasRect.top;
            const toX = toRect.left + toRect.width / 2 - canvasRect.left;
            const toY = toRect.top + toRect.height / 2 - canvasRect.top;

            line.setAttribute('x1', fromX);
            line.setAttribute('y1', fromY);
            line.setAttribute('x2', toX);
            line.setAttribute('y2', toY);
        }
    };

    // Initial connection update
    setTimeout(updateConnections, 100); // Timeout to ensure elements are rendered
    
    console.log('orchestra.js loaded and initialized.');
});
