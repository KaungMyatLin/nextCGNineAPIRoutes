import { createContext } from 'react'

export const NotificationCCtx = createContext({
    notification: null,
    showNoti_mthd_fromCtx: function(notificationData) {
    },
    hideNoti_mthd_fromCtx: function() {

    }
})
export function NotiCtxPrvdr_Cmp() {
    const [activeNotification, setActiveNotification] = useState();
    function showNoti_hdl(notificationData) {
        setActiveNotification(notificationData)
    }
    function hideNoti_hdl() {
        setActiveNotification(null);
    }
    const distributeCtx = {notification: activeNotification, showNoti_mthd_fromCtx: showNoti_hdl, hideNoti_mthd_fromCtx: hideNoti_hdl}
    return (
            <NotificationCCtx.Provider value={distributeCtx}>
                {props.children}
            </NotificationCCtx.Provider>
            )
}