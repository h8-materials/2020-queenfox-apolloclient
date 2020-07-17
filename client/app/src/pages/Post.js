import React, { useState } from "react";

export default () => {
  const [postInput, setPostInput] = useState({
    title: "",
    description: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const newInputPost = { ...postInput, [name]: value };
    setPostInput(newInputPost);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(postInput);
  };

  return (
    <div>
      <h2>Post Page</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={postInput.title}
          name="title"
          onChange={onChange}
          placeholder="Title"
        />
        <br />
        <textarea
          name="description"
          rows="4"
          placeholder="Description"
          style={{ marginTop: "5px" }}
          onChange={onChange}
          value={postInput.description}
        />
        <br />
        <button type="submit"> Add Post</button>
      </form>
      <div className="row">
        <div className="column">
          <h2>List</h2>
        </div>
        <div className="column">
          <h2>Detail</h2>
        </div>
      </div>
    </div>
  );
};
