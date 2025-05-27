// api/fakeDataApi.ts
// import { generateId } from "../utils/helpers";
import { generateId } from "@/utils/helper";
import { Note, NoteData } from "../types"; // We'll define types later

let notes: Note[] = [
  {
    id: generateId(),
    title: "Grocery List",
    content: "Milk, Bread, Egs, Apples. Remember organic eggs!",
    category: "Personal",
    color: "#FFAB91",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "Meeting Prep",
    content: "Review Q3 results, prepare slides for stakeholder update.",
    category: "Work",
    color: "#81D4FA",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: generateId(),
    title: "Book Ideas",
    content:
      "Sci-fi novel about AI consciousness. Explore themes of identity and free will.",
    category: "Creative",
    color: "#A5D6A7",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const getNotes = (): Promise<Note[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Sort by updatedAt descending (newest first)
      const sortedNotes = [...notes].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      resolve(sortedNotes);
    }, 500);
  });
};

export const getNoteById = (id: string): Promise<Note | undefined> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const note = notes.find((n) => n.id === id);
      if (note) {
        resolve(note);
      } else {
        // It's better to resolve with undefined if not found, or reject if it's an error condition
        resolve(undefined);
      }
    }, 300);
  });
};

export const addNote = (noteData: NoteData): Promise<Note> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newNote: Note = {
        id: generateId(),
        ...noteData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      notes.unshift(newNote); // Add to the beginning for newest first
      resolve(newNote);
    }, 500);
  });
};

export const updateNote = (
  id: string,
  noteData: Partial<NoteData>
): Promise<Note> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = notes.findIndex((n) => n.id === id);
      if (index !== -1) {
        notes[index] = {
          ...notes[index],
          ...noteData,
          updatedAt: new Date().toISOString(),
        };
        resolve(notes[index]);
      } else {
        reject(new Error("Note not found for update"));
      }
    }, 500);
  });
};

export const deleteNote = (id: string): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const initialLength = notes.length;
      notes = notes.filter((n) => n.id !== id);
      resolve({ success: notes.length < initialLength });
    }, 500);
  });
};
