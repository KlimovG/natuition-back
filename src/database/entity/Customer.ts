import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Customer extends BaseEntity{
    @PrimaryColumn()
    id: number;

    @Column()
    name: string

    @Column()
    email: string;

    @Column()
    phone: number;

    @Column({ nullable: false})
    hash_pwd: string;
}
