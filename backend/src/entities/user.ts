import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  identifier!: string

  @Column()
  password!: string
}
