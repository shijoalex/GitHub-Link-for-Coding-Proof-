import React from "react";

function App() {
  return (
    <div className="container mt-5 p-4 bg-light border rounded">

  
      <div className="bg-warning text-center p-3 mb-4">
        <h1 className="mb-0">Registration Form</h1>
      </div>

      <form>

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
          />
        </div>

     
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
          />
        </div>

        
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

       
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
          />
        </div>

     
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
          />
        </div>

   
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select className="form-select">
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

 
        <div className="mb-3">
          <label className="form-label">Country</label>
          <select className="form-select">
            <option>USA</option>
            <option>India</option>
            <option>UK</option>
            <option>Canada</option>
            <option>Australia</option>
          </select>
        </div>

        
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Enter your address"
          ></textarea>
        </div>

      
        <div className="mb-3">
          <label className="form-label">Website</label>
          <input
            type="url"
            className="form-control"
            placeholder="https://example.com"
          />
        </div>

       
        <div className="mb-3">
          <label className="form-label">Preferred Time</label>
          <input
            type="time"
            className="form-control"
          />
        </div>

      
        <div className="mb-3">
          <label className="form-label">Favorite Color</label>
          <input
            type="color"
            className="form-control form-control-color"
            defaultValue="#ff0055"
          />
        </div>

      
        <div className="mb-3">
          <label className="form-label">
            Experience: 0 Years
          </label>

          <input
            type="range"
            className="form-range"
            min="0"
            max="20"
            defaultValue="0"
          />
        </div>

        {/* Photo */}
        <div className="mb-3">
          <label className="form-label">Photo</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
          />
        </div>


        <button
          type="submit"
          className="btn btn-warning w-100"
        >
          Register
        </button>

      </form>
    </div>
  );
}

export default App;