import { Box, Flex, Link, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import react from "react";
import {
  useMeQuery,
  LogoutMutation,
  useLogoutMutation,
} from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [, Logout] = useLogoutMutation();
  const { fetching, stale, error, data, extensions } = useMeQuery()[0];
  let body = null;
  if (!fetching && data!.me?.username) {
    body = (
      <Flex>
        <Text mr={2}>{data!.me?.username}</Text>
        <NextLink href="/">
          <Link mr={2} onClick={() => Logout()}>
            Logout
          </Link>
        </NextLink>
      </Flex>
    );
  } else {
    body = (
      <Flex>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link mr={2}>Register</Link>
        </NextLink>
      </Flex>
    );
  }
  return (
    <Flex bg="tomato" p={4}>
      <NextLink href="/">
        <Link mr={2}>Collov Takehome</Link>
      </NextLink>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
