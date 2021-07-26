import filter from "lodash/filter";
import get from "lodash/get";
import reduce from "lodash/reduce";
import fetchEggheadUser from "./fetch-egghead-user";

export const purchaseVerifier = async (authToken) => {
    const viewer = await fetchEggheadUser(authToken)

    const sitePurchases = filter(get(viewer, 'purchased', []), {
        site: process.env.NEXT_PUBLIC_SITE_NAME,
    })

    const canViewContent = reduce(
        sitePurchases,
        (canViewContent, currentPurchase) => {
            if (canViewContent) {
                return canViewContent
            }

            return get(currentPurchase, 'bulk', false) !== true
        },
        false,
    )
    const isUnclaimedBulkPurchaser = !canViewContent && sitePurchases.length > 0

    return {
        viewer,
        sitePurchases,
        isUnclaimedBulkPurchaser,
        canViewContent
    }
}