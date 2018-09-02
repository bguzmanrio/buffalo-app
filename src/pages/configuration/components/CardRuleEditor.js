import React from 'react';
import { Modal, View, Text, TextInput, Button } from 'react-native';

class CardRuleEditor extends React.Component {
  static defaultProps = {
    card: {
      rules: {
        base: {
          short: '',
          long: ''
        },
        hotRound: {
          short: '',
          long: ''
        }
      }
    }
  };

  state = {
    short: this.props.card.rules.base.short || '',
    long: this.props.card.rules.base.long || '',
    hotShort: this.props.card.rules.hotRound.short || '',
    hotLong: this.props.card.rules.hotRound.long || '',
  }

  handleChangeText = input => value => {
    this.setState({ [input]: value });
  }

  handleShortChange = this.handleChangeText('short');
  handleLongChange = this.handleChangeText('long');
  handleHotShortChange = this.handleChangeText('hotShort');
  handleHotLongChange = this.handleChangeText('hotLong');

  handleSave = () => {
    if(this.state.short && this.state.hotShort) {
      const values = {...this.state};
      this.setState({
        short: '',
        long: '',
        hotShort: '',
        hotLong: ''
      }, () => {
        this.props.onSaveRules(values);
      })
    }
  };

  handleCancel = () => {
    this.setState({
      short: '',
      long: '',
      hotShort: '',
      hotLong: ''
    }, this.props.onCancelEdit);
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={this.props.onCancelEdit}
      >
        <View>
          <View>
            <Text>Base round</Text>
            <View>
              <Text>Short description (mandatory)</Text>
              <TextInput
                onChangeText={this.handleShortChange}
                value={this.state.short}
              />
            </View>
            <View>
              <Text>Long description</Text>
              <TextInput
                onChangeText={this.handleLongChange}
                value={this.state.long}
              />
            </View>
            <Text>Hot round</Text>
            <View>
              <Text>Short description (mandatory)</Text>
              <TextInput
                onChangeText={this.handleHotShortChange}
                value={this.state.hotShort}
              />
            </View>
            <View>
              <Text>Long description</Text>
              <TextInput
                onChangeText={this.handleHotLongChange}
                value={this.state.hotLong}
              />
            </View>
          </View>
          <View>
            <Button title="Save" onPress={this.handleSave}/>
            <Button title="Cancel" onPress={this.handleCancel}/>
          </View>
        </View>
      </Modal>
    )
  }
}

export default CardRuleEditor;