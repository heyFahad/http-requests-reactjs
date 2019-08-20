import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    postSelectedHandler = (postId) => {
        // this.props.history.push({ pathname: '/posts/' + postId });
        this.props.history.push("/posts/" + postId);
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>
            Something went wrong while fetching the posts data!
        </p>
        if (!this.state.error) {
            posts = this.state.posts.map(
                post => {
                    return (
                        <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            selected={this.postSelectedHandler.bind(this, post.id)} />
                    );
                }
            );
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:postId"} exact component={FullPost} />
            </div>
        );
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                // query the response data (posts in this case), transform it, and then store it in the component's state to cause a re-render
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(
                    post => {
                        return {
                            ...post,
                            author: 'Max'
                        }
                    }
                );
                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export default Posts;
