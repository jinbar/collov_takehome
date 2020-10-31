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
};

export type Applicant = {
  __typename?: 'Applicant';
  applicant_id: Scalars['Float'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  comments: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  ApplicantCreate: ApplicantResponse;
};


export type MutationApplicantCreateArgs = {
  fields: ApplicantCreateInput;
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