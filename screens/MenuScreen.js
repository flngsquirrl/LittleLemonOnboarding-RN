import { useContext, useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";

import Avatar from "../components/Avatar";
import CategoryFilter from "../components/CategoryFilter";

import UserContext from "../contexts/UserContext";
import { addIds } from "../utils/menuUtils";
import { getInitials } from "../utils/profileUtils";
import * as DBService from "../persistence/dbService";
import {
  prepareMenuDirectory,
  getMenuItemImagePath,
  downloadMenuItemImage,
} from "../persistence/menuFileStorage";
import { getMenuItems, getMenuItemImageUrl } from "../network/menuRequests";

const MENU_CATEGORIES = ["Starters", "Mains", "Desserts", "Drinks", "Specialties"];

const MenuScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selections, setSelections] = useState(MENU_CATEGORIES.map((item) => false));

  const initials = getInitials(user.firstName, user.lastName);

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

    preprocessMenuItems(items);

    setMenuItems(items);
    setLoading(false);
  };

  const preprocessMenuItems = (items) => {
    items.forEach((item) => {
      item.imagePath = getMenuItemImagePath(item.image);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const hasNoSelection = selections.every((item) => item === false);
  //     const activeCategories = MENU_CATEGORIES.filter((_category, index) => {
  //       return hasNoSelection ? true : selections[index];
  //     });
  //     const filteredMenuItems = await DBService.filterByNameAndCategories(
  //       searchText,
  //       activeCategories
  //     );
  //     preprocessMenuItems(filteredMenuItems);
  //     setMenuItems(filteredMenuItems);
  //   })();
  // }, [selections, searchText]);

  const MenuItem = ({ name, price, category, imagePath }) => (
    <View style={menuStyles.container}>
      <View style={menuStyles.info}>
        <Text style={menuStyles.name}>{name}</Text>
        <Text style={menuStyles.category}>{category}</Text>
        <Text style={menuStyles.price}>{"$" + price}</Text>
      </View>
      <Image style={menuStyles.image} source={{ uri: `${imagePath}` }} alt={`Photo of ${name}`} />
    </View>
  );

  const renderItem = ({ item }) => (
    <MenuItem
      name={item.name}
      price={item.price}
      category={item.category}
      imagePath={item.imagePath}
    />
  );

  const handleFilterChange = (index) => {
    const copy = [...selections];
    copy[index] = !selections[index];
    setSelections(copy);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Pressable onPress={() => navigation.navigate("profile")}>
        <Avatar imagePath={user.avatarPath} substitutionText={initials} />
      </Pressable>
      <TextInput style={styles.input} value={searchText} onChangeText={setSearchText} />
      <CategoryFilter
        categories={MENU_CATEGORIES}
        selections={selections}
        onChange={handleFilterChange}
      />
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
    padding: 15,
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
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 30,
  },
  price: { fontSize: 20 },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
});

export default MenuScreen;
