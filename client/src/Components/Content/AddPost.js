import React from "react";
import { addItems } from "../../actions/itemActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import store from "../../store";

const AddPost = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      title: e.target.title.value,
      description: e.target.description.value,
    };
    store.dispatch(addItems(post));
  };

  return (
    <form className="addpost" onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="title" name="title" />
      <input
        type="text"
        name="description"
        placeholder="description"
        name="description"
      />
      <input className="post" type="submit" value="ADD NEW POST" />
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
