import { View, Pressable, Text, StyleSheet } from "react-native";

const CategoryFilter = ({ categories, onChange }) => {
  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <Pressable
          style={[styles.item, category.isSelected && styles.selected]}
          key={index}
          onPress={() => {
            onChange(index);
          }}
        >
          <Text>{category.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  item: {
    padding: 5,
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 10,
  },
  selected: {
    backgroundColor: "yellow",
    opacity: 0.5,
  },
});

export default CategoryFilter;
