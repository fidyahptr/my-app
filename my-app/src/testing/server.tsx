import { setupServer } from 'msw/node';
import { handler } from './searchSong';

export const server = setupServer(...handler);
