import React from 'react';

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((a,b) => a+b.exercises,0);
    return(
      <p>Number of exercises {sum}</p>
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
        {course.parts.map((item) => <Part part={item} key={item.id}/>)}
      </div>
    )
  }
  
  const Course = ({course}) => 
  {
    return (
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </div>
    );
  
  }

  export default Course;
  