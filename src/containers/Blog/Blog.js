import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
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
                        selected={() => this.postSelectedHandler(post.id)} />
                }
            );
        }

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/new-post">New Post</a>
                            </li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
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
                // console.log(error);
                this.setState({error: true})
            });
    }
}

export default Blog;