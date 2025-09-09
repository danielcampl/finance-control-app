import styled from 'styled-components';

export const Table = styled.table`
width: 100%;
background-color: #f1f2f6;
box-shadow: 0 0 5px #ccc;
max-width: 1120px;
padding: 20px;
margin: 5px auto;
color: #27187e;

@media (max-width: 768px) {
  width: 330px;
}

@media (min-width: 769px) and (max-width: 1525px) {
  width: 750px;
}
`;

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;

export const Td = styled.td`
padding-top: 15px;
text-align: ${(props) => (props.alignCenter ? 'center' : 'start')};
word-break: break-all;
svg {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
`;

export const Th = styled.th`
border-bottom: inset;
padding-bottom: 5px;
text-align: ${(props) => (props.alignCenter ? 'center' : 'start')};
width: ${(props) => (props.width ? props.width + '%' : 'auto')};
`;
