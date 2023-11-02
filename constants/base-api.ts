
export const BASE_FIREBASE_AUTH_API = 'https://identitytoolkit.googleapis.com/v1/accounts:';
export const BASE_RAPID_API = 'https://newscatcher.p.rapidapi.com/v1/search_free';
export const BASE_GOOGLE_API = 'https://www.googleapis.com/userInfo/v2/me';
export const options = {
    method: 'GET',
    url: BASE_RAPID_API,
    params: {
      lang: 'en',
      media: 'True'
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_RAPID_API_KEY,
    }
  };
