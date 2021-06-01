import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { axiosHelperCall } from "../../../helpers/axios.helper";
import { CONFIG } from "../../../helpers/config";
import Select from 'react-select';

import './create_report.css'

function CreateReport() {

    const { id } = useParams();
    const [async, setAsync] = useState(false);
    const [campaign, setCampaign] = useState(null);
    const [deviceOptions, setDeviceOptions] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);

    useEffect(() => {
        try {
            setAsync(true);
            axiosHelperCall('GET', `${CONFIG.APP_URL}/api/campaign/` + id, {}, {}).then(r => {
                setCampaign(r.data);
            }).finally(() => {
                setAsync(false);
            })

            axiosHelperCall('GET', `${CONFIG.APP_URL}/faDefinition/all`, {}, {}).then(r => {
                setDeviceOptions(r.data.map(device => ({ label: device?.naziv, value: device?.id })))
            })

        } catch (ex) {
            console.log("Failed fetching Campaign with id: " + id);
        }
    }, [])

    const exportToExcel = () => {

        const body = {
            CampaignId: id,
        }

        if (selectedDevice) {
            body.DeviceId = selectedDevice.value;
        }

        console.log(body);
    }

    return (
        <div className={'create-report'}>
            {async ? (
                <div className={'loading'}>
                    Učitava se...
                </div>
            ) : (
                campaign && (
                    <div className={'report-form'}>
                        <span className={'campaign-label'}>Kampanja:</span>
                        <span className={'campaign-name'}>{campaign.Name}</span>
                        <div className={'select-device-label'}>Izaberite uređaj</div>
                        <Select options={deviceOptions}
                                isClearable={true}
                                value={selectedDevice}
                                onChange={val => setSelectedDevice(val)}
                                className={'device-select'}/>
                        <button className={'btn btn-success export-btn'} onClick={exportToExcel}>
                            Export to Excel
                        </button>
                    </div>
                )
            )}
        </div>
    );
}

export default CreateReport;
