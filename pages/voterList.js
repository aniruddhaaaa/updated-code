import React, { useState, useEffect, useContext } from "react";
import Style from "../styles/voterList.module.css";
import { VotingContext } from "../context/Voter";

const VoterList = () => {
  const { getAllVoterData, voterArray } = useContext(VotingContext);

  const [selectedVoter, setSelectedVoter] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (voter) => {
    setSelectedVoter(voter);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedVoter(null);
    setShowModal(false);
  };

  useEffect(() => {
    getAllVoterData();
  }, []);

  return (
    <div>
      <div className={Style.voterList}>
        {voterArray && voterArray.length > 0 ? (
          voterArray.map((voter, index) => (
            <div key={index} className={Style.voterCardContainer}>
              <div className={Style.voterCardImage}>
                <img
                  src={voter.image || "https://via.placeholder.com/200"}
                  alt="Voter"
                  className={Style.voterImage}
                />
              </div>
              <div className={Style.voterCardButton} onClick={() => openModal(voter)}>
                View Profile
              </div>
            </div>
          ))
        ) : (
          <p>No voters available</p>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedVoter && (
        <div className={Style.modal}>
          <div className={Style.modalContent}>
            <span className={Style.closeButton} onClick={closeModal}>
              &times;
            </span>
            <img
              src={selectedVoter.image || "https://via.placeholder.com/200"}
              alt="Voter"
              className={Style.modalImage}
            />
            <h3>{selectedVoter.name}</h3>
            <p><strong>Address:</strong> {selectedVoter.address}</p>
            {/* <p><strong>Age:</strong> {selectedVoter.position || "N/A"}</p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoterList;
