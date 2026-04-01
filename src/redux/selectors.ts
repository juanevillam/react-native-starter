import type { RootState } from './store/types';

const selectAuth = ({ auth }: RootState) => auth;

const selectLayout = ({ layout }: RootState) => layout;

export { selectAuth, selectLayout };
