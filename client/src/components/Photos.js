import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import { fetchPhotos } from '../actions';
import cover from '../images/photos.jpg';
import PhotosForm from './PhotosForm';

class Photos extends Component {
  constructor() {
    super();
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  componentDidMount() {
    this.props.fetchPhotos();
  }

  renderPhotos() {
    let photos = this.props.photos;
    let photoSet = photos.map(photo => {
      return {
        src: `${photo.location}_thumbnail`,
        alt: photo.key,
        width: Number(photo.width),
        height: Number(photo.height)
      }
    });
    let photoLightbox = photos.map(photo => {
      return {
        src: photo.location,
        alt: photo.key,
        width: Number(photo.width),
        height: Number(photo.height)
      }
    }); 

    return (
      <div>
        <Gallery photos={photoSet} onClick={this.openLightbox} />
        <Lightbox images={photoLightbox}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
      </div>
    );
  }

  render() {
    return (
      <div className='container center'>
        <img
          id='cover'
          className='circle responsive-img' 
          alt=''
          src={cover} 
        />
        <div className='container'>
          <div className='card indigo darken-3'>
            <div className='card-content yellow-text text-lighten-3'>
              <span className='card-title session-title'>
                {this.props.lang.photos.title}
              </span>
              <PhotosForm onSubmit={this.submit} />
            </div>
          </div>
          {this.renderPhotos()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    photos: state.photos,
    lang: state.lang
  }
}

Photos = connect(mapStateToProps, { fetchPhotos })(Photos);

export default Photos;