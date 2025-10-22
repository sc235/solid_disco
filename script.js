class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0, draw: 0 };
        this.gameMode = 'two-players'; // 'two-players' ou 'vs-computer'
        this.difficulty = 'medium'; // 'easy', 'medium', 'hard'
        this.isComputerTurn = false;
        this.moveHistory = [];
        this.gameStartTime = null;
        this.gameTime = 0;
        this.gamesPlayed = 0;
        this.gameHistory = [];
        
        this.initializeGame();
    }

    initializeGame() {
        this.gameBoard = document.getElementById('game-board');
        this.gameStatus = document.getElementById('game-status');
        this.restartBtn = document.getElementById('restart-btn');
        this.undoBtn = document.getElementById('undo-btn');
        this.hintBtn = document.getElementById('hint-btn');
        this.scoreX = document.getElementById('score-x');
        this.scoreO = document.getElementById('score-o');
        this.scoreDraw = document.getElementById('score-draw');
        this.gamesPlayedEl = document.getElementById('games-played');
        this.gameTimeEl = document.getElementById('game-time');
        this.gameModeSelect = document.getElementById('game-mode');
        this.difficultySelect = document.getElementById('difficulty');
        this.difficultySelector = document.getElementById('difficulty-selector');
        this.gameHistoryEl = document.getElementById('game-history');
        this.historyList = document.getElementById('history-list');

        this.setupEventListeners();
        this.updateGameStatus();
        this.updateScores();
        this.updateStats();
        this.loadGameData();
    }

    setupEventListeners() {
        // Ajouter les événements de clic sur chaque cellule
        this.gameBoard.addEventListener('click', (e) => {
            if (e.target.classList.contains('cell')) {
                this.handleCellClick(e.target);
            }
        });

        // Bouton rejouer
        this.restartBtn.addEventListener('click', () => {
            this.restartGame();
        });

        // Sélecteur de mode de jeu
        this.gameModeSelect.addEventListener('change', (e) => {
            this.gameMode = e.target.value;
            this.difficultySelector.style.display = this.gameMode === 'vs-computer' ? 'block' : 'none';
            this.restartGame();
        });

        // Sélecteur de difficulté
        this.difficultySelect.addEventListener('change', (e) => {
            this.difficulty = e.target.value;
        });

        // Bouton annuler
        this.undoBtn.addEventListener('click', () => {
            this.undoMove();
        });

        // Bouton aide
        this.hintBtn.addEventListener('click', () => {
            this.showHint();
        });
    }

    handleCellClick(cell) {
        // Empêcher le clic si c'est le tour de l'ordinateur
        if (this.isComputerTurn) return;
        
        const index = parseInt(cell.dataset.index);
        
        // Vérifier si la cellule est vide et si le jeu est actif
        if (this.board[index] === '' && this.gameActive) {
            this.makeMove(index);
        }
    }

    makeMove(index) {
        // Enregistrer le mouvement dans l'historique
        this.moveHistory.push({
            index: index,
            player: this.currentPlayer,
            board: [...this.board]
        });

        // Placer le symbole du joueur
        this.board[index] = this.currentPlayer;
        this.gameBoard.children[index].textContent = this.currentPlayer;
        this.gameBoard.children[index].classList.add(this.currentPlayer.toLowerCase());

        // Mettre à jour les boutons
        this.updateButtons();

        // Vérifier s'il y a une victoire
        if (this.checkWin(index)) {
            this.handleWin();
            return;
        }

        // Vérifier s'il y a un match nul
        if (this.checkDraw()) {
            this.handleDraw();
            return;
        }

        // Changer de joueur
        this.switchPlayer();
        this.updateGameStatus();

        // Si c'est le mode contre l'ordinateur et que c'est le tour de l'ordinateur
        if (this.gameMode === 'vs-computer' && this.currentPlayer === 'O' && this.gameActive) {
            this.isComputerTurn = true;
            // Délai pour que l'utilisateur voie le changement de tour
            setTimeout(() => {
                this.computerMove();
            }, 500);
        }
    }

    computerMove() {
        if (!this.gameActive || this.isComputerTurn === false) return;

        let moveIndex = this.findBestMove();
        
        // Si pas de coup optimal, choisir une case aléatoire
        if (moveIndex === -1) {
            const emptyCells = this.board.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
            if (emptyCells.length > 0) {
                moveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            }
        }

        if (moveIndex !== -1) {
            this.makeMove(moveIndex);
        }
        
        this.isComputerTurn = false;
    }

    findBestMove() {
        if (this.difficulty === 'easy') {
            return this.findRandomMove();
        } else if (this.difficulty === 'medium') {
            return this.findMediumMove();
        } else {
            return this.findHardMove();
        }
    }

    findRandomMove() {
        const emptyCells = this.board.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
        return emptyCells.length > 0 ? emptyCells[Math.floor(Math.random() * emptyCells.length)] : -1;
    }

    findMediumMove() {
        // Vérifier d'abord si l'ordinateur peut gagner
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'O';
                if (this.checkWin(i)) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }

        // Bloquer le joueur s'il peut gagner
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'X';
                if (this.checkWin(i)) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }

        // Priorité au centre
        if (this.board[4] === '') return 4;

        // Priorité aux coins
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(corner => this.board[corner] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }

        // Priorité aux côtés
        const sides = [1, 3, 5, 7];
        const availableSides = sides.filter(side => this.board[side] === '');
        if (availableSides.length > 0) {
            return availableSides[Math.floor(Math.random() * availableSides.length)];
        }

        return -1;
    }

    findHardMove() {
        // Utiliser l'algorithme minimax pour le niveau difficile
        let bestScore = -Infinity;
        let bestMove = -1;

        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'O';
                const score = this.minimax(this.board, 0, false);
                this.board[i] = '';
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }

    minimax(board, depth, isMaximizing) {
        const winner = this.getWinner(board);
        
        if (winner === 'O') return 10 - depth;
        if (winner === 'X') return depth - 10;
        if (this.isBoardFull(board)) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    const score = this.minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    const score = this.minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    getWinner(board) {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
            [0, 4, 8], [2, 4, 6]              // Diagonales
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }

    isBoardFull(board) {
        return board.every(cell => cell !== '');
    }

    checkWin(index) {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
            [0, 4, 8], [2, 4, 6]              // Diagonales
        ];

        return winConditions.some(condition => {
            const [a, b, c] = condition;
            return this.board[a] !== '' &&
                   this.board[a] === this.board[b] &&
                   this.board[a] === this.board[c];
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    handleWin() {
        this.gameActive = false;
        this.isComputerTurn = false;
        this.scores[this.currentPlayer]++;
        this.updateScores();
        
        // Mettre en évidence les cellules gagnantes
        this.highlightWinningCells();
        
        const winnerText = this.gameMode === 'vs-computer' && this.currentPlayer === 'O' 
            ? 'L\'ordinateur a gagné !' 
            : `Joueur ${this.currentPlayer} a gagné !`;
            
        this.gameStatus.textContent = winnerText;
        this.gameStatus.style.background = '#d4edda';
        this.gameStatus.style.borderLeftColor = '#28a745';
        this.gameStatus.style.color = '#155724';
        this.endGame(this.currentPlayer);
    }

    handleDraw() {
        this.gameActive = false;
        this.isComputerTurn = false;
        this.scores.draw++;
        this.updateScores();
        this.gameStatus.textContent = 'Match nul !';
        this.gameStatus.style.background = '#fff3cd';
        this.gameStatus.style.borderLeftColor = '#ffc107';
        this.gameStatus.style.color = '#856404';
        this.endGame('draw');
    }

    highlightWinningCells() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
            [0, 4, 8], [2, 4, 6]              // Diagonales
        ];

        winConditions.forEach(condition => {
            const [a, b, c] = condition;
            if (this.board[a] !== '' &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]) {
                
                // Ajouter la classe winning aux cellules gagnantes
                this.gameBoard.children[a].classList.add('winning');
                this.gameBoard.children[b].classList.add('winning');
                this.gameBoard.children[c].classList.add('winning');
            }
        });
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    updateGameStatus() {
        if (this.gameActive) {
            let statusText = '';
            if (this.gameMode === 'vs-computer') {
                if (this.currentPlayer === 'X') {
                    statusText = 'Votre tour (X)';
                } else {
                    statusText = 'Tour de l\'ordinateur (O)';
                }
            } else {
                statusText = `Tour du joueur ${this.currentPlayer}`;
            }
            
            this.gameStatus.textContent = statusText;
            this.gameStatus.style.background = '#e3f2fd';
            this.gameStatus.style.borderLeftColor = '#2196f3';
            this.gameStatus.style.color = '#333';
        }
    }

    updateScores() {
        this.scoreX.textContent = this.scores.X;
        this.scoreO.textContent = this.scores.O;
        this.scoreDraw.textContent = this.scores.draw;
    }

    updateStats() {
        this.gamesPlayedEl.textContent = this.gamesPlayed;
        this.gameTimeEl.textContent = this.formatTime(this.gameTime);
    }

    updateButtons() {
        this.undoBtn.disabled = this.moveHistory.length === 0 || !this.gameActive;
        this.hintBtn.disabled = !this.gameActive || this.gameMode === 'two-players';
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    startGameTimer() {
        this.gameStartTime = Date.now();
        this.timerInterval = setInterval(() => {
            this.gameTime = Math.floor((Date.now() - this.gameStartTime) / 1000);
            this.updateStats();
        }, 1000);
    }

    stopGameTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    endGame(result) {
        this.stopGameTimer();
        this.gamesPlayed++;
        this.updateStats();
        
        // Enregistrer dans l'historique
        this.gameHistory.push({
            result: result,
            time: this.gameTime,
            moves: this.moveHistory.length,
            date: new Date().toLocaleString()
        });
        
        this.updateGameHistory();
        this.saveGameData();
        this.updateButtons();
    }

    undoMove() {
        if (this.moveHistory.length === 0 || !this.gameActive) return;
        
        const lastMove = this.moveHistory.pop();
        this.board[lastMove.index] = '';
        this.gameBoard.children[lastMove.index].textContent = '';
        this.gameBoard.children[lastMove.index].classList.remove('x', 'o', 'winning');
        
        this.currentPlayer = lastMove.player;
        this.isComputerTurn = false;
        this.updateGameStatus();
        this.updateButtons();
    }

    showHint() {
        if (!this.gameActive || this.gameMode === 'two-players') return;
        
        const bestMove = this.findBestMove();
        if (bestMove !== -1) {
            this.gameBoard.children[bestMove].style.boxShadow = '0 0 20px #ffc107';
            setTimeout(() => {
                this.gameBoard.children[bestMove].style.boxShadow = '';
            }, 2000);
        }
    }

    updateGameHistory() {
        this.historyList.innerHTML = '';
        this.gameHistory.slice(-5).reverse().forEach(game => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <strong>${game.result === 'draw' ? 'Match nul' : `Gagnant: ${game.result}`}</strong><br>
                <small>Temps: ${this.formatTime(game.time)} | Coups: ${game.moves} | ${game.date}</small>
            `;
            this.historyList.appendChild(historyItem);
        });
        
        this.gameHistoryEl.style.display = this.gameHistory.length > 0 ? 'block' : 'none';
    }

    saveGameData() {
        const gameData = {
            scores: this.scores,
            gamesPlayed: this.gamesPlayed,
            gameHistory: this.gameHistory.slice(-10) // Garder seulement les 10 dernières parties
        };
        localStorage.setItem('ticTacToeData', JSON.stringify(gameData));
    }

    loadGameData() {
        const savedData = localStorage.getItem('ticTacToeData');
        if (savedData) {
            const gameData = JSON.parse(savedData);
            this.scores = gameData.scores || { X: 0, O: 0, draw: 0 };
            this.gamesPlayed = gameData.gamesPlayed || 0;
            this.gameHistory = gameData.gameHistory || [];
            this.updateScores();
            this.updateStats();
            this.updateGameHistory();
        }
    }

    restartGame() {
        // Arrêter le timer si en cours
        this.stopGameTimer();
        
        // Réinitialiser le plateau
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.isComputerTurn = false;
        this.moveHistory = [];
        this.gameTime = 0;

        // Réinitialiser l'affichage
        const cells = this.gameBoard.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
            cell.style.boxShadow = '';
        });

        // Réinitialiser le statut du jeu
        this.updateGameStatus();
        this.updateButtons();
        this.updateStats();
        
        // Démarrer le timer
        this.startGameTimer();
    }
}

// Initialiser le jeu quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
