import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { axiosHelperCall } from "../../../helpers/axios.helper";
import { CONFIG } from "../../../helpers/config";

import './create_report.css'

function CreateReport() {

    const { id } = useParams();
    const [async, setAsync] = useState(false);
    const [campaign, setCampaign] = useState(null);

    useEffect(() => {
        try {
            setAsync(true);
            axiosHelperCall('GET', `${CONFIG.APP_URL}/api/campaign/` + id, {}, {}).then(r => {
                setCampaign(r.data);
            }).finally(() => {
                setAsync(false);
            })
        } catch (ex) {
            console.log("Failed fetching Campaign with id: " + id);
        }
    }, [])

    return (
        <div className={'create-report'}>
            {async ? (
                <div className={'loading'}>
                    Učitava se
                </div>
            ) : (
                campaign && (
                    <div className={'report-form'}>
                        <span className={'campaign-label'}>Kampanja:</span>
                        <span className={'campaign-name'}>{campaign.Name}</span>
                    </div>
                )
            )}
        </div>
    );
}

export default CreateReport;
