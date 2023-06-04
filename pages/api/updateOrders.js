import axios from "axios";

export default async function handler(req, res) {
  const { data } = req.body;
  const apiToken = process.env.SANITY_TOKEN; // Replace 'YOUR_API_TOKEN' with your actual API token

  try {
    const response = await axios.post(
      "https://oqxfb1x1.api.sanity.io/v1/data/mutate/production",
      {
        mutations: [
          {
            patch: {
              id: data.id,
              set: {
                orderStatus: data.orderStatus,
                // Additional fields and their new values
              },
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
      console.log("Data updated successfully");
      // Handle success (e.g., send a response to the client)
      res.status(200).json({ message: "Data updated successfully" });
    } else {
      throw new Error("Error updating data");
    }
  } catch (error) {
    console.error("Error updating data:", error);
    // Handle error (e.g., send an error response to the client)
    res.status(500).json({ error: "Error updating data" });
  }
}
