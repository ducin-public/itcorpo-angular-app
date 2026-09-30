import { InjectionToken } from "@angular/core"
import { environment } from "src/environments/environment"

const it = new InjectionToken('API_URL')

export const { apiURL } = environment
export const MAX_PAGE_SIZE = 50
export const RETRY_DELAY = 2500
