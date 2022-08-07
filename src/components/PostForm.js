import Add from '@mui/icons-material/Add';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  TextareaAutosize,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Context as PostContext } from '../context/postContext';
import { useForm } from '../hooks/form';
import { useCookies } from 'react-cookie';
import imageHelper from '../utils/imageHelper';

const categories = [
  {
    value: 'EVENT',
    label: 'Event',
  },
  {
    value: 'JOB',
    label: 'Job Opening',
  },
];

const PostForm = () => {
  const { state, createPost } = useContext(PostContext);
  const [cookies, setCookie] = useCookies('token');

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  const { onChange, onSubmit, values } = useForm(handlePostPublish, {
    title: '',
    summary: '',
    category: '',
    tags: '',
    youtubeUrl: '',
    password: '',
  });

  async function handlePostPublish(values) {
    setLoading(true);

    if (images.length > 0) {
      values.image = images[0];
      const data = await imageHelper.postImage(values);
      if (data.image) {
        values.imageKey = data.image.key;
      }
    }

    values.token = cookies.token;

    createPost(values);
  }

  return (
    <Container>
      <HeaderContainer>
        <Header>Create Post</Header>
        <Button
          variant="contained"
          onClick={onSubmit}
          size="small"
          style={{
            background: '#9A52F7',
            height: 40,
          }}>
          Publish Post
        </Button>
      </HeaderContainer>
      <FormControl fullWidth sx={{ marginY: 1 }}>
        <InputLabel htmlFor="category"></InputLabel>
        <TextField
          id="category"
          name="category"
          onChange={onChange}
          select
          label="Category">
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <FormControl fullWidth sx={{ marginY: 1 }}>
        <InputLabel htmlFor="title">Title</InputLabel>
        <OutlinedInput
          id="title"
          name="title"
          onChange={onChange}
          label="Title"
        />
      </FormControl>
      <FormControl fullWidth sx={{ marginY: 1 }}>
        <TextField
          id="summary"
          name="summary"
          minRows={4}
          onChange={onChange}
          multiline
          label="Summary"
          style={{ maxWidth: '100%' }}
        />
      </FormControl>
      <ImageContainer>
        <ImageButtonContainer>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              type="file"
              onChange={onImageChange}
            />
            {/* <Button variant="contained" component="span">
              Add Main Image
            </Button> */}
            <ImageDisplayContainer>
              {images.length < 1 && <NoImage>No Image</NoImage>}
              {imageURLs.map((imageSrc) => (
                <img alt="Post" src={imageSrc} />
              ))}
            </ImageDisplayContainer>
          </label>
        </ImageButtonContainer>
      </ImageContainer>
      <FormControl fullWidth sx={{ marginY: 1 }}>
        <InputLabel htmlFor="youtubeUrl">Youtube Code</InputLabel>
        <OutlinedInput
          id="youtubeUrl"
          name="youtubeUrl"
          onChange={onChange}
          label="Youtube Code"
          placeholder="i.e. Qa1IaUywiO8"
        />
      </FormControl>
      <FormControl fullWidth sx={{ marginY: 1 }}>
        <InputLabel htmlFor="tags">Tags</InputLabel>
        <OutlinedInput id="tags" name="tags" onChange={onChange} label="Tags" />
      </FormControl>
    </Container>
  );
};

export default PostForm;

const Input = styled('input')({
  display: 'none',
});

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  height: 150px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NoImage = styled.div`
  font-weight: 600;
`;

const ImageButtonContainer = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    flex: none;
    height: 50px;
  }
`;

const ImageDisplayContainer = styled.div`
  border: 1px solid #cccccc;
  border-radius: 4px;
  height: 150px;
  flex: 1;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;

  img {
    max-height: 150px;
  }
`;

const Header = styled.h1``;
