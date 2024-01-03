import mongoose from '../config/database.js'

const { Schema, model } = mongoose

const inventoryItemSchema = new Schema(
  {
    productName: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    serialNumber: {
      type: String,
      required: true
    },
    currentAssignee: {
      type: String,
      required: true
    },
    qrCode: {
      type: String,
      required: true,
      unique: true
    },
    barcode: {
      type: String
    }
  },
  { timestamps: true }
)

const InventoryItem = model('InventoryItem', inventoryItemSchema)

export default InventoryItem
