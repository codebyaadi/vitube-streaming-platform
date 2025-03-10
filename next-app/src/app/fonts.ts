import { Prompt, Syne } from 'next/font/google';

export const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
});

export const prompt = Prompt({
  subsets: ['latin'],
  variable: '--font-prompt',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});
