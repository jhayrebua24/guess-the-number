import * as React from "react";
import { NumberContext } from "components/context";
import { fetchNewGameId } from "config";
import GuessForm from "components/GuessForm";
import { getNumberStorage, getStoredGameId, storeStorage } from "helpers";

function App(): JSX.Element {
  const [startGameLoading, setStartGameLoading] = React.useState(false);
  const [message, setMessage] = React.useState("START GUESSING");
  const [gameId, setGameId] = React.useState(getStoredGameId());
  const [highest, setHighest] = React.useState<number>(
    getNumberStorage("highest") || 1000000
  );
  const [lowest, setLowest] = React.useState<number>(
    getNumberStorage("lowest") || 0
  );

  /**
   * handles button click for start game and set return data from API
   * @return {Void}
   */
  const handleStartNewGame = () => {
    setStartGameLoading(true);
    fetchNewGameId()
      .then((res) => {
        const { data } = res;
        setGameId(data?.gameId);
        storeStorage("gameId", data?.gameId);
        setHighest(1000000);
        setLowest(0);
      })
      .catch((e) => console.log(e))
      .finally(() => setStartGameLoading(false));
  };
  /**
   * set message to be displayed on UI
   * @param  {String} msg message to be set on the state;
   * @return {Void}
   */
  const viewMessage = (msg: string): void => {
    setMessage(msg);
  };
  /**
   * reset the state values and storage to default;
   * @return {Void}
   */
  const resetGame = (): void => {
    setLowest(0);
    setHighest(1000000);
    storeStorage("highest", "1000000");
    storeStorage("lowest", "0");
    storeStorage("gameId", "");
  };

  // render text for button
  const newGameButtonText = React.useMemo<string>(() => {
    if (startGameLoading) {
      if (!gameId) return "STARTING...";
      return "RESTARTING...";
    }

    if (!gameId) return "START NEW GAME";
    return "RESTART GAME";
  }, [startGameLoading, gameId]);

  return (
    <NumberContext.Provider
      value={{
        gameId,
        setHighest,
        setLowest,
        viewMessage,
        lowest,
        highest,
        resetGame,
      }}
    >
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="flex-grow h-full w-full flex flex-col items-center py-12 space-y-8">
          <h1 className="font-thin text-6xl text-center">GUESS THE NUMBER!!</h1>
          {!gameId && (
            <h2 className="text-red-400 font-semibold text-3xl">
              START A NEW GAME TO PLAY
            </h2>
          )}
          {gameId && (
            <div className="text-left">
              <h2 className="font-semibold text-gray-600 text-2xl">
                RANGE: {lowest.toLocaleString()} - {highest.toLocaleString()}
              </h2>
              <h2 className="font-semibold text-red-400 text-2xl">
                ODDS: 1 of {(highest - lowest).toLocaleString()}
              </h2>
            </div>
          )}

          {gameId && (
            <>
              <h1 className="text-green-500 text-3xl text-center">{message}</h1>
              <GuessForm />
              <span className="text-center">or</span>
            </>
          )}
          <button
            type="button"
            className="p-4 bg-green-400 text-white rounded w-56 hover:bg-green-500"
            onClick={handleStartNewGame}
            disabled={startGameLoading}
          >
            {newGameButtonText}
          </button>
        </div>
      </div>
    </NumberContext.Provider>
  );
}

export default App;
