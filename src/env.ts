import { z } from 'zod';
import Config from 'react-native-config';

// Validate environment variables
let envSchema = z.object({
  WEATHERAPI_API_KEY: z.string().nonempty(),
});

// Use this instead of Config directly for Typescript safety
export const env = envSchema.parse(Config);
