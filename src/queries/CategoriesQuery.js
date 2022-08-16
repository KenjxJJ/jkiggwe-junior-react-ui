import { client, Query } from '@tilework/opus';

export const getCategories = async () => {
    client.setEndpoint("https://jazzy-chimera-ebc7e8.netlify.app/");
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