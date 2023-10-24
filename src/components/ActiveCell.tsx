import classNames from 'classnames';
import { FunctionComponent } from 'react';
import * as S from '../styles/App.styles';
import { Cell } from '../types';
interface ActiveCellProps extends Cell {}

const ActiveCell: FunctionComponent<ActiveCellProps> = ({
  value,
  color,
  x,
  y,
}) => {
  return (
    <S.ActiveCell
      $color={color}
      $x={x}
      $y={y}
      className={classNames(`cell-${x}-${y}`)}
    >
      {value}
    </S.ActiveCell>
  );
};

export default ActiveCell;
