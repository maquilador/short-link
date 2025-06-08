import { useContext } from 'react';
import { LinksDispatchContext } from './context';
import { createLink, deleteLink } from '../api';

export const useLinksDispatch = () => {
  const dispatch = useContext(LinksDispatchContext);
  if (dispatch === undefined) {
    throw new Error('useLinksDispatch must be used within a LinksProvider');
  }

  const dispatchCreateLink = (data: {
    originalUrl: string;
    alias?: string;
    expiresAt?: Date;
  }) => {
    createLink(data).then((res) => {
      dispatch({ type: 'ADD_LINK', payload: res.data });
    });
  };

  const dispatchRemoveLink = (alias: string) => {
    deleteLink(alias).then(() => {
      dispatch({ type: 'REMOVE_LINK', payload: alias });
    });
  };

  return { dispatch, dispatchCreateLink, dispatchRemoveLink };
};
