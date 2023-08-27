import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Card,
  Input,
  Layout,
  Select,
  SelectItem,
  Text,
  IndexPath,
  Button,
  TabBar,
  Tab,
} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategories} from '../../store/actions/categoriesAction';
import moment from 'moment';
import LatestLaws from '../../components/LatestLaws';
import MostViewedLaws from '../../components/MostViewedLaws';
import MissionStatement from '../../components/MissionStatement';
import AboutUs from '../../components/AboutUs';
import {useNavigation} from '@react-navigation/native';

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');

  const currentYear = moment().year();
  const selectOptions2 = Array.from({length: currentYear - 1838}, (_, i) =>
    (1839 + i).toString(),
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndex1, setSelectedIndex1] = useState(0);
  const [selectedIndex2, setSelectedIndex2] = useState(0);

  const renderSelectItem = title => <SelectItem key={title} title={title} />;

  const renderRecentTabContent = () => {
    switch (selectedIndex) {
      case 0:
        return <LatestLaws />;
      case 1:
        return <MostViewedLaws />;
      default:
        return null;
    }
  };

  const renderImportantTabContent = () => {
    switch (selectedIndex1) {
      case 0:
        return <LatestLaws />;
      case 1:
        return <MostViewedLaws />;
      default:
        return null;
    }
  };

  const renderAboutSection = () => {
    switch (selectedIndex2) {
      case 0:
        return <MissionStatement />;
      case 1:
        return <AboutUs />;
      default:
        return null;
    }
  };

  //Search functionality
  const navigation = useNavigation();

  const performSearch = () => {
    const searchData = {
      searchTerm,
      category: categories[selectedOption1.row]?.catid,
      year: selectOptions2[selectedOption2.row],
    };
    navigation.navigate('SearchResults', {
      searchData: searchData,
    });
  };

  return (
    <ScrollView style={{flex: 1}} nestedScrollEnabled={true}>
      <Layout style={styles.container} level="1">
        <Text
          style={{
            color: '#333',
            marginBottom: 16,
            fontSize: 18,
            fontWeight: 600,
            alignSelf: 'center',
          }}>
          The Pakistan Code
        </Text>
        <View style={styles.searchBox}>
          <Text style={styles.heading}>Search Laws</Text>
          <Text style={styles.label}>Search Term</Text>
          <Input
            style={styles.input}
            value={searchTerm}
            placeholder="Search"
            onChangeText={nextValue => setSearchTerm(nextValue)}
          />
          <View style={styles.selectContainer}>
            <View style={styles.selectView}>
              <Text style={styles.label}>Categories</Text>
              <Select
                style={styles.select}
                selectedIndex={selectedOption1}
                onSelect={index => setSelectedOption1(index)}
                value={
                  selectedOption1
                    ? categories[selectedOption1.row]?.CATEGOR
                    : ''
                }
                placeholder="Select Option">
                {categories.map(cat => renderSelectItem(cat.CATEGOR))}
              </Select>
            </View>
            <View style={styles.selectView}>
              <Text style={styles.label}>Year</Text>
              <Select
                style={styles.select}
                selectedIndex={selectedOption2}
                onSelect={index => setSelectedOption2(index)}
                value={
                  selectedOption2 ? selectOptions2[selectedOption2.row] : ''
                }
                placeholder="Select Option">
                {selectOptions2.map(renderSelectItem)}
              </Select>
            </View>
          </View>
          <Button
            title="Search"
            style={styles.searchBtn}
            onPress={performSearch}>
            Search
          </Button>
          <TouchableOpacity
            style={{paddingVertical: 5, paddingHorizontal: 5, marginTop: 15}}>
            <Text style={{color: '#f7f7f7', textAlign: 'right'}}>
              Clear Search
            </Text>
          </TouchableOpacity>
        </View>
        <Card style={styles.card}>
          <TabBar
            selectedIndex={selectedIndex2}
            onSelect={index => setSelectedIndex2(index)}>
            <Tab title="Mission Statement" />
            <Tab title="About Us" />
          </TabBar>
          {renderAboutSection()}
        </Card>
        <Card style={styles.card}>
          <Text
            style={{
              color: '#333',
              marginBottom: 16,
              fontSize: 18,
              fontWeight: 600,
            }}>
            Recent Laws
          </Text>
          <TabBar
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            <Tab title="Latest" />
            <Tab title="Most Viewed" />
          </TabBar>
          {renderRecentTabContent()}
        </Card>
        <Card style={styles.card}>
          <Text
            style={{
              color: '#333',
              marginBottom: 16,
              fontSize: 18,
              fontWeight: 600,
            }}>
            Most Important Laws
          </Text>
          <TabBar
            selectedIndex={selectedIndex1}
            onSelect={index => setSelectedIndex1(index)}>
            <Tab title="Latest" />
            <Tab title="Most Viewed" />
          </TabBar>
          {renderImportantTabContent()}
        </Card>
        <Card style={styles.imgCard}>
          <Image
            style={styles.teamImage}
            source={require('../../assets/img/federal_law_minister.jpg')}
          />
          <Text style={styles.teamTitle}>MR. AHMED IRFAN ASLAM</Text>
          <Text style={styles.teamDesignation}>
            Federal Minister for Law and Justice
          </Text>
        </Card>
        <Card style={styles.imgCard}>
          <Image
            style={styles.teamImage}
            source={require('../../assets/img/secretary_law.png')}
          />
          <Text style={styles.teamTitle}>Mr. Raja Naeem Akbar</Text>
          <Text style={styles.teamDesignation}>
            Secretary for Law and Justice
          </Text>
        </Card>
        {/*
        <Card style={styles.imgCard}>
         {/*<Image
            style={styles.teamImage}
            source={require('../../assets/img/state_minister.png')}
          />
          <Text style={styles.teamTitle}>Mr. Shahadat Awan</Text>
          <Text style={styles.teamDesignation}>
            State Minister for Law and Justice
          </Text>
        </Card>
        <Card style={styles.imgCard}>
          <Image
            style={styles.teamImage}
            source={require('../../assets/img/Parliament_sec.png')}
          />
          <Text style={styles.teamTitle}>Ms. Mehnaz Akbar Aziz</Text>
          <Text style={styles.teamDesignation}>
            Parliamentary Secretary for Law and Justice
          </Text>
        </Card>
         */}
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(40, 167, 69, 0)',
  },
  searchBox: {
    padding: 16,
    backgroundColor: 'rgba(40, 167, 69, 0.9)',
    borderRadius: 5,
    marginBottom: 18,
  },
  heading: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 8,
    alignSelf: 'center',
  },
  searchBtn: {
    backgroundColor: 'rgba(40, 130, 69, 1)',
    borderWidth: 0,
  },
  input: {
    marginVertical: 8,
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  select: {
    marginVertical: 8,
  },
  card: {
    marginVertical: 8,
    padding: 5,
    borderRadius: 5,
  },
  tabItem: {
    padding: 16,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  list: {
    flexGrow: 1, // Set the flexGrow to 1 so it expands and utilizes the space
  },
  label: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  selectView: {
    flex: 1,
    marginHorizontal: 8,
  },
  teamImage: {
    width: '100%',
    height: 400,
    borderRadius: 5,
    marginVertical: 8,
  },
  imgCard: {
    marginVertical: 8,
    padding: 5,
    borderRadius: 5,
  },
  teamTitle: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 700,
    color: '#333',
    marginTop: 8,
  },
  teamDesignation: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 600,
    color: 'rgba(40, 167, 69, 0.9)',
    marginVertical: 8,
  },
});

export default HomePage;
