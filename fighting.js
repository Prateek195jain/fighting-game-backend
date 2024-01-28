class Player {
  constructor(health, strength, attack, name) {
    this.health = health;
    this.strength = strength;
    this.attack = attack;
    this.name = name;
  }
}

// calculating dice number between 1-6
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function performAttack(attacker, defender) {
  const attackDiceRoll = rollDice();
  const defenseDiceRoll = rollDice();

  // calculating Damage done by the attacker
  const attackDamage = attackDiceRoll * attacker.attack;
  const defenseDamage = defenseDiceRoll * defender.strength;

  // This ensure that damageTaken by defender is always positive
  const damageTaken = Math.max(0, attackDamage - defenseDamage);
  defender.health -= damageTaken;

  console.log(`${attacker.name} attacks and rolls ${attackDiceRoll}.`);
  console.log(`${defender.name} defends and rolls ${defenseDiceRoll}.`);
  console.log(
    `Attack damage: ${attackDamage}, Defended damage: ${defenseDamage}`
  );
  console.log(
    `${defender.name} health reduced by ${damageTaken} to ${defender.health}\n`
  );
}

function startMatch(playerA, playerB) {
  while (playerA.health > 0 && playerB.health > 0) {
    // finding the attacker and defender
    if (playerA.health <= playerB.health) {
      performAttack(playerA, playerB);
      if (playerB.health <= 0) {
        console.log(`${playerA.name} wins!`);
        break;
      }
    }

    // It checks if player B is still in game
    if (playerB.health > 0) {
      performAttack(playerB, playerA);
      if (playerA.health <= 0) {
        console.log(`${playerB.name} wins!`);
        break;
      }
    }
  }
}

const playerA = new Player(50, 5, 10, "Player A");
const playerB = new Player(100, 10, 5, "Player B");

startMatch(playerA, playerB);
