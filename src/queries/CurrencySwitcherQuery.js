import { client, Query } from '@tilework/opus';


export const getCurrencies = async () => {
    client.setEndpoint("https://jazzy-chimera-ebc7e8.netlify.app/");
    return await client.post(currenciesQuery);
}

const currenciesQuery = new Query("currencies", true)
    .addField("label")
    .addField("symbol")