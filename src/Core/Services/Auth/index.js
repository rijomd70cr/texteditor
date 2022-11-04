
export const TOKEN_NAME = "AUTH_TOKEN";
export const AUTH_USER = "AUTH_USER";
export const REG_USER = "REG_USER";

export const isAuth = () => localStorage.getItem(TOKEN_NAME) !== null;
export const getAuthToken = () => 'Bearer ' + localStorage.getItem(TOKEN_NAME);
export const getAuthUser = (key = "") => {
    let d = JSON.parse(localStorage.getItem(AUTH_USER))
    if (key) {
        d = d[key];
    }
    return d;
};

export const destroyAuth = () => {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(AUTH_USER);
}
export const destroyRegUser = () => {
    localStorage.removeItem(REG_USER);
}

export const attemptAuth = (data) => {
    localStorage.setItem(TOKEN_NAME, data.access_token);
    localStorage.setItem(AUTH_USER, JSON.stringify(data.user));
}

export const sampleAuth = (data) => {
    let reg_data = JSON.parse(localStorage.getItem(REG_USER))
    if (reg_data) {
        if (reg_data.email === data.email) {
            localStorage.setItem(TOKEN_NAME, "awsdhdjnckks");
            localStorage.setItem(AUTH_USER, JSON.stringify(data));
            destroyRegUser();
            return "Succes"
        }
        else {
            return "Auth Failed"
        }
    }
    else if (!reg_data) {
        return "Please Register"
    }
    else {
        return "Auth Failed"
    }
}

export const sampleRegister = (data) => {
    if (data.email && data.password) {
        localStorage.setItem(REG_USER, JSON.stringify(data));
        return true
    }
    else {
        return false
    }
}