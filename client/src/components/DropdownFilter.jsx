import React, { Component } from 'react';
import { DropdownButton, MenuItem, Label, Button } from 'react-bootstrap';
import Loader from 'react-md-spinner';
import Error from './Error';
import PropTypes from 'prop-types';
import DropdownFilterStyles from './DropdownFilter.scss';

function noop (){};

export default class DropdownFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selected: -1,
      loading: false,
      loaded: false,
      error: false
    }

    this.provider = this.provider.bind(this);
    this.onOptionSelect = this.onOptionSelect.bind(this);
    this.removeSelected = this.removeSelected.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true, loaded: false, error: false });
    this.provider()
      .then((data) => {
        this.setState.options = data;
        this.setState({ options: data, loading: false, loaded: true, error: false });
      })
      .catch(ex => this.setState({ loading: false, loaded: false, error: true }));
  }

  provider() {
    if(this.props.provider) {
      return this.props.provider();
    } else {
      return noop();
    }
  }

  onOptionSelect (index, e) {
    console.log('selected => ', index);
    this.setState({ selected: index });
    console.log('e => ', e);
  }

  removeSelected() {
    this.setState({ selected: -1 });
  }

  render() {
    const { title, id } = this.props;
    const { options, loading, loaded, error, selected } = this.state;
    const hasOptions = options.length > 0;
    const hasSelected = selected >= 0;

    return (<section className="drop-down-filter">
      {
        (loaded && hasOptions) &&
        <section>
          <DropdownButton id={id} title={title} onSelect={this.onOptionSelect}>
            {
              options.map((item, i) => {
                return <MenuItem eventKey={i} key={i} active={selected === i}>{item}</MenuItem>
              })
            }
          </DropdownButton>
          {
            hasSelected &&
            <Label className="selected-item">
              {options[selected]}
              <Label className="remove-selected" onClick={this.removeSelected}>X</Label>
            </Label>
          }
        </section>
      }
      {
        error &&
        <Error message="Sorry, system error"></Error>
      }
      {
        loading &&
        <p className="text-center">
          <Loader size={50} />
        </p>
      }
    </section>
  );
  }
}

DropdownFilter.PropTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  provider: PropTypes.func.isRequired,
  onItemSelect: PropTypes.func.isRequired
};
