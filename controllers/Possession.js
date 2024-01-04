import InventoryItem from '../models/inventoryItem.js'
import Possession from '../models/possession.js'
import express from 'express'
import { successfulRequest, failedRequest } from '../utils/SharedFunctions.js'
import { userLoggedIn } from '../utils/UserVerified.js'
const router = express.Router()
const genericError =
  'Unknown Error. Refresh And Try Again. If Issue Persists Contact Webmaster'

/*
Purpose: View All Possession Chains
*/
router.get('/', async (request, response) => {
  try {
    const possessions = await Possession.find({})
    successfulRequest(
      response,
      'Successful Request',
      'Unable To See Items? ' + genericError,
      possessions
    )
  } catch (error) {
    failedRequest(response, 'Unable To View Possession Chains', genericError)
  }
})
/*
  Purpose: View Single Possession Chain by Asset ID
  Params: InventoryItem._id
*/
router.get('/:inventoryId', async (request, response) => {
  try {
    const possession = await Possession.findOne({
      assetId: request.params.inventoryId
    })
    successfulRequest(
      response,
      'Successful Request',
      'Unable To See Items? ' + genericError,
      possession
    )
  } catch (error) {
    failedRequest(response, 'Unable To View Inventory', genericError, error)
  }
})

/*
  Purpose: Add a change of possession
  Params: InventoryItem._id
  Needed: badgeName | action | possesor
*/

router.put('/:inventoryId', async (request, response) => {
  try {
    const possessionChainLink = {
      user: request.body.badgeName.trim(),
      action: request.body.action,
      possesor: request.body.possesor.trim(),
      timestamp: new Date()
    }
    const possession = await Possession.findOne({
      assetId: request.params.inventoryId
    })

    possession.possessionHistory.push(possessionChainLink)

    const newPossession = await Possession.findByIdAndUpdate(
      possession._id,
      possession,
      { new: true }
    )

    const oldInventoryItem = await InventoryItem.findById(newPossession.assetId)
    oldInventoryItem.currentAssignee = possessionChainLink.possesor
    const newInventoryItem = await InventoryItem.findByIdAndUpdate(
      newPossession.assetId,
      oldInventoryItem,
      { new: true }
    )

    successfulRequest(
      response,
      'Successful Update',
      `Record Was Successfully. Item is now assigned to ${possessionChainLink.possesor}`,
      { newPossession, newInventoryItem }
    )
  } catch (error) {
    failedRequest(response, 'Unable To Update Records', genericError, error)
  }
})

export default router
