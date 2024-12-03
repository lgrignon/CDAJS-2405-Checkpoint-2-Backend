import { buildSchema } from 'type-graphql';
import { datasource } from './datasource'
import { Country } from './entities/Country'
import { CountryQueriesAndMutations } from './resolvers/CountryQueriesAndMutations';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLSchema } from 'graphql';


async function initializeTestData() {
    datasource.manager.clear(Country)
    const countryFr = new Country("FR", "France", "🇫🇷");
    await datasource.manager.save(countryFr);
    const countryUk = new Country("UK", "United Kingdom", "🇫🇬🇧");
    await datasource.manager.save(countryUk);
}

async function start() {
    await datasource.initialize();
    
    const existingCountries: Country[] = await datasource.manager.find(Country);
    console.log("existingCountries=", existingCountries)

    const schema: GraphQLSchema = await buildSchema({
        resolvers: [CountryQueriesAndMutations]
    });

    const server = new ApolloServer({
        schema,
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
}

start();