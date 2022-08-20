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
import { Context as ProfileContext } from '../context/profileContext';
import { useForm } from '../hooks/form';
import { useCookies } from 'react-cookie';
import imageHelper from '../utils/imageHelper';

const PostForm = () => {
  const { state, updateProfile } = useContext(ProfileContext);
  const [cookies, setCookie] = useCookies('token');

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    console.log(state);
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images, state.profile]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  const { onChange, onSubmit, values, setValues } = useForm(
    handleProfileUpdate,
    {
      summary: '',
      category: '',
      tags: '',
      youtubeUrl: '',
      password: '',
      firstName: '',
      lastName: '',
      title: '',
      pronoun: '',
      phone: '',
      email: '',
      bio: '',
    },
  );

  useEffect(() => {
    setValues(state.profile);
  }, [setValues, state.profile]);

  async function handleProfileUpdate(values) {
    setLoading(true);

    if (images.length > 0) {
      values.image = images[0];
      const data = await imageHelper.postImage(values);
      if (data.image) {
        values.imageKey = data.image.key;
      }
    }

    values.token = cookies.token;

    updateProfile(values);
  }

  function displayImage() {
    if (imageURLs.length > 1) {
      return (
        <>
          {imageURLs.map((imageSrc, index) => (
            <img key={index} alt="Profile" src={imageSrc} />
          ))}
        </>
      );
    } else if (values.photo) {
      return (
        <img
          alt="Profile"
          src={`https://vast-beach-48711.herokuapp.com/api/api/images/${values.photo}`}
        />
      );
    } else {
      return <NoImage>No photo</NoImage>;
    }
  }

  return (
    <Container>
      {console.log('values ', values)}
      <HeaderContainer>
        <Header>Edit Profile</Header>
        <Button
          variant="contained"
          onClick={onSubmit}
          size="small"
          style={{
            background: '#9A52F7',
            height: 40,
          }}>
          Update Profile
        </Button>
      </HeaderContainer>

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
            <ImageDisplayContainer>{displayImage()}</ImageDisplayContainer>
          </label>
        </ImageButtonContainer>
      </ImageContainer>

      <ColContainer>
        <FormControl fullWidth sx={{ marginY: 1 }}>
          <InputLabel shrink htmlFor="firstName">
            First Name
          </InputLabel>
          <OutlinedInput
            notched
            id="firstName"
            name="firstName"
            onChange={onChange}
            label="First Name"
            value={values.firstName}
          />
        </FormControl>
        <Gutter />
        <FormControl fullWidth sx={{ marginY: 1 }}>
          <InputLabel shrink htmlFor="lastName">
            Last Name
          </InputLabel>
          <OutlinedInput
            notched
            id="lastName"
            name="lastName"
            onChange={onChange}
            label="Last Name"
            value={values.lastName}
          />
        </FormControl>
      </ColContainer>
      <ColContainer>
        <FormControl fullWidth sx={{ marginY: 1 }}>
          <InputLabel shrink htmlFor="title">
            Title
          </InputLabel>
          <OutlinedInput
            notched
            id="title"
            name="title"
            onChange={onChange}
            label="Title"
            value={values.title}
          />
        </FormControl>
        <Gutter />
        <FormControl fullWidth sx={{ marginY: 1 }}>
          <InputLabel shrink htmlFor="pronoun">
            Pronoun
          </InputLabel>
          <OutlinedInput
            notched
            id="pronoun"
            name="pronoun"
            onChange={onChange}
            label="Pronoun"
            value={values.pronoun}
          />
        </FormControl>
      </ColContainer>
      <ColContainer>
        <FormControl fullWidth sx={{ marginY: 1 }}>
          <InputLabel shrink htmlFor="phone">
            Phone
          </InputLabel>
          <OutlinedInput
            notched
            id="phone"
            name="phone"
            onChange={onChange}
            label="Phone"
            value={values.phone}
          />
        </FormControl>
        <Gutter />
        <FormControl fullWidth sx={{ marginY: 1 }}>
          <InputLabel shrink htmlFor="email">
            email
          </InputLabel>
          <OutlinedInput
            notched
            id="email"
            name="email"
            onChange={onChange}
            label="email"
            value={values.email}
          />
        </FormControl>
      </ColContainer>
      <FormControl fullWidth sx={{ marginY: 1 }}>
        <TextField
          id="bio"
          name="bio"
          minRows={4}
          onChange={onChange}
          multiline
          label="Bio"
          style={{ maxWidth: '100%' }}
          value={values.bio}
        />
      </FormControl>
    </Container>
  );
};

export default PostForm;

const Input = styled('input')({
  display: 'none',
});

const ColContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Gutter = styled.div`
  margin-left: 5px;
  margin-right: 5px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  height: 120px;
  width: 140px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NoImage = styled.div`
  font-weight: 600;
`;

const ImageButtonContainer = styled.div`
  flex: 1;
  height: 120px;
  width: 140px;

  @media (max-width: 768px) {
    flex: none;
    height: 50px;
  }
`;

const ImageDisplayContainer = styled.div`
  border: 1px solid #cccccc;
  border-radius: 4px;
  flex: 1;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 120px;
  width: 140px;
  cursor: pointer;
  overflow: hidden;

  img {
    max-height: 150px;
  }
`;

const Header = styled.h1``;
