import { View, Pressable, Text, StyleSheet } from "react-native";
import * as StyleGuide from "../styles/styleGuide";

const CategoryFilter = ({ categories, selections, onChange }) => {
  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <Pressable
          style={[styles.item, selections[index] && styles.selectedItem]}
          key={index}
          onPress={() => {
            onChange(index);
          }}
        >
          <Text style={[styles.text, selections[index] && styles.selectedText]}>
            {categories[index]}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  item: {
    padding: 5,
    marginRight: 7,
    borderWidth: 1,
    borderColor: StyleGuide.selectionBox.base.borderColor,
    borderRadius: 10,
  },
  selectedItem: {
    backgroundColor: StyleGuide.selectionBox.selected.backgroundColor,
    borderColor: StyleGuide.selectionBox.selected.borderColor,
  },
  text: {
    color: StyleGuide.selectionBox.base.color,
    fontWeight: "bold",
    fontSize: 13,
  },
  selectedText: {
    color: StyleGuide.selectionBox.selected.color,
  },
});

export default CategoryFilter;
