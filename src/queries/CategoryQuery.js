import { client, Query, Field } from '@tilework/opus';

export const getCategory = async (item) => {
    client.setEndpoint("http://localhost:4000/");
    return await client.post(categoryQuery(item));
}

const categoryQuery = (_title) => {
    return new Query("category", true)
        .addArgument("input", "CategoryInput!", _title)
        .addField("name")
        .addField(new Field("products", true)
            .addField("id")
            .addField("name")
            .addField("brand")
            .addField("inStock")
            .addField("description")
            .addField("category")
            .addField(new Field("attributes", true)
                .addField("id")
                .addField("__typename")
            )
            .addField("gallery")
            .addField(new Field("prices")
                .addField("amount")
                .addField(new Field("currency")
                    .addField("symbol")
                    .addField("label")
                )
            ))
}