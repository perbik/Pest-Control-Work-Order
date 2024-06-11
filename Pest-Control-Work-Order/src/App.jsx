function App() {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.elements.fname.value);
    console.log(event.target.elements.lname.value);
  };

  return (
    <>
      <form className="w-25" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" name="fname" placeholder="Enter first name..." className="form-control" />
        </div>
        <div className="mb-3">
          <input type="text" name="lname" placeholder="Enter last name..." className="form-control" />
        </div>
        <div className="mb-3">
          <button className="btn btn-success" type="submit">
            Submit Form
          </button>
        </div>
      </form>
    </>
  );
}

export default App
