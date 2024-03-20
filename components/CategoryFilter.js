import { View, Pressable, Text, StyleSheet } from "react-native";

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
          <Text>{categories[index]}</Text>
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
