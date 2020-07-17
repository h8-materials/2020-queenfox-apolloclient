import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query getUSer($userId: ID) {
    getUser(id: $userId) {
      id
      name
      age
    }
  }
`;

export default ({ id }) => {
  const { loading, error, data: user } = useQuery(GET_USER, {
    variables: {
      userId: id,
    },
  });
  if (loading) {
    return <p>Loading ....</p>;
  }

  if (error) {
    return <p>error ....</p>;
  }
  return (
    <div>
      <p>Name: {user.getUser.name}</p>
      <p>Age: {user.getUser.age}</p>
    </div>
  );
};
