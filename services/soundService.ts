
let eatAudio: HTMLAudioElement | null = null;
let gameOverAudio: HTMLAudioElement | null = null;

if (typeof window !== 'undefined') {
    const eatSound_b64 = "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU Veevo=";
    const gameOverSound_b64 = "data:audio/wav;base64,UklGRkIBAABXQVZFZm10IBAAAAABAAIARKwAABCxAgAEABAAZGF0YTVhAQAGNwEAGQcBAAY3AQAaBwEAGjcBABoHAQAZNwEAGgcBABo3AQAaBwEAGjcBABoHAQAZNwEAGQcBABk3AQAZBwEAGTcBABkHAQAZNwEAGQcBABk3AQAaBwEAGjcBABoHAQAZNwEAGgcBABo3AQAaBwEAGjcBABoHAQAZNwEAGQcBABk3AQAaBwEAGjcBABoHAQAZNwEAGgcBABo3AQAaBwEAGjcBABoH";
    
    eatAudio = new Audio(eatSound_b64);
    eatAudio.volume = 0.3;
    gameOverAudio = new Audio(gameOverSound_b64);
    gameOverAudio.volume = 0.4;
}

export const playEatSound = () => {
    if (eatAudio) {
        eatAudio.currentTime = 0;
        eatAudio.play().catch(e => console.error("Error playing eat sound:", e));
    }
};

export const playGameOverSound = () => {
    if (gameOverAudio) {
        gameOverAudio.currentTime = 0;
        gameOverAudio.play().catch(e => console.error("Error playing game over sound:", e));
    }
};
