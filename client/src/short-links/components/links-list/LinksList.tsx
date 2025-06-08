import { Box, List, Typography } from '@mui/material';
import { useLinksState } from '../../store/useLinksState';
import { LinksListItem } from './LinksListItem';

export const LinksList = () => {
  const { links } = useLinksState();

  return (
    <Box>
      <Typography variant="h6" mt={2}>
        Links
      </Typography>

      <List>
        {links.map(({ originalUrl, expiresAt, alias }) => (
          <LinksListItem
            key={alias}
            originalUrl={originalUrl}
            alias={alias}
            expiresAt={expiresAt}
          />
        ))}
      </List>
    </Box>
  );
};
