import { apiURL } from "../api/config";
import { Office } from "../api/data-contracts";

export const officeImageURL = (office: Office) => `${apiURL}/images/offices/${office.imgURL}`
