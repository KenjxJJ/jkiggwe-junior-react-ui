import { client, Field, Query } from '@tilework/opus';


export const getProduct = async (product_id) => {
    client.setEndpoint("http://localhost:4000/");
    return await client.post(productQuery(product_id));
}

const productQuery = (product_id) => {
    return new Query("product", true)
        .addArgument("id", "String!", product_id)
        .addField("id")
        .addField("name")
        .addField("gallery")
        .addField("brand")
        .addField("inStock")
        .addField("description")
        .addField("category")
        .addField(new Field("prices")
            .addField("amount")
            .addField(new Field("currency")
                .addField("symbol"))
        )
        .addField(new Field("attributes")
            .addField("id")
            .addField("type")
            .addField(new Field("items")
                .addField("id")
                .addField("displayValue")
                .addField("value")))
}