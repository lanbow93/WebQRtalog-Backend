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
router.get('/', userLoggedIn, async (request, response) => {
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
router.get('/:inventoryId', userLoggedIn, async (request, response) => {
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

export default router
