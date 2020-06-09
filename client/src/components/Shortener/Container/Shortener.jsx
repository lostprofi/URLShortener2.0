import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShortenerP from '../Presentation/ShortenerP';
import ShortListP from '../Presentation/ShortListP';
import cutAction from '../../../actions/cutting';

const Shortener = ({ accessToken, cutURL, urlsObj }) => {
  const [fullURL, setFullURL] = useState('');

  const handleChangeFullURL = (event) => {
    const URL = event.target.value;
    setFullURL(URL);
  };

  const handleCutURL = (event) => {
    event.preventDefault();
    cutURL(fullURL, accessToken);
  };

  return (
    <>
      <ShortenerP onChange={handleChangeFullURL} onCutURL={handleCutURL} />
      {urlsObj.map((obj) => (
        <ShortListP
          key={uuidv4()}
          fullURL={obj.fullURL}
          shortenURL={obj.shortenURL}
        />
      ))}
    </>

  );
};

const mapStateToProps = (store) => ({
  accessToken: store.auth.accessToken,
  urlsObj: store.urlsObj,
});

const mapDispatchToProps = (dispatch) => ({
  cutURL(fullURL, accessToken) {
    dispatch(cutAction(fullURL, accessToken));
  },
});

Shortener.propTypes = {
  accessToken: PropTypes.string.isRequired,
  cutURL: PropTypes.func.isRequired,
  urlsObj: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Shortener);
