// types/index.ts
export interface User {
  id: string;
  username: string;
  email: string;
  password?: string; // Should not be stored in context or sent to client after auth
  token?: string; // Fake token
}

export interface Credentials {
  username: string;
  email: string;
  password?: string; // Optional for login if using identifier
  identifier?: string; // For login (username or email)
}

export interface NoteData {
  title: string;
  content: string;
  category?: string;
  color?: string; // Hex color for the note
}

export interface Note extends NoteData {
  id: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}
