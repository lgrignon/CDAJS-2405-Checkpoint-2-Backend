import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entities/Country";
import { datasource } from "../datasource";

@Resolver(Country)
export class CountryQueriesAndMutations {

    @Mutation(_ => Country)
    async createCountry(
        @Arg("code") code: string,
        @Arg("codeContinent") codeContinent: string,
        @Arg("nom") nom: string,
        @Arg("emoji") emoji: string) {

        const country = new Country(code, codeContinent, nom, emoji);
        await datasource.manager.save(country);

        return country;
    }

    @Query(_ => [Country])
    async getAllCountries(): Promise<Country[]> {
        return datasource.manager.find(Country);
    }

    @Query(_ => Country)
    async getCountryByCode(@Arg("code") code: string): Promise<Country> {
        return datasource.manager.findOne(Country, {
            where: {
                code
            }
        });
    }

    @Query(_ => [Country])
    async getCountryByCodeContinent(@Arg("codeContinent") codeContinent: string): Promise<Country[]> {
        return datasource.manager.find(Country, {
            where: {
                codeContinent
            }
        });
    }
   

}