import React, { useState, useRef } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, user }) => {
	const [visible, setVisible] = useState(false);
	const [likes, setLikes] = useState(blog.likes);

	const hideWhenVisible = { display: visible ? "none" : "" };
	const showWhenVisible = { display: visible ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	const buttonStyle = {
		margin: "6px",
	};

	const incrementLikes = async () => {
		const changedBlog = { ...blog, likes: likes + 1 };

		try {
			const returnedBlog = await blogService.incrementLikes(
				blog.id,
				changedBlog
			);
			setLikes(likes + 1);
		} catch (exception) {
			console.log(exception);
		}
	};

	const removeBlog = async () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			try {
				const deletedBlog = await blogService.deleteBlog(blog.id);
			} catch (exception) {
				console.log(exception);
			}
		}
	};

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}
			<button onClick={toggleVisibility} style={buttonStyle}>
				{visible === false ? "view" : "hide"}
			</button>
			<div style={showWhenVisible}>
				<p>{blog.url}</p>
				<p>
					likes {likes}
					<button style={buttonStyle} onClick={incrementLikes}>
						like
					</button>
				</p>
				<p>{blog.author}</p>
				{user.username === blog.user.username &&
				user.name === blog.user.name ? (
					<button onClick={removeBlog}>remove</button>
				) : (
					""
				)}
			</div>
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
};

export default Blog;
