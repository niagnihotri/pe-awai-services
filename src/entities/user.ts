import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  login_id: number;

  @Column({ type: "varchar" })
  username: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "timestamp" , default:"2023-12-20 13:56:29" })
  loginTimestamp: Date;

  @Column({  type: "timestamp" , default:"2023-12-20 13:56:29" })
  logoutTimestamp: Date;

  @Column({  type: "timestamp" ,default:"2023-12-20 13:56:29" })
  createdTimeStamp: Date;
  
}