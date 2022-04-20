import {
    ApolloClient,
    createHttpLink,
    DefaultOptions,
    InMemoryCache,
    from
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from '@apollo/client/link/error';


const url = import.meta.env.VITE_API_URL || 'https://graphqlzero.almansi.me/api' as string;

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: "no-cache",
    },
    query: {
        fetchPolicy: "no-cache",
    },
};

const httpLink = createHttpLink({
    uri: url as string,
});




export const client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
});
