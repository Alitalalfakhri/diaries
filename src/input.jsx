import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
import photo from "../old-paper.jpg"
export default function Input(props) {
  const footer ={
    display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    backgroundColor:'grey',
    color:'white',
    padding:'20px',
    margin: '10px 0 0 0 ',
    borderRadius:'10px',
   fontSize:'20px'

  }
  const containerStyle = {
    backgroundImage: 'url(photo)',
  backgroundSize: 'cover',
  borderRadius: '20px',
  padding: '20px',
  margin: '20px',
  boxShadow:' 5px 5px 5px rgba(51, 46, 46, 0.3)',
  animation:' slideInFromRight 1s ease-out'}
  const center = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [added, setAdded] = useState([]);
  const [id, setId] = useState(0);

  // Load diary entries from local storage on component mount
  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    if (storedEntries.length > 0) {
      setAdded(storedEntries);
      setId(storedEntries[storedEntries.length - 1].id + 1); // Set ID to the next number
    }
  }, []);

  // Save diary entries to local storage whenever `added` state changes
  useEffect(() => {
    localStorage.setItem("diaryEntries", JSON.stringify(added));
  }, [added]);

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleDateChange(event) {
    setDateValue(event.target.value);
  }

  function add() {
    if (inputValue.trim() === "" || dateValue === "") return; // Prevent adding empty entries or missing dates

    setId((prev) => prev + 1); // Increment the ID
    const newEntry = { diary: inputValue, date: dateValue, id: id };
    setAdded([...added, newEntry]); // Add the new entry to the array
    setInputValue(""); // Clear the input field after adding
    setDateValue(""); // Clear the date field after adding
  }

  function deleteEntry(entryId) {
    const updatedEntries = added.filter(entry => entry.id !== entryId);
    setAdded(updatedEntries); // Update the state
  }

  function travel(param1, param2) {
    props.change(param1, param2);
    console.log(param2, param1);
    navigate("/fully-sized");
  }

  return (
    <>
      <div className="adding-cont">
        <div style={center}>
          <textarea placeholder="ماذا حصل اليوم ؟" name="diary" onChange={handleChange} value={inputValue} />
        </div>
        <div style={center}>
          <input

            className="input-date"
            name="date"
            onChange={handleDateChange}
            type="date"
            value={dateValue}
          />
        </div>
        <div style={center}>
          <button onClick={add} className="add-button">اضافة</button>
        </div>
      </div>

      <div>
        {added.map((one) => (
          <div style={containerStyle} className="diary-cont" key={one.id}>
            <div style={center}>
              <h2>
                {one.diary.slice(0, 100)}{one.diary.length >= 99 && '....'}
              </h2>
            </div>
            <div style={center}>
              <p>{one.date}</p> {/* Display the date */}
            </div>
            <div style={center}>
              <button className="show-rest" onClick={() => travel(one.diary, one.date)}>قراءة المزيد</button>
              <button className="delete-button" onClick={() => deleteEntry(one.id)}>حذف </button> {/* Delete button */}
            </div>
          </div>
        ))}
      </div>

      <footer style={footer} >
        صُنع هذا الموقع بواسطة <a href="https://t.me/Web23Dev" target="_blank">علي طلال</a>

      </footer>
    </>
  );
}
