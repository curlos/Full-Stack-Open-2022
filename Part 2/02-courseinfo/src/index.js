import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    const parts = [...course.parts];
    const exercises = parts.map(part => part.exercises);

    const total = exercises.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    })

    return (
        <p>
            <b>Number of exercises {total}</b>
        </p>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part => <Part part={part} key={part.id} />)}
        </div>
    )
}

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }
        ]
    }

    return <Course course={course} />
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))