import React, { useState } from "react";
import ReactPlayer from "react-player";
import "../styles/modal.scss";

const YoutubePlayer = ({ videoKey }) => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <button onClick={closeModal} className="close-button" data-testid="close-modal-button">
            <i className="bi bi-x"></i>
          </button>
          {videoKey ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoKey}`}
              controls={true}
              playing={true}
              data-testid="youtube-player"
            />
          ) : (
            <div>No Trailer Available</div>
          )}
        </div>
      </div>
    )
  );
};

export default YoutubePlayer;
