import React from "react";
import Content from "./Content";
import AddPost from "./AddPost";
import { connect } from "react-redux";
import { getItems } from "../../actions/itemActions";
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
          {posts.map((post) => {
            return <Content key={post._id} post={post} />;
          })}
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
