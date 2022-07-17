import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { githubApi } from './github/github.api'
import { githubActions, githubReducer } from './github/github.slice'

type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    github: githubReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
})

setupListeners(store.dispatch)

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useActions = () => {
  const dispatch = useDispatch()

  // Wrap all action creators into dispatch
  return bindActionCreators(
    {
      ...githubActions,
    },
    dispatch,
  )
}
