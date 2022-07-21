import { client, Query, Field } from '@tilework/opus';

export const getCategories = async () => {
    client.setEndpoint("http://localhost:4000/");
    return await client.post(categoriesQuery);
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


const categoriesQuery = new Query("category", true)
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