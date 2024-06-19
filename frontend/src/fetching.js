async function CreateAccount(data) {
  try {
    const response = await fetch("http://localhost:3000/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    await response.json();
    return { success: true };
  } catch (err) {
    return { success: false };
  }
}

async function Login(data) {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const responseData = await response.json();
    if (responseData.message === "Auth successful") {
      return { success: true };
    }
    return {
      success: false,
      message: responseData.message || "Something is wrong",
    };
  } catch (err) {
    return { success: false, message: "Server not responding" };
  }
}

async function SearchUsers(typed) {
  try {
    const response = await fetch("http://localhost:3000/search-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ typed }),
    });
    if (!response.ok) {
      return { success: false, message: "Server not responding" };
    }

    const info = await response.json();
    return info.users;
  } catch (err) {
    return { success: false, message: "Server not responding" };
  }
}

export { CreateAccount, Login, SearchUsers };
