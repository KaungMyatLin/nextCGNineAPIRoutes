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
      {activeNotification && <Notification title={existNoti.title} message="This is a test" status="pending" />
    </Fragment>
  );
}

export default Layout;
