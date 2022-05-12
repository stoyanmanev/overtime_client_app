import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Mongo object id scalar type */
  ObjectId: any;
};

export type Auth = {
  __typename?: 'Auth';
  _id: Scalars['ObjectId'];
  token: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  fullname: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type EditHourInput = {
  date: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  value: Scalars['Float'];
};

export type EditUserInput = {
  email?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  hours: Array<HourInput>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Hour = {
  __typename?: 'Hour';
  _id: Scalars['ObjectId'];
  createdBy: Scalars['String'];
  date: Scalars['String'];
  description: Scalars['String'];
  value: Scalars['Float'];
};

export type HourInput = {
  _id: Scalars['ObjectId'];
  createdBy: Scalars['String'];
  date: Scalars['String'];
  description: Scalars['String'];
  value: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createHour: Hour;
  createUser: User;
  deleteHour: Hour;
  deleteUser: User;
  editHour: Hour;
  editUser: User;
  login: Scalars['String'];
  logout: Auth;
};


export type MutationCreateHourArgs = {
  data: EditHourInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteHourArgs = {
  _id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  _id: Scalars['String'];
};


export type MutationEditHourArgs = {
  _id: Scalars['String'];
  data: EditHourInput;
};


export type MutationEditUserArgs = {
  _id: Scalars['String'];
  data: EditUserInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  hour: Hour;
  hours: Array<Hour>;
  user: User;
  users: Array<User>;
};


export type QueryHourArgs = {
  _id: Scalars['String'];
};


export type QueryUserArgs = {
  _id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  email: Scalars['String'];
  fullname: Scalars['String'];
  lastLogin: Scalars['Float'];
  overtime: Array<Hour>;
  password: Scalars['String'];
  roles: Array<Scalars['String']>;
  username: Scalars['String'];
};

export type HoursQueryVariables = Exact<{ [key: string]: never; }>;


export type HoursQuery = { __typename?: 'Query', hours: Array<{ __typename?: 'Hour', _id: any, date: string, value: number, createdBy: string }> };

export type HourQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type HourQuery = { __typename?: 'Query', hour: { __typename?: 'Hour', _id: any, date: string, value: number, createdBy: string } };

export type DeleteHourMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteHourMutation = { __typename?: 'Mutation', deleteHour: { __typename?: 'Hour', _id: any, date: string, value: number, createdBy: string } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', _id: any, username: string, fullname: string, email: string, password: string, lastLogin: number }> };

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', _id: any, username: string, fullname: string, email: string, password: string, lastLogin: number } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', _id: any, username: string, fullname: string, email: string, password: string } };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', _id: any, username: string, fullname: string, email: string, password: string } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', _id: any, username: string, fullname: string, password: string, email: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'Auth', _id: any } };


export const HoursDocument = `
    query Hours {
  hours {
    _id
    date
    value
    createdBy
  }
}
    `;
export const useHoursQuery = <
      TData = HoursQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: HoursQueryVariables,
      options?: UseQueryOptions<HoursQuery, TError, TData>
    ) =>
    useQuery<HoursQuery, TError, TData>(
      variables === undefined ? ['Hours'] : ['Hours', variables],
      fetcher<HoursQuery, HoursQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, HoursDocument, variables),
      options
    );
export const HourDocument = `
    query Hour($id: String!) {
  hour(_id: $id) {
    _id
    date
    value
    createdBy
  }
}
    `;
export const useHourQuery = <
      TData = HourQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: HourQueryVariables,
      options?: UseQueryOptions<HourQuery, TError, TData>
    ) =>
    useQuery<HourQuery, TError, TData>(
      ['Hour', variables],
      fetcher<HourQuery, HourQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, HourDocument, variables),
      options
    );
export const DeleteHourDocument = `
    mutation DeleteHour($id: String!) {
  deleteHour(_id: $id) {
    _id
    date
    value
    createdBy
  }
}
    `;
export const useDeleteHourMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteHourMutation, TError, DeleteHourMutationVariables, TContext>
    ) =>
    useMutation<DeleteHourMutation, TError, DeleteHourMutationVariables, TContext>(
      ['DeleteHour'],
      (variables?: DeleteHourMutationVariables) => fetcher<DeleteHourMutation, DeleteHourMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteHourDocument, variables)(),
      options
    );
export const UsersDocument = `
    query Users {
  users {
    _id
    username
    fullname
    email
    password
    lastLogin
  }
}
    `;
export const useUsersQuery = <
      TData = UsersQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: UsersQueryVariables,
      options?: UseQueryOptions<UsersQuery, TError, TData>
    ) =>
    useQuery<UsersQuery, TError, TData>(
      variables === undefined ? ['Users'] : ['Users', variables],
      fetcher<UsersQuery, UsersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UsersDocument, variables),
      options
    );
export const UserDocument = `
    query User($id: String!) {
  user(_id: $id) {
    _id
    username
    fullname
    email
    password
    lastLogin
  }
}
    `;
export const useUserQuery = <
      TData = UserQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: UserQueryVariables,
      options?: UseQueryOptions<UserQuery, TError, TData>
    ) =>
    useQuery<UserQuery, TError, TData>(
      ['User', variables],
      fetcher<UserQuery, UserQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UserDocument, variables),
      options
    );
export const CurrentUserDocument = `
    query currentUser {
  currentUser {
    _id
    username
    fullname
    email
    password
  }
}
    `;
export const useCurrentUserQuery = <
      TData = CurrentUserQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: CurrentUserQueryVariables,
      options?: UseQueryOptions<CurrentUserQuery, TError, TData>
    ) =>
    useQuery<CurrentUserQuery, TError, TData>(
      variables === undefined ? ['currentUser'] : ['currentUser', variables],
      fetcher<CurrentUserQuery, CurrentUserQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CurrentUserDocument, variables),
      options
    );
export const CreateUserDocument = `
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data) {
    _id
    username
    fullname
    email
    password
  }
}
    `;
export const useCreateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>
    ) =>
    useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      ['CreateUser'],
      (variables?: CreateUserMutationVariables) => fetcher<CreateUserMutation, CreateUserMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateUserDocument, variables)(),
      options
    );
export const DeleteUserDocument = `
    mutation DeleteUser($id: String!) {
  deleteUser(_id: $id) {
    _id
    username
    fullname
    password
    email
  }
}
    `;
export const useDeleteUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteUserMutation, TError, DeleteUserMutationVariables, TContext>
    ) =>
    useMutation<DeleteUserMutation, TError, DeleteUserMutationVariables, TContext>(
      ['DeleteUser'],
      (variables?: DeleteUserMutationVariables) => fetcher<DeleteUserMutation, DeleteUserMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteUserDocument, variables)(),
      options
    );
export const LoginDocument = `
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>
    ) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['Login'],
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, LoginDocument, variables)(),
      options
    );
export const LogoutDocument = `
    mutation Logout {
  logout {
    _id
  }
}
    `;
export const useLogoutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>
    ) =>
    useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
      ['Logout'],
      (variables?: LogoutMutationVariables) => fetcher<LogoutMutation, LogoutMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, LogoutDocument, variables)(),
      options
    );