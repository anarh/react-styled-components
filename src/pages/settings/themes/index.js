import React, { Component } from 'react';
import Input from '../../../components/input';
import Button from '../../../components/button';

class Themes extends Component {
  constructor (props) {
    super(props);

    this.state = {
      checkValidity: false,
      submitted: false,
      themeCreated: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit (e) {
    e.preventDefault();
    const themeName = e.target.elements.themeName.value.trim();

    this.setState({
      checkValidity: true,
      submitted: true
    });

    // await this.props.actions.createAccount({});

    this.setState({ submitted: false });

    // if (this.props.createAccount.isError) {
    //   return this.setState({ themeCreated: false });
    // }

    this.props.history.push('/settings/themes/edit');
  }

  render () {
    // const baseUrl = process.env.REACT_APP_BASE_URL;

    return <div className='main-content-wrapper'>
      <section className='doc-content'>
        <h1>Themes</h1>
        <h2>Edit Themes</h2>
        <table className='properties-table'>
          <thead>
            <tr>
              <th><input type='checkbox' /></th>
              <th>Theme Name</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type='checkbox' /></td>
              <td className='name'><code>--hiq-meter-background-color</code></td>
              <td>Sets the background color of the meter element track.</td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td className='name'><code>--hiq-meter-strong-color</code></td>
              <td>Sets the background color of the meter bar with an optimum value.</td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td className='name'><code>--hiq-meter-good-color</code></td>
              <td>Sets the background color of the meter bar with a sub-optimum value.</td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td className='name'><code>--hiq-meter-weak-color</code></td>
              <td>Sets the background color of the meter bar with a weak value.</td>
            </tr>
          </tbody>
        </table>
        <Button disabled type='submit' label='Delete' store={this.props} /> <Button disabled type='submit' label='Edit' store={this.props}
        />

        <h2>Create New Theme</h2>
        <form onSubmit={(e) => { this.handleSubmit(e); }} className={`${this.state.submitted ? 'form-submitted' : ''}`} method='POST' action='/'>
          <Input
            className='input-container'
            id='themeName'
            label='Theme Name'
            name='themeName'
            required
            store={this.props}
            title='required'
            type='text'
          />
          <Button
            type='submit'
            className='is-full-width'
            label='Create New Theme'
            store={this.props}
          />
        </form>
      </section>
    </div>;
  }
}

Themes.propTypes = {
  // store: PropTypes.object.isRequired
};

Themes.defaultProps = {

};

export default Themes;
