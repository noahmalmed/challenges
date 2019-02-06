import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';

import { uploadFile, getFilesForPatient } from '../actions/files';

const styles = {
  container: {
    paddingBottom: 60,
  },
  fileList: {
    marginBottom: 20,
  },
  fileInput: {
    width: 0,
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 1,
  },
};

class Files extends Component {
  constructor(props) {
    super(props);

    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  componentDidMount() {
    this.props.getFilesForPatient(this.props.patientId);
  }

  handleFileUpload(event) {
    const file = event.target.files[0];
    this.props.uploadFile(file, this.props.patientId)
      .then(() => this.props.getFilesForPatient(this.props.patientId));
  }

  render() {
    const { classes, files, canUpload } = this.props;
    return (
      <div className={classes.container}>
        {
          files.length ?
            <List dense className={classes.fileList}>
              {
                files.map((file) => (
                  <ListItem key={file && file.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <Icon>folder</Icon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={file.name} />
                  </ListItem>
                ))}
            </List> : null
        }
        <input
          id="file"
          type="file"
          className={classes.fileInput}
          onChange={this.handleFileUpload}
        />
        { canUpload &&
          <Button component="label" htmlFor="file" variant="raised" color="primary">
            Upload File
          </Button>
        }
      </div>
    );
  }
}

Files.propTypes = {
  canUpload: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  files: PropTypes.array,
  patientId: PropTypes.string,
  getFilesForPatient: PropTypes.func,
  uploadFile: PropTypes.func,
};

const mapStateToProps = (state) => ({
  files: state.files,
});

const mapDispatchToProps = (dispatch) => ({
  uploadFile: (file, patientId) =>
    dispatch(uploadFile(file, patientId)),
  getFilesForPatient: (patientId) => {
    dispatch(getFilesForPatient(patientId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Files));
