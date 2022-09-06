import { useContext, useEffect } from 'react';

import classes from './notification.module.css';
import { NotificationCCtx } from '../../store/notificationContext'

function Notification(props) {
    const notiCtx = useContext(NotificationCCtx)

    const { title, message, status } = props;

    let statusClasses = '';

    if (status === 'success') {
        statusClasses = classes.success;
    }

    if (status === 'error') {
        statusClasses = classes.error;
    }

    if (status === 'pending') {
        statusClasses = classes.pending;
    }

    const activeClasses = `${classes.notification} ${statusClasses}`;

    return (
        <div className={activeClasses} onClick={notiCtx.hideNotification}>
        <h2>{title}</h2>
        <p>{message}</p>
        </div>
    );
}

export default Notification;