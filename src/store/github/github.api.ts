import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { UserSearchResponse, Repository } from '../../models/models'

export const githubApi = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/',
  }),
  refetchOnFocus: true,
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
    getUserRepos: build.query<Repository[], string>({
      query: (login: string) => ({
        url: `users/${login}/repos`,
      }),
    }),
  }),
})

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi
