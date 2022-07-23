import { client, Query } from '@tilework/opus';

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


const categoriesQuery = new Query("categories", true)
    .addField("name")