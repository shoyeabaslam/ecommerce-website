const orders = {
  "name": "orders",
  "title": "Order",
  "type": "document",
  "fields": [
    {
      "name": "orderId",
      "title": "Order ID",
      "type": "string"
    },
    {
      "name": "customer",
      "title": "Customer Information",
      "type": "object",
      "fields": [
        // Fields for customer information (name, email, address, etc.)
        {
          "name": "cName",
          "title": "Customer Name",
          "type": "string"
        },
        {
          "name": "cEmail",
          "title": "Customer Email",
          "type": "string"
        },
        {
          "name": "cPhone",
          "title": "Customer Phone Number",
          "type": "string"
        },
        {
          "name": "cAddress",
          "title": "Shipping Address",
          "type": "string"
        },
        
      ]
    },

    {
      "name": "items",
      "title": "Order Items",
      "type": "array",
      "of": [
        {
          "type": "object",
          "fields": [
            // Fields for each order item (product ID, name, quantity, price, etc.)
            {
              "name": "productId",
              "title": "Product Id",
              "type": "string"
            },
            {
              "name": "productName",
              "title": "Product Name",
              "type": "string"
            },
            {
              "name": "productQuantity",
              "title": "Product Quantity",
              "type": "number"
            },
            {
              "name": "productPrice",
              "title": "Product Price",
              "type": "number"
            },
          ]
        }
      ]
    },

    {
      "name": "totalPrice",
      "title": "Total Price",
      "type": "number"
    },
    {
      "name": "orderStatus",
      "title": "Order Status",
      "type": "string",
      "options": {
        "list": [
          { "title": "Processing", "value": "Processing" },
          { "title": "Out for Delivery", "value": "OutForDelivery" },
          { "title": "Delivered", "value": "Delivered" },
         
        ],
        "layout": "radio"
      }
    },
    {
      "name": "payment",
      "title": "Payment Information",
      "type": "object",
      "fields": [
        {
          "name": "paymentMode",
          "title": "Payment Mode",
          "type": "string",
          "default": "COD"
        }
      ]
    },
    {
      "name": "specialInstruction",
      "title": "Special Instruction To Seller",
      "type": "string"
    },
    // Timestamps field, additional fields, etc.
  ]
}


export default orders
