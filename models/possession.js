import mongoose from '../config/database.js'

const { Schema, model } = mongoose

const possessionSchema = new Schema(
  {
    assetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InventoryItem',
      required: true
    },
    possessionHistory: [
      {
        user: {
          type: String,
          required: true
        },
        action: {
          type: String, // 'Assigned', 'Returned', etc.
          required: true
        },
        possesor: {
          type: String,
          required: true
        },
        timestamp: {
          type: Date,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
)

const PossessionSchema = model('PossessionSchema', possessionSchema)

export default PossessionSchema
