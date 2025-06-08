import { Box, IconButton, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useLinksDispatch } from '../../store/useLinksDispatch';
import { useState } from 'react';
import { fetchLinkStats } from '../../api';
import { LinkStats } from './LinkStats';

interface LinksListItemProps {
  originalUrl: string;
  alias: string;
  expiresAt: string;
}

export const LinksListItem = ({
  originalUrl,
  alias,
  expiresAt,
}: LinksListItemProps) => {
  const { dispatchRemoveLink } = useLinksDispatch();

  const [stats, setStats] = useState<{
    createdAt: string;
    clickCount: number;
  } | null>(null);

  const handleFetchStats = () => {
    if (!stats) {
      fetchLinkStats(alias).then(({ data }) => {
        setStats({ createdAt: data.createdAt, clickCount: data.clickCount });
      });
    } else {
      setStats(null);
    }
  };

  return (
    <ListItem
      sx={{
        pl: 0,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex' }}>
          <ListItemText
            primary={originalUrl}
            secondary={`alias: ${alias} | expiresAt: ${expiresAt}`}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton color="primary" onClick={handleFetchStats}>
              <BarChartIcon />
            </IconButton>
            <IconButton color="error" onClick={() => dispatchRemoveLink(alias)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        {stats && (
          <LinkStats
            createdAt={stats.createdAt}
            clickCount={stats.clickCount}
          />
        )}
      </Box>
    </ListItem>
  );
};
