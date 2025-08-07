import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $body: String!, $userId: Int!) {
    createPost(title: $title, body: $body, userId: $userId) {
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
