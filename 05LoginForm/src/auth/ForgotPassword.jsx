import React from 'react';

export default function ForgotPassword() {

  const getInput = (id) => {
    return document.getElementById(id).value;
  };
  
  let handleUpdate = (event) => {
    event.preventDefault();
    let fullName = getInput("userName");
    let newPassword = getInput("newPassword");
    
    if (!fullName || !newPassword) {
      alert("Please fill out all given fields");
      return;
    }
    
    let data = JSON.parse(localStorage.getItem("user")) || [];
  
    // Check if the user exists
    let userExists = false;
    let updatedData = data.map((user) => {
      if (user.fullName === fullName) {
        userExists = true;
        return { ...user, password: newPassword };
      }
      return user;
    });

    if (userExists) {
      // Update local storage with modified data
      localStorage.setItem("user", JSON.stringify(updatedData));
      alert("Password is successfully updated");
    } else {
      alert("User not found");
    }

    console.log('Updated data:', updatedData);
  };
  
  return (
    <div>
      <div className="form">
        <div className="container">
          <div className="row">
            <h2 className="text-center">Update Password</h2>
            <form>
              <div className="col my-2">
                <label htmlFor="Full Name">Full Name</label>
                <input type="text" name="FullName" placeholder='Enter your Full Name' className='form-control mt-1' id='userName' />
              </div>
             
              <div className="col py-2">
                <label htmlFor="Password"> New Password</label>
                <input type="password" name="password" placeholder='Enter your password' className='form-control mt-1' id='newPassword' />
              </div>
              <div className="col text-center">
                <button className='btn btn-md w-50 mt-3 btn-dark' onClick={handleUpdate} >Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
