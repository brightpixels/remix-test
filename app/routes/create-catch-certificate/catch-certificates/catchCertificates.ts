import CONFIG from "~/config";
import {IDashboardData } from "~/types";

const CC_URL = `${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/documents/2022/3?type=catchCertificate`
const NOTIFICATION_URL = `${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/notification`;

export const getCatchCertificates = async(): Promise<IDashboardData[]> => {
    const res = await fetch(CC_URL);
    const data = await res.json();
    const response = await fetch(NOTIFICATION_URL);
    const notification = await response.json();
    return { ...data, notification };
}