import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity({ name: "Conversation" })
export class Conversation {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  conversation_id: number;

  @Column()
  login_id: number;

  @Column({ type: "varchar" , default: "default_conversation" })
  conversation_name: string;

  @Column()
  conversation_type_id: number;

  @Column({ type: "timestamp" })
  conversation_time: Date;

  @Column({ type: "timestamp" })
  createdTimeStamp: Date;

  @Column({ type: "timestamp" })
  updatedTimestamp: Date;

  }