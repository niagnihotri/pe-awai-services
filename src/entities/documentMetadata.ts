import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity({ name: "document_meta_data" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  document_id: number;

  @Column()
  login_id: number;

  
  @Column()
  conversation_id: number; 

  @Column({ type: "varchar" })
  document_name: string;

  @Column({ type: "varchar" })
  file_path: string;

  @Column({  type: "timestamp" , default:"2023-12-20 13:56:29" })
  createdTimeStamp: Date;
  
  @Column({  type: "timestamp" , default:"2023-12-20 13:56:29" })
  updatedTimestamp: Date;
  
}