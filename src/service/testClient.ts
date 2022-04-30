import {
    ApolloClient,
    createHttpLink,
    DefaultOptions,
    InMemoryCache,
    from
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from '@apollo/client/link/error';


const url = 'https://cl2hui64c105563501s6hc36r392-server-vn57etnuya-ue.a.run.app/graphql' as string;

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
    headers:{
         "Authorization": "Basic YWRtaW46YWRtaW4="
    }
});




export const client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
});
