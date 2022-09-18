import { Service } from 'typedi';
import { Customer } from '../entity/Customer';
import {
  CreateCustomerInput,
  UpdateCustomerInput,
} from '../../../schema/customer';

@Service()
export class CustomerService {
  async getAll(): Promise<Customer[]> {
    return await Customer.find();
  }

  async getOne(id: number): Promise<Customer | undefined> {
    const customer = await Customer.findOne({ where: { id } });

    if (!customer) {
      throw new Error(`The customer with id: ${id} does not exist!`);
    }

    return customer;
  }

  async create(createCustomerInput: CreateCustomerInput): Promise<Customer> {
    const newCustomer = Customer.create();
    Object.assign(newCustomer, createCustomerInput);
    await newCustomer.save();
    return newCustomer;
  }

  async update(
    id: number,
    updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer> {
    const customerFound = await Customer.findOne({ where: { id } });

    if (!customerFound) {
      throw new Error(`The customer with id: ${id} does not exist!`);
    }

    Object.assign(customerFound, updateCustomerInput);
    const updatedCustomer = await customerFound.save();

    return updatedCustomer;
  }

  async delete(id: number): Promise<boolean> {
    const customerFound = await Customer.findOne({ where: { id } });

    if (!customerFound) {
      throw new Error(`The customer with id: ${id} does not exist!`);
    }

    await customerFound.remove();

    return true;
  }
}
