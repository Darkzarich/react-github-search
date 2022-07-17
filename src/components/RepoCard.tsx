import React from 'react'
import { Repository } from '../models/models'
import { useActions } from '../store'

export const RepoCard = ({ repo }: { repo: Repository }) => {
  const { addFavourite } = useActions()

  const addToFavourites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addFavourite(repo.html_url)
  }

  return (
    <div className="group border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a
        href={repo.html_url}
        target="_blank"
        className="no-underline"
        rel="noreferrer"
      >
        <h2 className="text-lg font-bold group-hover:text-blue-600">
          {repo.full_name}
        </h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>
      </a>

      <button
        onClick={addToFavourites}
        className="py-2 px-4 mt-2 bg-yellow-400 active:bg-yellow-500 rounded hover:shadow-md transition-all"
      >
        Favourite ❤
      </button>
    </div>
  )
}
