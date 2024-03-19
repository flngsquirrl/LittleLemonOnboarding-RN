import { useContext, useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, FlatList } from "react-native";

import UserContext from "../contexts/UserContext";
import { addIds } from "../utils/menuUtils";
import { getMenuItems } from "../network/menuRequests";

const MenuScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const items = await getMenuItems();
      const itemWithIds = addIds(items);
      console.log(itemWithIds);
      setMenuItems(itemWithIds);
      setLoading(false);
    })();
  }, []);

  const MenuItem = ({ name, price }) => (
    <View style={menuStyles.itemContainer}>
      <Text style={menuStyles.itemName}>{name}</Text>
      <Text style={menuStyles.itemPrice}>{"$" + price}</Text>
    </View>
  );

  const renderItem = ({ item }) => <MenuItem name={item.name} price={item.price} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Text>{user.firstName}</Text>
      <Text>{user.hasAvatar ? "true" : "false"}</Text>
      <Button title='Profile' onPress={() => navigation.navigate("profile")} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList data={menuItems} keyExtractor={(item) => item.id} renderItem={renderItem} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
  },
});

const menuStyles = StyleSheet.create({});

export default MenuScreen;
