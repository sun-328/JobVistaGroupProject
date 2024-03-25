function Validation(values)   {
    let error = {};
    const nameRegex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z]).{8,}$/;

    if(values.name === "") {
        error.name = "Name should not be empty";
    }
    
    else if(!nameRegex.test(values.name))  {
        error.name = "Name didn't match";
    }

    if(values.email === "") {
        error.email = "Email should not be empty";
    }
    
    else if(!emailRegex.test(values.email)) {
        error.email = "Email didn't match";
    }

    if(values.password === "")    {
        error.password = "Password should not be empty";
    }
    else if(!passwordRegex.test(values.password))   {
        error.password = "Password didn't match";
    }

    return error;
}

export default Validation;