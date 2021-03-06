import React, { useEffect, useState } from 'react'
import { RepoCard } from '../components/RepoCard'
import { useDebounce } from '../hooks/debounce'
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from '../store/github/github.api'

export const HomePage = () => {
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const lazySearch = useDebounce(search)

  const {
    isLoading,
    isError,
    data: users,
  } = useSearchUsersQuery(lazySearch, {
    // won't trigger query if skip is false
    skip: lazySearch.length < 2,
  })

  const [fetchRepos, { isLoading: isReposLoading, data: repos }] =
    useLazyGetUserReposQuery()

  useEffect(() => {
    setShowDropdown(lazySearch.length > 3 && !!users && users.length > 0)
  }, [lazySearch, users])

  const getUserRepos = (login: string) => {
    setShowDropdown(false)
    fetchRepos(login)
  }

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">Something went wrong...</p>
      )}

      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for Github username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {showDropdown && (
          <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
            {isLoading && <p className="text-center">Loading...</p>}

            {users?.map((user) => (
              <li
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                onClick={() => getUserRepos(user.login)}
                key={user.id}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}

        <div className="container">
          {isReposLoading && (
            <p className="text-center">Repositories are loading...</p>
          )}

          {repos?.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  )
}
