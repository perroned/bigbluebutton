import Modal from 'react-modal';
import {Icon} from '../../imports/react/components/Icon.jsx';
import {Button} from '../../imports/react/components/Button.jsx';

export default class BaseMenu extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {
      title: props.title || ""
    }
  }

  render() {

  }
};
