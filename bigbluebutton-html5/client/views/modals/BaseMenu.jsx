import Modal from 'react-modal';
import {Icon} from '../../imports/react/components/Icon.jsx';
import {Button} from '../../imports/react/components/Button.jsx';

export default class BaseMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  getContent() {
    return(<div>parent content</div>);
  }

  render() {
    return (
      <div>
        <h3 style={{fontSize: this.props.fontSizeControl.getHeaderSize() + 'px'}}>{this.props.title}</h3>
        <div style={{fontSize: this.props.fontSizeControl.getContentSize() + 'px'}}>
          {this.getContent()}
        </div>
      </div>
    );
  }
};
