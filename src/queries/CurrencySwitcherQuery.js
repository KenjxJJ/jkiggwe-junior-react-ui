import { client, Query } from '@tilework/opus';


export const getCurrencies = async () => {
    client.setEndpoint("http://localhost:4000/");
    return await client.post(currenciesQuery);
}

const currenciesQuery = new Query("currencies", true)
    .addField("label")
    .addField("symbol")