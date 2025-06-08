import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const now = new Date();
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

export const CreateShortLinkSchema = z.object({
  originalUrl: z.string().url(),
  alias: z.string().min(2).max(20).optional(),
  expiresAt: z.coerce
    .date()
    .optional(),
});

export class CreateShortLinkDto extends createZodDto(CreateShortLinkSchema) {}
