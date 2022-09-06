import { Fragment, useContext } from 'react';

import MainHeader from './main-header';
import Notification from '../ui/notification'
import { NotificationCCtx } from '../../store/notificationContext'
function Layout(props) {
  const notiCtx = useContext(NotificationCCtx)
  const existNoti = notiCtx.notification

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {existNoti && <Notification title={existNoti.title} message={existNoti.message} status={existNoti.status} />}
    </Fragment>
  );
}

export default Layout;
