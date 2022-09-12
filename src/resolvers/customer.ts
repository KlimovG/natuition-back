import { Query, Resolver } from 'type-graphql';
import { Customer } from '../schema/customer';
import { Service } from 'typedi';
import { CustomerService } from '../database/services/customerService';

@Service()
@Resolver((of) => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query((returns) => [Customer], { nullable: true })
  async getCustomers(): Promise<Customer[]> {
    return await this.customerService.getAll();
  }
}
