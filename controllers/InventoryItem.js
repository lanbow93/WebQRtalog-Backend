import InventoryItem from '../models/inventoryItem.js'
import Possession from '../models/possession.js'
import express from 'express'
import { successfulRequest, failedRequest } from '../utils/SharedFunctions.js'
import { userLoggedIn } from '../utils/UserVerified.js'
const router = express.Router()
const genericError =
  'Unknown Error. Refresh And Try Again. If Issue Persists Contact Webmaster'
/*
Purpose: Creates a new Inventory Item & Possession chain
Needed: productName | category | quantity | serialNumber
*/
router.post('/', userLoggedIn, async (request, response) => {
  try {
    const productName = request.body.productName.toLowerCase().trim()
    const serialNumber = request.body.serialNumber.toLowerCase().trim()
    const itemObject = {
      productName,
      category: request.body.category.toLowerCase().trim(),
      quantity: request.body.quantity,
      serialNumber,
      currentAssignee: 'Asset Management',
      qrCode: `Name: ${productName} Serial: ${serialNumber}`,
      barcode: ''
    }

    const newItem = await InventoryItem.create(itemObject)

    const possessionObject = {
      assetId: newItem._id,
      possessionHistory: [
        {
          user: 'System',
          action: 'Registered',
          possesor: newItem.currentAssignee,
          timestamp: new Date()
        }
      ]
    }

    const newPossession = await Possession.create(possessionObject)

    successfulRequest(
      response,
      'Successful Request',
      `${productName} has been successfully added.`,
      { newItem, newPossession }
    )
  } catch (error) {
    console.log(error)
    let message = 'Unknown Error. Contact Admin If Issue Persists'
    if (error.keyPattern.qrCode) {
      message = 'Device With Same Name And Serial Exists In System'
    }
    failedRequest(response, 'Failed To Add Item', message, error)
  }
})

/*
Purpose: Update Inventory Item Name and Serial
*/
router.put('/:id', userLoggedIn, async (request, response) => {
  try {
    const productName = request.body.productName.toLowerCase().trim()
    const serialNumber = request.body.serialNumber.toLowerCase().trim()

    const itemObject = {
      productName: productName,
      category: request.body.category.toLowerCase().trim(),
      quantity: request.body.quantity,
      serialNumber: serialNumber,
      currentAssignee: request.body.currentAssignee.trim(),
      qrCode: `Name: ${productName} Serial: ${serialNumber}`,
      barcode: request.body.barcode.toLowerCase().trim()
    }

    const updatedItem = await InventoryItem.findByIdAndUpdate(request.params.id, itemObject, {new: true})
    successfulRequest(response, 'Successful Update', `${productName} has been updated successfully`, updatedItem)
  } catch (error) {
    failedRequest(response, 'Failed To Update Item', genericError, error)
  }
})
router.get('/', userLoggedIn, async (request, response) => {
  try {
  } catch (error) {
    failedRequest(response, 'Unable To View Inventory', genericError)
  }
})

export default router
