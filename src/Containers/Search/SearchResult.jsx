import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import ellipsize from 'ellipsize';
import dateFormat from 'dateformat';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from '../../Components/NavBar/NavBar';
import NotFound from './NotFound';
import ResultCard from './ResultCard';
import './ResultCard.scss';

/**
 * render the search result component
 *
 * @param {object} props
 * @returns {object} jsx
 */
export const SearchResult = props => {
  const { searchFilter } = props;
  const { articles } = searchFilter;

  return (
    <React.Fragment>
      <NavBar {...props} />
      {articles.length === 0 ? (
        <NotFound />
      ) : (
        <div className="d-flex flex-column results">
          <Col md={12} sm={12} lg={8} className="result-column">
            {articles.map(item => {
              const { slug, id, User, images, title } = item;
              const date = dateFormat(item.updateAt, 'mediumDate');
              const description = ellipsize(item.description, 80);
              return (
                <ResultCard
                  avatar={User.image}
                  slug={slug}
                  key={id}
                  username={User.username}
                  articleImg={images ? images[0] : undefined}
                  date={date}
                  title={title}
                  description={description}
                />
              );
            })}
          </Col>
        </div>
      )}
    </React.Fragment>
  );
};

SearchResult.propTypes = {
  searchFilter: PropTypes.object.isRequired,
};

/**
 * @param {object} state
 * @returns {object} props
 */
export const mapStateToProps = ({ navbar, searchFilter, profile, currentUser }) => ({
  navbar,
  searchFilter,
  profile,
  currentUser,
});

export default connect(mapStateToProps)(SearchResult);
