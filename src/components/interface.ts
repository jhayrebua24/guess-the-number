export interface IDynamicObject {
  [key: string]: any;
}

export interface ISubmitGuess {
  guess: number;
  gameId: string;
}

export interface ISubmitFinal {
  gameId: string;
  packUrl: string;
  packInstructions: string;
  applicantId: string;
}
