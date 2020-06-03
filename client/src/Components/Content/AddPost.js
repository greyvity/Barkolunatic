import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { addItems } from "../../actions/itemActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

const AddPost = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { id: uuid(), title, description };
    dispatch(addItems(post));
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  return (
    <form className="addpost">
      <input
        type="text"
        name="title"
        placeholder="title"
        onChange={titleHandler}
      />
      <input
        type="text"
        name="description"
        placeholder="description"
        onChange={descriptionHandler}
      />
      <input
        onClick={handleSubmit}
        className="post"
        type="submit"
        value="ADD NEW POST"
      />
    </form>
  );
};

AddPost.propTypes = {
  addItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { addItems })(AddPost);
