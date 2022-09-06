import { client, Query } from '@tilework/opus';

export const getCategories = async () => {
    client.setEndpoint("http://localhost:4000/");
    return await client.post(categoriesQuery);
}

const categoriesQuery = new Query("categories", true)
    .addField("name")