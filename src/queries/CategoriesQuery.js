import { client, Query } from '@tilework/opus';

export const getCategories = async () => {
    client.setEndpoint("https://jazzy-chimera-ebc7e8.netlify.app/");
    return await client.post(categoriesQuery);
}

const categoriesQuery = new Query("categories", true)
    .addField("name")