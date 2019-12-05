import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import { Button, Card, Icon, SearchBar, Text } from 'react-native-elements';
import { createFilter } from 'react-native-search-filter';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';
import NewJobButton from '../components/NewJobButton';
import BookToJobModal from '../components/BookToJobModal';
import {
  createDealerWipRequest,
  deleteDealerWipRequest,
  getDealerWipsRequest
} from '../actions/dealerWips';
import Urls from '../constants/Urls';
import Colors from '../constants/Colors';
import JobsList from './JobsList';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import dealerWipsDummyData from '../dummyData/dealerWipsDummyData.js';

const KEYS_TO_FILTERS = [
  'tools.partNumber',
  'tools.toolNumber',
  'tools.partDescription'
];

export default JobsScreen = props => {
  const dispatch = useDispatch();
  const dealerWipsItems = useSelector(
    state => state.dealerWips.dealerWipsItems
  );
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userDataObj = useSelector(state => state.user.userData[0]);
  const dealerId = userDataObj && userDataObj.dealerId;
  const userIntId = userDataObj && userDataObj.intId.toString();

  const isLoading = useSelector(state => state.dealerWips.isLoading);
  const dataError = useSelector(state => state.dealerWips.error);
  // Search function
  const [searchInput, setSearchInput] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  if (!userIsSignedIn) {
    props.navigation.navigate('SignIn');
  }
  //   console.log('@@@@@@@@@@@@@', userDataObj);

  const getWipsDataObj = userDataObj && {
    dealerId: userDataObj.dealerId,
    intId: userDataObj.intId
  };
  const getItems = useCallback(getWipsDataObj => {
    // console.log('getWips', getWipsDataObj);
    dispatch(getDealerWipsRequest(getWipsDataObj)), [dealerWipsItems];
  });
  const deleteDealerWip = useCallback(
    wipData => dispatch(deleteDealerWipRequest(wipData)),
    [dealerWipsItems]
  );
  //   const createDealerWip = useCallback(
  //     wipData => dispatch(createDealerWipRequest(wipData)),
  //     [dealerWipsItems]
  //   );

  //   console.log('in jobs screen, wipsItems', JSON.parse(dealerWipsItems));

  useEffect(() => {
    // runs only once
    const getItemsAsync = async () => {
      console.log('in jobs use effect');
      getItems();
    };
    getItemsAsync();
  }, [dispatch]);

  if (dealerWipsItems && dealerWipsItems.length > 0) {
    console.log('in jobs screen, wipsItems', dealerWipsItems.length, userIntId);
  } else {
    console.log('in jobs screen, no wipsItems');
  }

  const userWipsItems =
    (userIntId &&
      dealerWipsItems &&
      dealerWipsItems.length > 0 &&
      dealerWipsItems.filter(
        item => item.userIntId.toString() == userIntId.toString()
      )) ||
    [];
  //   console.log('userWipsItems ', userWipsItems);
  // const { dealerWipsItems } = this.props;
  // console.log('in DealerWipsScreen, dealerWips ', this.props);
  // console.log('in DealerWipsScreen, dealerWips end');
  // console.log('Find DealerWips screen');
  // console.log(dealerWipsItems);
  // console.log('Find DealerWips screen end');

  const searchInputHandler = searchInput => {
    console.log(searchInput);
    setSearchInput(searchInput);
  };

  const refreshRequestHandler = () => {
    console.log('in refreshRequestHandler', getWipsDataObj);
    dealerId && userIntId && getItems(getWipsDataObj);
  };

  const items = (!isLoading && !dataError && userWipsItems) || [];
  //   console.log('items AREEEEEEEEEE', items);
  console.log('isLoading ', isLoading, 'dataError ', dataError);

  const filteredItems =
    (!isLoading && items.filter(createFilter(searchInput, KEYS_TO_FILTERS))) ||
    [];

  //   const items = dealerWipsItems;
  // const items = dealerWipsDummyData;
  // const { search } = this.state;
  // console.log('items');
  // console.log(items);
  // console.log('items end');
  // console.log('in DealerWipsScreen, dealerWips ', dealerWips && dealerWips.items);
  // console.log('in DealerWipsScreen, dealerWips ', dealerWips && dealerWips);
  // console.log('in DealerWipsScreen, dealerWips', dealerWips && dealerWips);
  //   console.log('userIntId ', userIntId);
  //   console.log('userWipsItems sent to JobsList', userWipsItems);
  return (
    <View>
      {/* <SearchBar
        onChangeText={searchInputHandler}
        value={searchInput}
        platform={Platform.OS === 'ios' ? 'ios' : 'android'}
      /> */}

      {/* <NewJobButton setIsModalVisible={setIsModalVisible} /> */}
      <SearchBarWithRefresh
        refreshRequestHandler={refreshRequestHandler}
        searchInputHandler={searchInputHandler}
        searchInput={searchInput}
        isLoading={isLoading}
        dataError={dataError}
        dataCount={userWipsItems.length}
      />

      <ScrollView>
        <JobsList
          items={filteredItems}
          deleteDealerWipRequest={deleteDealerWip}
          userIntId={userIntId}
          baseImageUrl={Urls.toolImage}
        />
      </ScrollView>
    </View>
  );
};

JobsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='My jobs' />,
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='home'
        iconName={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        onPress={() => {
          console.log('pressed homescreen icon');
          navigation.navigate('HomeScreen');
        }}
      />
    </HeaderButtons>
  ),
  headerRight: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='menu'
        iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
        onPress={() => {
          console.log('pressed menu icon');
          navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  )
});

// LocatorScreen.navigationOptions = {
//   headerTitle: <TitleWithAppLogo title='DealerWip Finder' />
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ccc',
    padding: 100
  },
  text: {
    color: '#3f2949',
    marginTop: 10
  }
});
