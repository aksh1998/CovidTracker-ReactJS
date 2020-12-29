import './App.css';
import React from 'react';
import { Cards, Chart, CountryPicker, StatePicker, DistrictPicker } from './component';
import styles from './App.module.css';
import { fetchData, fetchStatesData, fetchDistrictsData } from './api';
class App extends React.Component {
  state = {
    data: {},
    country: '',
    stateName: '',
    district: ''
  }

  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data: data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);
    this.setState({ data: data, country: country });
  }

  handleStateChange = async (stateName) => {
    const data = await fetchStatesData(stateName);
    this.setState({ data: data, stateName: stateName });
  }
  handleDistrictChange = async (district) => {
    console.log(district, this.state.stateName);
    const data = await fetchDistrictsData(this.state.stateName, district);
    console.log("district", data)
    this.setState({ data: data, district: district });
  }
  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        {country === 'India' ? <StatePicker handleStateChange={this.handleStateChange} /> : null}
        {this.state.stateName ? <DistrictPicker state={this.state.stateName} handleDistrictChange={this.handleDistrictChange} /> : null}
        {/* {country === 'india'?<DistrictPicker/>:null} */}
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
