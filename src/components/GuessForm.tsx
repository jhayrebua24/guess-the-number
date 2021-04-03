/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable no-alert */
/* eslint-disable radix */
import { submitGuess } from "config";
import { FormEvent, useState } from "react";
import { IDynamicObject } from "components/interface";
import { storeStorage } from "helpers";
import { useNumberContext } from "./context";

function GuessForm(): JSX.Element {
  const {
    lowest,
    highest,
    gameId,
    setHighest,
    setLowest,
    viewMessage,
    resetGame,
  } = useNumberContext();
  const [guess, setGuess] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (guess > highest) alert(`GUESS NUMBER CANNOT BE MORE THAN ${highest}`);
    if (guess < lowest) alert(`GUESS NUMBER CANNOT BE LESS THAN ${lowest}`);
    setIsLoading(true);
    submitGuess({ guess, gameId })
      .then(({ data: { result, instructions } }) => {
        if (result === "lower") {
          setHighest(guess);
          viewMessage(`GO LOWER THAN ${guess.toLocaleString()}`);
          storeStorage("highest", guess?.toString());
          return;
        }
        if (result === "higher") {
          setLowest(guess);
          viewMessage(`GO HIGHER THAN ${guess.toLocaleString()}`);
          storeStorage("lowest", guess?.toString());
          return;
        }
        console.log(instructions);
        console.log(gameId, "game id");
        viewMessage(`CONGRATULATIONS! THE ANSWER IS ${guess.toLocaleString()}`);
        resetGame();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="number"
        className="bg-gray-100 p-4 text-lg w-56"
        min={lowest}
        value={guess > 0 ? guess : ""}
        onChange={(e) =>
          setGuess(parseInt((e.target as IDynamicObject).value) || 0)
        }
        max={highest}
        autoFocus
      />
      <button
        type="submit"
        disabled={isLoading}
        className="p-4 bg-red-400 text-white rounded hover:bg-red-500"
      >
        {isLoading ? "SUBMITTING..." : "SUBMIT NUMBER"}
      </button>
    </form>
  );
}

export default GuessForm;
