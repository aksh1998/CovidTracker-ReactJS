import './App.css';
import React from 'react';
import { Cards, DisplayChart, CountryPicker, StatePicker, DistrictPicker } from './component';
import styles from './App.module.css';
import { fetchData, fetchStatesData, fetchDistrictsData, fetchDistrictsName } from './api';
class App extends React.Component {
  state = {
    data: {},
    country: '',
    stateName: '',
    districtList: [],
    district: ''
  }

  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data: data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);
    this.setState({ data: data, country: country, stateName: '', district: '' });
  }

  handleStateChange = async (stateName) => {
    const data = await fetchStatesData(stateName);
    this.setState({ data: data, stateName: stateName, districtList: await fetchDistrictsName(stateName) });
  }
  handleDistrictChange = async (district) => {
    const data = await fetchDistrictsData(this.state.stateName, district);
    this.setState({ data: data, district: district });
  }

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        {country === 'India' ? <StatePicker handleStateChange={this.handleStateChange} /> : null}
        {this.state.stateName ? <DistrictPicker districtList={this.state.districtList} handleDistrictChange={this.handleDistrictChange} /> : null}
        <DisplayChart data={data} country={country} />
      </div>
    );
  }
}

export default App;
