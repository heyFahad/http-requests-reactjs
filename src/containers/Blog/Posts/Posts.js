import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>
            Something went wrong while fetching the posts data!
        </p>
        if (!this.state.error) {
            posts = this.state.posts.map(
                post => {
                    return <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        // {...this.props}      // One way of passing routing-related props. Other method is to use withRouter HOC, which is used in Post.js component
                        selected={() => this.postSelectedHandler(post.id)} />
                }
            );
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }

    componentDidMount() {
        console.log(this.props);
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
