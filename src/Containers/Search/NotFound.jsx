import React from 'react';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.css';
import imgNotFound from '../../assets/images/undraw_not_found.svg';

const imgStyle = {
  width: '45%',
};

/**
 * render articles not found in the search
 * @returns {object} jsx
 */
export default function NotFound() {
  return (
    <React.Fragment>
      <div className="mx-auto mt-5 py-5" style={imgStyle}>
        <Image src={imgNotFound} fluid alt="not_article_found" />
      </div>
      <h1 className="text-center">No result found for your search</h1>
    </React.Fragment>
  );
}
