async function Fetching(path, data) {
  try {
    const response = await fetch("http://localhost:3000/" + path, {
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
    const resData = await response.json();
    return { success: true, info: resData };
  } catch (err) {
    return { success: false, message: err.message };
  }
}


export { Fetching };
