import styled from 'styled-components';

export const App = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const GameField = styled.div`
  width: 700px;
  background: #aaa;
  border-radius: 10px;
  height: 700px;
  padding: 10px;
  padding-bottom: 0px;
  position: relative;
`;

export const ActiveCellsContainer = styled(GameField)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: none;
`;

export const GameRow = styled.div`
  display: flex;
  gap: 10px;
  height: 25%;
  padding-bottom: 10px;
`;
export const GameCell = styled.div`
  flex-grow: 1;
  background: #ccc;
  border-radius: 10px;
`;

export const ActiveCell = styled(GameCell)<{
  $color: string;
  $x: number;
  $y: number;
}>`
  flex-grow: unset;
  width: 23.5%;
  height: 23.5%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(
    ${(props) => `calc(${props.$x} * 104.5%)`},
    ${(props) => `calc(${props.$y} * 104.5%)`}
  );
  transition: transform 0.3s ease-in-out;
  background-color: ${(props) => props.$color};
  font-size: 80px;
  fong-weight: 600;
`;
