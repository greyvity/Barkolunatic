import React from "react";
import Content from "./Content/Content";
import AddPost from "./Content/AddPost";
import { connect } from "react-redux";
import { getItems } from "../actions/itemActions";
import PropTypes from "prop-types";

class Home extends React.Component {
  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { posts } = this.props.item;
    return (
      <>
        <div className="wrapper">
          {posts.map((post) => (
            <Content key={post.id} post={post} />
          ))}
        </div>
        <div className="form">
          <AddPost />
        </div>
      </>
    );
  }
}

Home.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems })(Home);
