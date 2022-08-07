import styled from 'styled-components';

const AuthContainer = ({ children, background }) => {
  return (
    <Container>
      <InnerContainer>
        <LeftContainer background={background} />
        <RightContainer background={background}>{children}</RightContainer>
      </InnerContainer>
    </Container>
  );
};

export default AuthContainer;

const Container = styled.div`
  height: 100%;
`;

const InnerContainer = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  height: 100%;
`;

const LeftContainer = styled.div`
  flex: 1;
  background: lightgrey;
  background-image: ${({ background }) => `url("${background}")`};
  background-size: cover;
  @media (max-width: 768px) {
    display: none;
  }
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  padding: 10px;

  @media (max-width: 768px) {
    padding: 0 10px;
    background-size: cover;
  }
`;
