function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            winnerBlock: 'newGame',
            newGame:1,
            disableHeal:true
        }
    },

    watch: {
        playerHealth(value) {
            if (value < 100) {
                this.disableHeal = false;
            }
            if(value <= 0 && this.monsterHealth <= 0) {
                this.winnerBlock = 'result';
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winnerBlock = 'result';
                this.playerHealth = 0;
                this.winner = 'Monster';
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
                this.winnerBlock = 'result';
            } else if (value <= 0) {
                this.winnerBlock = 'result';
                this.monsterHealth = 0;
                this.winner = 'Player';
            }
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(12, 5);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(15, 8);
            this.playerHealth -= attackValue;
        },
        specialAttack() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();      
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();      
        },
        startNewGame() {
            this.playerHealth= 100;
            this.monsterHealth= 100;
            this.currentRound= 0;
            this.winner= null;
            this.winnerBlock = 'continue';
            this.disableHeal = true
        },
        surrnder() {
            this.winnerBlock = 'result';
            this.winner = 'Monster';
        }
    },
    computed: {
        monsterBarStyle() {
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyle() {
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    }
})

app.mount('#game');