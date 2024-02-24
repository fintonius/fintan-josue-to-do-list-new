import { useState } from "react";

export default function Form(props) {
    const [name, setName] = useState('');

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        // ignores empty inputs
        if (name === '') {return};
        // .addTask() is essentially a method for props as it is the function
        // that is being passed to '<Form />' in App.jsx which is then available
        // here via props/as a prop. 'name' variable is the value being passed to the 'addTask()'
        // functions that is "stored" in props (probably definitely the incorrect terminology)
        props.addTask(name);
        // call setName with empty string to reset the input box 
        setName('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label 
                    htmlFor="new-todo-input" 
                    className="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary
            btn__lg">
                Add
            </button>
        </form>
    );
}