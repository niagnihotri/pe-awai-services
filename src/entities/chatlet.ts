import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity({ name: "chatlet" })
export class Chatlet {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  chatlet_id:number;

  @Column()
  conversation_id: number;

  @Column()
  docLet_id:number;

  @Column()
  login_id: number;

  @Column({
    transformer: {
      to: (value: string) => Buffer.from(value),
      from: (value: Buffer) => value.toString()
    }
   })
  char_question: string;

  @Column({
    transformer: {
      to: (value: string) => Buffer.from(value),
      from: (value: Buffer) => value.toString()
    }
   })
   char_answer: string;

  @Column()
  chat_response_time: number;

  @Column()
  inputTokenCount:number;

  @Column()
  outputTokenCount:number;

  @Column({ type: "timestamp" })
  createdTimeStamp: Date;

  @Column({ type: "timestamp" })
  updatedTimestamp: Date;

  }