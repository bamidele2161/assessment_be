import gql from "graphql-tag";

export const createUserMutation = gql`
  mutation {
    createUser(
      createUserData: { username: "bamidele2", password: "securepassword123" }
    ) {
      id
      username
      createdAt
      updatedAt
    }
  }
`;

export const createDeptQuery = gql`
  mutation {
    createDepartment(
      input: {
        name: "Engineering 2"
        subDepartments: [
          { name: "Frontend Team 2" }
          { name: "Backend Team 2" }
        ]
      }
    ) {
      id
      name
      createdAt
      updatedAt
      subDepartments {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;

export const loginQuery = gql`
  mutation {
    login(
      loginUserData: { username: "bamidele2", password: "securepassword123" }
    ) {
      message
      accessToken
      user {
        id
        username
        createdAt
        updatedAt
      }
    }
  }
`;

export const getDetptQuery = gql`
  query getDepartments($pagination: PaginationInput!) {
    getDepartments(pagination: $pagination) {
      departments {
        id
        name
        createdAt
        updatedAt
        subDepartments {
          id
          name
          createdAt
          updatedAt
        }
      }
      totalCount
    }
  }
`;
