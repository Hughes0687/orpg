export function createGameState() {
  return {
    player: {
      name: "Adventurer",
      hp: 100,
      maxHp: 100,
      inventory: [],
    },
    currentRoom: "tavern",
    gameOver: false,
  };
}
