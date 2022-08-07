import React, { useContext, useEffect } from 'react';
import PostCard from './PostCard';
import { Context as PostContext } from '../context/postContext';
import FloatAddButton from './FloatAddButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PostForm from './PostForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PostList = ({ list = [1, 2] }) => {
  const { state, getPosts } = useContext(PostContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    console.log('OPEN');
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log('STATE ', state);
    getPosts();
  }, []);

  return (
    <div>
      {console.log(state.posts.posts)}
      {state.posts.posts ? (
        <>
          {state.posts.posts.concat(state.posts.posts).map((item) => {
            return <PostCard post={item} />;
          })}
        </>
      ) : (
        <div>Empty</div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <PostForm />
        </Box>
      </Modal>
      <FloatAddButton callback={handleOpen} />
    </div>
  );
};

export default PostList;
