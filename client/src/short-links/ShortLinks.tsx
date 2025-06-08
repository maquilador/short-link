import { Container } from '@mui/material';
import { CreateShortLink } from './components/create-short-link';
import { LinksList } from './components/links-list';
import { LinksProvider } from './store/context';

export const ShortLinks = () => {
  return (
    <LinksProvider>
      <Container>
        <CreateShortLink />
        <LinksList />
      </Container>
    </LinksProvider>
  );
};
