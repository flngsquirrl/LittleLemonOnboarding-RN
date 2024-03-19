import { useContext, useState, useEffect } from "react";
import { View, Image, Text, Button, StyleSheet, ActivityIndicator, FlatList } from "react-native";

import UserContext from "../contexts/UserContext";
import { addIds } from "../utils/menuUtils";
import { getMenuItemImagePath, downloadMenuItemImage } from "../persistence/menuFileStorage";
import { getMenuItems, getMenuItemImageUrl } from "../network/menuRequests";

const MenuScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const loadData = async () => {
    let items = await getMenuItems();
    items = addIds(items);

    await items.forEach(async (item) => {
      const imageUrl = getMenuItemImageUrl(item.image);
      await downloadMenuItemImage(imageUrl, item.image);
    });

    items.forEach((item) => {
      item.imagePath = getMenuItemImagePath(item.image);
    });

    setMenuItems(items);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const MenuItem = ({ name, price, imagePath }) => (
    <View style={menuStyles.itemContainer}>
      <Text style={menuStyles.itemName}>{name}</Text>
      <Text style={menuStyles.itemPrice}>{"$" + price}</Text>
      <Image style={menuStyles.image} source={{ uri: `${imagePath}` }} alt={`Photo of ${name}`} />
    </View>
  );

  const renderItem = ({ item }) => (
    <MenuItem name={item.name} price={item.price} imagePath={item.imagePath} />
  );

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

const menuStyles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});

export default MenuScreen;
