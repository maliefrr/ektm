import React, { useState } from "react";
import QRCode from "qrcode.react";
import {useSelector } from 'react-redux'

const QRGenerator = (props) => {
    const {user} = useSelector((state) => state.auth)
    const [data, setData] = useState(`http://localhost:3000/profile/${user.data.username}`);

    return (
        <div className={props.className}>
        <QRCode value={data} size={props.size}/>
        </div>
    );
};

export default QRGenerator;
