import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: []
    }

    render() {
        const posts = this.state.posts.map(
            post => {
                return <Post
                    key={post.id}
                    title={post.title} />
            }
        );

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }

    componentDidMount() {
        axios.get('http://jsonplaceholder.typicode.com/posts')
            .then(response => {
                // save the response data (posts in this case) in the component's state to cause a re-render
                this.setState({ posts: response.data });
            });
    }
}

export default Blog;