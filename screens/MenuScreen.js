import { useContext, useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import CategoryFilter from "../components/CategoryFilter";

import UserContext from "../contexts/UserContext";
import { addIds } from "../utils/menuUtils";
import * as DBService from "../persistence/dbService";
import {
  prepareMenuDirectory,
  getMenuItemImagePath,
  downloadMenuItemImage,
} from "../persistence/menuFileStorage";
import { getMenuItems, getMenuItemImageUrl } from "../network/menuRequests";

const MenuScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchDataFromNetwork = async () => {
    let items = await getMenuItems();
    items = addIds(items);

    await prepareMenuDirectory();
    const downloadPromises = items.map(async (item) => {
      const imageUrl = getMenuItemImageUrl(item.image);
      return await downloadMenuItemImage(imageUrl, item.image);
    });
    await Promise.allSettled(downloadPromises);

    return items;
  };

  const loadData = async () => {
    await DBService.createTable();
    //await DBService.dropTable();
    let items = await DBService.getMenuItems();
    if (items.length == 0) {
      items = await fetchDataFromNetwork();
      DBService.saveMenuItems(items);
    }

    items.forEach((item) => {
      item.imagePath = getMenuItemImagePath(item.image);
    });

    setMenuItems(items);
    setLoading(false);
  };

  const menuCategories = ["Starters", "Mains", "Desserts", "Drinks", "Specialties"];

  const prepareCategories = () => {
    const preparedCategories = menuCategories.map((category) => ({
      name: category,
      isSelected: false,
    }));
    setCategories(preparedCategories);
  };

  useEffect(() => {
    loadData();
    prepareCategories();
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

  const handleFilterChange = (index) => {
    const copy = [...categories];
    copy[index].isSelected = !categories[index].isSelected;
    setCategories(copy);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Text>{user.firstName}</Text>
      <Text>{user.hasAvatar ? "true" : "false"}</Text>
      <Button title='Profile' onPress={() => navigation.navigate("profile")} />
      <TextInput style={styles.input} value={searchText} onChangeText={setSearchText} />
      <CategoryFilter categories={categories} onChange={handleFilterChange} />
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
  },
  title: {
    fontSize: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    height: 40,
    padding: 10,
  },
});

const menuStyles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});

export default MenuScreen;
