import Libhoney from "libhoney";

export const hny = new Libhoney({
    writeKey: process.env.HONEYCOMB_API_KEY,
    dataset: process.env.HONEYCOMB_DATASET
});