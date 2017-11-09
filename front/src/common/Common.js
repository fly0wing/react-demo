import moment from "moment";
export const isNotNull = (exp) => {
    return !isNull(exp);
};

export const isNull = (exp) => {
    return (!exp && typeof(exp) !== "undefined" && exp !== 0) || typeof(exp) === "undefined";
};

export const dateFormat = (date) => {
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
};
