import React, { useState, useEffect } from 'react';
import './App.css';

const Item = (props) => {
	// const text = props.text
	const id = props.id
	const done = props.done
	const postList = props.postList
	const setPostList = props.setPostList

	const handleDone = (e) => {
		const index = postList.findIndex(e => e.id === id)
		const list = [...postList]
		const thisPost = { ...list[index] }
		thisPost.done = !thisPost.done
		list[index] = thisPost
		setPostList(list)
	}

	const handleDelete = () => {
		const index = postList.findIndex(e => e.id === id)
		const list = [...postList]
		list.splice(index, 1)
		setPostList(list)
	}

	if (done) {
		return (
			<div>
				<span style={{ color: "grey", textDecoration: "line-through" }}>{props.text}</span>
				<input type="checkbox" onClick={handleDone} placeholder="done?" />
				<button onClick={handleDelete}>Delete</button>
			</div >
		)
	}

	return (
		<div>
			<span>{props.text}</span>
			<input type="checkbox" onClick={handleDone} placeholder="done?" />
		</div>
	)
}

const ItemList = (props) => {
	const postList = props.postList
	const setPostList = props.setPostList

	if (postList.length === 0) {
		return (
			<div>
				<span>no todos yet!</span>
			</div>
		)
	}
	return (
		<div>
			{postList.map(item => <Item
				text={item.text}
				id={item.id}
				done={item.done}
				key={item.id}
				postList={postList}
				setPostList={setPostList} />)}
		</div>
	)
}

const NewItem = (props) => {
	const postList = props.postList
	const setPostList = props.setPostList
	const postID = props.postID
	const setPostID = props.setPostID

	const [text, setText] = useState("")

	const handleTextChange = (e) => {
		setText(e.target.value)
	}

	const handleAddPost = (e) => {
		if (text !== "") {
			setPostList(postList.concat([{ text: text, id: postID, done: false }])) // array.concat returns a new array
			setPostID(postID + 1)
		}
		setText("")
	}

	return (
		<div>
			<input type="text" placeholder="enter your new todo item here" onChange={handleTextChange} value={text} />
			<input type="button" value="+" onClick={handleAddPost} />
		</div>
	)
}

const TodoApp = (props) => {
	const [postID, setPostID] = useState(0)
	const [postList, setPostList] = useState([])

	useEffect(() => { document.title = `You have ${postList.length} ${postList.length > 1 ? "items" : "item"} in your todo list` })

	return (
		<div>
			<NewItem postID={postID} setPostID={setPostID} postList={postList} setPostList={setPostList} />
			<ItemList postList={postList} setPostList={setPostList} />
		</div>
	)
}


function App() {
	return (
		<TodoApp />
	);
}

export default App;
