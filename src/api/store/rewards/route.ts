import type {
    MedusaRequest, 
    MedusaResponse,
  } from "@medusajs/medusa"
  import RewardsService  from "../../../services/rewards"
  
  // list withdrawals
  export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
      // Resolve the WithdrawalService from the request's scope
      const rewardsService: RewardsService = req.scope.resolve("rewardsService");
  
      // Optionally, you can pass selectors and configuration, e.g., for pagination
      const selector = {}; // Define your selector here, if needed
      const config = {
        skip: 0,
        take: 20, // You can adjust pagination settings here
        relations: [] // Include any relations if needed
      };
  
      // Retrieve all withdrawals
      const rewards = await rewardsService.list(selector, config);
  
      // Respond with the retrieved withdrawals
      res.status(200).json(rewards);
    } catch (error) {
      // Handle any errors
      res.status(500).json({ error: error.message });
    }
  };
  
