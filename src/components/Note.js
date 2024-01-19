import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Note.css";

const Note = () => {
  const [inputNote, setInputNote] = useState("");
  const [note, setNote] = useState([]);
  const api = "http://localhost:5000";

  //posting note
  const addNote = async (e) => {
    const data = {
      note: inputNote,
    };
    try {
      const response = await axios.post(`${api}/create_note`, data);
      setNote((prevNote) => [...prevNote, response.data.data]);
      setInputNote("");
    } catch (error) {
      console.log(error);
    }
  };

  //deleting note
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/delete_note/${id}`);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  //fetching note
  const getData = async () => {
    try {
      const notesResponse = await axios.get(`${api}/get_note`);
      setNote(notesResponse.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <input
        placeholder="Enter Note"
        onChange={(e) => setInputNote(e.target.value)}
        value={inputNote}
      />
      <button onClick={addNote}>Create</button>
      <ul>
        {note.map((i) => (
          <li key={i.id}>
            <p>{i.message}</p>
            <button onClick={() => handleDelete(i.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Note;
