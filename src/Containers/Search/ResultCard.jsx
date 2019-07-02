import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import * as paths from '../../paths';
import Button from '../../Components/Common/Button/Button';
import blankProfilePic from '../../assets/img/blank_profile_pic.png';
import blackArticleImg from '../../assets/images/undraw_article.png';
import './ResultCard.scss';

/**
 * display search results into cards
 * @param {object} props
 * @returns {object} jsx
 */
const ResultCard = ({ avatar, username, date, articleImg, title, description, slug }) => (
  <Card className="article-card">
    <Card.Header>
      <div className="d-flex flex-row">
        <Image className="avatar" src={avatar} roundedCircle />
        <div className="d-flex flex-column ml-2">
          <span className="username">{username}</span>
          <span className="date">{date}</span>
        </div>
      </div>
    </Card.Header>
    <Card.Body className="d-flex flex-row">
      <div>
        <Card.Img variant="top" className="article-img" src={articleImg} />
      </div>
      <div className="article-info">
        <Card.Title className="title">{title}</Card.Title>
        <Card.Subtitle className="mb-2 subtitle">{description}</Card.Subtitle>
        <a href={`${paths.ARTICLES_PATH}/${slug}`}>
          <Button size={12} text="View more..." />
        </a>
      </div>
    </Card.Body>
  </Card>
);

ResultCard.propTypes = {
  avatar: PropTypes.string,
  articleImg: PropTypes.string,
  slug: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

ResultCard.defaultProps = {
  avatar: blankProfilePic,
  articleImg: blackArticleImg,
};

export default ResultCard;
