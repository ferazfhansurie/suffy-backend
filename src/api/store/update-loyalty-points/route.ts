// src/api/update-customer-loyalty-points.js

import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { CustomerService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import { Customer } from "@medusajs/medusa";


export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    
    const { customerId, pointsToDeduct } = req.body;
    const manager: EntityManager = req.scope.resolve("manager");
    const customerRepository = manager.getRepository(Customer);
    const customerService: CustomerService = req.scope.resolve("customerService");

    const customer = await customerService.retrieve(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Update customer's LoyaltyPoints
    const updatedLoyaltyPoints = Math.max(customer.loyaltyPoints - pointsToDeduct, 0); // Ensure it doesn't go below 0
    if (customer) {
      customer.loyaltyPoints = updatedLoyaltyPoints;
      await customerRepository.save(customer);
    }

    res.status(200).json({ message: 'Customer updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
