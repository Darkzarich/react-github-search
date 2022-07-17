import React from 'react'
import { useSearchUsersQuery } from '../store/github/github.api'

export const HomePage = () => {
  const { isLoading, isError, data } = useSearchUsersQuery('darkzarich')

  return <div>HomePage</div>
}
