import React, { createContext, useReducer, useEffect } from 'react';
import * as linksApi from '../api';

type Link = {
  id: number;
  originalUrl: string;
  alias: string;
  expiresAt: string;
};

type State = {
  links: Link[];
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: 'LOADING_START' }
  | { type: 'LOADING_SUCCESS'; payload: Link[] }
  | { type: 'LOADING_ERROR'; payload: string }
  | { type: 'ADD_LINK'; payload: Link }
  | { type: 'REMOVE_LINK'; payload: string };

const initialState: State = {
  links: [],
  loading: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOADING_START':
      return { ...state, loading: true, error: null };
    case 'LOADING_SUCCESS':
      return { ...state, loading: false, links: action.payload };
    case 'LOADING_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_LINK':
      return { ...state, links: [...state.links, action.payload] };
    case 'REMOVE_LINK':
      return {
        ...state,
        links: state.links.filter((link) => link.alias !== action.payload),
      };
    default:
      return state;
  }
}

export const LinksStateContext = createContext<State | undefined>(undefined);
export const LinksDispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);

export const LinksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchLinks = async () => {
      dispatch({ type: 'LOADING_START' });
      try {
        const res = await linksApi.fetchLinks();
        dispatch({ type: 'LOADING_SUCCESS', payload: res.data });
      } catch (err: unknown) {
        let message = 'Loading error';
        if (err instanceof Error) {
          message = err.message;
        }
        dispatch({
          type: 'LOADING_ERROR',
          payload: message,
        });
      }
    };

    fetchLinks();
  }, []);

  return (
    <LinksStateContext.Provider value={state}>
      <LinksDispatchContext.Provider value={dispatch}>
        {children}
      </LinksDispatchContext.Provider>
    </LinksStateContext.Provider>
  );
};
