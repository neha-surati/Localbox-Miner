import React, { useEffect, useState } from "react";


function Form() {
  let [user, setUser] = useState({});
  let [list, setList] = useState([]);
  let [index, setIndex] = useState(-1);

  useEffect(() => {
    let oldData = JSON.parse(sessionStorage.getItem("user")) || [];
    setList(oldData);
    return () => {
      sessionStorage.clear();
    };
  }, []);

  let handleInput = (e) => {
    let { name, value } = e.target;
    let newUser = { ...user, [name]: value };
    setUser(newUser);
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    let newlist;
    if (index !== -1) {
      list[index] = user;
      newlist = [...list];
      setIndex(-1);
    } else {
      newlist = [...list, user];
    }
    setList(newlist);
    sessionStorage.setItem("user", JSON.stringify(newlist));
    setUser({});
  };

  let deletData = (pos) => {
    let oldData = JSON.parse(sessionStorage.getItem("user"));
    oldData.splice(pos, 1);
    sessionStorage.setItem("user", JSON.stringify(oldData));
    setList(oldData);
  };

  let editData = (pos) => {
    let editUser = list[pos];
    setUser(editUser);
    setIndex(pos);
  };

  return (
    <>
      <div className="form-container">
        <h2>User Registration</h2>
        <form action="" method="post" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={user.name ? user.name : ""}
              onChange={handleInput}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email ? user.email : ""}
              onChange={handleInput}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <input
              className="btn-submit"
              type="submit"
              value={index !== -1 ? "Edit Data" : "Add User"}
            />
          </div>
        </form>
      </div>

      <br />

      <div className="table-container">
        <h3>User List</h3>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((v, i) => (
                <tr key={i}>
                  <td>{v.name}</td>
                  <td>{v.email}</td>
                  <td>
                    <button
                      className="btn-action btn-delete"
                      onClick={() => deletData(i)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn-action btn-edit"
                      onClick={() => editData(i)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No Users Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Form;
