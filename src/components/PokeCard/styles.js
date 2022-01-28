import styled from 'styled-components';

export const ContainerBody = styled.div`
  display: flex;
  width: 100%;
  height: 110px;
  flex-direction: column;
  padding: 10px;

  background: ${props => props.theme.colors.cards};
  margin: 5px 0;
  border-radius: 10px;
  position: relative;
  cursor: pointer;

  :hover {
    background-color: ${props => props.theme.colors.cardHover};
  }

  border-color: ${props => props.theme.colors.button};
  border-width: 3px;
  ${props => props.select ?
  `
    border-style: solid;
    
  ` 
  :
  ''}
`;

export const PokeImage = styled.img`
  width: fit-content;
  position: absolute;
  right: 0px;
  top: 15px;
`;

export const PokeName = styled.b`
  text-transform: capitalize;
  color: ${props => props.theme.colors.text};
`;

export const ContainerPokeType = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PokeType = styled.span`
  text-transform: capitalize;
  background-color: rgba(255,255,255,0.2);
  padding: 5px 10px;
  border-radius: 10px;
  margin-right: 5px;
  color: white;
  font-size: 0.7rem;
  margin-bottom: 4px;
  width: 60px;
  text-align: center;
`;