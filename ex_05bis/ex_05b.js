document.addEventListener("DOMContentLoaded", () => {
    const character = document.getElementById('character');
    let keyState = {};
    let x = 0;
 
    window.addEventListener('keydown', (e) => keyState[e.key] = true);
    window.addEventListener('keyup', (e) => keyState[e.key] = false);
 
    function gameLoop() {
        let move = 0;
        if (keyState['ArrowLeft']) {
            move = -5;
            character.style.animation = 'walk 600ms steps(6) infinite';
            character.style.transform = 'scaleX(-1)'; // Flip the character to the left
        } else if (keyState['ArrowRight']) {
            move = 5;
            character.style.animation = 'walk 600ms steps(6) infinite';
            character.style.transform = 'scaleX(1)'; // Flip the character to the right
        } else {
            character.style.animation = 'none';
        }
 
        x += move;
        character.style.left = `${x}px`;
 
        requestAnimationFrame(gameLoop);
    }
 
    gameLoop();
})
