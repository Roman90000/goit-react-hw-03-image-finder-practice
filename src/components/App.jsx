import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getItemsApi } from './Api/Api';

export class App extends Component {
  state = {
    inputData: '',
    images: [],
    page: 1,
  };

  inputData = e => {
    e.preventDefault();
    // const newSearch = e.target.search.value.toLowerCase().trim();
    this.setState({ inputData: e.target.search.value.toLowerCase().trim() });
    // console.log('newSearch', newSearch);
    // console.log('state ', this.state);
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.inputData !== this.state.inputData ||
      prevState.page !== this.state.page
    ) {
      try {
        const responseApi = await getItemsApi(
          this.state.inputData,
          this.state.page
        );
        console.log('responseApi', responseApi);
        this.setState({ images: responseApi });
      } catch (error) {}
    }
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.inputData} />
        <ImageGallery images={this.images} />
      </div>
    );
  }
}
