import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.postId)
            .then(
                response => {
                    console.log(response);
                    this.setState({ loadedPost: null });
                    this.props.history.push("/posts");
                }
            );
    }

    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.props.match.params.postId) {
            post = <p style={{ textAlign: 'center' }}>Loading...!</p>
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }

        return post;
    }

    componentDidMount() {
        this.loadPostData();
    }

    componentDidUpdate() {
        this.loadPostData();
    }

    loadPostData = () => {
        if (this.props.match.params.postId) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.postId)) {
                axios.get('/posts/' + this.props.match.params.postId)
                    .then(response => {
                        this.setState({ loadedPost: response.data });
                    });
            }
        }
    }
}

export default FullPost;