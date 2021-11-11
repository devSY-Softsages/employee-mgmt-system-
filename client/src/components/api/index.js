import axios from "axios";

const baseURL = "http://localhost:3001/profile";

export const fetchData = async () => {
  try {
    const { data } = await axios.get(`${baseURL}`); //need to improve (Destructuring assignment data unnecessarily renamed)
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteEntry = async (userID) => {
  try {
    await axios.delete(`${baseURL}/${userID}`);
    return true;
  } catch (error) {
    return error;
  }
};

export const updatingEntry = async (state) => {
  await axios.put(`${baseURL}/${state.id}`, {
    name: state.name,
    designation: state.designation,
    salary: state.salary,
    projects_assigend: state.projects_assigend,
  });
};

export const createResource = async (state) => {
  try {
    await axios.post(`${baseURL}`, {
      name: state.name,
      designation: state.designation,
      salary: state.salary,
      projects_assigend: state.projects_assigend,
    });
  } catch (error) {
    return error;
  }
};

//jsonplacehold API
export const getPosts = async () => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return data;
  } catch (error) {
    return error;
  }
};