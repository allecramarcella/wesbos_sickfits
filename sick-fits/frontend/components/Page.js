import PropTypes from 'prop-types';
import Header from './Header';

export default function Page( { childeren }) {
  return (
    <div>
      <Header />
      
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any
}