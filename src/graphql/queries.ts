import { gql } from "@apollo/client";

// Query: Get all posts
export const GET_ALL_POSTS = gql`
  query GetPosts($page: Int!, $limit: Int!) {
    posts(options: { paginate: { page: $page, limit: $limit } }) {
      data {
        id
        title
        body
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
      user {
        id
        name
      }
    }
  }
`;
