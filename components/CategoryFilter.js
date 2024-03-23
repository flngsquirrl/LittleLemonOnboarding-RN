import { View, Pressable, Text, StyleSheet } from "react-native";
import * as StyleGuide from "../styles/styleGuide";

const CategoryFilter = ({ categories, selections, onChange }) => {
  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <Pressable
          style={[styles.item, selections[index] && styles.selected]}
          key={index}
          onPress={() => {
            onChange(index);
          }}
        >
          <Text style={[styles.text, selections[index] && styles.selected]}>
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
  text: {
    color: StyleGuide.selectionBox.base.color,
  },
  selected: {
    backgroundColor: StyleGuide.selectionBox.selected.backgroundColor,
    color: StyleGuide.selectionBox.selected.color,
    borderColor: StyleGuide.selectionBox.base.borderColor,
  },
});

export default CategoryFilter;
