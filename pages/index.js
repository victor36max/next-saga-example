import React from 'react';
import { connect } from 'react-redux';
import { fetchApodStart } from '../lib/reducers/apod';

const mapStateToProps = state => ({
  apod: state.apod,
});

const mapDispatchToProps = dispatch => ({
  fetchApod: date => dispatch(fetchApodStart(date)),
});

class Index extends React.Component {
  static async getInitialProps({ isServer, store }) {
    // Fetch today NASA APOD
    await store.execSagaTasks(isServer, dispatch => {
      dispatch(fetchApodStart());
    });

    console.log('');
    console.log('###############################');
    console.log('### Fetched today NASA APOD ###');
    console.log('###############################');
    console.log(store.getState().apod);
    console.log('');

    // Fetch custom date NASA APOD
    await store.execSagaTasks(isServer, dispatch => {
      dispatch(fetchApodStart('2018-07-26'));
    });

    console.log('');
    console.log('#####################################');
    console.log('### Fetched custom date NASA APOD ###');
    console.log('#####################################');
    console.log(store.getState().apod);
    console.log('');

    return {};
  }

  render() {
    return (
      <div>
        <style jsx>
          {`
            .apod-img {
              width: 70%;
            }
          `}
        </style>
        <img className="apod-img" src={this.props.apod.data.url} alt="" />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
