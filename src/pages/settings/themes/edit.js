import React, { Component } from 'react';
import Input from '../../../components/input';
import Button from '../../../components/button';
import themeVariables from 'scss-theme-example/dist/variables.json';

class ThemeEdit extends Component {
  constructor (props) {
    super(props);

    this.state = {
      checkValidity: false,
      submitted: false,
      themeModified: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleVariableChange (e) {
    e.preventDefault();
    this.setState({
      themeModified: true
    });

    // console.log(e.target.name);
    if (!e.target.value) return;

    document.documentElement.style.setProperty(e.target.name, e.target.value);
    console.log('call change of theme variable');
  }

  async handleSubmit (e) {
    e.preventDefault();
    // const themeName = e.target.elements.themeName.value.trim();

    this.setState({
      checkValidity: true,
      submitted: true
    });

    // await this.props.actions.createAccount({});

    this.setState({ submitted: false });
    this.props.history.push('/settings/themes');
  }
  render () {
    // const baseUrl = process.env.REACT_APP_PUBLIC_URL;

    const rows = Object.keys(themeVariables).map((variable, i) => {
      return <tr key={i}>
        <td>
          <code>{variable}</code>
        </td>
        <td>
          <Input
            className='input-container'
            defaultValue={themeVariables[variable]}
            id={variable}
            label=''
            name={variable}
            onChange={(e) => { this.handleVariableChange(e); }}
            store={this.props}
            type='text'
          />
        </td>
      </tr>;
    });

    return <div className='main-content-wrapper'>
      <section className='doc-content'>
        <h1>Edit Theme</h1>
        <h2>Theme Name</h2>
        <form>
          <table className='properties-table'>
            <thead>
              <tr>
                <th>Settings</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
          <Button type='submit' label='Cancel' store={this.props} /> <Button type='submit' label='Save Theme' store={this.props}
          />
        </form>
      </section>
    </div>;
  }
}

ThemeEdit.propTypes = {
  // store: PropTypes.object.isRequired
};

ThemeEdit.defaultProps = {

};

export default ThemeEdit;
