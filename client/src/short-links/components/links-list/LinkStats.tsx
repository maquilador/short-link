import { Stack, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MouseIcon from '@mui/icons-material/Mouse';

export interface LinkStatsProps {
  createdAt: string;
  clickCount: number;
}

export const LinkStats = ({ clickCount, createdAt }: LinkStatsProps) => {
  const formattedCreated = new Date(createdAt).toLocaleDateString('en-EN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Stack direction="row" spacing={0.5} alignItems="center">
        <MouseIcon fontSize="small" color="action" />
        <Typography variant="body2" color="text.secondary">
          {clickCount} click
        </Typography>
      </Stack>

      <Stack direction="row" spacing={0.5} alignItems="center">
        <AccessTimeIcon fontSize="small" color="action" />
        <Typography variant="body2" color="text.secondary">
          Created at {formattedCreated}
        </Typography>
      </Stack>
    </Stack>
  );
};
