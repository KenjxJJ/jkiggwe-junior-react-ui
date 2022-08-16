import { client, Query, Field } from '@tilework/opus';

export const getCategory = async (item) => {
    client.setEndpoint("https://jazzy-chimera-ebc7e8.netlify.app/");
    return await client.post(categoryQuery(item));
}

// {
//     categories {
//       name
//       products {
//         id
//         name
//         brand
//         inStock
//         description
//         attributes {
//           id
//           name
//           items {
//             id
//             value
//             displayValue
//           }
//           type
//         }
//         gallery
//         prices {
//           amount
//           currency {
//             label
//             symbol
//           }
//         }
//         category
//       }
//     }
//   }


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