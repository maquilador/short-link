import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useLinksDispatch } from '../../store/useLinksDispatch';

const initialState = {
  originalUrl: '',
  alias: undefined,
  expiresAt: undefined,
};

export const CreateShortLink = () => {
  const [fields, setFields] = useState<{
    originalUrl: string;
    alias?: string;
    expiresAt?: Dayjs;
  }>(initialState);

  const { dispatchCreateLink } = useLinksDispatch();
  const handleCreate = () => {
    const formattedData = {
      originalUrl: fields.originalUrl,
      alias: fields.alias || undefined,
      expiresAt: fields.expiresAt?.toDate() || undefined,
    };

    dispatchCreateLink(formattedData);
    setFields(initialState);
  };

  return (
    <Box>
      <Typography variant="h5" mt={2} mb={2}>
        Create short link
      </Typography>
      <Grid container spacing={2}>
        <Grid>
          <TextField
            label="Original link"
            value={fields.originalUrl}
            onChange={(e) =>
              setFields((prev) => ({ ...prev, originalUrl: e.target.value }))
            }
            required
          />
        </Grid>
        <Grid>
          <TextField
            label="Alias"
            value={fields.alias}
            onChange={(e) =>
              setFields((prev) => ({ ...prev, alias: e.target.value }))
            }
          />
        </Grid>
        <Grid>
          <DatePicker
            disablePast
            label="Expires at"
            value={fields.expiresAt}
            onChange={(newValue) =>
              setFields((prev) => ({ ...prev, expiresAt: newValue as Dayjs }))
            }
          />
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            fullWidth
            sx={{ height: '100%' }}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
