import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { axiosHelperCall } from "../../../helpers/axios.helper";
import { CONFIG } from "../../../helpers/config";
import Select from 'react-select';
import exportFromJSON from 'export-from-json'

import './create_report.css'

const dummyData = []

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

    const parseRawAnswersData = data => {
        return data.map(answer => ({
            Pitanje: answer.QuestionText,
            Odgovor: answer.AnswerText,
            Datum: getParsedDateString(new Date(answer["Date"])),
            'Ime uredjaja': answer.DeviceName,
            'ID uredjaja': answer.DeviceId,
        }))
    }

    const getParsedDateString = (date) => {

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = (date.getFullYear());

        return `${day}-${month}-${year}`
    }

    const exportToExcel = async () => {

        const body = {
            CampaignId: id,
        }

        if (selectedDevice) {
            body.DeviceId = selectedDevice.value;
        }

        axiosHelperCall('post', `${CONFIG.APP_URL}/api/device/response/get`, body).then(r => {
            const data = parseRawAnswersData(r.data);
            const fileName = campaign.Name + '-' + new Date().toISOString()
            const exportType = 'xls'

            exportFromJSON({
                data,
                fileName,
                exportType
            })
        })
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
