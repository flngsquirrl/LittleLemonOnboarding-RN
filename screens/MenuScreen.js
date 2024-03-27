import debounce from 'lodash.debounce';
import { useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Avatar from '../components/Avatar';
import CategoryFilter from '../components/CategoryFilter';
import HeroBlock from '../components/HeroBlock';
import UserContext from '../contexts/UserContext';
import { getMenuItems, getMenuItemImageUrl } from '../network/menuRequests';
import * as DBService from '../persistence/dbService';
import {
  prepareMenuDirectory,
  getMenuItemImagePath,
  downloadMenuItemImage,
} from '../persistence/menuFileStorage';
import { colorGuide, screenContainer } from '../styles/styleGuide';
import { addIds } from '../utils/menuUtils';
import { getInitials } from '../utils/profileUtils';

const MENU_CATEGORIES = ['Starters', 'Mains', 'Desserts', 'Drinks', 'Specialties'];

const MenuScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');
  const [selections, setSelections] = useState(MENU_CATEGORIES.map((item) => false));

  const initials = getInitials(user.firstName, user.lastName);

  const loadData = useCallback(async () => {
    try {
      await DBService.createTable();
      //await DBService.dropTable();
      let items = await DBService.getMenuItems();
      if (items.length === 0) {
        items = await fetchDataFromNetwork();
        DBService.saveMenuItems(items);
      }

      preprocessMenuItems(items);

      setMenuItems(items);
    } catch (error) {
      console.error('Error preparing menu data', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFilterChange = useCallback(async () => {
    if (!isLoading) {
      const hasNoSelection = selections.every((item) => item === false);
      const activeCategories = MENU_CATEGORIES.filter((_category, index) => {
        return hasNoSelection ? true : selections[index];
      });
      const filteredMenuItems = await DBService.filterByNameAndCategories(query, activeCategories);
      preprocessMenuItems(filteredMenuItems);
      setMenuItems(filteredMenuItems);
    }
  }, [isLoading, query, selections]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  const lookup = useCallback((query) => {
    setQuery(query);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const preprocessMenuItems = (items) => {
    items.forEach((item) => {
      item.imagePath = getMenuItemImagePath(item.image);
    });
  };

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

  const MenuItem = ({ name, price, description, imagePath }) => (
    <View style={menuStyles.container}>
      <View style={menuStyles.infoContainer}>
        <Text style={menuStyles.name}>{name}</Text>
        <Text style={menuStyles.description} numberOfLines={2}>
          {description}
        </Text>
        <Text style={menuStyles.price}>{'$' + price.toFixed(2)}</Text>
      </View>
      <Image style={menuStyles.image} source={{ uri: `${imagePath}` }} alt={`Photo of ${name}`} />
    </View>
  );

  const renderItem = ({ item }) => (
    <MenuItem
      name={item.name}
      price={item.price}
      description={item.description}
      imagePath={item.imagePath}
    />
  );

  const handleSelectionsChange = (index) => {
    const copy = [...selections];
    copy[index] = !selections[index];
    setSelections(copy);
  };

  const handleSearchChange = async (text) => {
    setSearchText(text);
    debouncedLookup(text);
  };

  const FlatListItemSeparator = () => {
    return <View style={menuStyles.separator} />;
  };

  return (
    <>
      <HeroBlock />
      <TouchableOpacity
        style={styles.avatar}
        activeOpacity={0.6}
        onPress={() => navigation.navigate('profile')}>
        <Avatar imagePath={user.avatarPath} substitutionText={initials} size={50} />
      </TouchableOpacity>
      <View style={styles.container}>
        <TextInput style={styles.input} value={searchText} onChangeText={handleSearchChange} />
        <CategoryFilter
          categories={MENU_CATEGORIES}
          selections={selections}
          onChange={handleSelectionsChange}
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={FlatListItemSeparator}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...screenContainer,
    flex: 1,
  },
  title: {
    fontSize: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    height: 40,
    padding: 10,
  },
  avatar: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});

const menuStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  infoContainer: {
    flex: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  description: {
    marginTop: 10,
    marginRight: 10,
    flex: 1,
  },
  price: {
    marginTop: 10,
    fontSize: 20,
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: colorGuide.separatorLine.color,
  },
});

export default MenuScreen;
