import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import {
  CreateCustomerInput,
  Customer,
  UpdateCustomerInput,
} from '../schema/customer';
import { Service } from 'typedi';
import { CustomerService } from '../core/database/services/customerService';

@Service()
@Resolver((of) => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query((returns) => [Customer], { nullable: true })
  async getCustomers(): Promise<Customer[]> {
    return await this.customerService.getAll();
  }

  @Query((returns) => Customer, { nullable: true })
  async getCustomer(@Arg('id') id: number): Promise<Customer | undefined> {
    return await this.customerService.getOne(id);
  }

  @Mutation((returns) => Customer)
  async addCustomer(
    @Arg('CustomerInput') createCustomerInput: CreateCustomerInput,
  ): Promise<Customer> {
    return await this.customerService.create(createCustomerInput);
  }

  @Mutation((returns) => Customer)
  async updateCustomer(
    @Arg('id') id: number,
    @Arg('CustomerInput') updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer> {
    return await this.customerService.update(id, updateCustomerInput);
  }

  @Mutation((returns) => Boolean)
  async deleteCustomer(@Arg('id') id: number): Promise<boolean> {
    return await this.customerService.delete(id);
  }
}
