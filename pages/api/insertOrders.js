import { isUserDuplicate } from "@/sanity/sanity-utils";
import axios from "axios";
export default async function handler(req, res) {
  const {data} = req.body
  const apiToken = process.env.SANITY_TOKEN; // Replace 'YOUR_API_TOKEN' with your actual API token
  try {
    const response = await axios.post(
      "https://oqxfb1x1.api.sanity.io/v1/data/mutate/production",
      {
        mutations: [
          {
            create: {
              _type: "orders", // Specify the Sanity document type
              customer: {
                _type: "customer", // Specify the Sanity document type for the customer
                cAddress: data.customer.cAddress,
                cEmail: data.customer.cEmail,
                cName: data.customer.cName,
                cPhone: data.customer.cPhone,
              },
              items: data.items,
              totalPrice: data.totalPrice,
              orderStatus: data.orderStatus,
              payment: {
                _type: "payment", // Specify the Sanity document type for the payment
                paymentMode: data.payment.paymentMode,
              },
              specialInstruction: data.specialInstruction,
              orderId: data.orderId,
            },
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
  
    if (response.status === 200) {
      console.log("Data inserted successfully");
      // Handle success (e.g., send a response to the client)
      res.status(200).json({ message: "Data inserted successfully" });
    } else {
      throw new Error("Error inserting data");
    }
  } catch (error) {
    console.error("Error inserting data:", error);
    // Handle error (e.g., send an error response to the client)
    res.status(500).json({ error: "Error inserting data" });
  }
  
}
