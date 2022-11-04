import { appNotification } from "./AppRedux";

export const notification = (message, open = true) => async (dispatch) => {
    dispatch(appNotification({ open: open, message: message }));

    setTimeout(() => {
        dispatch(appNotification({ open: false, message: "" }));
    }, 5000);
}