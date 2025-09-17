import React, { useState } from 'react';
import { FiLink, FiExternalLink } from 'react-icons/fi';
import { FaFolder, FaImage, FaPlay, FaUser } from 'react-icons/fa';

const SearchResultItem = ({ item, searchTerm, highlightText, onCopy }) => {
  const [avatarError, setAvatarError] = useState(false);
  const [copied, setCopied] = useState(false);

  const renderPersonAvatar = () => {
    // If there is no avatar or image failed to load, render a placeholder avatar with icon
    if (!item.avatar || avatarError) {
      return (
        <div className="avatar placeholder">
          <FaUser className="avatar-icon" />
        </div>
      );
    }
    return (
      <img
        src={item.avatar}
        alt={item.name}
        className="avatar"
        onError={() => setAvatarError(true)}
      />
    );
  };
  const getIcon = () => {
    switch (item.type) {
      case 'person':
        return <div className="avatar-container">
          {renderPersonAvatar()}
          <div className={`status-dot ${item.statusColor}`}></div>
        </div>;
      case 'folder':
        return <FaFolder className="item-icon folder-icon" />;
      case 'file':
        if (item.fileType === 'image') {
          return <FaImage className="item-icon image-icon" />;
        } else if (item.fileType === 'video') {
          return <FaPlay className="item-icon video-icon" />;
        }
        return <FaFolder className="item-icon" />;
      default:
        return <FaUser className="item-icon" />;
    }
  };

  const getStatusText = () => {
    if (item.type === 'person') {
      return item.status;
    } else if (item.type === 'folder') {
      return `${item.fileCount} Files`;
    } else if (item.type === 'file') {
      return `in ${item.location} • ${item.lastEdited ? `Edited ${item.lastEdited}` : `Added ${item.lastEdited}`}`;
    }
    return '';
  };

  const getSecondaryText = () => {
    if (item.type === 'folder') {
      return `in ${item.location} • Edited ${item.lastEdited}`;
    } else if (item.type === 'file') {
      return `in ${item.location} • ${item.lastEdited ? `Edited ${item.lastEdited}` : `Added ${item.lastEdited}`}`;
    }
    return '';
  };

  return (
    <div className="search-result-item">
      <div className="item-icon-container">
        {getIcon()}
      </div>
      <div className="item-content">
        <div className="item-name">
          {highlightText(item.name, searchTerm)}
          {item.type === 'folder' && (
            <span className="file-count" style={{ marginLeft: 8 }}>{`${item.fileCount} Files`}</span>
          )}
        </div>
        {item.type === 'person' ? (
          <div className="item-status">
            {item.status}
          </div>
        ) : (
          <div className="item-meta">
            <span className="item-location">{getSecondaryText()}</span>
          </div>
        )}
      </div>
      {(item.type === 'file' || item.type === 'folder') && (
        <div className="item-actions" aria-hidden="true">
          <div className="copy-button-container">
            {copied && (
              <div className="copy-toast-local">
                <span className="check-icon">✓</span>
                <span>Link copied!</span>
              </div>
            )}
            <button
              className="action-btn"
              title="Copy link"
              onClick={async (e) => {
                e.stopPropagation();
                try {
                  const url = `${window.location.origin}/item/${item.id}`;
                  if (navigator?.clipboard?.writeText) {
                    await navigator.clipboard.writeText(url);
                  }
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1200);
                  if (onCopy) onCopy();
                } catch (err) {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1200);
                  if (onCopy) onCopy();
                }
              }}
            >
              <FiLink className="action-icon" />
            </button>
          </div>
          <button
            className="action-btn has-text"
            title="Open in new tab"
            onClick={(e) => {
              e.stopPropagation();
              const url = `${window.location.origin}/item/${item.id}`;
              window.open(url, '_blank');
            }}
          >
            <FiExternalLink className="action-icon" />
            <span className="action-label">New Tab</span>
          </button>
          {copied && null}
        </div>
      )}
    </div>
  );
};

export default SearchResultItem;

