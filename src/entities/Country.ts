import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
@ObjectType()
export class Country {

    @PrimaryColumn()
    @Field(type => ID)
    code: string;

    @Column()
    @Field(type => String)
    codeContinent: string;

    @Column()
    @Field(type => String)
    nom: string;

    @Column()
    @Field(type => String)
    emoji: string;

    constructor(
        code: string = '',
        codeContinent: string = '',
        nom: string = '',
        emoji: string = '',
    ) {
        this.code = code;
        this.codeContinent = codeContinent;
        this.nom = nom;
        this.emoji = emoji;
    }
}