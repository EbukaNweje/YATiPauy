import React, { useState, useEffect, useRef } from "react";
import "./pageCss/profilepage.css"
import { FiEdit2 } from "react-icons/fi";

function ProfileInfo() {
  const [details, setDetails] = useState({
    fullName:  "",
    email: "",
    street: "",
    locality: "",
    state: "",
  });
  const [editMode, setEditMode] = useState({
    fullName: true,
    street: true,
    locality: true,
    state: true,
  });
  const [profileExists, setProfileExists] = useState(false);
  const fileInputRef = useRef(null);
  const [profileId, setProfileId] = useState(null);


  const handleInputChange = (field) => (e) => {
    setDetails({ ...details, [field]: e.target.value });
  };

  const toggleEdit = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleCancel = () => {
    setDetails({
      fullName: name,
      email: mail,
      street: "",
      locality: "",
      state: "",
    });
    setEditMode({
      fullName: true,
      street: true,
      locality: true,
      state: true,
    });
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const renderField = (label, value, fieldKey) => (
    <div className="inforcontainer">
      <h2>{label}</h2>
      {editMode[fieldKey] ? (
        <div className="readonly-field">
          <span>{value || "N/A"}</span>
          <FiEdit2 className="edit-icon" onClick={() => toggleEdit(fieldKey)} />
        </div>
      ) : (
        <input
          className="containerwrap"
          type="text"
          value={value}
          onChange={handleInputChange(fieldKey)}
          placeholder={`Enter ${label.toLowerCase()} here...`}
        />
      )}
    </div>
  );

  return (
    <div>
      {loading && (
        <div className="uploadOverlay">
          <Loadscreen />
        </div>
      )}
      <div className="informationdetailcont">
        <h1
          style={{ marginLeft: "30px", paddingTop: "10px", fontSize: "27px" }}
        >
          My Profile
        </h1>
        <form className="profileform" onSubmit={handleSubmitProfile}>
          {renderField("Full Name", details.fullName, "fullName")}

          <div className="inforcontainer">
            <h2>Email</h2>
            <div className="readonly-field">
              <span>{details.email}</span>
            </div>
          </div>

          {renderField("Street", details.street, "street")}

          <div className="origindetailswrap">
            <div className="localitycontwrap">
              <h2>Locality</h2>
              {editMode.locality ? (
                <div className="readonly-field">
                  <span>{details.locality || "N/A"}</span>
                  <FiEdit2
                    className="edit-icon"
                    onClick={() => toggleEdit("locality")}
                  />
                </div>
              ) : (
                <input
                  className="localityinputwrapper"
                  type="text"
                  value={details.locality}
                  onChange={handleInputChange("locality")}
                  placeholder="Locality"
                />
              )}
            </div>

            <div className="statecontwrap">
              <h2>State</h2>
              {editMode.state ? (
                <div className="readonly-field">
                  <span>{details.state || "N/A"}</span>
                  <FiEdit2
                    className="edit-icon"
                    onClick={() => toggleEdit("state")}
                  />
                </div>
              ) : (
                <input
                  className="stateinputwrapper"
                  type="text"
                  value={details.state}
                  onChange={handleInputChange("state")}
                  placeholder="State"
                />
              )}
            </div>
          </div>

          <div className="actionbtn">
            <div className="profileupload">
              <h4>Upload Picture</h4>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>

            <div className="actionbuttonwrapper1">
              <button
                type="button"
                className="cancelbtn1"
                onClick={handleCancel}
              >
                Clear
              </button>
              <button type="submit" className="submitbtn">
                {profileExists ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileInfo;
