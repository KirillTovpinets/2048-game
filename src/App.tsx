import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { GameStore } from './classes/Game';
import ActiveCell from './components/ActiveCell';
import { FIELD_CELLS_IN_ROW, KEYBOARD_KEYS } from './constants';
import { GameContext } from './contexts';
import * as S from './styles/App.styles';

function App() {
  const rows: JSX.Element[] = [];
  const game = useContext<GameStore>(GameContext);
  const activeColls: React.JSX.Element[] = game.cells.map((cell) => (
    <ActiveCell key={cell.id} {...cell} />
  ));

  useEffect(() => {
    if (!game) {
      return;
    }
    const handler = ({ code }: KeyboardEvent) => {
      if (!KEYBOARD_KEYS.includes(code)) {
        return;
      }
      game.moveCells(code);
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [game]);
  for (let i = 0; i < FIELD_CELLS_IN_ROW; i++) {
    const colls: JSX.Element[] = [];
    for (let j = 0; j < FIELD_CELLS_IN_ROW; j++) {
      colls.push(<S.GameCell key={j} />);
    }
    rows.push(<S.GameRow key={i}>{colls}</S.GameRow>);
  }

  return (
    <S.App>
      <S.GameField>
        {rows}
        <S.ActiveCellsContainer>{activeColls}</S.ActiveCellsContainer>
      </S.GameField>
    </S.App>
  );
}

const ObserverApp = observer(App);

export default ObserverApp;
