import React, { Component } from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import { Isao } from 'react-native-textinput-effects';

import Divider from './divider.js';
import ImageList from './multiImageView.js'
import ImagePicker from 'react-native-image-crop-picker';

import { NavigationActions } from 'react-navigation';

const staticImages = [
  // {
  //   source : './images/beats_1.jpg',
  // },
  // {
  //   source : './images/wooden_table.jpg',
  // },
  // {
  //   source : './images/oxo_sugar_dispenser.jpg',
  // },
];

class ImageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode : this.props.editMode
    };
  }

  toggleMode(currentMode) {
    this.setState({editMode : !currentMode });
  }

  render() {
    if (!this.state.editMode) {
      return (
        <TouchableOpacity onPress={
            this.toggleMode.bind(this, this.state.editMode)}>
          <Image
                 source={require('./images/edit_pencil_crop_icon.png')}
                 style ={{alignSelf : 'flex-end',
                          height : 20,
                          width : 20,
                          right : 5}}
          />
        </TouchableOpacity>
      )
    }
    else {
      return (
        <TouchableOpacity onPress={
            this.toggleMode.bind(this, this.state.editMode)} >
          <Image
                 source={require('./images/checked_icon.png')}
                 style ={{alignSelf : 'flex-end',
                          height : 20,
                          width : 20,
                          right : 5}}
          />
        </TouchableOpacity>
      )
    }
  }
}

class TitleText extends Component {
  constructor(props) {
    super(props);

    const text = this.props.text !== undefined ?
                    this.props.text : "";

    const editMode = this.props.editMode !== undefined ?
                  this.props.editMode : false;

    this.state = {
      text : text,
      editMode : editMode,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.editMode === false) {
      Keyboard.dismiss();
    }
    else {

    }
  }

  toggleMode(currentMode) {

    this.setState({editMode : !currentMode,
                   text : this.state.text});
  }

  render() {
    const image = this.state.editMode ? require('./images/checked_icon.png') :
                require('./images/edit_pencil_crop_icon.png');

    console.log("editMode : ", this.state.editMode);

    return (
      <View style = {{height : this.props.height}}>

      <View style = {{backgroundColor : '#afcecf',
                      flexDirection : 'row'
                      }}>
        <Text style = {{ fontFamily : 'AmericanTypewriter',
                         fontSize : 20,}}
        >{this.props.titleText}</Text>

        <View style={{flex : 1}}>
          <TouchableOpacity onPress={this.toggleMode.bind(this, this.state.editMode)}>
            <Image
                   source={image}
                   style ={{alignSelf : 'flex-end',
                            height : 20,
                            width : 20,
                            right : 5}}
            />
          </TouchableOpacity>
        </View>


      </View>

      <TextInput
          style={{ flex : 1,
                  fontSize : 17,
                  lineHeight : 25}}
          editable={this.state.editMode}
          multiline={true}
          maxLength={this.props.maxLength}
          autoFocus={this.state.editMode}
          onSubmitEditing={Keyboard.dismiss}
          onChangeText={(text) => this.setState(
                                    {text : text,
                                     editMode : this.state.editMode})}
      />
    </View>
  );
  }
}

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images : staticImages
    };
  }

  updateTitle = (text) => {
    this.title = text;
    console.log("Title updated: ", this.title);
  };


  getTitle = () => {return this.title;};

  updateDescription = (text) => this.description = text;
  getDescription = () => {return this.description;};

  // static navigationOptions = {
  //   header : ({state, setParams}) => {
  //     console.log("State: ", state);
  //     return {
  //       right : (
  //         <Button
  //           title="Add Product"
  //           onPress={() => Alert.alert("save pressed")}
  //         />
  //       )
  //     };
  //   }
  // };

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerRight: (
      <Button
        title="Add Product"
        onPress={() => Alert.alert("save pressed")}
      />
    ),
  });

  componentDidMount() {

  }


  pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      multiple : true,
      smartAlbums : 'UserLibrary'
    }).then(image => {
      console.log('received image', image);
      // this.setState({
      //   image: {uri: image.path, width: image.width, height: image.height},
      //   images: null
      // });
      const newImage = {
        source : image.path
      };
      const newImageSet = this.state.images.concat(newImage);
      console.log("newImageSet", newImageSet);
      this.setState({
        images : newImageSet
      });
    }).catch(e => alert(e));
  }


  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style = {{flex : 1}}>


        <ScrollView style={{/*flex : 1,*/
                      marginLeft : 5,
                      marginRight : 5
                    }}>

          <Isao
              label={'Title'}
              // this is applied as active border and label color
              activeColor={'#da7071'}
              // this is applied as passive border and label color
              passiveColor={'#dadada'}

              height={80} maxLength={80}

              onChangeText={this.updateTitle}
            />

          <Divider />

          <Isao
              label={'Description'}
              // this is applied as active border and label color
              activeColor={'#da7071'}
              // this is applied as passive border and label color
              passiveColor={'#dadada'}

              multiline={true}
            height={180} maxLength={400}

            onEndEditing={this.updateDescription}
          />

          <Divider />

          <Isao
              label={'Price'}
              // this is applied as active border and label color
              activeColor={'#da7071'}
              // this is applied as passive border and label color
              passiveColor={'#dadada'}

              height={80} maxLength={80}

              onChangeText={this.updateTitle}
            />

          <Divider />

          <Button
            onPress={this.pickSingleWithCamera.bind(this,true)}
            title="Add Photos/Images"
            color="#841584"
            accessibilityLabel="Add Photos/Images"
          />

          <ImageList images={this.state.images} />

          <Divider />

          <KeyboardSpacer/>
        </ScrollView>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}
