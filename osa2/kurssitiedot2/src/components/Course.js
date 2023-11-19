import Header from "./Header";
import Part from "./Part";
import Total from "./Total";

const Course = ({ courses }) => {
 

  return (
    <>
    {/*Mapping courses array to be used in different components */}
    <h1>Web development curriculum</h1>
      {courses.map((e) => (
        <div key={e.id}>
        <Header name={e.name}/>
         {e.parts.map((part) => (      
         <Part part={part.name} exercises={part.exercises} key={part.id} />
      ))}
        <Total course={e.parts}/>
      </div>
      ))}
    </>
  );
};

export default Course;
