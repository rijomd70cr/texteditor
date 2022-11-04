import Config from "../../Config";
import Menus from "../../Config/menus";
import colors from "../../Config/colors";
import { StaticData } from "../../Data/StaticData";

export const getStaticData = (name) => StaticData[name];
export const getConfig = (name) => Config[name];
export const url = (url) => encodeURI(`${Config.API_URL}${url}`);
export const serverValidationError = (value) => value ? value[0] : null;
export const sampleValidationError = (value) => value ? value : null;
export const getMenus = () => Menus;

export const getColors = (clr) => {
    let d = colors[clr];
    if (!d) return clr;
    return d;
}
export const capitalize = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
}
export const generateServerSideError = (errors) => {
    let keys = Object.keys(errors);
    let reSet = {};
    for (let i = 0; i < keys.length; i++) {
        const element = keys[i];
        reSet = {
            ...reSet,
            [element]: errors[element][0]
        }
    }

    return reSet;
}


