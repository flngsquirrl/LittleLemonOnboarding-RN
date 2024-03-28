import { Ionicons } from '@expo/vector-icons';
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
import * as DataConsts from '../data/dataConsts';
import { getMenuItems, getMenuItemImageUrl } from '../network/menuRequests';
import * as DBService from '../persistence/dbService';
import {
  prepareMenuDirectory,
  getMenuItemImagePath,
  downloadMenuItemImage,
} from '../persistence/menuFileStorage';
import {
  input,
  inputContainer,
  screenContainer,
  cardTitle,
  paragraph,
} from '../styles/sharedStyles';
import { AppColors, colorGuide } from '../styles/styleGuide';
import { addIds } from '../utils/menuUtils';
import { getInitials } from '../utils/userUtils';

const MenuScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');
  const [selections, setSelections] = useState(DataConsts.MENU_CATEGORIES.map((item) => false));

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
      const activeCategories = DataConsts.MENU_CATEGORIES.filter((_category, index) => {
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

  const MenuItem = useCallback(
    ({ name, price, description, imagePath }) => (
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
    ),
    [],
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

  const MenuAvatar = () => {
    return (
      <TouchableOpacity
        style={styles.avatar}
        activeOpacity={0.6}
        onPress={() => navigation.navigate('profile')}>
        <Avatar imagePath={user.avatarPath} substitutionText={initials} size={50} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <HeroBlock />
      <MenuAvatar />
      <View style={styles.searchContainer}>
        <View style={searchBoxStyles.container}>
          <Ionicons name="search" size={20} style={searchBoxStyles.icon} />
          <TextInput
            style={searchBoxStyles.input}
            value={searchText}
            onChangeText={handleSearchChange}
            clearButtonMode="always"
          />
        </View>
      </View>
      <View style={styles.container}>
        <CategoryFilter
          categories={DataConsts.MENU_CATEGORIES}
          selections={selections}
          onChange={handleSelectionsChange}
        />
        <FlatListItemSeparator />
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
  searchContainer: {
    backgroundColor: colorGuide.heroBlock.background,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  container: {
    ...screenContainer,
    flex: 1,
  },
  title: {
    fontSize: 30,
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
    flex: 3,
  },
  name: {
    ...cardTitle,
    flex: 1,
  },
  description: {
    ...paragraph,
    marginTop: 10,
    marginRight: 10,
    flex: 1,
  },
  price: {
    ...paragraph,
    marginTop: 10,
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: AppColors.lightGrey,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: colorGuide.separatorLine.color,
  },
});

const searchBoxStyles = StyleSheet.create({
  container: {
    ...inputContainer,
    padding: 0,
    backgroundColor: AppColors.lightGrey,
    flexDirection: 'row',
  },
  input: {
    ...input,
    flex: 1,
    padding: 0,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: AppColors.grey,
  },
  icon: {
    alignContent: 'center',
    padding: 10,
    color: AppColors.darkGrey,
  },
});

export default MenuScreen;
