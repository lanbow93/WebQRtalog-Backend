import InventoryItem from "../models/inventoryItem.js";
import Possession from "../models/possession.js";
import express from 'express'
import { successfulRequest, failedRequest } from '../utils/SharedFunctions.js'
import { userLoggedIn } from '../utils/UserVerified.js'


const router = express.Router()

router.get("/", userLoggedIn, (request, response) => {
    successfulRequest(response, "Test", "Test", "Test")
})

export default router