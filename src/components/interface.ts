export interface IDynamicObject {
  [key: string]: any;
}

export interface ISubmitGuess {
  guess: number;
  gameId: string;
}
