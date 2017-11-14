const BASE_URL = "http://127.0.0.1:9150";
export const DATASOURCE_URL = BASE_URL + "/datasource/";
export const TASK_URL = BASE_URL + "/task/";
export const TASK_PROCESSED_URL = BASE_URL + "/processed/";

export const getSingleDBUrl = (id) => DATASOURCE_URL + id;
export const getSingleTaskUrl = (id) => TASK_URL + id;
export const getSingleProcessedUrl = (id) => TASK_PROCESSED_URL + id;
export const getStartTaskUrl = (id) => TASK_URL +"start/"+ id;
