import React, { useEffect, useState } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './DistrictPicker.module.css';

import { fetchDistrictsName } from '../../api';

const DistrictPicker = ({ districtList, handleDistrictChange }) => {
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleDistrictChange(e.target.value)}>
                <option value="">------</option>
                {districtList.map((District, i) => <option key={i} value={District}>{District}</option>)}
            </NativeSelect>
        </FormControl>
    );
}

export default DistrictPicker;