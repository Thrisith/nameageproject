import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUsers.module.css";
import { useState } from "react";
import ErrorModal from "../UI/ErrorModal";

const AddUsers = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const[error,setError]=useState();
  const AddUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title:"Invalid input",
        message:"Please enter a valid Name & Age"
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title:"Invalid Age",
        message:"Please enter a valid Age (>0)"
      });
      return;
    }
    let userList = {
      name: enteredUsername,
      age: enteredAge,
      id: Math.random().toString(),
    };
    props.onAddUser(userList);
    setEnteredUsername("");
    setEnteredAge("");
  };
  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };
  const onErrorHandler=()=>
  {
    setError(null);
  }
  return (
    <div>
    {error && <ErrorModal title={error.title} message={error.message} onConfirm={onErrorHandler}/>}
    <Card className={classes.input}>
      <form onSubmit={AddUserHandler}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          onChange={usernameChangeHandler}
          value={enteredUsername}
        />
        <label htmlFor="age">Age (in Years)</label>
        <input
          id="age"
          type="number"
          onChange={ageChangeHandler}
          value={enteredAge}
        />
        <Button type="submit">Add User</Button>
      </form>
    </Card>
    </div>
  );
};
export default AddUsers;
