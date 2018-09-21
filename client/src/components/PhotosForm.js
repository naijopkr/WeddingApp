import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import { connect } from 'react-redux';
import M from 'materialize-css';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';

class PhotosForm extends Component {
  constructor(props) {
    super();
    this.dropzoneConfig = {
      iconFileType: ['.jpg', '.png'],
      showFiletypeIcon: true,
      postUrl: '/api/photos'
    }
    this.djsConfig = {
      addRemoveLinks: true,
      acceptedFiles: "image/jpeg,image/png",
      autoProcessQueue: true,
      dictDefaultMessage: props.lang.photos.dzMessage,
      dictRemoveFile: props.lang.photos.dzRemove,
      maxFiles: 10,
      maxFilesize: 5
    };
  }

  onInit(dropzone) {
    this.dropzone = dropzone;
  }

  onComplete = file => {
    if (file.accepted) {
      M.toast({ 
        html: this.props.lang.photos.submitSuccess, 
        classes: 'green lighten-3 green-text text-darken-4'
      });
    } else {
      if (this.dropzone.files.length > 10) {
        M.toast({ 
          html: this.props.lang.photos.dzMaxFile,
          classes: 'red lighten-4 red-text text-darken-4' 
        });
      }
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        M.toast({ 
          html: this.props.lang.photos.dzInvalidFile,
          classes: 'red lighten-4 red-text text-darken-4' 
        });
      }
      if ((file.size/(1000*1000) > 5)) {
        M.toast({ 
          html: this.props.lang.photos.dzBigFile,
          classes: 'red lighten-4 red-text text-darken-4' 
        });
      }
    }
  }

  onSuccess = file => {
    this.dropzone.removeFile(file);
  }

  render() {
    const dropzoneConfig = this.dropzoneConfig;
    const djsConfig = this.djsConfig;
    const eventHandlers = {
      init: this.onInit.bind(this),
      complete: this.onComplete.bind(this),
      success: this.onSuccess.bind(this)
    }
    return (
      <div className="dropzone">
          <DropzoneComponent
            config={dropzoneConfig}
            djsConfig={djsConfig}
            eventHandlers={eventHandlers}>
            <div className="dz-message">{this.props.lang.photos.dzMessage}</div>
          </DropzoneComponent>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.lang
  }
}

PhotosForm = connect(mapStateToProps)(PhotosForm);

export default PhotosForm;