import React from 'react'
import { useActions, useAppSelector } from '../store'

export const FavouritesPage = () => {
  const { removeFavourite } = useActions()

  const removeFromFavourite = (
    event: React.MouseEvent<HTMLSpanElement>,
    link: string,
  ) => {
    event.preventDefault()
    removeFavourite(link)
  }

  const favourites = useAppSelector((state) => state.github.favourites)

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      <ol className="list-decimal text-base">
        {favourites.map((f) => (
          <li key={f}>
            <a href={f} className="no-underline hover:underline text-blue-600">
              {f}
            </a>
            <span
              className="hover:text-red-500 text-gray-500 cursor-pointer ml-2"
              onClick={(e) => removeFromFavourite(e, f)}
            >
              [-]
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
