import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
      'Bearer rit0CGfBGlv_JNy9tfrZdikg-ADvDvGcwfW6oPD64rflYgdJuCl0BYDHOQ7a1-R-u3qSAatg90bv4R2HYHmiTl88hKybonSCGvNwF5Ce5Zg6WXIuGVnPyyof5apbX3Yx',
  },
});
