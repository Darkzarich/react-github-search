import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserSearchResponse } from '../../models/models'

export const githubApi = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/',
  }),
  endpoints: (build) => ({
    searchUsers: build.query<UserSearchResponse['items'], string>({
      query: (search: string) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 10,
        },
      }),
      transformResponse: (response: UserSearchResponse) => response.items,
    }),
  }),
})

export const { useSearchUsersQuery } = githubApi
