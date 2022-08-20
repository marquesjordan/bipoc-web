import { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/authContext';
import { Context as ProfileContext } from '../context/profileContext';
import { useNavigate } from 'react-router-dom';
import PostList from '../components/PostList';
import styled from 'styled-components';
import FloatAddButton from '../components/FloatAddButton';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import Messages from '../components/Messages';
import { Box } from '@mui/system';
// const URI =
//   process.env.NODE_ENV === 'production'
//     ? 'https://vast-beach-48711.herokuapp.com'
//     : 'http://localhost:5000';

function HomePage() {
  let navigate = useNavigate();
  const { state, verify } = useContext(AuthContext);
  const { state: profile } = useContext(ProfileContext);

  useEffect(() => {
    console.log('Home ', profile);
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
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    flexDirection: 'column',
                    background:
                      'linear-gradient(0deg, rgba(240,229,255,1) 8%, rgba(91,107,176,1) 92%)',
                  }}>
                  <Box
                    elevate={2}
                    style={{
                      borderRadius: 50,
                      border: '3px solid #5B6BBF',
                      overflow: 'hidden',
                      width: 70,
                      height: 70,
                      background: '#FFF',
                    }}>
                    <img
                      src={`${process.env.REACT_APP_PHOTO_HOST_URL}/api/images/${profile.profile.photo}`}
                      alt="im"
                      width="70px"
                    />
                  </Box>
                </div>
                <div>{console.log('PEople ', state)}</div>
              </>
            </Card>
            <Messages />
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
