import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  Applicants: Array<Applicant>;
  Users: Array<User>;
  me?: Maybe<User>;
};

export type Applicant = {
  __typename?: 'Applicant';
  applicant_id: Scalars['Float'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  comments: Scalars['String'];
  resume: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  user_id: Scalars['Float'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  ApplicantCreate: ApplicantResponse;
  UserRegister: UserResponse;
  UserLogin: UserResponse;
  UserLogout: Scalars['Boolean'];
};


export type MutationApplicantCreateArgs = {
  fields: ApplicantCreateInput;
};


export type MutationUserRegisterArgs = {
  fields: UserRegisterInput;
};


export type MutationUserLoginArgs = {
  fields: UserLoginInput;
};

export type ApplicantResponse = {
  __typename?: 'ApplicantResponse';
  error?: Maybe<Scalars['String']>;
  applicant?: Maybe<Applicant>;
};

export type ApplicantCreateInput = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  comments: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserRegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UserLoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type ApplicantCreateMutationVariables = Exact<{
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  comments: Scalars['String'];
}>;


export type ApplicantCreateMutation = (
  { __typename?: 'Mutation' }
  & { ApplicantCreate: (
    { __typename?: 'ApplicantResponse' }
    & Pick<ApplicantResponse, 'error'>
    & { applicant?: Maybe<(
      { __typename?: 'Applicant' }
      & Pick<Applicant, 'applicant_id' | 'first_name' | 'last_name' | 'email' | 'phone' | 'comments'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { UserLogin: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'user_id' | 'username'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'UserLogout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { UserRegister: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'user_id' | 'username'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'user_id' | 'username'>
  )> }
);


export const ApplicantCreateDocument = gql`
    mutation ApplicantCreate($first_name: String!, $last_name: String!, $email: String!, $phone: String!, $comments: String!) {
  ApplicantCreate(
    fields: {first_name: $first_name, last_name: $last_name, email: $email, phone: $phone, comments: $comments}
  ) {
    error
    applicant {
      applicant_id
      first_name
      last_name
      email
      phone
      comments
    }
  }
}
    `;

export function useApplicantCreateMutation() {
  return Urql.useMutation<ApplicantCreateMutation, ApplicantCreateMutationVariables>(ApplicantCreateDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  UserLogin(fields: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      user_id
      username
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  UserLogout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  UserRegister(fields: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      user_id
      username
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    user_id
    username
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};