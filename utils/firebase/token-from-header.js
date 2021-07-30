import {getTokenFromCookieHeaders} from "../auth";
import fetchEggheadUser from "../fetch-egghead-user";
import firebaseAdminApi from "./admin";

export const firebaseTokenFromHeader = async (cookieHeader, honeycombEvent) => {
    if(honeycombEvent) {
        honeycombEvent.add({
            env: process.env.NODE_ENV,
            cookie: cookieHeader
        })
    }

    const {eggheadToken} = getTokenFromCookieHeaders(cookieHeader)

    if (!eggheadToken) {
        throw new Error('eggheadToken is empty')
    }

    const eggheadUser = await fetchEggheadUser(eggheadToken)
    if (!eggheadUser) {
        throw new Error('eggheadUser is empty')
    }

    if(honeycombEvent) {
        honeycombEvent.add({
            contactId: eggheadUser.contact_id,
            email: eggheadUser.email
        })
    }

    const firebaseToken = await firebaseAdminApi.generateAuthToken(eggheadUser)

    if (!firebaseToken) {
        throw new Error('token is empty')
    }

    return firebaseToken
}