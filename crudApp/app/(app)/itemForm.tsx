// app/(app)/itemForm.tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { addNote, getNoteById, updateNote } from "../../api/fakeDataApi";
import AppButton from "../../components/AppButton";
import AppTextInput from "../../components/AppTextInput";
import LoadingOverlay from "../../components/LoadingOverlay";
import { DefaultThemeColors as C } from "../../constants/Colors";
import { globalStyles } from "../../styles/globalStyles";
import { NoteData } from "../../types";

// Simple color picker options
const NOTE_COLORS = [
  "#FFAB91",
  "#81D4FA",
  "#A5D6A7",
  "#FFF59D",
  "#CF94DA",
  "#F48FB1",
  C.cardBackground,
];

const ItemFormScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ noteId?: string; viewMode?: string }>();
  const noteId = params.noteId;
  const isEditing = Boolean(noteId);
  const isViewMode = params.viewMode === "true" && isEditing;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>(NOTE_COLORS[0]);

  const [isLoading, setIsLoading] = useState(false); // For save/update operation
  const [formLoading, setFormLoading] = useState(isEditing); // For fetching item data
  const [error, setError] = useState("");

  useLayoutEffect(() => {
    // This is an alternative to setting options in _layout.tsx if you need dynamic access to screen state
    // For modal presentation, options in _layout.tsx are usually sufficient.
    // Stack.setOptions({ title: isEditing ? (isViewMode ? 'View Note' : 'Edit Note') : 'Add New Note' });
  }, [isEditing, isViewMode]);

  useEffect(() => {
    if (isEditing) {
      const fetchNoteData = async () => {
        setFormLoading(true);
        try {
          const note = await getNoteById(noteId as string);
          if (note) {
            setTitle(note.title);
            setContent(note.content);
            setCategory(note.category || "");
            setSelectedColor(note.color || C.cardBackground);
          } else {
            Alert.alert("Error", "Note not found.");
            router.back();
          }
        } catch (e) {
          Alert.alert("Error", "Could not load note data.");
          router.back();
        } finally {
          setFormLoading(false);
        }
      };
      fetchNoteData();
    } else {
      // Set default color for new note
      setSelectedColor(NOTE_COLORS[0]);
    }
  }, [noteId, isEditing, router]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Title is required.");
      Alert.alert("Validation Error", "Title cannot be empty.");
      return;
    }
    if (!content.trim()) {
      setError("Content is required.");
      Alert.alert("Validation Error", "Content cannot be empty.");
      return;
    }
    setError("");
    setIsLoading(true);

    const noteData: NoteData = {
      title,
      content,
      category,
      color: selectedColor,
    };

    try {
      if (isEditing) {
        await updateNote(noteId as string, noteData);
        Alert.alert("Success", "Note updated successfully!");
      } else {
        await addNote(noteData);
        Alert.alert("Success", "Note added successfully!");
      }
      router.back(); // Go back to the list screen
    } catch (e: any) {
      Alert.alert(
        "Error",
        `Could not ${isEditing ? "update" : "add"} note. ${e.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (formLoading) {
    return <LoadingOverlay visible={true} text="Loading note..." />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <LoadingOverlay
        visible={isLoading}
        text={isEditing ? "Updating note..." : "Adding note..."}
      />
      <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
        <View
          style={[
            globalStyles.card,
            styles.formCard,
            { borderColor: selectedColor, shadowColor: selectedColor },
          ]}
        >
          <AppTextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            placeholder="e.g., My Brilliant Idea"
            style={styles.inputField}
            editable={!isViewMode}
          />
          <AppTextInput
            label="Content"
            value={content}
            onChangeText={setContent}
            placeholder="Jot down your thoughts here..."
            multiline
            numberOfLines={8}
            style={[styles.inputField, styles.contentInput]}
            editable={!isViewMode}
          />
          <AppTextInput
            label="Category (Optional)"
            value={category}
            onChangeText={setCategory}
            placeholder="e.g., Work, Personal, Ideas"
            style={styles.inputField}
            editable={!isViewMode}
          />

          {!isViewMode && (
            <>
              <Text style={styles.colorPickerLabel}>Note Color</Text>
              <View style={styles.colorPickerContainer}>
                {NOTE_COLORS.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      selectedColor === color && styles.selectedColorOption,
                    ]}
                    onPress={() => setSelectedColor(color)}
                  />
                ))}
              </View>
            </>
          )}

          {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

          {!isViewMode && (
            <AppButton
              title={isEditing ? "Update Note" : "Add Note"}
              onPress={handleSubmit}
              loading={isLoading}
              iconLeft={
                isEditing ? "content-save-edit-outline" : "plus-circle-outline"
              }
              style={styles.submitButton}
            />
          )}
          <AppButton
            title={isViewMode ? "Close" : "Cancel"}
            onPress={() => router.back()}
            disabled={isLoading}
            variant={isViewMode ? "primary" : "outline"}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: C.background,
  },
  formCard: {
    marginTop: Platform.OS === "ios" ? 10 : 20, // For modal presentation
    marginBottom: 20,
    borderWidth: 1.5, // To show selected color border
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  inputField: {
    // Specific styles if needed, AppTextInput is already styled
  },
  contentInput: {
    minHeight: 150,
    textAlignVertical: "top", // For Android
  },
  submitButton: {
    marginTop: 10,
  },
  colorPickerLabel: {
    fontSize: 14,
    color: C.textSecondary,
    marginBottom: 10,
    fontWeight: "500",
    marginTop: 10,
  },
  colorPickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  colorOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: C.lightGray, // Default border
    margin: 4,
  },
  selectedColorOption: {
    borderColor: C.primary, // Highlight selected color
    transform: [{ scale: 1.1 }],
    shadowColor: C.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
});

export default ItemFormScreen;
