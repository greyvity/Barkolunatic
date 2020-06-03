import React from "react";
import { useDispatch } from "react-redux";
import { deleteItems } from "../../actions/itemActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

const Content = ({ post }) => {
  const dispatch = useDispatch();

  const handledelete = () => {
    dispatch(deleteItems(post.id));
  };

  return (
    <div className="container">
      <button onClick={handledelete}>X</button>
      <div className="content">
        <h3>{post.title}</h3>
        <p> {post.description} </p>
      </div>
    </div>
  );
};

Content.propTypes = {
  deleteItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { deleteItems })(Content);
