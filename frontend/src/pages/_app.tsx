import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import theme from "../theme";

const client = createClient({url: "http://localhost:5001/graphql"});

// const client = createClient({
//   url: "http://localhost:5000/graphql",
//   fetchOptions: {
//     credentials: "include",
//   },
//   exchanges: [
//     dedupExchange,
//     cacheExchange({
//       updates: {
//         Mutation: {
//           UserLogin: (_result, args, cache, info) => {
//             betterUpdateQuery<LoginMutation, MeQuery>(
//               cache,
//               { query: MeDocument },
//               _result,
//               (result, query) => {
//                 if (result.UserLogin.errors) {
//                   return query;
//                 } else {
//                   return {
//                     me: result.UserLogin.user,
//                   };
//                 }
//               }
//             );
//           },
//           UserRegister: (_result, args, cache, info) => {
//             betterUpdateQuery<RegisterMutation, MeQuery>(
//               cache,
//               { query: MeDocument },
//               _result,
//               (result, query) => {
//                 if (result.UserRegister.errors) {
//                   return query;
//                 } else {
//                   return {
//                     me: result.UserRegister.user,
//                   };
//                 }
//               }
//             );
//           },
//           UserLogout: (_result, args, cache, info) => {
//             betterUpdateQuery<LogoutMutation, MeQuery>(
//               cache,
//               { query: MeDocument },
//               _result,
//               () => ({ me: null })
//             );
//           },
//         },
//       },
//     }),
//     fetchExchange,
//   ],
// });

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>      
    </Provider>


  );
}

export default MyApp;
