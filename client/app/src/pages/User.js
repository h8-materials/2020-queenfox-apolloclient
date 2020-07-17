import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import UserDetail from "../components/UserDetail";

const GET_USERS = gql`
  query {
    getUsers {
      id
      name
      age
    }
  }
`;

const GET_USERS_AND_POSTS = gql`
  query {
    getUsers {
      id
      name
    }
    getPosts {
      id
      title
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($newUser: UserInput) {
    addUser(user: $newUser) {
      id
      name
      age
    }
  }
`;

export default () => {
  const [id, setId] = useState(null);
  const { loading, error, data } = useQuery(GET_USERS_AND_POSTS);
  const [addUser] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });
  const [userInput, setUserInput] = useState({
    name: "",
    age: "",
  });

  const onChange = (e) => {
    let { name, value } = e.target;
    const newInput = { ...userInput, [name]: value };
    setUserInput(newInput);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addUser({
      variables: {
        newUser: {
          name: userInput.name,
          age: Number(userInput.age),
        },
      },
    });
    setUserInput({
      name: "",
      age: "",
    });
  };

  const onSelect = (user) => {
    setId(user.id);
  };

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Error ...</p>;
  }

  return (
    <div>
      <h2>User Page</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={userInput.name}
          name="name"
          onChange={onChange}
        />
        <input
          type="text"
          value={userInput.age}
          name="age"
          onChange={onChange}
        />
        <button type="submit"> Add User</button>
      </form>
      <div className="row">
        <div className="column">
          <h2>User List</h2>
          {data.getUsers.map((user) => {
            return (
              <div key={user.id} onClick={() => onSelect(user)}>
                <p>{user.name}</p>
              </div>
            );
          })}
          <hr />
          <h2>Post List</h2>
          {data.getPosts.map((post) => {
            return (
              <div key={post.id}>
                <p>{post.title}</p>
              </div>
            );
          })}
        </div>
        <div className="column">
          <h2>Detail</h2>
          {id && <UserDetail id={id} />}
        </div>
      </div>
    </div>
  );
};
