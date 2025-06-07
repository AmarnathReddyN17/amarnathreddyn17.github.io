const users = [];
let user = {};

const showLogin = () => {
  let str = `
    <div>
      <h1>Login Form</h1>
      <p><div id="dvMsg" style="color:red;"></div></p>
      <p><input type="text" id="txtEmail" placeholder="Email"></p>
      <p><input type="password" id="txtPass" placeholder="Password"></p>
      <p><button onclick='validateUser()'>Log In</button></p>
      <p><button onclick='showRegister()'>Create Account</button></p>
    </div>
  `;
  root.innerHTML = str;
};

const showRegister = () => {
  let str = `
    <h1>Register Form</h1>
    <p><input type="text" id="txtName" placeholder="Name"></p>
    <p><input type="text" id="txtEmail" placeholder="Email"></p>
    <p><input type="password" id="txtPass" placeholder="Password"></p>
    <button onclick='addUser()'>Register</button>
    <hr>
    <button onclick='showLogin()'>Already a Member? Login here...</button>
  `;
  root.innerHTML = str;
};

const showHome = () => {
  let str = `
    <h1>Welcome ${user.name}</h1>
    <hr>
    <p>
      <select id="action">
        <option value="">--select--</option>
        <option value="deposit">Deposit</option>
        <option value="withdraw">Withdraw</option>
      </select>
    </p>
    <p><input type='number' id='txtAmount' placeholder="Enter amount"></p>
    <p>
      <button onclick="updateBalance()">Submit</button>
      <button onclick='showLogin()'>Logout</button>
    </p>
    <hr>
    <p>Current balance: ₹${user.balance}</p>
  `;
  root.innerHTML = str;
};

const addUser = () => {
  const obj = {
    name: document.getElementById("txtName").value,
    email: document.getElementById("txtEmail").value,
    pass: document.getElementById("txtPass").value,
    balance: 0
  };
  users.push(obj);
  showLogin();
};

const validateUser = () => {
  let email = document.getElementById("txtEmail").value;
  let pass = document.getElementById("txtPass").value;
  user = users.find((e) => e.email === email && e.pass === pass);
  if (user) {
    showHome();
  } else {
    document.getElementById("dvMsg").innerHTML = "Access Denied";
  }
};

const updateBalance = () => {
  const action = document.getElementById("action").value;
  const amount = Number(document.getElementById("txtAmount").value);

  if (!action || isNaN(amount) || amount <= 0) {
    alert("Please choose an action and enter a valid amount.");
    return;
  }

  if (action === "deposit") {
    user.balance += amount;
  } else if (action === "withdraw") {
    if (amount > user.balance) {
      alert("Not enough balance");
      return;
    }
    user.balance -= amount;
  }

  showHome();
};

showLogin();