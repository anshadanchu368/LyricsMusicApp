import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'



export const geniusApi = createApi({
    reducerPath: 'geniusApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://deezerdevs-deezer.p.rapidapi.com/',
      prepareHeaders: (headers) => {
        headers.set('X-RapidAPI-Key', '8bbf05a656mshcf69903c07c9fc4p1182f3jsn1e3b6b583ea5');
        return headers;
      },
    }),
    endpoints: (builder) => ({
      getSearchResults: builder.query({
        query: (params) => `/search?q=${params.q}`, // Update the query function to include the "q" parameter
      }),
    }),
  });
  
  export const { useGetSearchResultsQuery } = geniusApi;
  