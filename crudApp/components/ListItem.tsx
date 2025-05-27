// components/ListItem.tsx
import React, { memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { Layout, FadeIn, FadeOut } from "react-native-reanimated";
import { Note } from "../types";
import { DefaultThemeColors as C } from "../constants/Colors";
import { globalStyles } from "../styles/globalStyles";

interface ListItemProps {
  item: Note;
  onPress: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ListItemComponent: React.FC<ListItemProps> = ({
  item,
  onPress,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Animated.View
      // For simple add/remove, Layout can work. For more complex, use Entering/Exiting.
      layout={Layout.springify().damping(15).stiffness(100)} // Animate layout changes
      entering={FadeIn.duration(300)} // Animate item appearance
      exiting={FadeOut.duration(200)} // Animate item removal
    >
      <TouchableOpacity
        style={[
          globalStyles.card,
          styles.card,
          item.color ? { borderLeftColor: item.color, borderLeftWidth: 5 } : {},
        ]}
        onPress={() => onPress(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Text
            style={[
              globalStyles.cardTitle,
              item.color ? { color: item.color } : {},
            ]}
          >
            {item.title}
          </Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              onPress={() => onEdit(item.id)}
              style={styles.iconButton}
            >
              <MaterialCommunityIcons
                name="pencil-circle-outline"
                size={28}
                color={C.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDelete(item.id)}
              style={styles.iconButton}
            >
              <MaterialCommunityIcons
                name="trash-can-circle-outline"
                size={28}
                color={C.danger}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={globalStyles.cardContent} numberOfLines={3}>
          {item.content}
        </Text>
        {item.category && (
          <Text style={styles.categoryText}>Category: {item.category}</Text>
        )}
        <Text style={globalStyles.cardFooter}>
          Last updated: {formatDate(item.updatedAt)}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    // Specific overrides or additions to globalStyles.card
    paddingVertical: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start", // Align title and icons nicely
    marginBottom: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: Platform.OS === "ios" ? 4 : 8, // iOS can have smaller touch targets
    marginLeft: 8,
  },
  categoryText: {
    fontSize: 13,
    fontStyle: "italic",
    color: C.textSecondary,
    marginBottom: 8,
    backgroundColor: C.lightGray,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start", // So background only covers text
  },
});

// Memoize for performance in FlatList
export default memo(ListItemComponent);
