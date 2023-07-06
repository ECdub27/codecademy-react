import React ,{useState} from "react";

export default function Form(props){
  const [formName, setFormName] = useState('');

  const handleChanqe = (e) =>{
    setFormName(e.target.value);
  };
  const handleSubmit = (e) =>{
    e.preventdefault();
    props.alertTask(formName);
    setFormName('');

  }
    return (
      
        <div className="todoapp stack-large">
        <h1>TaskMaster</h1>
        <Form onSubmit={handleSubmit}  />
          <input
            type="text"
            id="new-todo-input"
            className="input input__lg"
            value = {formName}
            autoComplete="off"
            handleChange={handleChanqe}
          />
          <button type="submit" className="btn btn__primary btn__lg">
            Add
          </button>
        
        </div>
    );
}
