// app/(app)/home.tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router/build/hooks";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { deleteNote as apiDeleteNote, getNotes } from "../../api/fakeDataApi";
import ListItem from "../../components/ListItem"; // Animated List Item
import LoadingOverlay from "../../components/LoadingOverlay";
import { DefaultThemeColors as C } from "../../constants/Colors";
import { globalStyles } from "../../styles/globalStyles";
import { Note } from "../../types";

const HomeScreen = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null); // Track ID of item being deleted
  const router = useRouter();

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      Alert.alert("Error", "Could not fetch notes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
      return () => {}; // Cleanup function
    }, [fetchNotes])
  );

  const handleDeleteNote = (noteId: string) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to permanently delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setIsDeleting(noteId);
            try {
              await apiDeleteNote(noteId);
              setNotes((prevNotes) =>
                prevNotes.filter((note) => note.id !== noteId)
              );
              // No need for success alert, item visually disappears
            } catch (error) {
              Alert.alert("Error", "Could not delete note.");
            } finally {
              setIsDeleting(null);
            }
          },
        },
      ]
    );
  };

  const handleEditNote = (noteId: string) => {
    router.push({
      pathname: "/(app)/itemForm",
      params: { noteId },
    });
  };

  const handleViewNote = (noteId: string) => {
    // For now, editing is viewing. Could be a separate read-only screen.
    router.push({
      pathname: "/(app)/itemForm",
      params: { noteId, viewMode: "true" },
    });
  };

  const renderNoteItem = ({ item }: { item: Note }) => (
    <ListItem
      item={item}
      onPress={handleViewNote}
      onEdit={handleEditNote}
      onDelete={handleDeleteNote}
    />
  );

  if (loading && notes.length === 0) {
    return (
      <View style={globalStyles.centeredView}>
        <ActivityIndicator size="large" color={C.primary} />
        <Text style={globalStyles.loadingText}>Loading your notes...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <LoadingOverlay visible={!!isDeleting} text="Deleting note..." />
      {notes.length === 0 && !loading ? (
        <View style={globalStyles.emptyStateContainer}>
          <MaterialCommunityIcons
            name="note-multiple-outline"
            size={80}
            color={C.disabled}
          />
          <Text style={globalStyles.emptyStateText}>
            No notes yet. Tap the &apos;+&apos; button to create your first
            note!
          </Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          renderItem={renderNoteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
          // For pull to refresh
          refreshing={loading}
          onRefresh={fetchNotes}
        />
      )}
      <TouchableOpacity
        style={globalStyles.fab}
        onPress={() => router.push("/(app)/itemForm")}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="plus" size={32} color={C.onPrimary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    paddingBottom: 80, // Space for FAB
    paddingTop: 10,
  },
});

export default HomeScreen;
