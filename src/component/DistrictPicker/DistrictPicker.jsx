import React, { useEffect, useState } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './DistrictPicker.module.css';

import { fetchDistrictsName } from '../../api';

const DistrictPicker = ({ state, handleDistrictChange }) => {
    const [fetchedDistricts, setFetchedDistricts] = useState([]);

    useEffect(() => {
        const fetchDistrictsDataApi = async () => {
            setFetchedDistricts(await fetchDistrictsName(state));
        };
        fetchDistrictsDataApi();
    }, [setFetchedDistricts]);
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleDistrictChange(e.target.value)}>
                <option value="">------</option>
                {fetchedDistricts.map((District, i) => <option key={i} value={District}>{District}</option>)}
            </NativeSelect>
        </FormControl>
    );
}

export default DistrictPicker;