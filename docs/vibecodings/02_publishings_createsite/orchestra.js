/*
 * Orchestra.js
 * Logic for the Novel Writing Interface
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Orchestra.js initialized: Novel Writing Interface');

    // --- Tool Sidebar Logic ---
    const toolButtons = document.querySelectorAll('.tools-nav .btn-link');
    const toolPanel = document.querySelector('.tool-panel');

    toolButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            toolButtons.forEach(b => b.classList.remove('active-tool'));

            // Add active class to clicked button
            const clickedBtn = e.currentTarget;
            clickedBtn.classList.add('active-tool');

            // Update Panel Content (Mockup Logic)
            const toolTitle = clickedBtn.getAttribute('title');
            if (toolPanel) {
                // In a real app, this would load specific content. 
                // For now, we just update the header to show it works.
                const header = toolPanel.querySelector('h6');
                if (header) header.textContent = toolTitle;
            }
        });
    });

    // --- Editor Toolbar Logic (Basic WYSIWYG) ---
    const editorBody = document.querySelector('.editor-body');

    const execCmd = (command, value = null) => {
        document.execCommand(command, false, value);
        editorBody.focus();
    };

    // Bind toolbar buttons
    // Bold
    document.querySelector('.bi-type-bold')?.closest('button').addEventListener('click', () => execCmd('bold'));
    // Italic
    document.querySelector('.bi-type-italic')?.closest('button').addEventListener('click', () => execCmd('italic'));
    // Underline
    document.querySelector('.bi-type-underline')?.closest('button').addEventListener('click', () => execCmd('underline'));
    // Strikethrough
    document.querySelector('.bi-type-strikethrough')?.closest('button').addEventListener('click', () => execCmd('strikeThrough'));

    // Alignment
    document.querySelector('.bi-text-left')?.closest('button').addEventListener('click', () => execCmd('justifyLeft'));
    document.querySelector('.bi-text-center')?.closest('button').addEventListener('click', () => execCmd('justifyCenter'));
    document.querySelector('.bi-text-right')?.closest('button').addEventListener('click', () => execCmd('justifyRight'));

    // --- Word Count Logic (Simple) ---
    const wordCountBadge = document.querySelector('.editor-footer .badge');

    const updateWordCount = () => {
        if (!editorBody || !wordCountBadge) return;
        const text = editorBody.innerText || '';
        const count = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        wordCountBadge.textContent = `${count} words`;
    };

    if (editorBody) {
        editorBody.addEventListener('input', updateWordCount);
    }
});
