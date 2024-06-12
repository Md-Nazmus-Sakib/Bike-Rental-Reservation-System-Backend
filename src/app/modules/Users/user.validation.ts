import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }).trim(),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Please enter a valid email address' })
      .toLowerCase()
      .trim(),
    password: z.string().min(1, { message: 'Password is required' }),

    phone: z
      .string()
      .min(1, { message: 'Phone number is required' })
      .regex(/^\+?[1-9]\d{1,14}$/, {
        message: 'Please enter a valid phone number',
      }),
    address: z.string().min(1, { message: 'Address is required' }),
    role: z.enum(['admin', 'user'], {
      message: 'Role must be either admin or user',
    }),
  }),
});

export default createUserValidationSchema;
