import { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import PostList from '../components/PostList';
import styled from 'styled-components';
import FloatAddButton from '../components/FloatAddButton';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';

function HomePage() {
  let navigate = useNavigate();
  const { state, verify } = useContext(AuthContext);

  useEffect(() => {
    if (!state.token) {
      navigate('/login', { replace: true });
    }
  }, []);

  return (
    <Main>
      <Container>
        <Wrapper>
          <LeftContainer>
            <Card sx={{ marginY: 2, height: 200 }}>
              <img
                src="http://localhost:5000/api/images/ccdcc8151f3a85de86fc62009d787865"
                alt="im"
              />
            </Card>
          </LeftContainer>
          <MiddleContainer>
            <PostList />
          </MiddleContainer>
          <RightContainer>
            <Card sx={{ marginY: 2, height: 'auto' }}>
              <div style={{ padding: 10 }}>
                <div style={{ fontWeight: 'bold' }}>BIPOC Articles</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginTop: 8 }}>
                    <a href="https://www.ywcaworks.org/blogs/ywca/wed-04062022-0915/why-we-use-bipoc">
                      Why we use BIPOC - YWCA Seattle
                    </a>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <a href="https://www.healthline.com/health/bipoc-meaning">
                      BIPOC: What It Means and Why It Matters
                    </a>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <a href="https://www.cbsnews.com/news/bipoc-meaning-where-does-it-come-from-2020-04-02/">
                      BIPOC: What does it mean?
                    </a>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <a href="https://vtdigger.org/2022/06/26/a-new-program-aims-to-help-bipoc-homebuyers-with-down-payments/">
                      BIPOC Homebuyers
                    </a>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <a href="https://www.naminh.org/resources-2/bipoc/">
                      BIPOC/AAPI Mental Health Resources
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </RightContainer>
        </Wrapper>
      </Container>
    </Main>
  );
}

export default HomePage;

const Main = styled.div`
  background: #f3f3f3;
`;

const Wrapper = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  flex: 1.2;
`;

const RightContainer = styled.div`
  flex: 1.8;
`;

const MiddleContainer = styled.div`
  display: flex;
  justify-content: center;
`;
