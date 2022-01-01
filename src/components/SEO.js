import React from 'react';
import {Helmet} from 'react-helmet';

const SEO = ({title, description, keywords}) => {
  return (
    <Helmet title={title}>
      <meta name={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

export default SEO;
