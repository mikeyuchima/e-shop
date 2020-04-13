import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class UpdateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'fits-commerce');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/fits-commerce/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };

  render() {
    return (
      <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
        {(updateItem, { loading, error, called, data }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              // call mutation
              const res = await updateItem();
              // redirect to single item page
              Router.push({
                pathname: '/item',
                query: { id: res.data.updateItem.id },
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor='file'>
                Image
                <input
                  type='file'
                  id='file'
                  name='file'
                  placeholder='Upload an image'
                  required
                  onChange={this.uploadFile}
                />
                {this.state.image && (
                  <img
                    width='200'
                    src={this.state.image}
                    alt='Upload Preview'
                  />
                )}
              </label>
              <label htmlFor='title'>
                Title
                <input
                  type='text'
                  id='title'
                  name='title'
                  placeholder='Title'
                  value={this.state.title}
                  onChange={this.handleChange}
                  required
                />
              </label>

              <label htmlFor='price'>
                Price
                <input
                  type='number'
                  id='price'
                  name='price'
                  placeholder='Price'
                  value={this.state.price}
                  onChange={this.handleChange}
                  required
                />
              </label>

              <label htmlFor='description'>
                Description
                <textarea
                  type='number'
                  id='description'
                  name='description'
                  placeholder='Enter Product Description'
                  value={this.state.description}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <button type='submit'>Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
