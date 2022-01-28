import styled from 'styled-components';

export const ContainerBody = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 70px);
  flex-direction: column;
  padding: 10px;

  margin: 5px 0;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  align-items: center;
`;

export const PokeImage = styled.img`
  width: 200px;
`;

export const PokeName = styled.h3`
  text-transform: capitalize;
  text-align: left;
  font-size: 1.5rem;
  font-family: monospace;
`;

export const ContainerPokeType = styled.div`
  width: 100%;
  display: flex;
`;

export const PokeType = styled.span`
  text-transform: capitalize;
  background-color: rgba(0,0,0,0.2);
  padding: 5px 15px;
  border-radius: 15px;
  margin-right: 5px;
`;

export const NavDetailsContainer = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  margin-bottom: 10px;
`;

export const BtnNavDetailsContainer = styled.div`
  padding: 10px;
  margin-right: 5px;
  cursor: pointer;
  border-color: ${props => props.theme.colors.header};
  ${props => props.select ?
  `
    font-weight: 600;
    border-bottom-style: solid;
    border-bottom-width: 2px;
  ` 
  :
  ''}
`;

export const ButtonAddRem = styled.button`
  width: 100%;
  background-color: ${props => props.theme.colors.button};
  border-radius: 5px;
  color: white;
  border: 0;
  transition: 300ms;
  cursor: pointer;
  padding: 5px;
  position: initial;
  bottom: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
  &:hover {
    background-color: ${props => props.theme.colors.buttonHover};
  }
  &:disabled {
    background-color: #343434;
  }
`;

export const BackButton = styled.button`
  background-color: rgba(255,255,255,0.2);
  color : white;
  border: 0;
  position: absolute;
  left: 10px;
  text-align: center;
  width: 60px;
  padding: 5px 10px;
  border-radius: 15px;
  display: none;

  &:hover: {
    background-color: #FFCC00 !important;
    text-decoration: underline;
  }
  @media(max-width: 800px) {
    display: block;
  }
`;