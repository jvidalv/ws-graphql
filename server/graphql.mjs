import {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList} from 'graphql';
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

let names = []

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            names: {
                type: new GraphQLList(GraphQLString),
                resolve: () => names,
            },
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({
            addName: {
                type: new GraphQLList(GraphQLString),
                args : {
                    name : { type : new GraphQLNonNull(GraphQLString)}
                },
                resolve: (_, arg) => {
                    names.push(arg.name)
                    pubsub.publish("NAME_ADDED", { names});
                    return names
                },
            },
        }),
    }),
    subscription: new GraphQLObjectType({
        name: 'Subscription',
        fields: {
            names: {
                type: GraphQLString,
                subscribe: () => pubsub.asyncIterator(["NAME_ADDED"])
            },
        },
    }),
});


let currentNumber = 0;
function incrementNumber() {
    currentNumber++;
    pubsub.publish("NAME_ADDED", { names: currentNumber });
    setTimeout(incrementNumber, 1000);
}
// Start incrementing
incrementNumber();
