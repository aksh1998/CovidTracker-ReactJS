import React, { useEffect, useState } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './StatePicker.module.css';

import { fetchStatesData } from '../../api';

const StatePicker = ({ handleStateChange }) => {
    const [fetchedStates, setFetchedStates] = useState([]);

    useEffect(() => {
        const fetchStatesDataApi = async () => {
            setFetchedStates(await fetchStatesData());
        };
        fetchStatesDataApi();
        console.log(fetchedStates);
    }, [setFetchedStates]);
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleStateChange(e.target.value)}>
                <option value="">------</option>
                {fetchedStates.map((State, i) => <option key={i} value={State.state}>{State.state}</option>)}
            </NativeSelect>
        </FormControl>
    );
}

export default StatePicker;